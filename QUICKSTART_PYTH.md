# ⚡ Pyth Network - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Start Local Server
```bash
cd aion-prediction-market-master
python3 -m http.server 3000
```

### Step 2: Open Test Page
```bash
open http://localhost:3000/test-pyth.html
```

### Step 3: Test Integration
1. Wait for "Connected ✅" status
2. Click "Get Price" button
3. See real BTC price from Pyth Network!

---

## 🎮 Use in Main App

### Open Main App
```bash
open http://localhost:3000/index.html
```

### Test Dashboard
1. Navigate to **Dashboard**
2. Select **Crypto** category
3. Choose **Bitcoin (BTC)**
4. Watch live price update every 5 seconds
5. See "via Pyth Network" label

### Test Battle
1. Click **"Join Battle"**
2. Select **"AI vs Human"**
3. Choose **BTC/USD** asset
4. See live price in modal
5. Start battle and watch real-time prices!

---

## 💻 Console Commands

### Quick Test
```javascript
// Open browser console (F12)

// 1. Get BTC price
await getPythPrice('BTC/USD')

// 2. Get multiple prices
await getPythPrices(['BTC/USD', 'ETH/USD', 'SOL/USD'])

// 3. Check cache
isPriceFresh('BTC/USD')

// 4. Format price
formatPythPrice(95234.56, 2)
```

---

## 📊 Supported Assets

### Crypto (Real Pyth Prices)
- `BTC/USD` - Bitcoin
- `ETH/USD` - Ethereum
- `SOL/USD` - Solana
- `MATIC/USD` - Polygon
- `BNB/USD` - Binance Coin
- `ADA/USD` - Cardano
- `AVAX/USD` - Avalanche
- `DOT/USD` - Polkadot

---

## ✅ Verify Integration

### Check 1: Initialization
```javascript
// Should return true
await initPyth()
```

### Check 2: Price Fetch
```javascript
// Should return price object
const price = await getPythPrice('BTC/USD')
console.log(price.price) // e.g., 95234.56
```

### Check 3: Live Updates
```javascript
// Should update every 5 seconds
subscribeToPriceUpdates('BTC/USD', (data) => {
    console.log('New price:', data.price)
}, 5000)
```

---

## 🐛 Troubleshooting

### Issue: "Failed to initialize"
```bash
# Check internet connection
ping rpc-amoy.polygon.technology

# Refresh page
Cmd/Ctrl + Shift + R
```

### Issue: Prices not showing
```javascript
// Clear cache and retry
clearPriceCache()
await getPythPrice('BTC/USD')
```

### Issue: Slow loading
```javascript
// Use cached prices
await getPriceWithCache('BTC/USD')
```

---

## 📚 Learn More

- **Full Guide**: [PYTH_INTEGRATION.md](./PYTH_INTEGRATION.md)
- **Testing**: [TESTING.md](./TESTING.md)
- **Updates**: [PYTH_UPDATE.md](./PYTH_UPDATE.md)
- **Complete**: [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md)

---

## 🎯 Next Steps

1. ✅ Test with test page
2. ✅ Try in main app
3. ✅ Test console commands
4. ✅ Read full documentation
5. ✅ Start building!

---

**Ready to battle with real prices!** ⚔️🔮

