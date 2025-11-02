# 🧪 Testing Pyth Network Integration

## Quick Test

### 1. Open Test Page
```bash
# Start local server
python3 -m http.server 3000

# Open in browser
open http://localhost:3000/test-pyth.html
```

### 2. Test Features

#### ✅ Single Price Test
1. Select asset (e.g., BTC/USD)
2. Click "Get Price"
3. Verify price displays correctly
4. Check console log for success message

#### ✅ Batch Price Test
1. Click "Get All Prices"
2. Verify all 4 prices load
3. Check console for individual price logs

#### ✅ Live Updates Test
1. Click "Start Live Updates"
2. Watch BTC price update every 5 seconds
3. Click "Stop Updates" to pause
4. Verify console shows update logs

## Main App Testing

### 1. Dashboard Test
```bash
# Open main app
open http://localhost:3000/index.html
```

1. Navigate to Dashboard
2. Select "Crypto" category
3. Choose "Bitcoin (BTC)"
4. Watch live price update every 5 seconds
5. Verify "via Pyth Network" attribution

### 2. Battle Modal Test
1. Click "Join Battle"
2. Select "AI vs Human"
3. Choose BTC/USD asset
4. Verify live price displays
5. Check price updates every 2 seconds

### 3. Battle Simulation Test
1. Start a battle with BTC/USD
2. Watch real-time price updates
3. Verify battle uses Pyth prices
4. Check final result calculation

## Console Testing

### Test Pyth Functions
```javascript
// In browser console

// 1. Test initialization
await initPyth()

// 2. Get single price
const btc = await getPythPrice('BTC/USD')
console.log('BTC Price:', btc.price)

// 3. Get multiple prices
const prices = await getPythPrices(['BTC/USD', 'ETH/USD', 'SOL/USD'])
console.log('Prices:', prices)

// 4. Test cache
const cached = await getPriceWithCache('BTC/USD')
console.log('Cached:', cached)

// 5. Check if fresh
console.log('Is fresh?', isPriceFresh('BTC/USD'))

// 6. Clear cache
clearPriceCache()
```

## Expected Results

### ✅ Success Indicators
- Status shows "Connected ✅"
- Prices display with $ symbol
- Console shows green success messages
- Live updates work smoothly
- No error messages in console

### ❌ Failure Indicators
- Status shows "Failed ❌"
- Red error messages in console
- Prices show as "-" or "Loading..."
- Network errors in browser console

## Troubleshooting

### Issue: "Failed to initialize Pyth"
**Solution**: 
- Check internet connection
- Verify Polygon Amoy RPC is accessible
- Try refreshing the page

### Issue: "Price feed not found"
**Solution**:
- Verify asset symbol is correct (e.g., 'BTC/USD' not 'BTCUSD')
- Check supported assets list

### Issue: Prices not updating
**Solution**:
- Check browser console for errors
- Verify Pyth Network is initialized
- Clear cache: `clearPriceCache()`

### Issue: Slow price fetching
**Solution**:
- Use cached prices: `getPriceWithCache()`
- Check RPC connection speed
- Verify network is not rate-limiting

## Performance Benchmarks

### Expected Response Times
- **Cache Hit**: < 1ms
- **Fresh Fetch**: 200-500ms
- **Batch Request**: 500-1000ms
- **Live Update**: 200-500ms per update

### Memory Usage
- **Pyth Integration**: ~2-5 MB
- **Price Cache**: ~1 KB per asset
- **Total Overhead**: < 10 MB

## Network Requirements

### Polygon Amoy Testnet
- **RPC**: https://rpc-amoy.polygon.technology
- **Chain ID**: 80002
- **Pyth Contract**: 0x2880aB155794e7179c9eE2e38200202908C17B43

### Browser Requirements
- Modern browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- MetaMask extension (optional, for wallet features)

## Test Checklist

- [ ] Pyth Network initializes successfully
- [ ] Single price fetch works
- [ ] Batch price fetch works
- [ ] Live updates work
- [ ] Dashboard shows real prices
- [ ] Battle modal shows real prices
- [ ] Battle simulation uses real prices
- [ ] Fallback works when Pyth fails
- [ ] Cache system works correctly
- [ ] No console errors

## Automated Testing (Future)

```javascript
// Test suite example
async function runTests() {
    console.log('🧪 Running Pyth integration tests...');
    
    // Test 1: Initialization
    const initSuccess = await initPyth();
    console.assert(initSuccess, 'Pyth initialization failed');
    
    // Test 2: Single price
    const btcPrice = await getPythPrice('BTC/USD');
    console.assert(btcPrice.price > 0, 'BTC price invalid');
    
    // Test 3: Batch prices
    const prices = await getPythPrices(['BTC/USD', 'ETH/USD']);
    console.assert(Object.keys(prices).length === 2, 'Batch fetch failed');
    
    // Test 4: Cache
    const cached = await getPriceWithCache('BTC/USD');
    console.assert(cached.price === btcPrice.price, 'Cache mismatch');
    
    console.log('✅ All tests passed!');
}
```

## Support

If tests fail:
1. Check browser console for detailed errors
2. Verify network connection
3. Ensure Polygon Amoy RPC is accessible
4. Review PYTH_INTEGRATION.md for troubleshooting

---

**Last Updated**: ${new Date().toISOString()}
