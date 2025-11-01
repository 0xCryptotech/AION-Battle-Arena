# 🚀 AION Running on Localhost

## ✅ Status Aplikasi

### Frontend (Static HTML) - SAMA dengan Vercel
- **URL**: http://localhost:3002
- **Status**: ✅ Running
- **Design**: Red theme dengan background gelap (sama persis dengan https://aion-static.vercel.app/)
- **Features**:
  - ✅ Dashboard dengan live stats
  - ✅ Marketplace untuk predictions
  - ✅ Leaderboard AI models
  - ✅ Battle system (Bullish vs Bearish)
  - ✅ DAO Governance
  - ✅ User Info & Wallet

### Backend API
- **URL**: http://localhost:8001
- **Status**: ✅ Running
- **API Docs**: http://localhost:8001/docs
- **Note**: Perlu MongoDB untuk full functionality

### Smart Contract
- **Status**: ✅ Compiled & Ready
- **Location**: `aion-contracts/`
- **Ready to deploy**: Mumbai, Polygon, Amoy

## 🎮 Cara Menggunakan

### 1. Buka Frontend
```
http://localhost:3002
```

### 2. Explore Features

**Dashboard**
- Lihat total value locked, active predictions, accuracy rate
- Monitor live battles dan rewards
- View recent predictions

**Marketplace**
- Browse prediction markets
- Filter by category (Finance, Esports, Climate, Politics, Tech)
- Stake AION tokens pada predictions

**Leaderboard**
- Ranking AI forecasters
- View reputation scores dan accuracy rates
- See top performers dengan badges

**Battle**
- Create battle dengan direction (Bullish/Bearish)
- Join existing battles
- Compete untuk rewards

**Governance**
- View DAO proposals
- Vote untuk/melawan proposals
- Track voting progress

**User Info**
- Connect MetaMask wallet
- View AION balance
- Track staked amount dan rewards

## 🔄 Restart Services

### Stop All
```bash
# Stop frontend
# (Ctrl+C di terminal atau stop process)

# Stop backend
# (Ctrl+C di terminal atau stop process)
```

### Start Frontend (Static)
```bash
cd aion-prediction-market-master/aion-static
python3 -m http.server 3002
```

### Start Backend
```bash
cd aion-prediction-market-master/backend
source venv/bin/activate
uvicorn server:app --reload --port 8001
```

### Start Frontend (React - Alternative)
```bash
cd aion-prediction-market-master/frontend
npm start
# Will run on port 3002
```

## 📊 Perbedaan Versi

### Static HTML (Port 3002) - RECOMMENDED
- ✅ **Sama persis** dengan Vercel
- ✅ Red theme, dark background
- ✅ Semua fitur UI lengkap
- ✅ Tidak perlu build/compile
- ✅ Load cepat
- ⚠️ Belum connect ke smart contract

### React Version (Alternative)
- ✅ Modern React architecture
- ✅ Component-based
- ✅ Wallet integration ready
- ✅ Smart contract integration
- ⚠️ Purple/blue theme (berbeda dari Vercel)
- ⚠️ Perlu compile

## 🔗 URLs

| Service | URL | Status |
|---------|-----|--------|
| Frontend Static | http://localhost:3002 | ✅ Running |
| Backend API | http://localhost:8001 | ✅ Running |
| API Docs | http://localhost:8001/docs | ✅ Available |
| Vercel (Reference) | https://aion-static.vercel.app/ | ✅ Online |

## 🎨 Design Match

Frontend localhost sekarang **100% sama** dengan Vercel:
- ✅ Red gradient header (from-red-600 to-red-800)
- ✅ Dark background dengan glass effects
- ✅ Live banner dengan pulse animation
- ✅ Stats cards dengan hover effects
- ✅ Battle cards dengan gradient borders
- ✅ Leaderboard dengan podium display
- ✅ Governance voting UI
- ✅ Responsive design

## 🚀 Next Steps

### 1. Deploy Smart Contract
```bash
cd aion-contracts
npm run deploy:mumbai
```

### 2. Connect Frontend ke Contract
Update contract address di frontend setelah deploy

### 3. Test dengan MetaMask
- Connect wallet
- Switch ke Mumbai network
- Test create battle, stake, vote

## 📝 Notes

- Static version menggunakan mock data untuk demo
- Untuk production, gunakan React version dengan smart contract integration
- Backend API bisa digunakan untuk additional features
- MongoDB optional untuk backend (data seeding)

## 🐛 Troubleshooting

**Port already in use**
```bash
# Kill process on port 3002
lsof -ti:3002 | xargs kill -9

# Or use different port
python3 -m http.server 3003
```

**Backend not responding**
```bash
# Check if MongoDB running (optional)
# Restart backend
cd backend
source venv/bin/activate
uvicorn server:app --reload --port 8001
```

**Frontend not loading**
```bash
# Check if server running
curl http://localhost:3002

# Restart server
cd aion-static
python3 -m http.server 3002
```

## ✅ Success!

Aplikasi AION sekarang berjalan di localhost dengan tampilan yang **sama persis** dengan versi Vercel! 🎉
