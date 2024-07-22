import { ethers } from 'hardhat';

async function main() {
    console.log('[ 👾 ] Initializing...');
    // console.log(`[ 👾 ] Deploying to chain: ${(await ethers.provider.getNetwork()).name}`);
    let heartBeat = 120;
    const droplinkedWallet = "0x47a8378243f702143775a0AD75DD629935DA8AFf";
    const droplinkedFee = 100;
    console.log('[ 👾 ] Droplinked fee is set to 100');
    console.log(`[ 👾 ] Starting deployment...`);
    const DropShopDeployer = await ethers.getContractFactory('DropShopDeployer');
    const deployer = await DropShopDeployer.deploy(heartBeat, droplinkedWallet, droplinkedFee);
    console.log('[ ✅ ] Deployer deployed to: ', deployer.address);
    const ProxyPayer = await ethers.getContractFactory('DroplinkedPaymentProxy');
    const proxyPayer = await ProxyPayer.deploy(heartBeat);
    console.log('[ ✅ ] ProxyPayer deployed to: ', proxyPayer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })