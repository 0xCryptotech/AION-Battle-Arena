# 🔗 Integrasi Polygon ke AION Prediction Market

## ✅ Yang Sudah Dibuat

### 1. Smart Contract (Solidity) ✅
- **File**: `aion-contracts/contracts/AionContract.sol`
- **Features**:
  - ERC20 Token (AION)
  - Prediction Markets
  - Battle System (Bullish vs Bearish)
  - Platform Fee 2%
  - Security: ReentrancyGuard, Ownable

### 2. Hardhat Configuration ✅
- **File**: `aion-contracts/hardhat.config.js`
- **Networks**:
  - Polygon Amoy Testnet (chainId: 80002)
  - Polygon Mumbai Testnet (chainId: 80001)
  - Polygon Mainnet (chainId: 137)
  - Local Hardhat Network

### 3. Frontend Integration ✅
- **File**: `aion-static/js/polygon-integration.js`
- **Features**:
  - MetaMask connection
  - Network switching (auto-add Polygon Amoy)
  - Contract interaction (create battle, join battle, stake)
  - Balance tracking (MATIC & AION)
  - Transaction notifications

### 4. Deployment Scripts ✅
- **Deploy**: `aion-contracts/scripts/deploy.js`
- **Update Frontend**: `aion-contracts/scripts/update-frontend.js`
- **Auto-update**: Contract address & ABI otomatis di-update ke frontend

## 🚀 Cara Deploy & Integrasi

### Step 1: Setup Environment

```bash
cd aion-contracts
npm install
```

Edit `.env`:
```env
PRIVATE_KEY=0xYOUR_METAMASK_PRIVATE_KEY
ALCHEMY_API_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology
POLYGONSCAN_API_KEY=your_api_key
```

### Step 2: Get Test MATIC

1. Buka: https://faucet.polygon.technology/
2. Pilih **Polygon Amoy**
3. Paste wallet address
4. Klik "Submit"
5. Tunggu MATIC masuk ke wallet

### Step 3: Compile Contract

```bash
npm run compile
```

Output:
```
✓ Compiled 8 Solidity files successfully
```

### Step 4: Deploy ke Polygon Amoy

```bash
npm run deploy:amoy:full
```

Script ini akan:
1. Deploy contract ke Polygon Amoy
2. Otomatis update frontend dengan contract address
3. Copy ABI ke frontend
4. Generate deployment summary

Output:
```
Deploying AION Contract...
AionContract deployed to: 0xABCD1234...
✅ Frontend updated successfully!
```

### Step 5: Verify Contract (Optional)

```bash
npx hardhat verify --network polygonAmoy YOUR_CONTRACT_ADDRESS
```

### Step 6: Test di Browser

1. Buka: http://localhost:3002
2. Klik "Connect Wallet"
3. MetaMask akan popup
4. Approve connection
5. Network akan auto-switch ke Polygon Amoy
6. Wallet address muncul di header

## 🎮 Cara Menggunakan

### Connect Wallet

```javascript
// Otomatis dipanggil saat klik "Connect Wallet"
await connectWallet();
```

### Create Battle

```javascript
// direction: "bullish" atau "bearish"
// stakeAmount: jumlah AION token
const result = await createBattleOnChain("bullish", 10);
console.log("Battle ID:", result.battleId);
console.log("TX Hash:", result.txHash);
```

### Join Battle

```javascript
const result = await joinBattleOnChain(battleId, "bearish");
console.log("Joined! TX Hash:", result.txHash);
```

### Check Balance

```javascript
// MATIC balance
const maticBalance = await provider.getBalance(userAddress);

// AION balance
const aionBalance = await contract.balanceOf(userAddress);
```

## 📊 Contract Functions

### Battle Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `createBattle` | direction, stakeAmount | Create new battle |
| `joinBattle` | battleId, direction | Join existing battle |
| `getBattle` | battleId | Get battle details |
| `cancelBattle` | battleId | Cancel battle (creator only) |
| `completeBattle` | battleId, winner | Complete battle (owner only) |

### Market Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `createMarket` | title, description, eventDate | Create prediction market |
| `stake` | marketId, amount, prediction | Stake on market |
| `resolveMarket` | marketId, outcome | Resolve market (owner only) |
| `claimReward` | marketId | Claim rewards |

### Token Functions

| Function | Parameters | Description |
|----------|------------|-------------|
| `balanceOf` | address | Get AION balance |
| `transfer` | to, amount | Transfer AION |
| `mint` | to, amount | Mint AION (owner only) |

## 🔄 Update Flow

### Setelah Deploy Baru

```bash
# Deploy dan update frontend sekaligus
npm run deploy:amoy:full
```

### Update Manual (jika perlu)

```bash
# Deploy saja
npm run deploy:amoy

# Update frontend manual
npm run update:frontend
```

## 📁 File Structure

```
aion-prediction-market-master/
├── aion-contracts/
│   ├── contracts/
│   │   └── AionContract.sol          ✅ Smart contract
│   ├── scripts/
│   │   ├── deploy.js                 ✅ Deployment script
│   │   └── update-frontend.js        ✅ Auto-update frontend
│   ├── hardhat.config.js             ✅ Network config
│   ├── .env                          ✅ Private keys
│   └── package.json                  ✅ NPM scripts
├── aion-static/
│   ├── js/
│   │   └── polygon-integration.js    ✅ Web3 integration
│   ├── config/
│   │   ├── network.js                ✅ Network config
│   │   └── contract.js               ✅ Contract config
│   └── index.html                    ✅ Frontend (auto-updated)
└── frontend/
    ├── src/
    │   └── lib/
    │       └── polygonClient.js      ✅ React integration
    └── .env.local                    ✅ Contract address
```

## 🌐 Network Info

### Polygon Amoy Testnet

- **Chain ID**: 80002 (0x13882)
- **RPC URL**: https://rpc-amoy.polygon.technology
- **Explorer**: https://amoy.polygonscan.com
- **Faucet**: https://faucet.polygon.technology
- **Currency**: MATIC

### Polygon Mumbai Testnet (Legacy)

- **Chain ID**: 80001 (0x13881)
- **RPC URL**: https://rpc-mumbai.maticvigil.com
- **Explorer**: https://mumbai.polygonscan.com
- **Faucet**: https://faucet.polygon.technology
- **Currency**: MATIC

### Polygon Mainnet

- **Chain ID**: 137 (0x89)
- **RPC URL**: https://polygon-rpc.com
- **Explorer**: https://polygonscan.com
- **Currency**: MATIC

## 🔐 Security Checklist

### Before Mainnet Deployment

- [ ] Contract audited by professional
- [ ] Tested thoroughly on testnet
- [ ] All functions tested
- [ ] Emergency procedures in place
- [ ] Multi-sig wallet for owner functions
- [ ] Rate limiting implemented
- [ ] Gas optimization done
- [ ] Documentation complete

### Environment Security

- [ ] `.env` in `.gitignore`
- [ ] Private keys never committed
- [ ] Separate wallet for testing
- [ ] API keys secured
- [ ] RPC endpoints reliable

## 🐛 Troubleshooting

### MetaMask Not Detected

```javascript
if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask!');
    window.open('https://metamask.io/download/', '_blank');
}
```

### Wrong Network

```javascript
// Auto-switch to Polygon Amoy
await switchToPolygonAmoy();
```

### Transaction Failed

1. Check MATIC balance (need for gas)
2. Check AION balance (need for stake)
3. Check contract address is correct
4. Check network is Polygon Amoy
5. View transaction on PolygonScan

### Contract Not Deployed

```javascript
if (!isContractDeployed()) {
    console.log('Contract not deployed. Using demo mode.');
    // Show demo data instead
}
```

## 📊 Gas Estimates

| Function | Estimated Gas | Cost (at 30 gwei) |
|----------|---------------|-------------------|
| createBattle | ~150,000 | ~0.0045 MATIC |
| joinBattle | ~100,000 | ~0.003 MATIC |
| createMarket | ~200,000 | ~0.006 MATIC |
| stake | ~120,000 | ~0.0036 MATIC |
| claimReward | ~80,000 | ~0.0024 MATIC |

## 🎯 Testing Checklist

### Frontend Testing

- [ ] Connect wallet works
- [ ] Network switch works
- [ ] Balance display correct
- [ ] Create battle works
- [ ] Join battle works
- [ ] Transaction notifications show
- [ ] Error handling works
- [ ] Responsive design works

### Contract Testing

- [ ] Deploy successful
- [ ] Create battle works
- [ ] Join battle works
- [ ] Complete battle works
- [ ] Create market works
- [ ] Stake works
- [ ] Claim reward works
- [ ] Token transfer works

## 📞 Support Resources

- **Polygon Docs**: https://docs.polygon.technology/
- **Hardhat Docs**: https://hardhat.org/docs
- **Ethers.js Docs**: https://docs.ethers.org/v5/
- **MetaMask Docs**: https://docs.metamask.io/
- **OpenZeppelin**: https://docs.openzeppelin.com/

## ✅ Success Indicators

Integrasi berhasil jika:

1. ✅ Contract deployed ke Polygon Amoy
2. ✅ Frontend bisa connect wallet
3. ✅ Network auto-switch ke Polygon Amoy
4. ✅ Balance MATIC & AION tampil
5. ✅ Create battle berhasil
6. ✅ Join battle berhasil
7. ✅ Transaction muncul di PolygonScan
8. ✅ Notifications tampil dengan benar

## 🎉 Next Steps

1. Deploy contract ke Polygon Amoy
2. Test semua functions
3. Get feedback dari users
4. Optimize gas usage
5. Add more features
6. Prepare for mainnet
7. Get security audit
8. Launch! 🚀
