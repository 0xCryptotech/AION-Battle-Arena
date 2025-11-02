const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment to Polygon Amoy...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "MATIC\n");

  if (balance === 0n) {
    console.error("❌ Error: Deployer account has no MATIC!");
    console.log("💡 Get testnet MATIC from: https://faucet.polygon.technology/");
    process.exit(1);
  }

  // Deploy AionContract
  console.log("📦 Deploying AionContract...");
  const AionContract = await hre.ethers.getContractFactory("AionContract");
  const aionContract = await AionContract.deploy();
  
  await aionContract.waitForDeployment();
  const contractAddress = await aionContract.getAddress();
  
  console.log("✅ AionContract deployed to:", contractAddress);
  console.log("🔗 View on PolygonScan:", `https://amoy.polygonscan.com/address/${contractAddress}\n`);

  // Get token info
  const name = await aionContract.name();
  const symbol = await aionContract.symbol();
  const totalSupply = await aionContract.totalSupply();
  
  console.log("📊 Token Info:");
  console.log("   Name:", name);
  console.log("   Symbol:", symbol);
  console.log("   Total Supply:", hre.ethers.formatEther(totalSupply), symbol);
  console.log("   Owner:", deployer.address, "\n");

  // Save deployment info
  const deploymentInfo = {
    network: "polygonAmoy",
    chainId: 80002,
    contractAddress: contractAddress,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    tokenName: name,
    tokenSymbol: symbol,
    totalSupply: hre.ethers.formatEther(totalSupply),
    explorerUrl: `https://amoy.polygonscan.com/address/${contractAddress}`,
    abi: AionContract.interface.formatJson()
  };

  // Save to deployments folder
  const deploymentsDir = path.join(__dirname, "../deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(deploymentsDir, "polygonAmoy.json");
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to:", deploymentFile, "\n");

  // Save ABI separately for frontend
  const abiFile = path.join(deploymentsDir, "AionContract.abi.json");
  fs.writeFileSync(abiFile, AionContract.interface.formatJson());
  console.log("💾 ABI saved to:", abiFile, "\n");

  // Wait for block confirmations before verification
  console.log("⏳ Waiting for 5 block confirmations...");
  await aionContract.deploymentTransaction().wait(5);
  console.log("✅ Confirmed!\n");

  // Verify contract on PolygonScan
  if (process.env.POLYGONSCAN_API_KEY) {
    console.log("🔍 Verifying contract on PolygonScan...");
    try {
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("✅ Contract verified successfully!\n");
    } catch (error) {
      if (error.message.includes("Already Verified")) {
        console.log("✅ Contract already verified!\n");
      } else {
        console.log("⚠️  Verification failed:", error.message, "\n");
        console.log("💡 You can verify manually at:");
        console.log(`   https://amoy.polygonscan.com/address/${contractAddress}#code\n`);
      }
    }
  } else {
    console.log("⚠️  POLYGONSCAN_API_KEY not set, skipping verification");
    console.log("💡 Add POLYGONSCAN_API_KEY to .env to enable auto-verification\n");
  }

  // Summary
  console.log("=" .repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=" .repeat(60));
  console.log("\n📋 Summary:");
  console.log("   Contract Address:", contractAddress);
  console.log("   Network: Polygon Amoy Testnet");
  console.log("   Chain ID: 80002");
  console.log("   Explorer:", `https://amoy.polygonscan.com/address/${contractAddress}`);
  console.log("\n📝 Next Steps:");
  console.log("   1. Update frontend with contract address");
  console.log("   2. Get testnet MATIC from faucet if needed");
  console.log("   3. Test contract functions");
  console.log("   4. Update documentation");
  console.log("\n💡 Useful Commands:");
  console.log("   - Get MATIC: https://faucet.polygon.technology/");
  console.log("   - View contract: https://amoy.polygonscan.com/address/" + contractAddress);
  console.log("   - Interact: Use frontend or Hardhat console");
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
