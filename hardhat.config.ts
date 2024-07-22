import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades"
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-interface-generator";


require("dotenv").config();

const config: HardhatUserConfig = {
  networks: {
    RedbellyTestNet:{
      url: "https://governors.testnet.redbelly.network",
      chainId: 153,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  },
  solidity: {
    version: "0.8.20",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan:{
    apiKey:{
      bscTestnet: (process.env.BINANCE_API_KEY) as string,
      polygonAmoy: (process.env.POLYGON_API_KEY) as string,
    },
    customChains:[
      {
        network: "RedbellyTestNet",
        chainId: 153,
        urls: {
          apiURL: "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://explorer.testnet.redbelly.network"
        },
      }
    ]
  },
};

export default config;
