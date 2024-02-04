import { ethers } from 'ethers'

import durin_call from './CCIPRead'

export const uploadToIPFS = async (file) => {
    const form = new FormData();
    form.append('file', file);
    //console.log(process.env.REACT_APP_USERNAME)
    const username = process.env.REACT_APP_USERNAME
    const password = process.env.REACT_APP_PASSWORD
    let res = await fetch("https://rpc.particle.network/ipfs/upload", {
        method: "POST",
        body: form,
        headers: {'Authorization': 'Basic ' + btoa(username+ ':' + password)}
    });
    //console.log(res)
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

export const getGames = async () => {
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/games")
    const games = await response.json()
    return games
}

export const playerLevel = async (ChainXP_abi, gameId, signer) => {
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    const level = await contract.playerLevel(gameId)
    return Number(level)
}

export const playerEarnings = async (ChainXP_abi, gameId, signer) => {
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    const earnings = await contract.earnings(gameId)
    return Number(earnings)
}

export const gameQuests = async (ChainXP_abi, gameId, signer) => {
    const response = await fetch(process.env.REACT_APP_GATEWAY + "/quests/" + gameId)
    const quests = await response.json()
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    const questDetails = await contract.gameQuests(gameId)
    return {quests, questDetails}
}

export const ongoingQuests = async (ChainXP_abi, signer, setState) => {
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    const questDetails = await contract.ongoingQuests()
    let onQuests = [];
    const ongoing = await questDetails[0].map(async quest => {
        //console.log(quest)
        const {quests} = await gameQuests(ChainXP_abi, Number(quest[2]), signer)
        //console.log(quests)
        await quests.map(async (q, key) => {
            if (Number(q.quest_id) === Number(quest[1])) {
                //console.log("here")
                onQuests.push(q)
                //console.log(onQuests)
            }
            if (key === quests.length-1) {
                //console.log("hereeee")
                setState(onQuests)
            }
        })
    })
    return {questDetails}
}

export const getXPBalance = async (XPToken_abi, signer) => {
    const contract = new ethers.Contract("0x9cAbF5455311ADe09e95d37e078349558F9412D9", XPToken_abi, signer)
    const balance = await contract.balanceOf(await signer.getAddress())
    return Number(balance);
}

export const joinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    await contract.joinQuest(userId, gameId, questId)
}

export const rejoinQuest = async (ChainXP_abi, userId, gameId, questId, signer) => {
    const contract = new ethers.Contract("0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c", ChainXP_abi, signer)
    await contract.rejoinQuest(userId, gameId, questId)
}

export const createProfile = async (ChainXP_abi, profile, name, bio, country, signer) => {
    const iface = new ethers.utils.Interface(ChainXP_abi)
    await durin_call(signer, {
        to: '0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c',
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
        to: '0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c',
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
        to: '0x3426A44b0e47BbFB5f5a482737f4f849dB8cd87c',
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
