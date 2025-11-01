// Polygon Integration for AION Static Frontend
// This file handles Web3 connection and smart contract interaction

// Configuration
const POLYGON_AMOY = {
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

// Contract Configuration - UPDATE AFTER DEPLOYMENT
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Update after deploy
const CONTRACT_ABI = []; // TODO: Update with full ABI after compile

// Wallet State Management
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

// Global variables (for backward compatibility)
let provider = null;
let signer = null;
let contract = null;
let userAddress = null;
let isConnected = false;

// ============================================
// WALLET PERSISTENCE UTILITIES (Wave 2)
// ============================================

const STORAGE_KEYS = {
    WALLET_STATE: 'aion_wallet_state',
    WALLET_ADDRESS: 'aion_wallet_address',
    WALLET_CONNECTED: 'aion_wallet_connected',
    LAST_CONNECTED: 'aion_last_connected'
};

/**
 * Save wallet state to localStorage
 * @param {string} address - Wallet address
 */
function saveWalletState(address) {
    try {
        const walletData = {
            address: address,
            connected: true,
            timestamp: Date.now(),
            chainId: walletState.chainId
        };
        
        localStorage.setItem(STORAGE_KEYS.WALLET_STATE, JSON.stringify(walletData));
        localStorage.setItem(STORAGE_KEYS.WALLET_ADDRESS, address);
        localStorage.setItem(STORAGE_KEYS.WALLET_CONNECTED, 'true');
        localStorage.setItem(STORAGE_KEYS.LAST_CONNECTED, Date.now().toString());
        
        console.log('✅ Wallet state saved to localStorage');
    } catch (error) {
        console.error('Error saving wallet state:', error);
    }
}

/**
 * Load wallet state from localStorage
 * @returns {Object|null} Saved wallet data or null
 */
function loadWalletState() {
    try {
        const walletDataStr = localStorage.getItem(STORAGE_KEYS.WALLET_STATE);
        if (!walletDataStr) {
            console.log('No saved wallet state found');
            return null;
        }
        
        const walletData = JSON.parse(walletDataStr);
        
        // Check if data is not too old (24 hours)
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - walletData.timestamp > maxAge) {
            console.log('Saved wallet state expired');
            clearWalletState();
            return null;
        }
        
        console.log('✅ Wallet state loaded from localStorage:', walletData.address);
        return walletData;
    } catch (error) {
        console.error('Error loading wallet state:', error);
        return null;
    }
}

/**
 * Clear wallet state from localStorage
 */
function clearWalletState() {
    try {
        localStorage.removeItem(STORAGE_KEYS.WALLET_STATE);
        localStorage.removeItem(STORAGE_KEYS.WALLET_ADDRESS);
        localStorage.removeItem(STORAGE_KEYS.WALLET_CONNECTED);
        localStorage.removeItem(STORAGE_KEYS.LAST_CONNECTED);
        
        console.log('✅ Wallet state cleared from localStorage');
    } catch (error) {
        console.error('Error clearing wallet state:', error);
    }
}

/**
 * Check if wallet was previously connected
 * @returns {boolean}
 */
function wasWalletConnected() {
    const connected = localStorage.getItem(STORAGE_KEYS.WALLET_CONNECTED);
    return connected === 'true';
}

/**
 * Attempt to auto-reconnect wallet on page load
 * @returns {Promise<boolean>} True if reconnection successful
 */
async function attemptAutoReconnect() {
    console.log('🔄 Attempting auto-reconnect...');
    
    // Check if wallet was previously connected
    if (!wasWalletConnected()) {
        console.log('No previous connection found');
        return false;
    }
    
    // Load saved wallet state
    const savedState = loadWalletState();
    if (!savedState) {
        console.log('No valid saved state');
        return false;
    }
    
    try {
        // Initialize Web3
        if (!await initWeb3()) {
            console.log('Failed to initialize Web3');
            clearWalletState();
            return false;
        }
        
        // Get current accounts from MetaMask
        const accounts = await provider.send("eth_accounts", []);
        
        if (accounts.length === 0) {
            console.log('No accounts found in MetaMask');
            clearWalletState();
            return false;
        }
        
        // Check if saved address matches current account
        const currentAddress = accounts[0];
        if (currentAddress.toLowerCase() !== savedState.address.toLowerCase()) {
            console.log('Saved address does not match current account');
            clearWalletState();
            return false;
        }
        
        // Reconnect wallet
        signer = provider.getSigner();
        userAddress = currentAddress;
        
        // Update wallet state
        walletState.address = userAddress;
        walletState.signer = signer;
        walletState.isConnected = true;
        
        // Check network
        const network = await provider.getNetwork();
        walletState.chainId = network.chainId;
        
        if (!checkNetwork()) {
            showNetworkWarning();
        } else {
            hideNetworkWarning();
        }
        
        // Update backward compatibility variables
        isConnected = true;
        
        // Update UI
        updateWalletUI();
        
        // Get balances
        await updateBalances();
        
        console.log('✅ Auto-reconnect successful!');
        showNotification('Wallet reconnected automatically', 'success');
        
        return true;
        
    } catch (error) {
        console.error('Auto-reconnect failed:', error);
        clearWalletState();
        return false;
    }
}

// Initialize Web3
async function initWeb3() {
    if (typeof window.ethereum === 'undefined') {
        showNotification('Please install MetaMask!', 'error');
        return false;
    }
    
    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        walletState.provider = provider;
        return true;
    } catch (error) {
        console.error('Error initializing Web3:', error);
        return false;
    }
}

/**
 * Initialize wallet state
 * Sets up the wallet state object with default values
 */
function initializeWallet() {
    walletState.isConnected = false;
    walletState.address = null;
    walletState.chainId = null;
    walletState.provider = null;
    walletState.signer = null;
    walletState.balances = {
        matic: '0',
        aion: '0'
    };
    walletState.isCorrectNetwork = false;
}

/**
 * Get current wallet state
 * @returns {Object} Current wallet state
 */
function getWalletState() {
    return { ...walletState };
}

/**
 * Connect Wallet Function
 * Connects to MetaMask wallet and updates wallet state
 */
async function connectWallet() {
    try {
        // Show loading indicator
        showLoading('Connecting wallet...');
        
        // Initialize Web3
        if (!await initWeb3()) {
            hideLoading();
            return;
        }
        
        // Request account access
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAddress = await signer.getAddress();
        
        // Update wallet state
        walletState.address = userAddress;
        walletState.signer = signer;
        walletState.isConnected = true;
        
        // Check network
        const network = await provider.getNetwork();
        walletState.chainId = network.chainId;
        
        // Check if network is correct and update state
        if (!checkNetwork()) {
            showNetworkWarning();
        } else {
            hideNetworkWarning();
        }
        
        // Update backward compatibility variables
        isConnected = true;
        
        // Update UI
        updateWalletUI();
        
        // Get balances
        await updateBalances();
        
        // Save wallet state to localStorage (Wave 2)
        saveWalletState(userAddress);
        
        // Hide loading and show success
        hideLoading();
        showNotification('Wallet connected successfully!', 'success');
        
    } catch (error) {
        // Hide loading on error
        hideLoading();
        
        // Handle specific errors using comprehensive error handler
        handleWalletError(error);
    }
}

// Switch to Polygon Amoy Network
async function switchToPolygonAmoy() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: POLYGON_AMOY.chainId }],
        });
    } catch (switchError) {
        // Network not added, add it
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [POLYGON_AMOY],
                });
            } catch (addError) {
                throw new Error('Failed to add Polygon Amoy network');
            }
        } else {
            throw switchError;
        }
    }
}

/**
 * Disconnect Wallet
 * Clears wallet state and updates UI
 */
function disconnectWallet() {
    // Clear wallet state from localStorage (Wave 2)
    clearWalletState();
    
    // Clear wallet state
    initializeWallet();
    
    // Clear backward compatibility variables
    provider = null;
    signer = null;
    contract = null;
    userAddress = null;
    isConnected = false;
    
    // Update UI
    updateWalletUI();
    
    showNotification('Wallet disconnected', 'info');
}

/**
 * Update Wallet UI
 * Updates the wallet button and display based on connection status
 */
function updateWalletUI() {
    const walletBtn = document.getElementById('connectWallet');
    const walletText = document.getElementById('walletText');
    
    if (walletState.isConnected && walletState.address) {
        const shortAddress = formatAddress(walletState.address);
        walletText.textContent = shortAddress;
        walletBtn.classList.add('connected');
    } else {
        walletText.textContent = 'Connect Wallet';
        walletBtn.classList.remove('connected');
    }
}

/**
 * Format wallet address for display
 * @param {string} address - Full wallet address
 * @returns {string} Shortened address (0x1234...5678)
 */
function formatAddress(address) {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Update Balances
 * Fetches and updates MATIC and AION balances
 */
async function updateBalances() {
    if (!walletState.isConnected || !walletState.address) return;
    
    try {
        // Get MATIC balance
        const maticBalance = await walletState.provider.getBalance(walletState.address);
        const maticFormatted = ethers.utils.formatEther(maticBalance);
        walletState.balances.matic = maticFormatted;
        
        // Update UI
        const balanceElements = document.querySelectorAll('.user-matic-balance');
        balanceElements.forEach(el => {
            el.textContent = formatBalance(maticFormatted, 4) + ' MATIC';
        });
        
        // Get AION balance if contract deployed
        if (isContractDeployed()) {
            await updateAionBalance();
        }
        
    } catch (error) {
        console.error('Error updating balances:', error);
        showNotification('Failed to fetch balances', 'error');
    }
}

/**
 * Format balance for display
 * @param {string|number} balance - Balance value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted balance with thousand separators
 */
function formatBalance(balance, decimals = 2) {
    const num = parseFloat(balance);
    if (isNaN(num)) return '0.00';
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

/**
 * Validate Ethereum Address
 * @param {string} address - Address to validate
 * @returns {boolean} True if valid Ethereum address
 */
function validateAddress(address) {
    try {
        return ethers.utils.isAddress(address);
    } catch (error) {
        console.error('Error validating address:', error);
        return false;
    }
}

/**
 * Update AION Token Balance
 * Fetches AION token balance from smart contract
 */
async function updateAionBalance() {
    try {
        const contract = await getContract();
        const balance = await contract.balanceOf(walletState.address);
        const formatted = ethers.utils.formatEther(balance);
        walletState.balances.aion = formatted;
        
        // Update UI
        const aionElements = document.querySelectorAll('.user-aion-balance');
        aionElements.forEach(el => {
            el.textContent = formatBalance(formatted, 2) + ' AION';
        });
        
    } catch (error) {
        console.error('Error getting AION balance:', error);
    }
}

// Get Contract Instance
async function getContract() {
    if (!isContractDeployed()) {
        throw new Error('Contract not deployed. Please deploy contract first.');
    }
    
    if (!signer) {
        await connectWallet();
    }
    
    if (!contract) {
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    }
    
    return contract;
}

// Check if Contract Deployed
function isContractDeployed() {
    return CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000' && CONTRACT_ABI.length > 0;
}

// Create Battle
async function createBattleOnChain(direction, stakeAmount) {
    if (!isContractDeployed()) {
        showNotification('Contract not deployed yet. Using demo mode.', 'warning');
        return { success: false, demo: true };
    }
    
    try {
        showLoading('Creating battle...');
        showNotification('Creating battle on Polygon...', 'info');
        
        const contract = await getContract();
        const amount = ethers.utils.parseEther(stakeAmount.toString());
        
        const tx = await contract.createBattle(direction, amount);
        showLoading('Waiting for confirmation...');
        showNotification('Transaction submitted. Waiting for confirmation...', 'info');
        
        const receipt = await tx.wait();
        
        // Get battle ID from event
        const event = receipt.events?.find(e => e.event === 'BattleCreated');
        const battleId = event?.args?.id?.toString();
        
        hideLoading();
        showNotification(`Battle created! ID: ${battleId}`, 'success');
        
        // Refresh balances after transaction
        refreshBalances();
        
        return {
            success: true,
            battleId: battleId,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        hideLoading();
        console.error('Error creating battle:', error);
        handleWalletError(error);
        return { success: false, error: error.message };
    }
}

// Join Battle
async function joinBattleOnChain(battleId, direction) {
    if (!isContractDeployed()) {
        showNotification('Contract not deployed yet. Using demo mode.', 'warning');
        return { success: false, demo: true };
    }
    
    try {
        showLoading('Joining battle...');
        showNotification('Joining battle on Polygon...', 'info');
        
        const contract = await getContract();
        const tx = await contract.joinBattle(battleId, direction);
        
        showLoading('Waiting for confirmation...');
        showNotification('Transaction submitted. Waiting for confirmation...', 'info');
        const receipt = await tx.wait();
        
        hideLoading();
        showNotification('Successfully joined battle!', 'success');
        
        // Refresh balances after transaction
        refreshBalances();
        
        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        hideLoading();
        console.error('Error joining battle:', error);
        handleWalletError(error);
        return { success: false, error: error.message };
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg animate-slide-in ${
        type === 'success' ? 'bg-green-600' :
        type === 'error' ? 'bg-red-600' :
        type === 'warning' ? 'bg-yellow-600' :
        'bg-blue-600'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('animate-slide-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Listen for account changes
if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // User disconnected
            isConnected = false;
            userAddress = null;
            updateWalletUI();
            showNotification('Wallet disconnected', 'info');
        } else {
            // Account changed
            userAddress = accounts[0];
            updateWalletUI();
            updateBalances();
            showNotification('Account changed', 'info');
        }
    });
    
    window.ethereum.on('chainChanged', () => {
        // Reload page on network change
        window.location.reload();
    });
}

// Initialize on page load with auto-reconnect (Wave 2)
window.addEventListener('load', async () => {
    // Initialize Web3 provider if available
    if (window.ethereum) {
        await initWeb3();
        setupEventListeners();
        
        // Attempt auto-reconnect if user was previously connected
        await attemptAutoReconnect();
    }
    
    // Setup UI event listeners
    setupUIEventListeners();
});

// Export functions for global use
window.connectWallet = connectWallet;
window.connectMetaMask = connectMetaMask;
window.disconnectWallet = disconnectWallet;
window.switchToPolygon = switchToPolygon;
window.checkNetwork = checkNetwork;
window.getMaticBalance = getMaticBalance;
window.getAionBalance = getAionBalance;
window.updateBalances = updateBalances;
window.refreshBalances = refreshBalances;
window.showWalletModal = showWalletModal;
window.closeWalletModal = closeWalletModal;
window.toggleWalletDropdown = toggleWalletDropdown;
window.showComingSoon = showComingSoon;
window.handleWalletError = handleWalletError;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.createBattleOnChain = createBattleOnChain;
window.joinBattleOnChain = joinBattleOnChain;
window.isWalletConnected = () => walletState.isConnected;
window.getUserAddress = () => walletState.address;
window.getWalletState = getWalletState;
window.initializeWallet = initializeWallet;
window.formatAddress = formatAddress;
window.formatBalance = formatBalance;
window.validateAddress = validateAddress;
window.showNetworkWarning = showNetworkWarning;
window.hideNetworkWarning = hideNetworkWarning;
