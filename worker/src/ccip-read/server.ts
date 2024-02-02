import { Server } from '@ensdomains/ccip-read-cf-worker'
import { ethers } from 'ethers/lib/index.js'
import { Result } from 'ethers/lib/utils.js'

import { abi as Gateway_abi } from '../abi/Gateway.json'
import { Env } from '../env'
import { set as setProfile } from '../handlers/functions/profiles/set'

export function makeServer(privateKey: string, env: Env) {
  let signer = new ethers.Wallet(privateKey)
  const server = new Server()
  server.add(Gateway_abi, [
    {
      type: 'createProfile',
      func: async (args: Result) => {
        console.log(args)
        const id = await setProfile({
          user_id: Number(args.userId),
          profile: args.profile,
          owner: args.owner,
          name: args.name,
          bio: args.bio,
          country: args.country,
          socials: JSON.parse(args.socials),
          links: JSON.parse(args.links),
        }, env)
        // Hash and sign the response
        let messageHash = ethers.utils.solidityKeccak256(
          ['address', 'uint256'],
          [args.owner, id]
        )
        let messageHashBinary = ethers.utils.arrayify(messageHash)
        const sig = await signer.signMessage(messageHashBinary)
        console.log(sig)
        return [id, sig]
      },
    }
  ])
  return server
}

export function makeApp(privateKey: string, path: string, env: Env) {
  return makeServer(privateKey, env).makeApp(path)
}