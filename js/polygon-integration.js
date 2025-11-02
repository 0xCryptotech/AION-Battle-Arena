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

// Contract Configuration - DEPLOYED ON POLYGON AMOY
const CONTRACT_ADDRESS = '0xC4F95BA0038200F2B92043D43f170F895e813C04'; // Deployed Nov 2, 2025
const CONTRACT_ABI = [{"type":"constructor","stateMutability":"undefined","payable":false,"inputs":[]},{"type":"error","name":"ERC20InsufficientAllowance","inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"allowance"},{"type":"uint256","name":"needed"}]},{"type":"error","name":"ERC20InsufficientBalance","inputs":[{"type":"address","name":"sender"},{"type":"uint256","name":"balance"},{"type":"uint256","name":"needed"}]},{"type":"error","name":"ERC20InvalidApprover","inputs":[{"type":"address","name":"approver"}]},{"type":"error","name":"ERC20InvalidReceiver","inputs":[{"type":"address","name":"receiver"}]},{"type":"error","name":"ERC20InvalidSender","inputs":[{"type":"address","name":"sender"}]},{"type":"error","name":"ERC20InvalidSpender","inputs":[{"type":"address","name":"spender"}]},{"type":"error","name":"OwnableInvalidOwner","inputs":[{"type":"address","name":"owner"}]},{"type":"error","name":"OwnableUnauthorizedAccount","inputs":[{"type":"address","name":"account"}]},{"type":"error","name":"ReentrancyGuardReentrantCall","inputs":[]},{"type":"event","anonymous":false,"name":"Approval","inputs":[{"type":"address","name":"owner","indexed":true},{"type":"address","name":"spender","indexed":true},{"type":"uint256","name":"value","indexed":false}]},{"type":"event","anonymous":false,"name":"BattleCompleted","inputs":[{"type":"uint256","name":"id","indexed":true},{"type":"address","name":"winner","indexed":false}]},{"type":"event","anonymous":false,"name":"BattleCreated","inputs":[{"type":"uint256","name":"id","indexed":true},{"type":"address","name":"player1","indexed":false},{"type":"string","name":"direction","indexed":false},{"type":"uint256","name":"stakeAmount","indexed":false}]},{"type":"event","anonymous":false,"name":"BattleJoined","inputs":[{"type":"uint256","name":"id","indexed":true},{"type":"address","name":"player2","indexed":false},{"type":"string","name":"direction","indexed":false}]},{"type":"event","anonymous":false,"name":"MarketCreated","inputs":[{"type":"uint256","name":"marketId","indexed":true},{"type":"string","name":"title","indexed":false},{"type":"address","name":"creator","indexed":false}]},{"type":"event","anonymous":false,"name":"MarketResolved","inputs":[{"type":"uint256","name":"marketId","indexed":true},{"type":"bool","name":"outcome","indexed":false}]},{"type":"event","anonymous":false,"name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","indexed":true},{"type":"address","name":"newOwner","indexed":true}]},{"type":"event","anonymous":false,"name":"RewardClaimed","inputs":[{"type":"uint256","name":"marketId","indexed":true},{"type":"address","name":"staker","indexed":true},{"type":"uint256","name":"reward","indexed":false}]},{"type":"event","anonymous":false,"name":"StakePlaced","inputs":[{"type":"uint256","name":"marketId","indexed":true},{"type":"address","name":"staker","indexed":true},{"type":"uint256","name":"amount","indexed":false},{"type":"bool","name":"prediction","indexed":false}]},{"type":"event","anonymous":false,"name":"Transfer","inputs":[{"type":"address","name":"from","indexed":true},{"type":"address","name":"to","indexed":true},{"type":"uint256","name":"value","indexed":false}]},{"type":"function","name":"PLATFORM_FEE","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"aiModelReputation","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":""}],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"allowance","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"owner"},{"type":"address","name":"spender"}],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"approve","constant":false,"payable":false,"inputs":[{"type":"address","name":"spender"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool","name":""}]},{"type":"function","name":"balanceOf","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"address","name":"account"}],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"battleCount","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"battles","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":""}],"outputs":[{"type":"address","name":"player1"},{"type":"address","name":"player2"},{"type":"string","name":"player1Direction"},{"type":"string","name":"player2Direction"},{"type":"uint256","name":"stakeAmount"},{"type":"bool","name":"isComplete"},{"type":"address","name":"winner"}]},{"type":"function","name":"cancelBattle","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"id"}],"outputs":[]},{"type":"function","name":"claimReward","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"_marketId"}],"outputs":[]},{"type":"function","name":"completeBattle","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"id"},{"type":"address","name":"winner"}],"outputs":[]},{"type":"function","name":"createBattle","constant":false,"payable":false,"inputs":[{"type":"string","name":"direction"},{"type":"uint256","name":"stakeAmount"}],"outputs":[]},{"type":"function","name":"createMarket","constant":false,"payable":false,"inputs":[{"type":"string","name":"_title"},{"type":"string","name":"_description"},{"type":"uint256","name":"_eventDate"}],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"decimals","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint8","name":""}]},{"type":"function","name":"getBattle","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"id"}],"outputs":[{"type":"address","name":"player1"},{"type":"address","name":"player2"},{"type":"string","name":"dir1"},{"type":"string","name":"dir2"},{"type":"uint256","name":"stakeAmount"},{"type":"bool","name":"complete"},{"type":"address","name":"winner"}]},{"type":"function","name":"getMarket","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"_marketId"}],"outputs":[{"type":"tuple","name":"","components":[{"type":"uint256","name":"id"},{"type":"string","name":"title"},{"type":"string","name":"description"},{"type":"uint256","name":"eventDate"},{"type":"bool","name":"resolved"},{"type":"bool","name":"outcome"},{"type":"uint256","name":"totalStakeYes"},{"type":"uint256","name":"totalStakeNo"},{"type":"address","name":"creator"},{"type":"uint256","name":"createdAt"}]}]},{"type":"function","name":"getUserStake","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":"_marketId"},{"type":"address","name":"_user"}],"outputs":[{"type":"tuple","name":"","components":[{"type":"uint256","name":"amount"},{"type":"bool","name":"prediction"},{"type":"bool","name":"claimed"}]}]},{"type":"function","name":"joinBattle","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"id"},{"type":"string","name":"direction"}],"outputs":[]},{"type":"function","name":"marketCounter","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"markets","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":""}],"outputs":[{"type":"uint256","name":"id"},{"type":"string","name":"title"},{"type":"string","name":"description"},{"type":"uint256","name":"eventDate"},{"type":"bool","name":"resolved"},{"type":"bool","name":"outcome"},{"type":"uint256","name":"totalStakeYes"},{"type":"uint256","name":"totalStakeNo"},{"type":"address","name":"creator"},{"type":"uint256","name":"createdAt"}]},{"type":"function","name":"mint","constant":false,"payable":false,"inputs":[{"type":"address","name":"to"},{"type":"uint256","name":"amount"}],"outputs":[]},{"type":"function","name":"name","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string","name":""}]},{"type":"function","name":"owner","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"address","name":""}]},{"type":"function","name":"renounceOwnership","constant":false,"payable":false,"inputs":[],"outputs":[]},{"type":"function","name":"resolveMarket","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"_marketId"},{"type":"bool","name":"_outcome"}],"outputs":[]},{"type":"function","name":"stake","constant":false,"payable":false,"inputs":[{"type":"uint256","name":"_marketId"},{"type":"uint256","name":"_amount"},{"type":"bool","name":"_prediction"}],"outputs":[]},{"type":"function","name":"stakes","constant":true,"stateMutability":"view","payable":false,"inputs":[{"type":"uint256","name":""},{"type":"address","name":""}],"outputs":[{"type":"uint256","name":"amount"},{"type":"bool","name":"prediction"},{"type":"bool","name":"claimed"}]},{"type":"function","name":"symbol","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"string","name":""}]},{"type":"function","name":"totalSupply","constant":true,"stateMutability":"view","payable":false,"inputs":[],"outputs":[{"type":"uint256","name":""}]},{"type":"function","name":"transfer","constant":false,"payable":false,"inputs":[{"type":"address","name":"to"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool","name":""}]},{"type":"function","name":"transferFrom","constant":false,"payable":false,"inputs":[{"type":"address","name":"from"},{"type":"address","name":"to"},{"type":"uint256","name":"value"}],"outputs":[{"type":"bool","name":""}]},{"type":"function","name":"transferOwnership","constant":false,"payable":false,"inputs":[{"type":"address","name":"newOwner"}],"outputs":[]}]

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
    LAST_CONNECTED: 'aion_last_connected',
    ACTIVE_BATTLES: 'aion_active_battles',
    BATTLE_HISTORY: 'aion_battle_history',
    USER_STATS: 'aion_user_stats'
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

// ============================================
// BATTLE SESSION MANAGEMENT (Wave 2)
// ============================================

/**
 * Save battle session to localStorage
 * @param {Object} battleData - Battle session data
 */
function saveBattleSession(battleData) {
    try {
        const activeBattles = loadBattleSessions() || [];
        
        // Check if battle already exists
        const existingIndex = activeBattles.findIndex(b => b.id === battleData.id);
        
        if (existingIndex >= 0) {
            // Update existing battle
            activeBattles[existingIndex] = {
                ...activeBattles[existingIndex],
                ...battleData,
                lastUpdated: Date.now()
            };
        } else {
            // Add new battle
            activeBattles.push({
                ...battleData,
                createdAt: Date.now(),
                lastUpdated: Date.now()
            });
        }
        
        localStorage.setItem(STORAGE_KEYS.ACTIVE_BATTLES, JSON.stringify(activeBattles));
        console.log('✅ Battle session saved:', battleData.id);
    } catch (error) {
        console.error('Error saving battle session:', error);
    }
}

/**
 * Load all active battle sessions from localStorage
 * @returns {Array} Array of battle sessions
 */
function loadBattleSessions() {
    try {
        const battlesStr = localStorage.getItem(STORAGE_KEYS.ACTIVE_BATTLES);
        if (!battlesStr) {
            return [];
        }
        
        const battles = JSON.parse(battlesStr);
        
        // Filter out expired battles (older than 24 hours)
        const maxAge = 24 * 60 * 60 * 1000;
        const validBattles = battles.filter(battle => {
            return (Date.now() - battle.createdAt) < maxAge;
        });
        
        // Update storage if we filtered any battles
        if (validBattles.length !== battles.length) {
            localStorage.setItem(STORAGE_KEYS.ACTIVE_BATTLES, JSON.stringify(validBattles));
        }
        
        console.log(`✅ Loaded ${validBattles.length} active battle sessions`);
        return validBattles;
    } catch (error) {
        console.error('Error loading battle sessions:', error);
        return [];
    }
}

/**
 * Remove battle session from active battles
 * @param {string} battleId - Battle ID to remove
 */
function removeBattleSession(battleId) {
    try {
        const activeBattles = loadBattleSessions();
        const filteredBattles = activeBattles.filter(b => b.id !== battleId);
        
        localStorage.setItem(STORAGE_KEYS.ACTIVE_BATTLES, JSON.stringify(filteredBattles));
        console.log('✅ Battle session removed:', battleId);
    } catch (error) {
        console.error('Error removing battle session:', error);
    }
}

/**
 * Get specific battle session
 * @param {string} battleId - Battle ID
 * @returns {Object|null} Battle session or null
 */
function getBattleSession(battleId) {
    const battles = loadBattleSessions();
    return battles.find(b => b.id === battleId) || null;
}

/**
 * Clear all battle sessions
 */
function clearAllBattleSessions() {
    try {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_BATTLES);
        console.log('✅ All battle sessions cleared');
    } catch (error) {
        console.error('Error clearing battle sessions:', error);
    }
}

/**
 * Move battle to history
 * @param {Object} battleData - Completed battle data
 */
function moveBattleToHistory(battleData) {
    try {
        // Remove from active battles
        removeBattleSession(battleData.id);
        
        // Add to battle history
        const history = loadBattleHistory();
        history.unshift({
            ...battleData,
            completedAt: Date.now()
        });
        
        // Keep only last 100 battles
        const trimmedHistory = history.slice(0, 100);
        
        localStorage.setItem(STORAGE_KEYS.BATTLE_HISTORY, JSON.stringify(trimmedHistory));
        
        // Update player statistics (Wave 2)
        if (battleData.outcome && walletState.address) {
            updatePlayerStats(walletState.address, {
                outcome: battleData.outcome,
                earnings: battleData.earnings || 0,
                stake: battleData.stakeAmount || 0
            });
        }
        
        console.log('✅ Battle moved to history:', battleData.id);
    } catch (error) {
        console.error('Error moving battle to history:', error);
    }
}

/**
 * Load battle history from localStorage
 * @returns {Array} Array of completed battles
 */
function loadBattleHistory() {
    try {
        const historyStr = localStorage.getItem(STORAGE_KEYS.BATTLE_HISTORY);
        if (!historyStr) {
            return [];
        }
        
        return JSON.parse(historyStr);
    } catch (error) {
        console.error('Error loading battle history:', error);
        return [];
    }
}

// ============================================
// PLAYER STATISTICS TRACKING (Wave 2)
// ============================================

/**
 * Initialize player statistics
 * @param {string} address - Player wallet address
 * @returns {Object} Initial stats object
 */
function initializePlayerStats(address) {
    return {
        address: address,
        totalBattles: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winRate: 0,
        totalEarnings: 0,
        totalLosses: 0,
        netProfit: 0,
        currentStreak: 0,
        longestWinStreak: 0,
        longestLoseStreak: 0,
        averageStake: 0,
        lastUpdated: Date.now(),
        createdAt: Date.now()
    };
}

/**
 * Load player statistics from localStorage
 * @param {string} address - Player wallet address
 * @returns {Object} Player statistics
 */
function loadPlayerStats(address) {
    try {
        const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        if (!statsStr) {
            return initializePlayerStats(address);
        }
        
        const allStats = JSON.parse(statsStr);
        const playerStats = allStats[address.toLowerCase()];
        
        if (!playerStats) {
            return initializePlayerStats(address);
        }
        
        return playerStats;
    } catch (error) {
        console.error('Error loading player stats:', error);
        return initializePlayerStats(address);
    }
}

/**
 * Save player statistics to localStorage
 * @param {string} address - Player wallet address
 * @param {Object} stats - Player statistics
 */
function savePlayerStats(address, stats) {
    try {
        const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        const allStats = statsStr ? JSON.parse(statsStr) : {};
        
        allStats[address.toLowerCase()] = {
            ...stats,
            lastUpdated: Date.now()
        };
        
        localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(allStats));
        console.log('✅ Player stats saved for:', address);
    } catch (error) {
        console.error('Error saving player stats:', error);
    }
}

/**
 * Update player statistics after battle
 * @param {string} address - Player wallet address
 * @param {Object} battleResult - Battle result data
 */
function updatePlayerStats(address, battleResult) {
    try {
        const stats = loadPlayerStats(address);
        
        // Update total battles
        stats.totalBattles++;
        
        // Update win/loss/draw
        if (battleResult.outcome === 'WIN') {
            stats.wins++;
            stats.currentStreak = stats.currentStreak >= 0 ? stats.currentStreak + 1 : 1;
            stats.longestWinStreak = Math.max(stats.longestWinStreak, stats.currentStreak);
            stats.totalEarnings += battleResult.earnings || 0;
        } else if (battleResult.outcome === 'LOSS') {
            stats.losses++;
            stats.currentStreak = stats.currentStreak <= 0 ? stats.currentStreak - 1 : -1;
            stats.longestLoseStreak = Math.max(stats.longestLoseStreak, Math.abs(stats.currentStreak));
            stats.totalLosses += battleResult.stake || 0;
        } else if (battleResult.outcome === 'DRAW') {
            stats.draws++;
            stats.currentStreak = 0;
        }
        
        // Calculate win rate
        stats.winRate = stats.totalBattles > 0 ? (stats.wins / stats.totalBattles) * 100 : 0;
        
        // Calculate net profit
        stats.netProfit = stats.totalEarnings - stats.totalLosses;
        
        // Calculate average stake
        const totalStake = (stats.totalEarnings + stats.totalLosses) / 2;
        stats.averageStake = stats.totalBattles > 0 ? totalStake / stats.totalBattles : 0;
        
        // Save updated stats
        savePlayerStats(address, stats);
        
        console.log('✅ Player stats updated:', {
            wins: stats.wins,
            losses: stats.losses,
            winRate: stats.winRate.toFixed(2) + '%',
            netProfit: stats.netProfit
        });
        
        return stats;
    } catch (error) {
        console.error('Error updating player stats:', error);
        return null;
    }
}

/**
 * Get player statistics
 * @param {string} address - Player wallet address (optional, uses current user if not provided)
 * @returns {Object} Player statistics
 */
function getPlayerStats(address = null) {
    const playerAddress = address || walletState.address;
    if (!playerAddress) {
        console.warn('No address provided and no wallet connected');
        return null;
    }
    
    return loadPlayerStats(playerAddress);
}

/**
 * Reset player statistics
 * @param {string} address - Player wallet address
 */
function resetPlayerStats(address) {
    try {
        const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        if (!statsStr) return;
        
        const allStats = JSON.parse(statsStr);
        delete allStats[address.toLowerCase()];
        
        localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(allStats));
        console.log('✅ Player stats reset for:', address);
    } catch (error) {
        console.error('Error resetting player stats:', error);
    }
}

// ============================================
// LEADERBOARD SYSTEM (Wave 2)
// ============================================

/**
 * Get all players from stats
 * @returns {Array} Array of all player stats
 */
function getAllPlayers() {
    try {
        const statsStr = localStorage.getItem(STORAGE_KEYS.USER_STATS);
        if (!statsStr) {
            return [];
        }
        
        const allStats = JSON.parse(statsStr);
        return Object.values(allStats);
    } catch (error) {
        console.error('Error getting all players:', error);
        return [];
    }
}

/**
 * Generate leaderboard rankings
 * @param {string} sortBy - Sort criteria ('earnings', 'winRate', 'wins', 'battles')
 * @param {number} limit - Number of players to return (default 100)
 * @returns {Array} Sorted array of players with rankings
 */
function generateLeaderboard(sortBy = 'netProfit', limit = 100) {
    try {
        const players = getAllPlayers();
        
        if (players.length === 0) {
            return [];
        }
        
        // Sort players based on criteria
        let sortedPlayers = [...players];
        
        switch (sortBy) {
            case 'netProfit':
                sortedPlayers.sort((a, b) => b.netProfit - a.netProfit);
                break;
            case 'winRate':
                sortedPlayers.sort((a, b) => {
                    // Secondary sort by total battles if win rates are equal
                    if (b.winRate === a.winRate) {
                        return b.totalBattles - a.totalBattles;
                    }
                    return b.winRate - a.winRate;
                });
                break;
            case 'wins':
                sortedPlayers.sort((a, b) => b.wins - a.wins);
                break;
            case 'battles':
                sortedPlayers.sort((a, b) => b.totalBattles - a.totalBattles);
                break;
            case 'earnings':
                sortedPlayers.sort((a, b) => b.totalEarnings - a.totalEarnings);
                break;
            default:
                sortedPlayers.sort((a, b) => b.netProfit - a.netProfit);
        }
        
        // Add rankings
        const rankedPlayers = sortedPlayers.slice(0, limit).map((player, index) => ({
            ...player,
            rank: index + 1
        }));
        
        console.log(`✅ Leaderboard generated: ${rankedPlayers.length} players (sorted by ${sortBy})`);
        return rankedPlayers;
    } catch (error) {
        console.error('Error generating leaderboard:', error);
        return [];
    }
}

/**
 * Get player rank on leaderboard
 * @param {string} address - Player wallet address
 * @param {string} sortBy - Sort criteria
 * @returns {Object} Player rank info
 */
function getPlayerRank(address, sortBy = 'netProfit') {
    try {
        const leaderboard = generateLeaderboard(sortBy, 1000); // Get more players for accurate ranking
        const playerIndex = leaderboard.findIndex(p => p.address.toLowerCase() === address.toLowerCase());
        
        if (playerIndex === -1) {
            return {
                rank: null,
                totalPlayers: leaderboard.length,
                percentile: null
            };
        }
        
        const rank = playerIndex + 1;
        const percentile = ((leaderboard.length - rank) / leaderboard.length) * 100;
        
        return {
            rank: rank,
            totalPlayers: leaderboard.length,
            percentile: percentile.toFixed(1)
        };
    } catch (error) {
        console.error('Error getting player rank:', error);
        return null;
    }
}

/**
 * Get top players
 * @param {number} count - Number of top players to return
 * @param {string} sortBy - Sort criteria
 * @returns {Array} Top players
 */
function getTopPlayers(count = 10, sortBy = 'netProfit') {
    return generateLeaderboard(sortBy, count);
}

/**
 * Get leaderboard for specific time period
 * @param {string} period - 'daily', 'weekly', 'monthly', 'allTime'
 * @param {string} sortBy - Sort criteria
 * @param {number} limit - Number of players
 * @returns {Array} Filtered leaderboard
 */
function getLeaderboardByPeriod(period = 'allTime', sortBy = 'netProfit', limit = 100) {
    try {
        const players = getAllPlayers();
        const now = Date.now();
        let cutoffTime;
        
        switch (period) {
            case 'daily':
                cutoffTime = now - (24 * 60 * 60 * 1000); // 24 hours
                break;
            case 'weekly':
                cutoffTime = now - (7 * 24 * 60 * 60 * 1000); // 7 days
                break;
            case 'monthly':
                cutoffTime = now - (30 * 24 * 60 * 60 * 1000); // 30 days
                break;
            case 'allTime':
            default:
                cutoffTime = 0;
        }
        
        // Filter players by time period
        const filteredPlayers = players.filter(player => {
            return player.lastUpdated >= cutoffTime;
        });
        
        // Generate leaderboard from filtered players
        const sortedPlayers = [...filteredPlayers];
        
        switch (sortBy) {
            case 'netProfit':
                sortedPlayers.sort((a, b) => b.netProfit - a.netProfit);
                break;
            case 'winRate':
                sortedPlayers.sort((a, b) => {
                    if (b.winRate === a.winRate) {
                        return b.totalBattles - a.totalBattles;
                    }
                    return b.winRate - a.winRate;
                });
                break;
            case 'wins':
                sortedPlayers.sort((a, b) => b.wins - a.wins);
                break;
            default:
                sortedPlayers.sort((a, b) => b.netProfit - a.netProfit);
        }
        
        const rankedPlayers = sortedPlayers.slice(0, limit).map((player, index) => ({
            ...player,
            rank: index + 1
        }));
        
        console.log(`✅ ${period} leaderboard: ${rankedPlayers.length} players`);
        return rankedPlayers;
    } catch (error) {
        console.error('Error getting leaderboard by period:', error);
        return [];
    }
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
        // Check if already connecting
        if (window.isConnecting) {
            console.log('Connection already in progress');
            return;
        }
        window.isConnecting = true;
        
        // Show loading indicator
        showLoading('Connecting wallet...');
        
        // Initialize Web3
        if (!await initWeb3()) {
            hideLoading();
            window.isConnecting = false;
            return;
        }
        
        // Check and switch network FIRST
        const network = await provider.getNetwork();
        if (network.chainId !== POLYGON_AMOY.chainIdDecimal) {
            showLoading('Switching to Polygon Amoy...');
            try {
                await switchToPolygonAmoy();
            } catch (switchError) {
                hideLoading();
                window.isConnecting = false;
                showNotification('Please switch to Polygon Amoy Testnet manually in MetaMask', 'error');
                return;
            }
        }
        
        // Request account access
        const accounts = await provider.send("eth_requestAccounts", []);
        if (!accounts || accounts.length === 0) {
            throw new Error('No accounts found');
        }
        
        signer = provider.getSigner();
        userAddress = accounts[0];
        
        // Update wallet state
        walletState.address = userAddress;
        walletState.signer = signer;
        walletState.isConnected = true;
        
        // Check network
        
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
        window.isConnecting = false;
        showNotification('Wallet connected successfully!', 'success');
        
    } catch (error) {
        // Hide loading on error
        hideLoading();
        window.isConnecting = false;
        
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

/**
 * Check if user has sufficient AION balance
 * @param {number} amount - Amount to check
 * @returns {Promise<boolean>} True if sufficient balance
 */
async function checkAionBalance(amount) {
    try {
        const contract = await getContract();
        const balance = await contract.balanceOf(walletState.address);
        const required = ethers.utils.parseEther(amount.toString());
        return balance.gte(required);
    } catch (error) {
        console.error('Error checking balance:', error);
        return false;
    }
}

/**
 * Check and request token approval
 * @param {number} amount - Amount to approve
 * @returns {Promise<boolean>} True if approved
 */
async function checkAndApproveTokens(amount) {
    try {
        const contract = await getContract();
        const amountWei = ethers.utils.parseEther(amount.toString());
        
        // Check current allowance
        const allowance = await contract.allowance(walletState.address, CONTRACT_ADDRESS);
        
        if (allowance.gte(amountWei)) {
            console.log('✅ Tokens already approved');
            return true;
        }
        
        // Request approval
        showLoading('Requesting token approval...');
        showNotification('💰 Please approve AION tokens in MetaMask', 'info');
        
        const approveTx = await contract.approve(CONTRACT_ADDRESS, amountWei);
        
        showLoading('Waiting for approval confirmation...');
        await approveTx.wait();
        
        showNotification('✅ Tokens approved successfully!', 'success');
        return true;
        
    } catch (error) {
        console.error('Error approving tokens:', error);
        hideLoading();
        
        if (error.code === 4001) {
            showNotification('Token approval cancelled', 'warning');
        } else {
            showNotification('Failed to approve tokens', 'error');
        }
        return false;
    }
}

// Create Battle
async function createBattleOnChain(direction, stakeAmount, asset, timeframe) {
    if (!isContractDeployed()) {
        showNotification('Contract not deployed yet. Using demo mode.', 'warning');
        return { success: false, demo: true };
    }
    
    try {
        // Check balance first
        showLoading('Checking balance...');
        const hasBalance = await checkAionBalance(stakeAmount);
        
        if (!hasBalance) {
            hideLoading();
            const balance = await getContract().then(c => c.balanceOf(walletState.address)).then(b => ethers.utils.formatEther(b));
            showNotification(`Insufficient AION balance. You have ${parseFloat(balance).toFixed(2)} AION, need ${stakeAmount} AION`, 'error');
            return { success: false, error: 'Insufficient balance' };
        }
        
        // Check and approve tokens
        const approved = await checkAndApproveTokens(stakeAmount);
        if (!approved) {
            return { success: false, error: 'Token approval failed' };
        }
        
        // Create battle
        showLoading('Creating battle on-chain...');
        showNotification('⚔️ Creating battle on Polygon Amoy...', 'info');
        
        const contract = await getContract();
        const amount = ethers.utils.parseEther(stakeAmount.toString());
        
        console.log('📝 Creating battle with params:');
        console.log('  - Direction:', direction);
        console.log('  - Amount:', amount.toString(), 'wei (', stakeAmount, 'AION)');
        console.log('  - Contract:', contract.address);
        console.log('  - User:', walletState.address);
        
        const tx = await contract.createBattle(direction, amount);
        console.log('✅ Transaction sent:', tx.hash);
        
        showLoading('Waiting for confirmation...');
        showNotification('⏳ Waiting for blockchain confirmation...', 'info');
        
        const receipt = await tx.wait();
        
        // Get battle ID from event
        const event = receipt.events?.find(e => e.event === 'BattleCreated');
        const battleId = event?.args?.id?.toString();
        
        hideLoading();
        showNotification(`✅ Battle created on-chain! ID: ${battleId}`, 'success');
        
        // Save battle session
        saveBattleSession({
            id: battleId,
            creator: walletState.address,
            direction: direction,
            stakeAmount: stakeAmount,
            status: 'CREATED',
            txHash: receipt.transactionHash,
            asset: asset,
            timeframe: timeframe,
            startTime: Date.now()
        });
        
        // Refresh balances after transaction
        await refreshBalances();
        
        return {
            success: true,
            battleId: battleId,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        hideLoading();
        console.error('Error creating battle:', error);
        console.error('Error message:', error.message);
        console.error('Error data:', error.data);
        console.error('Error code:', error.code);
        handleWalletError(error);
        return { success: false, error: error.message };
    }
}

// Complete Battle On-Chain
async function completeBattleOnChain(battleId, winner) {
    if (!isContractDeployed()) {
        return { success: false, demo: true };
    }
    
    try {
        showNotification('🏁 Completing battle on-chain...', 'info');
        
        const contract = await getContract();
        const tx = await contract.completeBattle(battleId, winner);
        
        showNotification('⏳ Waiting for confirmation...', 'info');
        const receipt = await tx.wait();
        
        showNotification('✅ Battle completed on-chain!', 'success');
        
        // Refresh balances
        refreshBalances();
        
        return {
            success: true,
            txHash: receipt.transactionHash
        };
    } catch (error) {
        console.error('Error completing battle:', error);
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
        
        // Update battle session (Wave 2)
        const existingBattle = getBattleSession(battleId);
        if (existingBattle) {
            saveBattleSession({
                ...existingBattle,
                opponent: walletState.address,
                status: 'ACTIVE',
                joinedAt: Date.now()
            });
        } else {
            // Save new session if not found
            saveBattleSession({
                id: battleId,
                opponent: walletState.address,
                direction: direction,
                status: 'ACTIVE',
                txHash: receipt.transactionHash,
                joinedAt: Date.now()
            });
        }
        
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
// ============================================
// ENHANCED TOAST NOTIFICATION SYSTEM (Wave 2)
// ============================================

let toastQueue = [];
let maxToasts = 3;

/**
 * Enhanced toast notification with icons and actions
 * @param {string} message - Notification message
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 * @param {Object} options - Additional options
 */
function showNotification(message, type = 'info', options = {}) {
    const {
        duration = 5000,
        dismissible = true,
        action = null,
        icon = null
    } = options;
    
    // Create notification element
    const notification = document.createElement('div');
    const toastId = `toast-${Date.now()}`;
    notification.id = toastId;
    
    // Determine colors and icons
    const typeConfig = {
        success: {
            bg: 'bg-green-600',
            icon: icon || '✓',
            border: 'border-green-500'
        },
        error: {
            bg: 'bg-red-600',
            icon: icon || '✕',
            border: 'border-red-500'
        },
        warning: {
            bg: 'bg-yellow-600',
            icon: icon || '⚠',
            border: 'border-yellow-500'
        },
        info: {
            bg: 'bg-blue-600',
            icon: icon || 'ℹ',
            border: 'border-blue-500'
        }
    };
    
    const config = typeConfig[type] || typeConfig.info;
    
    notification.className = `fixed right-4 z-50 px-4 py-3 rounded-lg shadow-2xl border-l-4 ${config.bg} ${config.border} text-white flex items-center gap-3 min-w-[300px] max-w-[400px] animate-slide-in`;
    
    // Build notification content
    notification.innerHTML = `
        <div class="flex-shrink-0 text-xl font-bold">${config.icon}</div>
        <div class="flex-1 text-sm font-medium">${message}</div>
        ${dismissible ? '<button onclick="window.dismissToast(\'' + toastId + '\')" class="flex-shrink-0 text-white hover:text-gray-200 font-bold text-lg">×</button>' : ''}
    `;
    
    // Position toast based on queue
    const topPosition = 80 + (toastQueue.length * 80);
    notification.style.top = `${topPosition}px`;
    
    document.body.appendChild(notification);
    toastQueue.push(toastId);
    
    // Remove old toasts if exceeding max
    if (toastQueue.length > maxToasts) {
        const oldToastId = toastQueue.shift();
        const oldToast = document.getElementById(oldToastId);
        if (oldToast) {
            dismissToast(oldToastId);
        }
    }
    
    // Auto-dismiss after duration
    if (duration > 0) {
        setTimeout(() => {
            dismissToast(toastId);
        }, duration);
    }
    
    return toastId;
}

/**
 * Dismiss specific toast
 * @param {string} toastId - Toast ID to dismiss
 */
function dismissToast(toastId) {
    const toast = document.getElementById(toastId);
    if (!toast) return;
    
    toast.classList.remove('animate-slide-in');
    toast.classList.add('animate-slide-out');
    
    setTimeout(() => {
        toast.remove();
        toastQueue = toastQueue.filter(id => id !== toastId);
        
        // Reposition remaining toasts
        repositionToasts();
    }, 300);
}

/**
 * Reposition all active toasts
 */
function repositionToasts() {
    toastQueue.forEach((toastId, index) => {
        const toast = document.getElementById(toastId);
        if (toast) {
            const topPosition = 80 + (index * 80);
            toast.style.top = `${topPosition}px`;
        }
    });
}

/**
 * Clear all toasts
 */
function clearAllToasts() {
    toastQueue.forEach(toastId => {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.remove();
        }
    });
    toastQueue = [];
}

// Setup event listeners
function setupEventListeners() {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                walletState.address = accounts[0];
                userAddress = accounts[0];
                updateWalletUI();
                updateBalances();
                showNotification('Account changed', 'info');
            }
        });
        
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });
    }
}

function setupUIEventListeners() {
    // Add any additional UI event listeners here
}

/**
 * Restore active battles from localStorage
 */
function restoreActiveBattles() {
    const activeBattles = loadBattleSessions();
    
    if (activeBattles.length === 0) {
        console.log('No active battles to restore');
        return;
    }
    
    console.log(`🔄 Restoring ${activeBattles.length} active battles...`);
    
    // Display restored battles in UI
    activeBattles.forEach(battle => {
        console.log(`  - Battle ${battle.id}: ${battle.asset} (${battle.status})`);
        // TODO: Update UI to show restored battles
    });
    
    showNotification(`${activeBattles.length} active battle(s) restored`, 'info');
}

// Initialize on page load with auto-reconnect (Wave 2)
window.addEventListener('load', async () => {
    // Initialize Web3 provider if available
    if (window.ethereum) {
        await initWeb3();
        setupEventListeners();
        
        // Auto-reconnect disabled - user must manually connect
        // const reconnected = await attemptAutoReconnect();
        // if (reconnected) {
        //     restoreActiveBattles();
        // }
    }
    
    // Setup UI event listeners
    setupUIEventListeners();
});

// Missing utility functions
function connectMetaMask() { return connectWallet(); }
function switchToPolygon() { return switchToPolygonAmoy(); }
function checkNetwork() {
    if (!walletState.chainId) return false;
    return walletState.chainId === POLYGON_AMOY.chainIdDecimal;
}
function getMaticBalance() { return walletState.balances.matic; }
function getAionBalance() { return walletState.balances.aion; }
function refreshBalances() { return updateBalances(); }
function showWalletModal() { console.log('Wallet modal'); }
function closeWalletModal() { console.log('Close wallet modal'); }
function toggleWalletDropdown() { console.log('Toggle dropdown'); }
function showComingSoon() { showNotification('Coming soon!', 'info'); }
function handleWalletError(error) {
    console.error('Wallet error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    if (error.code === 4001) {
        showNotification('Connection cancelled', 'warning');
    } else if (error.code === -32002) {
        showNotification('Please check MetaMask - request already pending', 'warning');
    } else if (error.message && error.message.includes('already pending')) {
        showNotification('Please complete the pending request in MetaMask', 'warning');
    } else if (error.message && error.message.includes('network')) {
        showNotification('Network error. Please switch to Polygon Amoy Testnet in MetaMask.', 'error');
    } else {
        showNotification(error.message || 'Connection error. Please try again.', 'error');
    }
}
function showLoading(msg = 'Loading...') {
    const loader = document.createElement('div');
    loader.id = 'loading-overlay';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `<div class="bg-white p-6 rounded-lg"><div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div><p>${msg}</p></div>`;
    document.body.appendChild(loader);
}
function hideLoading() {
    const loader = document.getElementById('loading-overlay');
    if (loader) loader.remove();
}
function showNetworkWarning() {
    showNotification('Please switch to Polygon Amoy Testnet', 'warning');
}
function hideNetworkWarning() {
    console.log('Network warning hidden');
}

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
window.checkAionBalance = checkAionBalance;
window.checkAndApproveTokens = checkAndApproveTokens;
window.showWalletModal = showWalletModal;
window.closeWalletModal = closeWalletModal;
window.toggleWalletDropdown = toggleWalletDropdown;
window.showComingSoon = showComingSoon;
window.handleWalletError = handleWalletError;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.createBattleOnChain = createBattleOnChain;
window.joinBattleOnChain = joinBattleOnChain;
window.completeBattleOnChain = completeBattleOnChain;
window.isWalletConnected = () => walletState.isConnected;
window.getUserAddress = () => walletState.address;
window.getWalletState = getWalletState;
window.initializeWallet = initializeWallet;
window.formatAddress = formatAddress;
window.formatBalance = formatBalance;
window.validateAddress = validateAddress;
window.showNetworkWarning = showNetworkWarning;
// Battle session management (Wave 2)
window.saveBattleSession = saveBattleSession;
window.loadBattleSessions = loadBattleSessions;
window.removeBattleSession = removeBattleSession;
window.getBattleSession = getBattleSession;
window.clearAllBattleSessions = clearAllBattleSessions;
window.moveBattleToHistory = moveBattleToHistory;
window.loadBattleHistory = loadBattleHistory;
window.restoreActiveBattles = restoreActiveBattles;
// Player statistics (Wave 2)
window.initializePlayerStats = initializePlayerStats;
window.loadPlayerStats = loadPlayerStats;
window.savePlayerStats = savePlayerStats;
window.updatePlayerStats = updatePlayerStats;
window.getPlayerStats = getPlayerStats;
window.resetPlayerStats = resetPlayerStats;
// Leaderboard system (Wave 2)
window.getAllPlayers = getAllPlayers;
window.generateLeaderboard = generateLeaderboard;
window.getPlayerRank = getPlayerRank;
window.getTopPlayers = getTopPlayers;
window.getLeaderboardByPeriod = getLeaderboardByPeriod;
// Enhanced toast notifications (Wave 2)
window.showNotification = showNotification;
window.dismissToast = dismissToast;
window.clearAllToasts = clearAllToasts;
window.hideNetworkWarning = hideNetworkWarning;
