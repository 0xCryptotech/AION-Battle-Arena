# 🚀 AION Smart Contract Deployment Guide

## 📋 Prerequisites

1. **MetaMask Wallet** dengan MATIC testnet
2. **Alchemy Account** untuk RPC endpoint
3. **PolygonScan API Key** untuk verification

## 🔧 Setup Step-by-Step

### 1️⃣ Install Dependencies

```bash
cd aion-contracts
npm install
```

### 2️⃣ Get MATIC Testnet Tokens

1. Buka https://faucet.polygon.technology/
2. Pilih **Mumbai Testnet**
3. Paste wallet address Anda
4. Klik "Submit" untuk mendapatkan test MATIC

### 3️⃣ Setup Alchemy RPC

1. Buka https://www.alchemy.com/
2. Sign up / Login
3. Create New App:
   - Chain: **Polygon**
   - Network: **Polygon Mumbai**
4. Copy **HTTPS URL**

### 4️⃣ Get Private Key dari MetaMask

1. Buka MetaMask
2. Klik 3 dots → Account Details
3. Klik "Export Private Key"
4. Masukkan password
5. **COPY** private key (jangan share!)

### 5️⃣ Setup Environment Variables

Edit file `.env`:

```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ALCHEMY_API_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

⚠️ **PENTING**: Jangan commit file `.env` ke GitHub!

### 6️⃣ Compile Contract

```bash
npm run compile
```

Output yang diharapkan:
```
✓ Compiled 8 Solidity files successfully
```

### 7️⃣ Deploy ke Mumbai Testnet

```bash
npm run deploy:mumbai
```

Output akan seperti:
```
Deploying AION Contract...
Deploying contracts with account: 0xYourAddress
Account balance: 1.5 ETH
AionContract deployed to: 0xABCD1234...

Token Details:
Name: AION Token
Symbol: AION
Total Supply: 1000000 AION
```

### 8️⃣ Copy Contract Address

Dari output di atas, copy address contract:
```
0xABCD1234...
```

### 9️⃣ Update Frontend Environment

Edit `frontend/.env.local`:

```env
REACT_APP_CONTRACT_ADDRESS=0xABCD1234...
REACT_APP_CHAIN_ID=80001
REACT_APP_NETWORK_NAME=Mumbai
```

### 🔟 Copy ABI ke Frontend

ABI sudah otomatis di-copy saat compile. Verify file ada di:
```
frontend/src/abi/AionContract.json
```

## ✅ Verification

### Verify Contract di PolygonScan

1. Get API Key dari https://polygonscan.com/apis
2. Add ke `.env`:
   ```
   POLYGONSCAN_API_KEY=your_key_here
   ```
3. Run verification:
   ```bash
   npx hardhat verify --network mumbai YOUR_CONTRACT_ADDRESS
   ```

### Test Contract

Buka Mumbai PolygonScan:
```
https://mumbai.polygonscan.com/address/YOUR_CONTRACT_ADDRESS
```

## 🎮 Testing Functions

### Create Battle

```javascript
// Di frontend
import { createBattle } from './lib/polygonClient';

const result = await createBattle(provider, "bullish", 10);
console.log("Battle ID:", result.battleId);
```

### Join Battle

```javascript
import { joinBattle } from './lib/polygonClient';

const result = await joinBattle(provider, battleId, "bearish");
console.log("Joined:", result.success);
```

### Get Battle Info

```javascript
import { getBattle } from './lib/polygonClient';

const battle = await getBattle(provider, battleId);
console.log(battle);
```

## 🔄 Deploy ke Network Lain

### Polygon Mainnet

```bash
npm run deploy:polygon
```

### Polygon Amoy (New Testnet)

```bash
npm run deploy:amoy
```

### Ethereum Sepolia

```bash
npm run deploy:sepolia
```

## 📊 Contract Functions

### Market Functions
- `createMarket(title, description, eventDate)` - Create prediction market
- `stake(marketId, amount, prediction)` - Stake on market
- `resolveMarket(marketId, outcome)` - Resolve market (owner only)
- `claimReward(marketId)` - Claim rewards

### Battle Functions
- `createBattle(direction, stakeAmount)` - Create battle
- `joinBattle(battleId, direction)` - Join battle
- `completeBattle(battleId, winner)` - Complete battle (owner only)
- `getBattle(battleId)` - Get battle info
- `cancelBattle(battleId)` - Cancel battle

### Token Functions
- `balanceOf(address)` - Get AION balance
- `transfer(to, amount)` - Transfer AION
- `mint(to, amount)` - Mint AION (owner only)

## 🐛 Troubleshooting

### Error: Insufficient funds
- Pastikan wallet punya cukup MATIC untuk gas
- Get more dari faucet

### Error: Invalid private key
- Pastikan private key dimulai dengan `0x`
- Pastikan tidak ada spasi

### Error: Network not found
- Check RPC URL di `.env`
- Pastikan Alchemy API key valid

### Contract not verified
- Wait 1-2 menit setelah deploy
- Run verify command manual

## 📚 Resources

- [Hardhat Docs](https://hardhat.org/docs)
- [Polygon Mumbai Faucet](https://faucet.polygon.technology/)
- [Alchemy Dashboard](https://dashboard.alchemy.com/)
- [Mumbai Explorer](https://mumbai.polygonscan.com/)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)

## 🔐 Security Notes

- ⚠️ **NEVER** commit `.env` file
- ⚠️ **NEVER** share private key
- ✅ Use separate wallet untuk testing
- ✅ Audit contract sebelum mainnet
- ✅ Test thoroughly di testnet

## 📞 Support

Jika ada masalah:
1. Check error message
2. Verify environment variables
3. Check wallet balance
4. Review transaction di PolygonScan
