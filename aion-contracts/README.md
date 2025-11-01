# AION Smart Contracts

Smart contracts untuk AION Prediction Market platform yang dibangun di atas Polygon.

## 📋 Fitur

- **ERC20 Token (AION)**: Token native untuk staking dan rewards
- **Prediction Markets**: Buat dan kelola prediction markets
- **Staking System**: Stake AION tokens pada prediksi
- **Reward Distribution**: Otomatis distribusi rewards untuk pemenang
- **Platform Fee**: 2% fee untuk sustainability platform

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Edit file `.env` dan isi dengan credentials Anda:

```env
PRIVATE_KEY=your_private_key_here
POLYGON_RPC_URL=https://polygon-rpc.com
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

### 3. Compile Contracts

```bash
npm run compile
```

### 4. Deploy

**Local Network:**
```bash
# Terminal 1: Start local node
npm run node

# Terminal 2: Deploy
npm run deploy:local
```

**Polygon Amoy Testnet:**
```bash
npm run deploy:amoy
```

**Polygon Mainnet:**
```bash
npm run deploy:polygon
```

## 📝 Contract Functions

### Market Management

**createMarket(title, description, eventDate)**
- Membuat prediction market baru
- Returns: marketId

**resolveMarket(marketId, outcome)**
- Resolve market dengan outcome (true/false)
- Only owner

### Staking

**stake(marketId, amount, prediction)**
- Stake AION tokens pada market
- prediction: true (Yes) atau false (No)

**claimReward(marketId)**
- Claim rewards jika prediksi benar
- Otomatis calculate rewards berdasarkan pool

### View Functions

**getMarket(marketId)**
- Get market details

**getUserStake(marketId, userAddress)**
- Get user's stake info

## 🧪 Testing

```bash
npm test
```

## 📊 Contract Structure

```solidity
struct Market {
    uint256 id;
    string title;
    string description;
    uint256 eventDate;
    bool resolved;
    bool outcome;
    uint256 totalStakeYes;
    uint256 totalStakeNo;
    address creator;
    uint256 createdAt;
}

struct Stake {
    uint256 amount;
    bool prediction;
    bool claimed;
}
```

## 🔐 Security Features

- ReentrancyGuard untuk prevent reentrancy attacks
- Ownable untuk admin functions
- Input validation
- Safe math operations

## 📄 License

MIT
