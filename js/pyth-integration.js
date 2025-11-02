// Pyth Network Integration for AION Battle Arena
// Real-time on-chain price feeds for crypto assets

// Pyth Network Configuration for Polygon Amoy Testnet
const PYTH_CONFIG = {
    contractAddress: '0x2880aB155794e7179c9eE2e38200202908C17B43', // Pyth on Polygon Amoy
    rpcUrl: 'https://rpc-amoy.polygon.technology',
    chainId: 80002
};

// Pyth Price Feed IDs (Mainnet IDs - use for reference)
const PYTH_PRICE_FEEDS = {
    'BTC/USD': '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    'ETH/USD': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    'SOL/USD': '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    'MATIC/USD': '0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52',
    'BNB/USD': '0x2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f',
    'ADA/USD': '0x2a01deaec9e51a579277b34b122399984d0bbf57e2458a7e42fecd2829867a0d',
    'AVAX/USD': '0x93da3352f9f1d105fdfe4971cfa80e9dd777bfc5d0f683ebb6e1294b92137bb7',
    'DOT/USD': '0xca3eed9b267293f6595901c734c7525ce8ef49adafe8284606ceb307afa2ca5b'
};

// Pyth Contract ABI (minimal for price reading)
const PYTH_ABI = [
    {
        "inputs": [{"internalType": "bytes32", "name": "id", "type": "bytes32"}],
        "name": "getPriceUnsafe",
        "outputs": [
            {"internalType": "int64", "name": "price", "type": "int64"},
            {"internalType": "uint64", "name": "conf", "type": "uint64"},
            {"internalType": "int32", "name": "expo", "type": "int32"},
            {"internalType": "uint256", "name": "publishTime", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "bytes32", "name": "id", "type": "bytes32"}],
        "name": "getPrice",
        "outputs": [
            {
                "components": [
                    {"internalType": "int64", "name": "price", "type": "int64"},
                    {"internalType": "uint64", "name": "conf", "type": "uint64"},
                    {"internalType": "int32", "name": "expo", "type": "int32"},
                    {"internalType": "uint256", "name": "publishTime", "type": "uint256"}
                ],
                "internalType": "struct PythStructs.Price",
                "name": "price",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Pyth state
const pythState = {
    contract: null,
    provider: null,
    isInitialized: false,
    priceCache: {},
    lastUpdate: {}
};

/**
 * Initialize Pyth Network connection
 * @returns {Promise<boolean>} Success status
 */
async function initPyth() {
    try {
        console.log('🔮 Initializing Pyth Network...');
        
        // Use existing provider or create new one
        if (window.walletState && window.walletState.provider) {
            pythState.provider = window.walletState.provider;
        } else {
            pythState.provider = new ethers.providers.JsonRpcProvider(PYTH_CONFIG.rpcUrl);
        }
        
        // Verify provider is working
        await pythState.provider.getNetwork();
        
        // Initialize Pyth contract
        pythState.contract = new ethers.Contract(
            PYTH_CONFIG.contractAddress,
            PYTH_ABI,
            pythState.provider
        );
        
        // Verify contract is accessible
        const code = await pythState.provider.getCode(PYTH_CONFIG.contractAddress);
        if (code === '0x') {
            throw new Error('Pyth contract not found at address');
        }
        
        pythState.isInitialized = true;
        console.log('✅ Pyth Network initialized successfully');
        console.log('   Contract:', PYTH_CONFIG.contractAddress);
        console.log('   Network: Polygon Amoy (80002)');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Pyth:', error);
        pythState.isInitialized = false;
        pythState.contract = null;
        return false;
    }
}

/**
 * Get real-time price from Pyth Network
 * @param {string} symbol - Asset symbol (e.g., 'BTC/USD')
 * @returns {Promise<Object>} Price data
 */
async function getPythPrice(symbol) {
    try {
        if (!pythState.isInitialized || !pythState.contract) {
            const success = await initPyth();
            if (!success || !pythState.contract) {
                throw new Error('Failed to initialize Pyth Network');
            }
        }
        
        const feedId = PYTH_PRICE_FEEDS[symbol];
        if (!feedId) {
            throw new Error(`Price feed not found for ${symbol}`);
        }
        
        // Get price from Pyth contract
        const priceData = await pythState.contract.getPriceUnsafe(feedId);
        
        // Parse price data
        const price = parseFloat(priceData.price.toString());
        const expo = parseInt(priceData.expo.toString());
        const conf = parseFloat(priceData.conf.toString());
        const publishTime = parseInt(priceData.publishTime.toString());
        
        // Calculate actual price
        const actualPrice = price * Math.pow(10, expo);
        const confidence = conf * Math.pow(10, expo);
        
        const result = {
            symbol: symbol,
            price: actualPrice,
            confidence: confidence,
            publishTime: publishTime,
            timestamp: Date.now(),
            source: 'pyth'
        };
        
        // Update cache
        pythState.priceCache[symbol] = result;
        pythState.lastUpdate[symbol] = Date.now();
        
        console.log(`📊 Pyth price for ${symbol}: $${actualPrice.toFixed(2)}`);
        return result;
        
    } catch (error) {
        console.error(`Error fetching Pyth price for ${symbol}:`, error);
        
        // Fallback to cached price if available
        if (pythState.priceCache[symbol]) {
            console.log(`⚠️ Using cached price for ${symbol}`);
            return pythState.priceCache[symbol];
        }
        
        throw error;
    }
}

/**
 * Get multiple prices at once
 * @param {Array<string>} symbols - Array of symbols
 * @returns {Promise<Object>} Object with symbol keys and price data
 */
async function getPythPrices(symbols) {
    const prices = {};
    
    for (const symbol of symbols) {
        try {
            prices[symbol] = await getPythPrice(symbol);
        } catch (error) {
            console.error(`Failed to get price for ${symbol}:`, error);
            prices[symbol] = null;
        }
    }
    
    return prices;
}

/**
 * Check if price data is fresh (less than 60 seconds old)
 * @param {string} symbol - Asset symbol
 * @returns {boolean} True if fresh
 */
function isPriceFresh(symbol) {
    const lastUpdate = pythState.lastUpdate[symbol];
    if (!lastUpdate) return false;
    
    const age = Date.now() - lastUpdate;
    return age < 60000; // 60 seconds
}

/**
 * Get cached price if fresh, otherwise fetch new
 * @param {string} symbol - Asset symbol
 * @returns {Promise<Object>} Price data
 */
async function getPriceWithCache(symbol) {
    if (isPriceFresh(symbol)) {
        console.log(`📦 Using cached price for ${symbol}`);
        return pythState.priceCache[symbol];
    }
    
    return await getPythPrice(symbol);
}

/**
 * Subscribe to price updates (polling-based)
 * @param {string} symbol - Asset symbol
 * @param {Function} callback - Callback function
 * @param {number} interval - Update interval in ms (default 5000)
 * @returns {number} Interval ID
 */
function subscribeToPriceUpdates(symbol, callback, interval = 5000) {
    console.log(`🔔 Subscribing to ${symbol} price updates (${interval}ms)`);
    
    const intervalId = setInterval(async () => {
        try {
            const priceData = await getPythPrice(symbol);
            callback(priceData);
        } catch (error) {
            console.error(`Error in price subscription for ${symbol}:`, error);
        }
    }, interval);
    
    return intervalId;
}

/**
 * Unsubscribe from price updates
 * @param {number} intervalId - Interval ID from subscribe
 */
function unsubscribeFromPriceUpdates(intervalId) {
    clearInterval(intervalId);
    console.log('🔕 Unsubscribed from price updates');
}

/**
 * Format price for display
 * @param {number} price - Price value
 * @param {number} decimals - Decimal places
 * @returns {string} Formatted price
 */
function formatPythPrice(price, decimals = 2) {
    if (!price || isNaN(price)) return '0.00';
    return price.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Get price change percentage
 * @param {number} oldPrice - Previous price
 * @param {number} newPrice - Current price
 * @returns {number} Percentage change
 */
function calculatePriceChange(oldPrice, newPrice) {
    if (!oldPrice || oldPrice === 0) return 0;
    return ((newPrice - oldPrice) / oldPrice) * 100;
}

/**
 * Clear price cache
 */
function clearPriceCache() {
    pythState.priceCache = {};
    pythState.lastUpdate = {};
    console.log('🗑️ Price cache cleared');
}

/**
 * Get all available price feeds
 * @returns {Array<string>} Array of available symbols
 */
function getAvailablePriceFeeds() {
    return Object.keys(PYTH_PRICE_FEEDS);
}

/**
 * Check if symbol is supported
 * @param {string} symbol - Asset symbol
 * @returns {boolean} True if supported
 */
function isPriceFeedSupported(symbol) {
    return symbol in PYTH_PRICE_FEEDS;
}

// Export functions to window
window.initPyth = initPyth;
window.getPythPrice = getPythPrice;
window.getPythPrices = getPythPrices;
window.getPriceWithCache = getPriceWithCache;
window.subscribeToPriceUpdates = subscribeToPriceUpdates;
window.unsubscribeFromPriceUpdates = unsubscribeFromPriceUpdates;
window.formatPythPrice = formatPythPrice;
window.calculatePriceChange = calculatePriceChange;
window.clearPriceCache = clearPriceCache;
window.getAvailablePriceFeeds = getAvailablePriceFeeds;
window.isPriceFeedSupported = isPriceFeedSupported;
window.isPriceFresh = isPriceFresh;

console.log('✅ Pyth integration module loaded');
