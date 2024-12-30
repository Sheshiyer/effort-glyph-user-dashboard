require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Get environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGON_AMOY_URL = process.env.POLYGON_AMOY_URL;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [PRIVATE_KEY],
      chainId: 137,
      gasPrice: "auto",
      gas: "auto"
    }
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
}
