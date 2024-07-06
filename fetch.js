const ethers = require('ethers')

// Ethereum smart contract ABIs
const priceFeedABI = [
     {
          inputs: [],
          name: "getLatestPrice",
          outputs: [
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
               {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
];

const bootstrapRegistryABI = [
     {
          inputs: [
               {
                    internalType: "string",
                    name: "contractName",
                    type: "string",
               },
          ],
          name: "getContractAddress",
          outputs: [
               {
                    internalType: "address",
                    name: "",
                    type: "address",
               },
          ],
          stateMutability: "view",
          type: "function",
     },
];

// Function to get the contract address from a bootstrap registry
const getGasPriceContractAddress = async (provider) => {
     const bootstrapRegistryContract = new ethers.Contract(
         '0xDAFEA492D9c6733ae3d56b7Ed1ADB60692c98Bc5',
         bootstrapRegistryABI,
         provider
     );
     return await bootstrapRegistryContract.getContractAddress("pricefeed");
};

// Function to fetch the latest price from the smart contract
const fetchLatestPrice = async () => {
     const provider = new ethers.providers.JsonRpcProvider("https://governors.testnet.redbelly.network/");
     const priceFeedContractAddr = await getGasPriceContractAddress(provider);
     const priceFeedContract = new ethers.Contract(
          priceFeedContractAddr,
          priceFeedABI,
          provider
     );

     try {
          // Returns the latest price (6 Decimal Places) and the timestamp when it was updated
          return await priceFeedContract.getLatestPrice();
     } catch (error) {
          console.error("Error calling contract function:", error);
     }
};

// Calling fetchLatestPrice and logging the result
fetchLatestPrice().then(console.log);