// Quick Integration Test Script
// Run this in browser console at http://localhost:3002

async function runIntegrationTest() {
    console.log('🧪 Starting Pyth Network Integration Test...\n');
    
    let passed = 0;
    let failed = 0;
    
    // Test 1: Check if Pyth functions exist
    console.log('Test 1: Checking Pyth functions...');
    if (typeof window.initPyth === 'function' && 
        typeof window.getPythPrice === 'function' &&
        typeof window.formatPythPrice === 'function') {
        console.log('✅ PASS: All Pyth functions exist');
        passed++;
    } else {
        console.log('❌ FAIL: Pyth functions missing');
        failed++;
    }
    
    // Test 2: Initialize Pyth
    console.log('\nTest 2: Initializing Pyth Network...');
    try {
        const initialized = await window.initPyth();
        if (initialized) {
            console.log('✅ PASS: Pyth Network initialized');
            passed++;
        } else {
            console.log('❌ FAIL: Initialization returned false');
            failed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Initialization error:', error.message);
        failed++;
    }
    
    // Test 3: Get single price
    console.log('\nTest 3: Fetching BTC price...');
    try {
        const btcPrice = await window.getPythPrice('BTC/USD');
        if (btcPrice && btcPrice.price > 0) {
            console.log(`✅ PASS: BTC Price: $${btcPrice.price.toFixed(2)}`);
            console.log(`   Confidence: ±$${btcPrice.confidence.toFixed(2)}`);
            console.log(`   Updated: ${new Date(btcPrice.publishTime * 1000).toLocaleString()}`);
            passed++;
        } else {
            console.log('❌ FAIL: Invalid price data');
            failed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Price fetch error:', error.message);
        failed++;
    }
    
    // Test 4: Format price
    console.log('\nTest 4: Testing price formatting...');
    try {
        const formatted = window.formatPythPrice(95234.567, 2);
        if (formatted === '95,234.57') {
            console.log('✅ PASS: Price formatting works');
            passed++;
        } else {
            console.log('❌ FAIL: Incorrect format:', formatted);
            failed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Formatting error:', error.message);
        failed++;
    }
    
    // Test 5: Check supported feeds
    console.log('\nTest 5: Checking supported price feeds...');
    try {
        const feeds = window.getAvailablePriceFeeds();
        if (feeds && feeds.length >= 8) {
            console.log(`✅ PASS: ${feeds.length} price feeds available`);
            console.log('   Feeds:', feeds.join(', '));
            passed++;
        } else {
            console.log('❌ FAIL: Insufficient price feeds');
            failed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Feed check error:', error.message);
        failed++;
    }
    
    // Test 6: Cache system
    console.log('\nTest 6: Testing cache system...');
    try {
        const cached = await window.getPriceWithCache('BTC/USD');
        const isFresh = window.isPriceFresh('BTC/USD');
        if (cached && isFresh) {
            console.log('✅ PASS: Cache system working');
            console.log(`   Cached price: $${cached.price.toFixed(2)}`);
            passed++;
        } else {
            console.log('❌ FAIL: Cache not working properly');
            failed++;
        }
    } catch (error) {
        console.log('❌ FAIL: Cache error:', error.message);
        failed++;
    }
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(50));
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    console.log('='.repeat(50));
    
    if (failed === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Integration is working perfectly!');
    } else {
        console.log('\n⚠️ Some tests failed. Check errors above.');
    }
    
    return { passed, failed };
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    console.log('📝 Integration test script loaded!');
    console.log('Run: runIntegrationTest()');
}
