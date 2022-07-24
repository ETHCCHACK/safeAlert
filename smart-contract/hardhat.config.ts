/* eslint-disable prettier/prettier */
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-contract-sizer";
import * as dotenv from "dotenv";
import { allowedNodeEnvironmentFlags } from "process";

// dotenv.config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.9",
    settings: {
      // evmVersion: "constantinople",
      evmVersion: "istanbul",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/6UhsPRKR79e4fSzMo590glSbly-BYewd",
      accounts: {
        mnemonic:
           "glue issue desk want address patrol debate east wild honey fine foil" ,
        path: "m/44'/60'/0'/0",

      },

    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/UAgOPV8is2LnxATN-yWmGWsipaUtPPWp",
      accounts: {
        mnemonic:
           "glue issue desk want address patrol debate east wild honey fine foil" ,
        path: "m/44'/60'/0'/0",
      },
    },
    rinkeby: {
      url: "wss://rinkeby.infura.io/ws/v3/ef954befb42c4882acbe31930a052e9d",
      accounts: {
        mnemonic:
           "glue issue desk want address patrol debate east wild honey fine foil" ,
        path: "m/44'/60'/0'/0",
      },
      gas: 210000,
      gasPrice: 800000000,
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },

  gasReporter: {
    enabled: true,
    currency: "EUR",
    token: "MATIC",
  },

  etherscan: {
    apiKey: "QII8PZIAUI7T8DYMUQIS3R8DXE83JEMH48",
  },
};

export default config;
