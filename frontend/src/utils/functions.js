import { ethers } from 'ethers'

import durin_call from './CCIPRead'

export const uploadToIPFS = async (file) => {
    const form = new formData();
    form.append('file', file);

    // let res = await fetch(IPFS_URL, form, {
    //     headers: form.getHeaders(),
    //     auth: {
    //         username: 'Your Project Id',
    //         password: 'Your Project Server Key',
    //     },
    // });
}

export const getProfile = async (address) => {
    const profile = await fetch("hh" + address)
    return profile
}

export const playerLevel = async (ChainXP_abi, gameId) => {
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", ChainXP_abi, signer)
    const level = await contract.playerLevel(gameId)
    return level
}

export const gameQuests = async (ChainXP_abi, gameId) => {
    const quests = await fetch("h" + gameId)
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", ChainXP_abi, signer)
    const questDetails = await contract.gameQuests(gameId)
    return {quests, questDetails}
}

export const ongoingQuests =async (ChainXP_abi, address) => {
    const quests = await fetch("h" + address)
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", ChainXP_abi, signer)
    const questDetails = await contract.ongoingQuests()
    return {quests, questDetails}
}

export const getXPBalance = async (XPToken_abi, signer) => {
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", XPToken_abi, signer)
    const balance = await contract.getBalance()
    return balance
}

export const joinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", ChainXP_abi, signer)
    await contract.joinQuest(userId, gameId, questId)
}

export const rejoinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0xb1Bce02506dA4010a77E788C21655A5B36AE8A41", ChainXP_abi, signer)
    await contract.rejoinQuest(userId, gameId, questId)
}

export const createProfile = async (ChainXP_abi, profile, name, bio, country, socials, links, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0xb1Bce02506dA4010a77E788C21655A5B36AE8A41',
        data: iface.encodeFunctionData('createProfile', [
          profile,
          name,
          bio,
          country,
          socials,
          links
        ]),
      })
}

export const createGame = async (ChainXP_abi, name, contractAddress, description, install, logo, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0xb1Bce02506dA4010a77E788C21655A5B36AE8A41',
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
        to: '0xb1Bce02506dA4010a77E788C21655A5B36AE8A41',
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
