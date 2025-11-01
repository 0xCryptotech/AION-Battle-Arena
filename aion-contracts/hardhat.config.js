require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
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
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    },
    mumbai: {
      url: process.env.ALCHEMY_API_URL_MUMBAI || "https://rpc-mumbai.maticvigil.com",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith('0x') ? [process.env.PRIVATE_KEY] : [],
      chainId: 80001
    },
    polygon: {
      url: process.env.POLYGON_RPC_URL || "https://polygon-rpc.com",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith('0x') ? [process.env.PRIVATE_KEY] : [],
      chainId: 137
    },
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith('0x') ? [process.env.PRIVATE_KEY] : [],
      chainId: 80002
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://rpc.sepolia.org",
      accounts: process.env.PRIVATE_KEY && process.env.PRIVATE_KEY.startsWith('0x') ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      polygonAmoy: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || ""
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
