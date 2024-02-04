import { ethers } from 'ethers'

import durin_call from './CCIPRead'

export const uploadToIPFS = async (file) => {
    const form = new FormData();
    form.append('file', file);
    console.log(process.env.REACT_APP_USERNAME)
    const username = process.env.REACT_APP_USERNAME
    const password = process.env.REACT_APP_PASSWORD
    let res = await fetch("https://rpc.particle.network/ipfs/upload", {
        method: "POST",
        body: form,
        headers: {'Authorization': 'Basic ' + btoa(username+ ':' + password)}
    });
    console.log(res)
    const { cid } = await res.json()
    return cid
}

export const getProfile = async (address) => {
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/get/" + address)
    const profile = await response.json()
    return profile
}

export const getGame = async (address) => {
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/game/" + address)
    const game = await response.json()
    return game
}

export const playerLevel = async (ChainXP_abi, gameId, signer) => {
    const contract = new ethers.Contract("0x610C63e6d6f7bEd8589fe06De840Db46d347A999", ChainXP_abi, signer)
    const level = await contract.playerLevel(gameId)
    return level
}

export const gameQuests = async (ChainXP_abi, gameId, signer) => {
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/quests/" + gameId)
    const quests = await response.json()
    const contract = new ethers.Contract("0x610C63e6d6f7bEd8589fe06De840Db46d347A999", ChainXP_abi, signer)
    const questDetails = await contract.gameQuests(gameId)
    return {quests, questDetails}
}

export const ongoingQuests =async (ChainXP_abi, address, signer) => {
    const contract = new ethers.Contract("0x610C63e6d6f7bEd8589fe06De840Db46d347A999", ChainXP_abi, signer)
    const questDetails = await contract.ongoingQuests()
    const ongoing = await questDetails[0].map(quest => {
        return {
            gameId: quest[1],
            questId: quest[2]
        }
    })
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/ongoing", {
        method: "POST",
        body: JSON.stringify(ongoing)
    })
    const quests = await response.json()
    return {quests, questDetails}
}

export const getXPBalance = async (XPToken_abi, signer) => {
    const contract = new ethers.Contract("0x6494f34662C3c2AaFeE6021B407DF3F4d69e5545", XPToken_abi, signer)
    const balance = await contract.getBalance()
    return balance
}

export const joinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0x610C63e6d6f7bEd8589fe06De840Db46d347A999", ChainXP_abi, signer)
    await contract.joinQuest(userId, gameId, questId)
}

export const rejoinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0x610C63e6d6f7bEd8589fe06De840Db46d347A999", ChainXP_abi, signer)
    await contract.rejoinQuest(userId, gameId, questId)
}

export const createProfile = async (ChainXP_abi, profile, name, bio, country, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0x610C63e6d6f7bEd8589fe06De840Db46d347A999',
        data: iface.encodeFunctionData('createProfile', [
          profile,
          name,
          bio,
          country
        ]),
      })
}

export const createGame = async (ChainXP_abi, name, contractAddress, description, install, logo, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0x610C63e6d6f7bEd8589fe06De840Db46d347A999',
        data: iface.encodeFunctionData('createGame', [
          name,
          contractAddress,
          description,
          install,
          logo
        ]),
      })
}

export const addQuest = async (ChainXP_abi, gameId, title, description, enterFees, requiredLevel, duration, rewards, nTries, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0x610C63e6d6f7bEd8589fe06De840Db46d347A999',
        data: iface.encodeFunctionData('addQuest', [
          gameId,
          title,
          description,
          enterFees,
          requiredLevel,
          duration,
          rewards,
          nTries
        ]),
      })
}
