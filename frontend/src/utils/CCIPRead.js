import { ethers } from 'ethers'

import ChainXP_abi from '../abi/ChainXP.json'

async function httpcall(urls, to, callData) {
  console.log(to)
  const args = { sender: to.toLowerCase(), data: callData.toLowerCase() }
  for (const url of urls) {
    const queryUrl = url.replace(
      /\{([^}]*)\}/g,
      (match, p1) => args[p1]
    )
    const response = await fetch(queryUrl)
    const result = await response.text()
    if (response.status >= 400 && response.status <= 499) {
      throw new Error(result)
    }
    if (response.status >= 200 && response.status <= 299) {
      return result
    }
  }
}
async function durin_call(
  signer,
  dataObject
) {
  console.log("here")
  const iface = new ethers.utils.Interface(ChainXP_abi.abi)
  console.log(iface.parseError(await signer.call(dataObject)))
  const { sender, urls, callData, callbackFunction, extraData } =
    iface.parseError(await signer.call(dataObject)).args
  console.log(sender)
  const to = await dataObject.to
  if (sender.toLowerCase() !== to?.toLowerCase()) {
    throw new Error('Cannot handle OffchainLookup raised inside nested call')
  }
  console.log(urls)
  const result = await httpcall(urls, to, callData)
  const res = JSON.parse(result).data
  const txn = await signer.sendTransaction({
    to: to,
    data: iface.encodeFunctionData(callbackFunction, [res, extraData]),
    value: await dataObject.value,
  })
}
export default durin_call