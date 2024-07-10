import { ethers, upgrades } from 'hardhat';
import type { ContractFactory } from 'ethers';

async function main() {
    console.log('[ 👾 ] Initializing...');
    console.log(`[ 👾 ] Deploying to chain: ${(await ethers.provider.getNetwork()).name}`);
    let heartBeat = 120;
    const droplinkedWallet = "0x47a8378243f702143775a0AD75DD629935DA8AFf";
    const droplinkedFee = 100;
    console.log('[ 👾 ] Droplinked fee is set to 100');
    console.log(`[ 👾 ] Starting deployment...`);
    const DropShopDeployer = await ethers.getContractFactory('DropShopDeployer');
    const deployer = await upgrades.deployProxy(DropShopDeployer as unknown as ContractFactory, [heartBeat, droplinkedWallet, droplinkedFee], { initializer: 'initialize' });
    console.log('[ ✅ ] Deployer deployed to: ', await deployer.getAddress());
    const ProxyPayer = await ethers.getContractFactory('DroplinkedPaymentProxy');
    const proxyPayer = await upgrades.deployProxy(ProxyPayer as unknown as ContractFactory, [heartBeat], { initializer: 'initialize' });
    console.log('[ ✅ ] ProxyPayer deployed to: ', await proxyPayer.getAddress());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })