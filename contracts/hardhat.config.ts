import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "pegasus",
  networks: {
    hardhat: {
    },
    pegasus: {
      url: "https://replicator.pegasus.lightlink.io/rpc/v1",
      chainId: 1891,
      accounts: {mnemonic: process.env.mnemonic}
    }
  },
};

export default config;
