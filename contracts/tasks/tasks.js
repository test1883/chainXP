import {ethers} from "ethers"

task("deploy-main", "Deploying ChainXP contract")
  .addParam("gateway", "Gateway URL")
  .addParam("signer", "The signer's address")
  .setAction(async (taskArgs) => {
    const chainXPFactory = new ethers.ContractFactory("ChainXP")
    const chainXP = await chainXPFactory.deploy([taskArgs.gateway], taskArgs.signer)

    console.log(
      `\nWaiting  to be confirmed...`
    )
    await chainXP.waitForDeployment()

    const address = await chainXP.getAddress()

    console.log("\nDeployed ChainXP contract to:", address)
})

task("deploy-token", "Deploying XPToken contract")
  .addParam("chainXP", "Enter ChainXP Contract address")
  .setAction(async (taskArgs) => {
    const xpTokenFactory = new ethers.ContractFactory("XPToken")
    const xpToken = await xpTokenFactory.deploy(taskArgs.chainXP)

    console.log(
      `\nWaiting  to be confirmed...`
    )
    await xpToken.waitForDeployment()

    const address = await xpToken.getAddress()

    console.log("\nDeployed XPToken contract to:", address)
})

