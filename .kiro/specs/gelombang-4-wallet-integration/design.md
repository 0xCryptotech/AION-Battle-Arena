# Design Document - Gelombang 4: Wallet & Blockchain Integration

## Overview

This document describes the technical design for implementing Web3 wallet integration in the AION Prediction Market application. The design focuses on using ethers.js v5 for blockchain interactions, supporting MetaMask and WalletConnect providers, and integrating with the Polygon network.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AION Frontend (HTML/JS)                  │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Wallet UI  │───▶│ Wallet State │───▶│  Blockchain  │  │
│  │  Components  │    │   Manager    │    │   Service    │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                    │                    │          │
└─────────┼────────────────────┼────────────────────┼──────────┘
          │                    │                    │
          ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   MetaMask      │  │  WalletConnect  │  │   Ethers.js     │
│   Provider      │  │    Provider     │  │    Library      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
          │                    │                    │
          └────────────────────┴────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Polygon Network    │
                    │  (RPC Endpoints)    │
                    └─────────────────────┘
```

## Components and Interfaces

### 1. Wallet State Manager

**Purpose:** Centralized state management for wallet connection

**State Structure:**
```javascript
const walletState = {
    isConnected: false,
    address: null,
    chainId: null,
    provider: null,
    signer: null,
    balances: {
        matic: '0',
        aion: '0'
    },
    isCorrectNetwork: false
};
```

**Key Functions:**
- `initializeWallet()` - Initialize wallet connection
- `disconnectWallet()` - Clear wallet state
- `updateBalances()` - Fetch and update token balances
- `switchNetwork()` - Request network change
- `getWalletState()` - Return current state

### 2. Blockchain Service

**Purpose:** Handle all blockchain interactions

**Key Functions:**

```javascript
// Connection
async function connectMetaMask()
async function connectWalletConnect()

// Network Management
async function checkNetwork()
async function switchToPolygon()
async function addPolygonNetwork()

// Balance Queries
async function getMaticBalance(address)
async function getAionBalance(address)

// Transaction Utilities
async function estimateGas(transaction)
function formatAddress(address)
function formatBalance(balance, decimals)
```

### 3. UI Components

#### Connect Wallet Modal
```html
<div id="wallet-modal" class="modal">
    <div class="modal-content">
        <h3>Connect Wallet</h3>
        <button onclick="connectMetaMask()">
            <img src="metamask-icon.svg" />
            MetaMask
        </button>
        <button onclick="connectWalletConnect()">
            <img src="walletconnect-icon.svg" />
            WalletConnect
        </button>
    </div>
</div>
```

#### Wallet Display (Header)
```html
<div id="wallet-display">
    <!-- Not Connected -->
    <button id="connect-btn" onclick="showWalletModal()">
        Connect Wallet
    </button>
    
    <!-- Connected -->
    <div id="wallet-info" class="hidden">
        <span id="wallet-address">0x1234...5678</span>
        <div id="wallet-dropdown">
            <div>Balance: <span id="matic-balance">0</span> MATIC</div>
            <div>Balance: <span id="aion-balance">0</span> AION</div>
            <button onclick="disconnectWallet()">Disconnect</button>
        </div>
    </div>
</div>
```

#### Network Warning Banner
```html
<div id="network-warning" class="hidden">
    <span>⚠️ Wrong Network. Please switch to Polygon.</span>
    <button onclick="switchToPolygon()">Switch Network</button>
</div>
```

## Data Models

### Network Configuration

```javascript
const POLYGON_MAINNET = {
    chainId: '0x89', // 137 in hex
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
};

const POLYGON_AMOY = {
    chainId: '0x13882', // 80002 in hex
    chainName: 'Polygon Amoy Testnet',
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    },
    rpcUrls: ['https://rpc-amoy.polygon.technology'],
    blockExplorerUrls: ['https://amoy.polygonscan.com']
};
```

### AION Token Contract

```javascript
const AION_TOKEN_CONFIG = {
    // Will be updated after contract deployment
    address: '0x...', // AION token contract address
    decimals: 18,
    symbol: 'AION',
    abi: [
        // ERC20 standard functions
        'function balanceOf(address owner) view returns (uint256)',
        'function transfer(address to, uint256 amount) returns (bool)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function allowance(address owner, address spender) view returns (uint256)'
    ]
};
```

## Error Handling

### Error Types and Messages

```javascript
const WALLET_ERRORS = {
    NO_PROVIDER: {
        code: 'NO_PROVIDER',
        message: 'No Web3 wallet detected. Please install MetaMask.',
        action: 'Install MetaMask'
    },
    USER_REJECTED: {
        code: 'USER_REJECTED',
        message: 'Connection request was rejected.',
        action: 'Try Again'
    },
    WRONG_NETWORK: {
        code: 'WRONG_NETWORK',
        message: 'Please switch to Polygon network.',
        action: 'Switch Network'
    },
    INSUFFICIENT_FUNDS: {
        code: 'INSUFFICIENT_FUNDS',
        message: 'Insufficient MATIC for gas fees.',
        action: 'Get MATIC'
    },
    NETWORK_ERROR: {
        code: 'NETWORK_ERROR',
        message: 'Network connection error. Please try again.',
        action: 'Retry'
    }
};
```

### Error Handling Flow

```javascript
async function handleWalletError(error) {
    console.error('Wallet Error:', error);
    
    let errorInfo = WALLET_ERRORS.NETWORK_ERROR; // default
    
    if (error.code === 4001) {
        errorInfo = WALLET_ERRORS.USER_REJECTED;
    } else if (error.code === -32002) {
        errorInfo = { message: 'Connection request pending. Please check your wallet.' };
    } else if (!window.ethereum) {
        errorInfo = WALLET_ERRORS.NO_PROVIDER;
    }
    
    showToast(errorInfo.message, 'error');
    return errorInfo;
}
```

## Testing Strategy

### Unit Tests
- Test wallet state management functions
- Test address formatting utilities
- Test balance formatting functions
- Test network detection logic

### Integration Tests
- Test MetaMask connection flow
- Test network switching
- Test balance fetching
- Test error handling scenarios

### Manual Testing Checklist
- [ ] Connect with MetaMask on Polygon Mainnet
- [ ] Connect with MetaMask on wrong network
- [ ] Switch network from wrong to Polygon
- [ ] Disconnect wallet
- [ ] Refresh page (should not auto-reconnect)
- [ ] Connect without MetaMask installed
- [ ] Reject connection request
- [ ] Check balance display
- [ ] Test on mobile browser

## Security Considerations

### Best Practices
1. **Never store private keys** - All signing happens in the wallet
2. **Validate addresses** - Use ethers.js `isAddress()` function
3. **Rate limiting** - Limit RPC calls to avoid hitting rate limits
4. **HTTPS only** - All RPC connections must use HTTPS
5. **Input validation** - Validate all user inputs before blockchain calls
6. **Error messages** - Don't expose sensitive information in errors

### Permission Scope
- Request only `eth_accounts` permission
- Never request `eth_sign` (dangerous)
- Use `eth_signTypedData_v4` for structured data signing

## Implementation Notes

### Libraries Required
```html
<!-- Already included in index.html -->
<script src="https://cdn.ethers.io/lib/ethers-5.7.2.umd.min.js"></script>
```

### WalletConnect Setup (Optional for Phase 1)
```html
<!-- Add if implementing WalletConnect -->
<script src="https://unpkg.com/@walletconnect/web3-provider@1.8.0/dist/umd/index.min.js"></script>
```

### Global Variables
```javascript
// Add to existing global scope
let walletProvider = null;
let walletSigner = null;
let walletAddress = null;
let isWalletConnected = false;
```

### Event Listeners
```javascript
// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);
}
```

## Performance Considerations

### Optimization Strategies
1. **Lazy Loading** - Only load WalletConnect when needed
2. **Caching** - Cache balance queries for 10 seconds
3. **Debouncing** - Debounce balance refresh requests
4. **Batch Requests** - Fetch multiple balances in one call when possible

### RPC Rate Limits
- Public RPC: ~100 requests/minute
- Implement exponential backoff for failed requests
- Show loading states during RPC calls

## Future Enhancements (Not in Gelombang 4)
- Multi-wallet support (Coinbase Wallet, Trust Wallet)
- ENS name resolution
- Transaction history
- Gas price optimization
- Wallet analytics
