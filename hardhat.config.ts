import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades"
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-interface-generator";


require("dotenv").config();

const config: HardhatUserConfig = {
  networks: {
    RedbellyDevNet:{
      url: "https://rbn-gcp-australia-southeast2-a-0-rh-v2.devnet.redbelly.network:8545",
      chainId: 152,
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
        network: "RedbellyDevNet",
        chainId: 152,
        urls: {
          apiURL: "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
          browserURL: "https://explorer.devnet.redbelly.network"
        },
      }
    ]
  },
};

export default config;
