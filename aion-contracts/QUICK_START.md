# ⚡ Quick Start - Deploy dalam 5 Menit

## 🎯 Langkah Cepat

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup .env
```bash
# Edit .env file
PRIVATE_KEY=0xYOUR_METAMASK_PRIVATE_KEY
ALCHEMY_API_URL_MUMBAI=https://polygon-mumbai.g.alchemy.com/v2/YOUR_KEY
```

### 3. Get Test MATIC
- Buka: https://faucet.polygon.technology/
- Pilih Mumbai, paste address, submit

### 4. Compile
```bash
npm run compile
```

### 5. Deploy
```bash
npm run deploy:mumbai
```

### 6. Copy Contract Address
Dari output, copy address seperti: `0xABCD1234...`

### 7. Update Frontend
```bash
# Edit frontend/.env.local
REACT_APP_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
```

### 8. Run Frontend
```bash
cd ../frontend
npm start
```

## ✅ Done!

Buka http://localhost:3002 dan connect MetaMask ke Mumbai network.

## 🔗 Links

- Mumbai Faucet: https://faucet.polygon.technology/
- Alchemy: https://www.alchemy.com/
- Mumbai Explorer: https://mumbai.polygonscan.com/
