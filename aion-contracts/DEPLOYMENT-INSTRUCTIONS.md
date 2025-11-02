# 🚀 Smart Contract Deployment Instructions

## Prerequisites

Before deploying, you need:

1. **Polygon Amoy Testnet MATIC**
   - Get free testnet MATIC from: https://faucet.polygon.technology/
   - You'll need at least 0.1 MATIC for deployment

2. **Private Key**
   - Export your MetaMask private key
   - **⚠️ NEVER share or commit your private key!**

3. **PolygonScan API Key** (Optional, for verification)
   - Get from: https://polygonscan.com/apis
   - Free tier is sufficient

## Setup Environment Variables

1. Create `.env` file in `aion-contracts/` folder:

```bash
# Copy from example
cp .env.example .env
```

2. Edit `.env` and add your keys:

```env
# Required for deployment
PRIVATE_KEY=0xyour_private_key_here

# Optional for contract verification
POLYGONSCAN_API_KEY=your_polygonscan_api_key_here

# RPC URL (default is fine)
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology
```

## Deployment Steps

### Step 1: Compile Contract

```bash
cd aion-contracts
npx hardhat compile
```

Expected output:
```
✔ Compiled 1 Solidity file successfully
```

### Step 2: Deploy to Polygon Amoy

```bash
npx hardhat run scripts/deploy-amoy.js --network polygonAmoy
```

Expected output:
```
🚀 Starting deployment to Polygon Amoy...

📝 Deploying contracts with account: 0x...
💰 Account balance: 0.5 MATIC

📦 Deploying AionContract...
✅ AionContract deployed to: 0x...
🔗 View on PolygonScan: https://amoy.polygonscan.com/address/0x...

📊 Token Info:
   Name: AION Token
   Symbol: AION
   Total Supply: 1000000.0 AION
   Owner: 0x...

💾 Deployment info saved to: deployments/polygonAmoy.json
💾 ABI saved to: deployments/AionContract.abi.json

⏳ Waiting for 5 block confirmations...
✅ Confirmed!

🔍 Verifying contract on PolygonScan...
✅ Contract verified successfully!

🎉 DEPLOYMENT SUCCESSFUL!
```

### Step 3: Verify Deployment

1. **Check PolygonScan**
   - Visit: https://amoy.polygonscan.com/address/YOUR_CONTRACT_ADDRESS
   - Verify contract is deployed and verified

2. **Check Deployment Files**
   ```bash
   cat deployments/polygonAmoy.json
   ```

3. **Test Contract**
   ```bash
   npx hardhat console --network polygonAmoy
   ```
   
   Then in console:
   ```javascript
   const AionContract = await ethers.getContractFactory("AionContract");
   const contract = await AionContract.attach("YOUR_CONTRACT_ADDRESS");
   await contract.name(); // Should return "AION Token"
   ```

## Update Frontend

After successful deployment, update the frontend:

1. **Copy Contract Address**
   - From `deployments/polygonAmoy.json`
   - Or from deployment output

2. **Update Frontend Config**
   ```javascript
   // In js/polygon-integration.js or frontend config
   const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";
   ```

3. **Copy ABI**
   - ABI is saved in `deployments/AionContract.abi.json`
   - Update frontend ABI if needed

## Troubleshooting

### Error: "Insufficient funds"
**Solution**: Get more testnet MATIC from https://faucet.polygon.technology/

### Error: "Invalid private key"
**Solution**: 
- Make sure private key starts with `0x`
- Export from MetaMask: Account Details → Export Private Key
- **Never share your private key!**

### Error: "Network not found"
**Solution**: Check `hardhat.config.js` has `polygonAmoy` network configured

### Verification Failed
**Solution**: 
- Add POLYGONSCAN_API_KEY to .env
- Or verify manually at: https://amoy.polygonscan.com/verifyContract

## Security Best Practices

1. ✅ **Never commit .env file**
   - Already in .gitignore
   - Double check before pushing

2. ✅ **Use separate wallet for testnet**
   - Don't use your mainnet wallet
   - Create new wallet for testing

3. ✅ **Verify contract source code**
   - Always verify on PolygonScan
   - Increases trust and transparency

4. ✅ **Test thoroughly on testnet**
   - Test all functions before mainnet
   - Use testnet MATIC, not real funds

## Next Steps After Deployment

1. ✅ Update `WAVE-PROGRESS-CHECKLIST.md`
   - Mark "Deploy smart contract" as complete

2. ✅ Update frontend integration
   - Add contract address
   - Test wallet connection
   - Test battle creation

3. ✅ Write unit tests
   - Test battle logic
   - Test token transfers
   - Test edge cases

4. ✅ Document contract functions
   - Update README
   - Add function descriptions
   - Create user guide

## Useful Links

- **Polygon Amoy Faucet**: https://faucet.polygon.technology/
- **Polygon Amoy Explorer**: https://amoy.polygonscan.com/
- **Hardhat Docs**: https://hardhat.org/docs
- **OpenZeppelin Docs**: https://docs.openzeppelin.com/

## Support

If you encounter issues:
1. Check Hardhat documentation
2. Verify environment variables
3. Check network connectivity
4. Review error messages carefully

---

**Last Updated**: November 2, 2025  
**Network**: Polygon Amoy Testnet (Chain ID: 80002)  
**Status**: Ready for Deployment
