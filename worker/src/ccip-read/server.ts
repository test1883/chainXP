import { Server } from '@ensdomains/ccip-read-cf-worker'
import { ethers } from 'ethers/lib/index.js'
import { Result } from 'ethers/lib/utils.js'

import { abi as Gateway_abi } from '../abi/Gateway.json'
import { Env } from '../env'
import { set as setProfile } from '../handlers/functions/profiles/set'
import { set as setGame } from '../handlers/functions/games/set'
import { set as addQuest } from '../handlers/functions/quests/set'

export function makeServer(privateKey: string, env: Env) {
  let signer = new ethers.Wallet(privateKey)
  const server = new Server()
  server.add(Gateway_abi, [
    {
      type: 'createProfile',
      func: async (args: Result) => {
        console.log(args)
        const [userId, profile, owner, name, bio, country] = args;
        await setProfile({
          user_id: Number(userId),
          profile: profile,
          owner: owner,
          name: name,
          bio: bio,
          country: country
        }, env)
        // Hash and sign the response
        let messageHash = ethers.utils.solidityKeccak256(
          ['address'],
          [owner]
        )
        let messageHashBinary = ethers.utils.arrayify(messageHash)
        const sig = await signer.signMessage(messageHashBinary)
        console.log(sig)
        return [sig]
      },
    },
    {
      type: 'createGame',
      func: async (args: Result) => {
        console.log(args)
        const [gameId, name, owner, contractAddress, description, install, logo] = args
        await setGame({
          description: description,
          name: name,
          owner: owner,
          install: install,
          logo: logo,
          game_id: Number(gameId),
          contract: contractAddress
        }, env)
        // Hash and sign the response
        let messageHash = ethers.utils.solidityKeccak256(
          ['address', 'address'],
          [owner, contractAddress]
        )
        let messageHashBinary = ethers.utils.arrayify(messageHash)
        const sig = await signer.signMessage(messageHashBinary)
        console.log(sig)
        return [sig]
      },
    },
    {
      type: 'addQuest',
      func: async (args: Result) => {
        console.log(args)
        const [gameId, questId, title, description, nTries] = args;
        await addQuest({
          game_id: gameId,
          quest_id: questId,
          title,
          description,
          n_tries: nTries
        }, env)
        // Hash and sign the response
        let messageHash = ethers.utils.solidityKeccak256(
          ['uint256', 'uint256'],
          [gameId, questId]
        )
        let messageHashBinary = ethers.utils.arrayify(messageHash)
        const sig = await signer.signMessage(messageHashBinary)
        console.log(sig)
        return [sig]
      },
    },
  ])
  return server
}

export function makeApp(privateKey: string, path: string, env: Env) {
  return makeServer(privateKey, env).makeApp(path)
}