// Polygon Network Configuration
export const polygonAmoy = {
    chainId: '0x13882', // 80002 in hex
    chainIdDecimal: 80002,
    chainName: 'Polygon Amoy Testnet',
    rpcUrls: ['https://rpc-amoy.polygon.technology'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    blockExplorerUrls: ['https://amoy.polygonscan.com']
};

export const polygonMumbai = {
    chainId: '0x13881', // 80001 in hex
    chainIdDecimal: 80001,
    chainName: 'Polygon Mumbai Testnet',
    rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
};

export const polygonMainnet = {
    chainId: '0x89', // 137 in hex
    chainIdDecimal: 137,
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    blockExplorerUrls: ['https://polygonscan.com']
};

// Default network untuk development
export const DEFAULT_NETWORK = polygonAmoy;
