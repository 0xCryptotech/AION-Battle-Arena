# 🔮 Pyth Network Integration Guide

## Overview

AION Battle Arena now integrates **Pyth Network** for real-time on-chain price feeds. This replaces simulated prices with actual blockchain oracle data for crypto assets.

## Features

✅ **Real-time Price Feeds** - Live crypto prices from Pyth Network  
✅ **On-Chain Verification** - All prices cryptographically verified  
✅ **Low Latency** - Sub-second price updates  
✅ **Multi-Asset Support** - BTC, ETH, SOL, MATIC, BNB, ADA, AVAX, DOT  
✅ **Price Caching** - Reduces RPC calls with 60-second cache  
✅ **Confidence Intervals** - Price accuracy metrics included  

## Supported Assets

| Asset | Symbol | Price Feed ID |
|-------|--------|---------------|
| Bitcoin | BTC/USD | 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43 |
| Ethereum | ETH/USD | 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace |
| Solana | SOL/USD | 0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d |
| Polygon | MATIC/USD | 0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52 |
| BNB | BNB/USD | 0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f |
| Cardano | ADA/USD | 0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d |
| Avalanche | AVAX/USD | 0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7 |
| Polkadot | DOT/USD | 0xca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b |

## Configuration

### Pyth Contract Address
- **Network**: Polygon Amoy Testnet
- **Contract**: `0x2880aB155794e7179c9eE2e38200202908C17B43`
- **Chain ID**: 80002

## Usage Examples

### 1. Initialize Pyth Network

```javascript
// Initialize Pyth connection
await initPyth();
```

### 2. Get Single Price

```javascript
// Get BTC price
const btcPrice = await getPythPrice('BTC/USD');
console.log(`BTC Price: $${btcPrice.price.toFixed(2)}`);
console.log(`Confidence: ±$${btcPrice.confidence.toFixed(2)}`);
console.log(`Updated: ${new Date(btcPrice.publishTime * 1000).toLocaleString()}`);
```

### 3. Get Multiple Prices

```javascript
// Get multiple prices at once
const prices = await getPythPrices(['BTC/USD', 'ETH/USD', 'SOL/USD']);

for (const [symbol, data] of Object.entries(prices)) {
    if (data) {
        console.log(`${symbol}: $${data.price.toFixed(2)}`);
    }
}
```

### 4. Use Price Cache

```javascript
// Get cached price if fresh (< 60 seconds old)
const cachedPrice = await getPriceWithCache('BTC/USD');
```

### 5. Subscribe to Price Updates

```javascript
// Subscribe to real-time updates (polling every 5 seconds)
const subscriptionId = subscribeToPriceUpdates('BTC/USD', (priceData) => {
    console.log(`New BTC price: $${priceData.price.toFixed(2)}`);
    updateUI(priceData);
}, 5000);

// Unsubscribe when done
unsubscribeFromPriceUpdates(subscriptionId);
```

### 6. Calculate Price Changes

```javascript
const oldPrice = 95000;
const newPrice = 96500;
const change = calculatePriceChange(oldPrice, newPrice);
console.log(`Price change: ${change.toFixed(2)}%`); // +1.58%
```

## Integration with Battle System

### Update Battle Modal with Real Prices

```javascript
// In battle modal setup
async function setupBattleModal() {
    // Initialize Pyth
    await initPyth();
    
    // Get current price
    const priceData = await getPythPrice('BTC/USD');
    
    // Update UI
    document.getElementById('live-price').textContent = 
        `$${formatPythPrice(priceData.price, 2)}`;
    
    // Subscribe to updates during battle
    const subId = subscribeToPriceUpdates('BTC/USD', (data) => {
        document.getElementById('live-price').textContent = 
            `$${formatPythPrice(data.price, 2)}`;
    }, 3000);
    
    // Store subscription ID for cleanup
    window.currentPriceSubscription = subId;
}

// Clean up on modal close
function closeBattleModal() {
    if (window.currentPriceSubscription) {
        unsubscribeFromPriceUpdates(window.currentPriceSubscription);
        window.currentPriceSubscription = null;
    }
}
```

### Battle Outcome Determination

```javascript
async function determineBattleOutcome(battleId, asset, direction) {
    // Get start price
    const startPrice = await getPythPrice(asset);
    
    // Wait for battle duration
    await sleep(battleDuration);
    
    // Get end price
    const endPrice = await getPythPrice(asset);
    
    // Calculate change
    const priceChange = calculatePriceChange(startPrice.price, endPrice.price);
    
    // Determine winner
    let winner;
    if (Math.abs(priceChange) < 0.1) {
        winner = 'DRAW';
    } else if (priceChange > 0 && direction === 'BULLISH') {
        winner = 'PLAYER';
    } else if (priceChange < 0 && direction === 'BEARISH') {
        winner = 'PLAYER';
    } else {
        winner = 'AI';
    }
    
    return {
        winner,
        startPrice: startPrice.price,
        endPrice: endPrice.price,
        priceChange
    };
}
```

## Dashboard Integration

### Live AI Predictions with Real Prices

```javascript
async function updateDashboardPrediction() {
    const asset = getSelectedAsset(); // e.g., 'BTC/USD'
    
    // Get real-time price
    const priceData = await getPriceWithCache(asset);
    
    // Update dashboard display
    document.getElementById('dash-live-price').textContent = 
        `$${formatPythPrice(priceData.price, 2)}`;
    
    // Show Pyth attribution
    document.getElementById('price-source').textContent = 
        'via Pyth Network';
}

// Auto-update every 5 seconds
setInterval(updateDashboardPrediction, 5000);
```

## Error Handling

```javascript
try {
    const price = await getPythPrice('BTC/USD');
    console.log(`Price: $${price.price}`);
} catch (error) {
    console.error('Failed to fetch price:', error);
    
    // Fallback to cached price
    if (isPriceFresh('BTC/USD')) {
        const cached = pythState.priceCache['BTC/USD'];
        console.log('Using cached price:', cached.price);
    } else {
        // Show error to user
        showNotification('Unable to fetch live price', 'error');
    }
}
```

## Utility Functions

### Format Price for Display

```javascript
const price = 95234.567;
const formatted = formatPythPrice(price, 2); // "95,234.57"
```

### Check if Price is Fresh

```javascript
if (isPriceFresh('BTC/USD')) {
    console.log('Price is less than 60 seconds old');
}
```

### Get Available Price Feeds

```javascript
const feeds = getAvailablePriceFeeds();
console.log('Supported assets:', feeds);
// ['BTC/USD', 'ETH/USD', 'SOL/USD', ...]
```

### Check if Symbol is Supported

```javascript
if (isPriceFeedSupported('BTC/USD')) {
    console.log('BTC/USD is supported');
}
```

## Performance Optimization

### 1. Use Price Caching

```javascript
// Instead of always fetching fresh prices
const price = await getPythPrice('BTC/USD'); // Always fetches

// Use cache when possible
const price = await getPriceWithCache('BTC/USD'); // Uses cache if < 60s old
```

### 2. Batch Price Requests

```javascript
// Instead of multiple individual requests
const btc = await getPythPrice('BTC/USD');
const eth = await getPythPrice('ETH/USD');
const sol = await getPythPrice('SOL/USD');

// Batch them together
const prices = await getPythPrices(['BTC/USD', 'ETH/USD', 'SOL/USD']);
```

### 3. Clear Cache When Needed

```javascript
// Clear all cached prices
clearPriceCache();
```

## Testing

### Test Price Fetching

```javascript
// Test single price
async function testPythIntegration() {
    console.log('🔮 Testing Pyth Network integration...');
    
    // Initialize
    const initialized = await initPyth();
    console.log('Initialized:', initialized);
    
    // Get BTC price
    const btcPrice = await getPythPrice('BTC/USD');
    console.log('BTC Price:', btcPrice);
    
    // Get multiple prices
    const prices = await getPythPrices(['BTC/USD', 'ETH/USD', 'SOL/USD']);
    console.log('Multiple prices:', prices);
    
    console.log('✅ Pyth integration test complete!');
}

// Run test
testPythIntegration();
```

## Troubleshooting

### Issue: "Price feed not found"
**Solution**: Check that the asset symbol matches exactly (e.g., 'BTC/USD' not 'BTCUSD')

### Issue: "Failed to initialize Pyth"
**Solution**: Ensure you're connected to Polygon Amoy testnet (Chain ID: 80002)

### Issue: "Stale price data"
**Solution**: Clear cache with `clearPriceCache()` and fetch fresh data

### Issue: "RPC rate limiting"
**Solution**: Use `getPriceWithCache()` instead of `getPythPrice()` to reduce RPC calls

## Next Steps

1. ✅ **Integrate with Battle System** - Replace simulated prices in battles
2. ✅ **Update Dashboard** - Show real-time prices on dashboard
3. 🔄 **Add More Assets** - Expand to stocks, commodities, forex
4. 🔄 **Historical Data** - Store price history for charts
5. 🔄 **Price Alerts** - Notify users of significant price movements

## Resources

- [Pyth Network Documentation](https://docs.pyth.network/)
- [Pyth Price Feeds](https://pyth.network/price-feeds)
- [Polygon Amoy Testnet](https://polygon.technology/blog/introducing-the-amoy-testnet-for-polygon-pos)

---

**Made with ❤️ for AION Battle Arena**
