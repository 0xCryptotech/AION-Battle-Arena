const hre = require("hardhat");

async function main() {
  console.log("Deploying AION Contract...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // Deploy AionContract
  const AionContract = await hre.ethers.getContractFactory("AionContract");
  const aionContract = await AionContract.deploy();

  await aionContract.waitForDeployment();

  const contractAddress = await aionContract.getAddress();
  console.log("AionContract deployed to:", contractAddress);

  // Get token info
  const name = await aionContract.name();
  const symbol = await aionContract.symbol();
  const totalSupply = await aionContract.totalSupply();
  
  console.log("\nToken Details:");
  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Total Supply:", hre.ethers.formatEther(totalSupply), symbol);

  // Save deployment info
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    tokenName: name,
    tokenSymbol: symbol,
    totalSupply: hre.ethers.formatEther(totalSupply)
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("\nDeployment info saved to deployment-info.json");

  // Verify contract on Etherscan (if not localhost)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("\nWaiting for block confirmations...");
    await aionContract.deploymentTransaction().wait(6);
    
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error) {
      console.log("Verification failed:", error.message);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
