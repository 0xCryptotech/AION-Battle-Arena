// AION Battle Arena - Main Application JavaScript
// This file handles all UI interactions and navigation

// Global state
let isConnected = false;
let walletAddress = null;

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

/**
 * Show specific page and hide others
 */
function showPage(pageId) {
    console.log('Navigating to page:', pageId);
    
    try {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            console.log('✅ Page shown:', pageId);
        } else {
            console.error('❌ Page not found:', pageId);
            return;
        }

        // Update navigation buttons
        updateNavButtons(pageId);

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update page-specific content
        if (pageId === 'userinfo') {
            updateUserInfo();
        }
        
        // Start/stop dashboard live updates
        if (pageId === 'dashboard') {
            startDashboardLiveUpdates();
        } else {
            stopDashboardLiveUpdates();
        }
        
    } catch (error) {
        console.error('Error in showPage:', error);
    }
}

/**
 * Update navigation button active states
 */
function updateNavButtons(pageId) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn, .nav-btn-mobile').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to matching buttons
    const navButtons = document.querySelectorAll('.nav-btn, .nav-btn-mobile');
    navButtons.forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes(`showPage('${pageId}')`)) {
            btn.classList.add('active');
        }
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        lucide.createIcons();
    } else {
        mobileMenu.classList.add('hidden');
    }
}

/**
 * Toggle theme
 */
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        body.classList.add('dark-theme');
        if (themeIcon) themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
}

// ============================================
// WALLET FUNCTIONS
// ============================================

/**
 * Connect wallet
 */
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            walletAddress = accounts[0];
            isConnected = true;
            updateWalletUI();
            updateUserInfo();
            loadUserProfile();
            updateDashboardUserInfo();
            updateVotingPower();
            showSimpleNotification('Wallet connected: ' + walletAddress.substring(0, 6) + '...', 'success');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            showSimpleNotification('Error connecting wallet: ' + error.message, 'error');
        }
    } else {
        showSimpleNotification('MetaMask not detected! Please install MetaMask browser extension.', 'error');
    }
}

/**
 * Update wallet UI
 */
function updateWalletUI() {
    const walletText = document.getElementById('walletText');
    if (walletText) {
        if (isConnected && walletAddress) {
            walletText.textContent = walletAddress.substring(0, 6) + '...' + walletAddress.substring(38);
        } else {
            walletText.textContent = 'Connect Wallet';
        }
    }
}

// ============================================
// USER INFO FUNCTIONS
// ============================================

/**
 * Update user info
 */
function updateUserInfo() {
    if (isConnected && walletAddress) {
        // Get real player statistics from localStorage
        const stats = (typeof window.getPlayerStats === 'function') ? window.getPlayerStats(walletAddress) : null;
        
        if (stats) {
            // Update battle metrics
            updateElement('userPredictions', stats.totalBattles || 0);
            updateElement('userWins', stats.wins || 0);
            updateElement('userWinRate', (stats.winRate || 0).toFixed(1) + '%');
            updateElement('userRewards', (stats.netProfit || 0).toFixed(2) + ' AION');
            updateElement('userLosses', stats.losses || 0);
            
            // Update streak
            const streak = stats.currentStreak || 0;
            const streakText = streak > 0 ? `+${streak} 🔥` : streak < 0 ? `${streak} ❄️` : '0';
            updateElement('userStreak', streakText);
            
            updateElement('userLongestStreak', stats.longestWinStreak || 0);
            
            // Update wallet info
            updateElement('userWalletAddress', walletAddress.substring(0, 6) + '...' + walletAddress.substring(38));
            
            // Update earnings
            updateElement('userTotalStaked', (stats.totalEarnings || 0).toFixed(2) + ' AION');
            updateElement('userActiveStakes', (stats.totalLosses || 0).toFixed(2) + ' AION');
            
            // Update performance chart
            updatePerformanceChart(stats);
            
            // Update battle history
            updateBattleHistoryDisplay();
            
            console.log('✅ User info updated with real stats:', stats);
        } else {
            // No stats yet - show zeros
            resetUserInfoDisplay();
        }
        
        // Update balance
        updateElement('userAionBalance', (Math.random() * 10000 + 1000).toFixed(2) + ' AION');
        updateElement('userEthBalance', (Math.random() * 5).toFixed(4) + ' ETH');
    } else {
        // Not connected - show default values
        resetUserInfoDisplay();
    }
}

/**
 * Reset user info display
 */
function resetUserInfoDisplay() {
    updateElement('userWalletAddress', 'Not Connected');
    updateElement('userAionBalance', '0');
    updateElement('userEthBalance', '0');
    updateElement('userTotalStaked', '0');
    updateElement('userActiveStakes', '0');
    updateElement('userRewards', '0 AION');
    updateElement('userPredictions', '0');
    updateElement('userWins', '0');
    updateElement('userWinRate', '0%');
    updateElement('userLosses', '0');
    updateElement('userStreak', '0');
    updateElement('userLongestStreak', '0');
}

/**
 * Update element text content
 */
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

/**
 * Update performance chart
 */
function updatePerformanceChart(stats) {
    if (!stats) return;
    
    const wins = stats.wins || 0;
    const losses = stats.losses || 0;
    const total = wins + losses;
    
    // Update win/loss ratio text
    updateElement('winLossRatio', `${wins}:${losses}`);
    
    // Update bar chart
    if (total > 0) {
        const winPercent = (wins / total) * 100;
        const lossPercent = (losses / total) * 100;
        
        const winBar = document.getElementById('winBar');
        const lossBar = document.getElementById('lossBar');
        const winBarText = document.getElementById('winBarText');
        const lossBarText = document.getElementById('lossBarText');
        
        if (winBar) {
            winBar.style.width = winPercent + '%';
            if (winBarText && winPercent > 10) winBarText.textContent = wins;
        }
        
        if (lossBar) {
            lossBar.style.width = lossPercent + '%';
            if (lossBarText && lossPercent > 10) lossBarText.textContent = losses;
        }
    }
    
    // Update additional chart stats
    updateElement('userTotalEarnings', (stats.totalEarnings || 0).toFixed(2) + ' AION');
    updateElement('userTotalLosses', (stats.totalLosses || 0).toFixed(2) + ' AION');
    updateElement('userAvgStake', (stats.averageStake || 0).toFixed(2) + ' AION');
    updateElement('userTotalBattlesChart', stats.totalBattles || 0);
}

/**
 * Update battle history display
 */
function updateBattleHistoryDisplay() {
    const historyContainer = document.getElementById('userRecentStakes');
    if (!historyContainer) return;
    
    const history = (typeof window.loadBattleHistory === 'function') ? window.loadBattleHistory() : [];
    
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="text-center py-8 text-gray-400">
                <p>No battle history yet</p>
                <p class="text-sm mt-1">Start battling to see your history here!</p>
            </div>
        `;
        return;
    }
    
    // Show last 10 battles
    const recentBattles = history.slice(0, 10);
    
    historyContainer.innerHTML = recentBattles.map(battle => {
        const isWin = battle.outcome === 'WIN';
        const isDraw = battle.outcome === 'DRAW';
        const borderColor = isWin ? 'green-500/30' : isDraw ? 'yellow-500/30' : 'red-500/30';
        const textColor = isWin ? 'green-400' : isDraw ? 'yellow-400' : 'red-400';
        const bgColor = isWin ? 'green-500/20' : isDraw ? 'yellow-500/20' : 'red-500/20';
        const earnings = battle.earnings || 0;
        const earningsText = isWin ? `+${earnings.toFixed(2)} AION` : isDraw ? '0 AION' : `-${Math.abs(earnings).toFixed(2)} AION`;
        const timeAgo = getTimeAgo(battle.completedAt);
        
        return `
            <div class="bg-white/5 border border-${borderColor} rounded-lg p-3 hover:bg-white/10 transition-all">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-white font-semibold text-sm">${battle.asset || 'Unknown'} ${battle.direction || ''}</span>
                    <span class="text-${textColor} font-bold text-sm">${earningsText}</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-400">${timeAgo}</span>
                    <span class="bg-${bgColor} text-${textColor} px-2 py-0.5 rounded">${battle.outcome || 'UNKNOWN'}</span>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Get time ago string
 */
function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    return Math.floor(seconds / 604800) + ' weeks ago';
}

/**
 * Refresh user info
 */
function refreshUserInfo() {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    
    updateUserInfo();
    
    const stats = (typeof window.getPlayerStats === 'function') ? window.getPlayerStats(walletAddress) : null;
    if (stats) {
        showSimpleNotification(
            `Stats refreshed! ${stats.totalBattles} battles, ${stats.wins} wins, ${stats.winRate.toFixed(1)}% win rate`,
            'success'
        );
    } else {
        showSimpleNotification('User data refreshed!', 'success');
    }
}

/**
 * Export user data
 */
function exportUserData() {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    
    const stats = (typeof window.getPlayerStats === 'function') ? window.getPlayerStats(walletAddress) : null;
    const battleHistory = (typeof window.loadBattleHistory === 'function') ? window.loadBattleHistory() : [];
    
    const data = {
        wallet: walletAddress,
        exportedAt: new Date().toISOString(),
        statistics: stats || {
            totalBattles: 0,
            wins: 0,
            losses: 0,
            winRate: 0,
            netProfit: 0
        },
        battleHistory: battleHistory.slice(0, 50),
        balance: {
            aion: document.getElementById('userAionBalance')?.textContent || '0',
            eth: document.getElementById('userEthBalance')?.textContent || '0'
        }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aion-stats-${walletAddress.substring(0, 8)}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showSimpleNotification('Stats exported successfully!', 'success');
}

/**
 * Edit profile
 */
function editProfile() {
    if (!isConnected) {
        alert('Please connect your wallet first!');
        return;
    }

    const currentName = document.getElementById('userName')?.textContent || 'Anonymous User';
    const currentBio = document.getElementById('userBio')?.textContent || 'No bio yet';

    const newName = prompt('Enter your name:', currentName === 'Anonymous User' ? '' : currentName);
    if (newName) {
        updateElement('userName', newName);
        localStorage.setItem('userName_' + walletAddress, newName);
    }

    const newBio = prompt('Enter your bio:', currentBio === 'No bio yet' ? '' : currentBio);
    if (newBio) {
        updateElement('userBio', newBio);
        localStorage.setItem('userBio_' + walletAddress, newBio);
    }

    if (newName || newBio) {
        alert('✅ Profile updated successfully!');
    }
}

/**
 * Change photo
 */
function changePhoto() {
    if (!isConnected) {
        alert('Please connect your wallet first!');
        return;
    }

    const styles = ['avataaars', 'bottts', 'personas', 'lorelei', 'micah', 'adventurer'];
    let styleOptions = 'Select avatar style:\n\n';
    styles.forEach((style, i) => {
        styleOptions += `${i + 1}. ${style.charAt(0).toUpperCase() + style.slice(1)}\n`;
    });

    const choice = prompt(styleOptions + '\nEnter number (1-6):');
    if (choice && choice >= 1 && choice <= 6) {
        const selectedStyle = styles[choice - 1];
        const seed = walletAddress || 'default';
        const photoUrl = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}`;
        const photoEl = document.getElementById('userPhoto');
        if (photoEl) photoEl.src = photoUrl;
        localStorage.setItem('userPhoto_' + walletAddress, photoUrl);
        alert('✅ Photo updated!');
    }
}

/**
 * Load user profile
 */
function loadUserProfile() {
    if (isConnected && walletAddress) {
        const savedName = localStorage.getItem('userName_' + walletAddress);
        const savedBio = localStorage.getItem('userBio_' + walletAddress);
        const savedPhoto = localStorage.getItem('userPhoto_' + walletAddress);

        if (savedName) updateElement('userName', savedName);
        if (savedBio) updateElement('userBio', savedBio);
        
        const photoEl = document.getElementById('userPhoto');
        if (photoEl) {
            if (savedPhoto) {
                photoEl.src = savedPhoto;
            } else {
                photoEl.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${walletAddress}`;
            }
        }
    }
}

/**
 * Update dashboard user info
 */
function updateDashboardUserInfo() {
    if (isConnected && walletAddress) {
        const userName = localStorage.getItem('userName_' + walletAddress) || 'Anonymous';
        updateElement('dash-user-name', userName);
        updateElement('dash-user-wallet', walletAddress.substring(0, 6) + '...' + walletAddress.substring(38));
    }
}

/**
 * Update voting power
 */
function updateVotingPower() {
    const votingPowerEl = document.getElementById('voting-power');
    if (votingPowerEl && isConnected) {
        votingPowerEl.textContent = Math.floor(Math.random() * 1000) + 100;
    }
}

// ============================================
// MARKETPLACE FUNCTIONS
// ============================================

/**
 * Filter market
 */
function filterMarket(category) {
    showSimpleNotification(`Filtering by: ${category}`, 'info');
}

/**
 * Show item detail
 */
function showItemDetail(itemId) {
    const items = {
        ai1: { name: 'GPT-5 Oracle Pro', price: '850 AION', desc: 'AI Predictor Lv.5 — Boosts accuracy by 25%', rarity: 'LEGENDARY' },
        boost1: { name: 'Speed Predictor', price: '320 AION', desc: 'Speed Booster — Reduces prediction time by 50%', rarity: 'RARE' },
        nft1: { name: 'Bull Avatar #142', price: '580 AION', desc: 'Limited NFT — Increases rewards by 10%', rarity: 'EPIC' },
        ai2: { name: 'Basic AI Predictor', price: '120 AION', desc: 'Starter AI — Boosts accuracy by 5%', rarity: 'COMMON' },
        boost2: { name: 'Profit Multiplier', price: '450 AION', desc: 'Reward Booster — 2x rewards for 12h', rarity: 'RARE' },
        nft2: { name: 'Bear Mask #89', price: '380 AION', desc: 'Collectible NFT — +8% XP gain', rarity: 'RARE' }
    };

    const item = items[itemId];
    if (!item) return;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-xl p-8 max-w-md w-full mx-4">
            <h3 class="text-3xl font-bold mb-2 text-white">${item.name}</h3>
            <p class="text-gray-400 mb-4">${item.desc}</p>
            <div class="bg-white/5 rounded-lg p-4 mb-4">
                <div class="flex justify-between mb-2">
                    <span class="text-gray-400">Rarity:</span>
                    <span class="text-yellow-400 font-bold">${item.rarity}</span>
                </div>
                <div class="flex justify-between mb-2">
                    <span class="text-gray-400">Price:</span>
                    <span class="text-green-400 font-bold">${item.price}</span>
                </div>
            </div>
            <div class="flex gap-3">
                <button onclick="buyItem('${itemId}')" class="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-bold">
                    Buy Now
                </button>
                <button onclick="closeModal()" class="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 font-bold">
                    Cancel
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

/**
 * Buy item
 */
function buyItem(itemId) {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    closeModal();
    showSimpleNotification('✅ Purchase successful! Item added to your inventory.', 'success');
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) {
        modal.remove();
    }
}

/**
 * Close battle modal
 */
function closeBattleModal() {
    closeModal();
}

/**
 * Update battle assets based on category
 */
function updateBattleAssets() {
    const categorySelect = document.getElementById('battleCategory');
    const assetSelect = document.getElementById('battleAsset');
    
    if (!categorySelect || !assetSelect) return;
    
    const category = categorySelect.value;
    
    const battleAssets = {
        crypto: [
            { value: 'BTC', label: 'Bitcoin (BTC/USD)', price: 95234 },
            { value: 'ETH', label: 'Ethereum (ETH/USD)', price: 3456 },
            { value: 'SOL', label: 'Solana (SOL/USD)', price: 145 },
            { value: 'MATIC', label: 'Polygon (MATIC/USD)', price: 0.8 }
        ],
        market: [
            { value: 'SPX', label: 'S&P 500', price: 5234 },
            { value: 'NDX', label: 'NASDAQ', price: 18456 },
            { value: 'GOLD', label: 'Gold', price: 2034 },
            { value: 'OIL', label: 'Oil (WTI)', price: 78 },
            { value: 'EUR', label: 'EUR/USD', price: 1.08 }
        ],
        esport: [
            { value: 'TL', label: 'Team Liquid', price: 85 },
            { value: 'FNC', label: 'Fnatic', price: 78 },
            { value: 'G2', label: 'G2 Esports', price: 92 },
            { value: 'T1', label: 'T1', price: 88 },
            { value: 'C9', label: 'Cloud9', price: 76 }
        ]
    };
    
    const assets = battleAssets[category] || battleAssets.crypto;
    assetSelect.innerHTML = assets.map(asset => 
        `<option value="${asset.value}">${asset.label}</option>`
    ).join('');
    
    // Update live price
    updateModalLivePrice();
}

/**
 * Update modal live price
 */
function updateModalLivePrice() {
    const priceEl = document.getElementById('modalLivePrice');
    if (!priceEl) return;
    
    const categorySelect = document.getElementById('battleCategory');
    const assetSelect = document.getElementById('battleAsset');
    const category = categorySelect?.value || 'crypto';
    const asset = assetSelect?.value || 'BTC';
    
    const allPrices = {
        crypto: { BTC: 95234, ETH: 3456, SOL: 145, MATIC: 0.8 },
        market: { SPX: 5234, NDX: 18456, GOLD: 2034, OIL: 78, EUR: 1.08 },
        esport: { TL: 85, FNC: 78, G2: 92, T1: 88, C9: 76 }
    };
    
    const basePrice = allPrices[category]?.[asset] || 1000;
    
    // Simulate small price fluctuation
    const fluctuation = (Math.random() - 0.5) * 0.002;
    const currentPrice = basePrice * (1 + fluctuation);
    
    priceEl.textContent = `$${currentPrice.toFixed(2)}`;
}

// ============================================
// BATTLE FUNCTIONS
// ============================================

/**
 * Start AI vs AI battle
 */
function startAIvAIBattle() {
    openBattleModal('AI_VS_AI');
}

/**
 * Start AI vs Human battle
 */
function startAIvHumanBattle() {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    openBattleModal('AI_VS_HUMAN');
}

/**
 * Start Human vs Human battle
 */
function startHumanvHumanBattle() {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    openBattleModal('HUMAN_VS_HUMAN');
}

/**
 * Open battle modal
 */
function openBattleModal(battleType) {
    const modal = document.createElement('div');
    modal.id = 'battleModal';
    modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto';
    
    const typeInfo = {
        'AI_VS_AI': { title: '🤖 AI vs AI Battle', desc: 'Watch AI models compete • Live price from Pyth Network' },
        'AI_VS_HUMAN': { title: '🧠 AI vs Human Battle', desc: 'Challenge AI predictions • Live price from Pyth Network' },
        'HUMAN_VS_HUMAN': { title: '⚔️ Human vs Human Battle', desc: 'PvP prediction battle • Live price from Pyth Network' }
    };
    
    const info = typeInfo[battleType];
    const showAIModels = battleType === 'AI_VS_AI' || battleType === 'AI_VS_HUMAN';
    const showAIModel2 = battleType === 'AI_VS_AI';
    const showPrediction = battleType !== 'AI_VS_AI';
    
    let htmlContent = `
        <div class="bg-gradient-to-br from-gray-900 to-black border-2 border-red-500 rounded-xl p-6 max-w-2xl w-full my-8">
            <h3 class="text-2xl font-bold mb-2 text-white">${info.title}</h3>
            <p class="text-gray-400 mb-3">${info.desc}</p>
            
            <div class="bg-purple-900/30 border border-purple-500/50 rounded-lg p-2 mb-3 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-purple-300 text-xs font-bold">LIVE PRICE</span>
                </div>
                <span id="modalLivePrice" class="text-yellow-400 text-sm font-bold">Loading...</span>
            </div>
            
            <div class="space-y-3">
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-white font-semibold mb-1 block text-sm">Category</label>
                        <select id="battleCategory" onchange="updateBattleAssets()" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="crypto">💰 Crypto</option>
                            <option value="market">📈 Market</option>
                            <option value="esport">🎮 Esport</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-white font-semibold mb-1 block text-sm">Select Asset</label>
                        <select id="battleAsset" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="BTC">Bitcoin (BTC/USD)</option>
                            <option value="ETH">Ethereum (ETH/USD)</option>
                            <option value="SOL">Solana (SOL/USD)</option>
                            <option value="MATIC">Polygon (MATIC/USD)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">Time Frame</label>
                    <select id="battleTimeframe" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="30">30 seconds</option>
                        <option value="60" selected>1 minute</option>
                        <option value="120">2 minutes</option>
                        <option value="300">5 minutes</option>
                    </select>
                </div>`;
    
    if (showAIModels && battleType === 'AI_VS_AI') {
        htmlContent += `
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-white font-semibold mb-1 block text-sm">AI Model 1</label>
                        <select id="aiModel1" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="GPT-5">GPT-5 Oracle (68%)</option>
                            <option value="CLAUDE-3">Claude-3 (65%)</option>
                            <option value="GEMINI-PRO">Gemini Pro (62%)</option>
                            <option value="LLAMA-3">Llama-3 (58%)</option>
                        </select>
                    </div>`;
    } else if (showAIModels) {
        htmlContent += `
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">Select AI Opponent</label>
                    <select id="aiModel1" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="GPT-5">GPT-5 Oracle (68%)</option>
                        <option value="CLAUDE-3">Claude-3 (65%)</option>
                        <option value="GEMINI-PRO">Gemini Pro (62%)</option>
                        <option value="LLAMA-3">Llama-3 (58%)</option>
                    </select>
                </div>`;
    }
    
    if (showAIModel2) {
        htmlContent += `
                    <div>
                        <label class="text-white font-semibold mb-1 block text-sm">AI Model 2</label>
                        <select id="aiModel2" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                            <option value="CLAUDE-3">Claude-3 (65%)</option>
                            <option value="GPT-5">GPT-5 Oracle (68%)</option>
                            <option value="GEMINI-PRO">Gemini Pro (62%)</option>
                            <option value="LLAMA-3">Llama-3 (58%)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">Bet On</label>
                    <select id="betOnAI" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="AI1">AI Model 1</option>
                        <option value="AI2">AI Model 2</option>
                    </select>
                </div>
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">AI Prediction</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="selectDirection('BULLISH')" id="btn-BULLISH" class="direction-btn bg-green-600/20 border-2 border-green-500 text-green-400 py-2 rounded-lg font-bold hover:bg-green-600/40 transition-all text-sm">
                            📈 BULLISH
                        </button>
                        <button onclick="selectDirection('BEARISH')" id="btn-BEARISH" class="direction-btn bg-red-600/20 border-2 border-red-500 text-red-400 py-2 rounded-lg font-bold hover:bg-red-600/40 transition-all text-sm">
                            📉 BEARISH
                        </button>
                    </div>
                </div>`;
    } else if (showAIModels) {
        htmlContent += `
                </div>`;
    }
    
    if (showPrediction && battleType === 'AI_VS_HUMAN') {
        htmlContent += `
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">Your Prediction</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="selectDirection('BULLISH')" id="btn-BULLISH" class="direction-btn bg-green-600/20 border-2 border-green-500 text-green-400 py-2 rounded-lg font-bold hover:bg-green-600/40 transition-all text-sm">
                            📈 BULLISH
                        </button>
                        <button onclick="selectDirection('BEARISH')" id="btn-BEARISH" class="direction-btn bg-red-600/20 border-2 border-red-500 text-red-400 py-2 rounded-lg font-bold hover:bg-red-600/40 transition-all text-sm">
                            📉 BEARISH
                        </button>
                    </div>
                </div>`;
    } else if (showPrediction) {
        htmlContent += `
                <div>
                    <label class="text-white font-semibold mb-1 block text-sm">Your Prediction</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button onclick="selectDirection('BULLISH')" id="btn-BULLISH" class="direction-btn bg-green-600/20 border-2 border-green-500 text-green-400 py-2 rounded-lg font-bold hover:bg-green-600/40 transition-all text-sm">
                            📈 BULLISH
                        </button>
                        <button onclick="selectDirection('BEARISH')" id="btn-BEARISH" class="direction-btn bg-red-600/20 border-2 border-red-500 text-red-400 py-2 rounded-lg font-bold hover:bg-red-600/40 transition-all text-sm">
                            📉 BEARISH
                        </button>
                    </div>
                </div>`;
    }
    
    htmlContent += `
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-white font-semibold mb-1 block text-sm">Stake Amount (AION)</label>
                        <input type="number" id="stakeAmount" min="10" value="10" class="w-full bg-white/10 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm" placeholder="Min: 10">
                    </div>
                    <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-2 flex flex-col justify-center">
                        <p class="text-blue-400 text-xs">🎯 Win: 2x stake</p>
                        <p class="text-blue-400 text-xs">💰 Pool: <span id="prizePool">20</span> AION</p>
                    </div>
                </div>
            </div>
            
            <div class="space-y-2 mt-4">
                <button onclick="startBattleWithBet('${battleType}')" class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-bold text-sm">
                    Start Battle
                </button>
                <button onclick="closeBattleModal()" class="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 font-bold text-sm">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    modal.innerHTML = htmlContent;
    
    document.body.appendChild(modal);
    
    // Simulate live price update
    updateModalLivePrice();
    const priceInterval = setInterval(updateModalLivePrice, 2000);
    
    // Clear interval when modal closes
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            clearInterval(priceInterval);
        }
    });
    
    // Update prize pool when stake changes
    const stakeInput = document.getElementById('stakeAmount');
    if (stakeInput) {
        stakeInput.addEventListener('input', (e) => {
            const stake = parseFloat(e.target.value) || 10;
            const prizePoolEl = document.getElementById('prizePool');
            if (prizePoolEl) {
                prizePoolEl.textContent = (stake * 2).toFixed(0);
            }
        });
    }
}

let selectedDirection = null;

/**
 * Select battle direction
 */
function selectDirection(direction) {
    selectedDirection = direction;
    
    // Update button styles
    document.querySelectorAll('.direction-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-white');
    });
    
    const selectedBtn = document.getElementById(`btn-${direction}`);
    if (selectedBtn) {
        selectedBtn.classList.add('ring-4', 'ring-white');
    }
}

/**
 * Start battle with bet
 */
async function startBattleWithBet(battleType) {
    const asset = document.getElementById('battleAsset')?.value || 'BTC';
    const timeframe = parseInt(document.getElementById('battleTimeframe')?.value || 60);
    const stakeAmount = parseFloat(document.getElementById('stakeAmount')?.value || 10);
    const aiModel1 = document.getElementById('aiModel1')?.value;
    const aiModel2 = document.getElementById('aiModel2')?.value;
    const betOnAI = document.getElementById('betOnAI')?.value;
    
    // Validation
    if (!selectedDirection) {
        showSimpleNotification('Please select BULLISH or BEARISH!', 'warning');
        return;
    }
    
    if (stakeAmount < 10) {
        showSimpleNotification('Minimum stake is 10 AION!', 'warning');
        return;
    }
    
    // Check wallet connection
    if (!isConnected || !walletAddress) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    
    // For AI vs AI, randomly select directions for both AIs
    let direction1, direction2, playerModel, opponentModel, bettingOn;
    if (battleType === 'AI_VS_AI') {
        direction1 = Math.random() > 0.5 ? 'BULLISH' : 'BEARISH';
        direction2 = Math.random() > 0.5 ? 'BULLISH' : 'BEARISH';
        
        // Determine which AI user is betting on
        if (betOnAI === 'AI1') {
            playerModel = aiModel1;
            opponentModel = aiModel2;
            bettingOn = 'AI1';
        } else {
            playerModel = aiModel2;
            opponentModel = aiModel1;
            bettingOn = 'AI2';
            // Swap directions
            [direction1, direction2] = [direction2, direction1];
        }
    } else {
        direction1 = selectedDirection;
        direction2 = Math.random() > 0.5 ? 'BULLISH' : 'BEARISH';
        playerModel = null;
        opponentModel = aiModel1;
        bettingOn = 'SELF';
    }
    
    closeBattleModal();
    
    // Try to create battle on-chain
    let result = { success: false, demo: true };
    
    if (typeof window.createBattleOnChain === 'function') {
        try {
            result = await window.createBattleOnChain(direction1, stakeAmount, asset, timeframe);
        } catch (error) {
            console.error('Error creating battle on-chain:', error);
            showSimpleNotification('Using demo mode', 'info');
            result = { success: false, demo: true };
        }
    }
    
    if (result.success) {
        // Start battle simulation with on-chain data
        startBattleSimulation({
            type: battleType,
            asset: asset,
            timeframe: timeframe,
            direction: direction1,
            opponentDirection: direction2,
            stakeAmount: stakeAmount,
            playerModel: playerModel,
            opponentModel: opponentModel,
            bettingOn: bettingOn,
            battleId: result.battleId,
            txHash: result.txHash,
            onChain: true
        });
    } else {
        // Demo mode - use simulation
        startBattleSimulation({
            type: battleType,
            asset: asset,
            timeframe: timeframe,
            direction: direction1,
            opponentDirection: direction2,
            stakeAmount: stakeAmount,
            playerModel: playerModel,
            opponentModel: opponentModel,
            bettingOn: bettingOn,
            onChain: false
        });
    }
    
    selectedDirection = null;
}

/**
 * Start battle simulation
 */
function startBattleSimulation(battleConfig) {
    const battleId = 'battle_' + Date.now();
    const isAIvsAI = battleConfig.type === 'AI_VS_AI';
    
    // Player labels
    let player1Label, player2Label;
    if (isAIvsAI) {
        player1Label = `${battleConfig.playerModel} ⭐ (YOUR BET)`;
        player2Label = battleConfig.opponentModel || 'AI-2';
    } else {
        player1Label = 'YOU';
        player2Label = battleConfig.opponentModel || 'OPPONENT';
    }
    
    // Create battle arena UI
    const arena = document.createElement('div');
    arena.id = 'battleArena';
    arena.className = 'fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 overflow-y-auto';
    
    // Bet info text
    let betInfoText = '';
    if (isAIvsAI) {
        const directionColor = battleConfig.direction === 'BULLISH' ? 'text-green-400' : 'text-red-400';
        betInfoText = `<span class="text-yellow-400">You Bet On:</span> <span class="text-white font-bold">${battleConfig.playerModel}</span> <span class="${directionColor} font-bold">${battleConfig.direction}</span>`;
    } else {
        const vsText = battleConfig.type === 'AI_VS_HUMAN' ? `vs ${battleConfig.opponentModel}` : 'vs Human';
        betInfoText = `You ${vsText}`;
    }
    
    arena.innerHTML = `
        <div class="max-w-4xl w-full my-4">
            <div class="relative bg-gradient-to-br from-purple-900 via-gray-900 to-black border-4 border-yellow-500 rounded-2xl p-4 shadow-2xl">
                <!-- Animated Background -->
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 via-purple-500/10 to-blue-500/10 animate-pulse rounded-2xl"></div>
                
                <div class="relative z-10">
                    <!-- Header -->
                    <div class="text-center mb-4">
                        <div class="inline-block bg-gradient-to-r from-red-600 to-purple-600 px-4 py-1 rounded-full mb-2">
                            <h2 class="text-xl font-black text-white tracking-wider">⚔️ BATTLE ARENA ⚔️</h2>
                        </div>
                        <div class="flex items-center justify-center gap-2 mb-1">
                            <span class="bg-yellow-500/20 border border-yellow-500 text-yellow-400 px-3 py-0.5 rounded-full text-xs font-bold">
                                ${battleConfig.asset}/USD
                            </span>
                            <span class="bg-blue-500/20 border border-blue-500 text-blue-400 px-3 py-0.5 rounded-full text-xs font-bold">
                                ⏱️ ${battleConfig.timeframe}s
                            </span>
                        </div>
                        <p class="text-xs mt-1 bg-black/40 inline-block px-3 py-0.5 rounded-full">🎯 ${betInfoText}</p>
                        ${battleConfig.onChain ? '<p class="text-xs mt-1 bg-green-500/20 border border-green-500 inline-block px-3 py-0.5 rounded-full text-green-400">⛓️ On-Chain Battle</p>' : '<p class="text-xs mt-1 bg-yellow-500/20 border border-yellow-500 inline-block px-3 py-0.5 rounded-full text-yellow-400">🎮 Demo Mode</p>'}
                    </div>
                    
                    <!-- Battle Cards -->
                    <div class="grid grid-cols-2 gap-3 mb-4">
                        <div class="relative bg-gradient-to-br from-blue-600/30 to-blue-900/30 border-2 border-blue-500 rounded-lg p-3 shadow-lg shadow-blue-500/50">
                            <div class="absolute -top-2 -right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">YOUR BET</div>
                            <p class="text-blue-300 text-xs mb-1 font-bold uppercase">${player1Label}</p>
                            <p class="text-white text-xl font-black mb-2 ${battleConfig.direction === 'BULLISH' ? 'text-green-400' : 'text-red-400'}">
                                ${battleConfig.direction === 'BULLISH' ? '📈' : '📉'} ${battleConfig.direction}
                            </p>
                            <div class="bg-black/40 rounded p-1">
                                <p class="text-gray-300 text-xs">💰 <span class="text-yellow-400 font-bold">${battleConfig.stakeAmount} AION</span></p>
                            </div>
                        </div>
                        <div class="relative bg-gradient-to-br from-red-600/30 to-red-900/30 border-2 border-red-500 rounded-lg p-3 shadow-lg shadow-red-500/50">
                            <div class="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">OPPONENT</div>
                            <p class="text-red-300 text-xs mb-1 font-bold uppercase">${player2Label}</p>
                            <p class="text-white text-xl font-black mb-2 ${battleConfig.opponentDirection === 'BULLISH' ? 'text-green-400' : 'text-red-400'}">
                                ${battleConfig.opponentDirection === 'BULLISH' ? '📈' : '📉'} ${battleConfig.opponentDirection}
                            </p>
                            <div class="bg-black/40 rounded p-1">
                                <p class="text-gray-300 text-xs">💰 <span class="text-yellow-400 font-bold">${battleConfig.stakeAmount} AION</span></p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Live Price Feed -->
                    <div class="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-500 rounded-lg p-3 mb-4 shadow-lg">
                        <div class="flex items-center justify-between mb-2">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span class="text-purple-300 text-xs font-bold">LIVE PRICE FEED</span>
                            </div>
                            <span class="text-xs text-gray-400 bg-black/40 px-2 py-0.5 rounded-full">Pyth Network</span>
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                            <div class="bg-black/40 rounded p-2 text-center">
                                <p class="text-gray-400 text-xs mb-0.5">Start</p>
                                <p id="startPrice" class="text-green-400 text-sm font-black">Loading...</p>
                            </div>
                            <div class="bg-black/40 rounded p-2 text-center">
                                <p class="text-gray-400 text-xs mb-0.5">Current</p>
                                <p id="currentPrice" class="text-yellow-400 text-sm font-black animate-pulse">Loading...</p>
                            </div>
                            <div class="bg-black/40 rounded p-2 text-center">
                                <p class="text-gray-400 text-xs mb-0.5">Change</p>
                                <p id="priceChange" class="text-white text-sm font-black">0%</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Timer -->
                    <div class="mb-4">
                        <div class="flex justify-between items-center text-white mb-2">
                            <span class="text-sm font-bold">⏰ Time Remaining</span>
                            <span id="timeRemaining" class="text-2xl font-black text-yellow-400 animate-pulse">60s</span>
                        </div>
                        <div class="relative w-full bg-gray-800 rounded-full h-4 overflow-hidden border-2 border-gray-600">
                            <div id="timeBar" class="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-full transition-all duration-1000" style="width: 100%"></div>
                        </div>
                    </div>
                
                <div id="battleResult" class="hidden">
                    <div class="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500 rounded-lg p-6 text-center">
                        <p id="resultText" class="text-3xl font-bold text-white mb-4"></p>
                        <p id="resultDetails" class="text-gray-300 mb-4"></p>
                        <div class="flex gap-3 justify-center">
                            <button onclick="shareOnX()" class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-bold flex items-center gap-2 border border-gray-600">
                                <span>𝕏</span> Share on X
                            </button>
                            <button onclick="closeBattleArena()" class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-bold">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(arena);
    
    // Run battle simulation
    runBattleSimulation(battleId, battleConfig);
}

/**
 * Run battle simulation
 */
function runBattleSimulation(battleId, config) {
    const duration = config.timeframe || 60;
    let timeLeft = duration;
    
    // Simulate starting price
    const allPrices = {
        BTC: 95234, ETH: 3456, SOL: 145, MATIC: 0.8,
        SPX: 5234, NDX: 18456, GOLD: 2034, OIL: 78, EUR: 1.08,
        TL: 85, FNC: 78, G2: 92, T1: 88, C9: 76
    };
    const startPrice = allPrices[config.asset] || 1000;
    const startPriceWithVariation = startPrice * (1 + (Math.random() - 0.5) * 0.02);
    
    document.getElementById('startPrice').textContent = '$' + startPriceWithVariation.toFixed(2);
    document.getElementById('currentPrice').textContent = '$' + startPriceWithVariation.toFixed(2);
    
    // Simulate price movement
    const interval = setInterval(() => {
        timeLeft--;
        
        // Update timer
        document.getElementById('timeRemaining').textContent = timeLeft + 's';
        const progress = (timeLeft / duration) * 100;
        document.getElementById('timeBar').style.width = progress + '%';
        
        // Simulate price change
        const volatility = 0.001;
        const trend = config.direction === 'BULLISH' ? 0.0002 : -0.0002;
        const randomChange = (Math.random() - 0.5) * volatility + trend;
        const currentPrice = parseFloat(document.getElementById('currentPrice').textContent.replace('$', ''));
        const newPrice = currentPrice * (1 + randomChange);
        
        document.getElementById('currentPrice').textContent = '$' + newPrice.toFixed(2);
        
        // Calculate price change
        const priceChangePercent = ((newPrice - startPriceWithVariation) / startPriceWithVariation) * 100;
        const priceChangeEl = document.getElementById('priceChange');
        priceChangeEl.textContent = (priceChangePercent >= 0 ? '+' : '') + priceChangePercent.toFixed(2) + '%';
        priceChangeEl.className = priceChangePercent >= 0 ? 'text-green-400 text-xl font-bold' : 'text-red-400 text-xl font-bold';
        
        // Battle ends
        if (timeLeft <= 0) {
            clearInterval(interval);
            endBattle(battleId, config, startPriceWithVariation, newPrice);
        }
    }, 1000);
}

/**
 * End battle and show results
 */
async function endBattle(battleId, config, startPrice, endPrice) {
    const priceChange = endPrice - startPrice;
    const priceChangePercent = (priceChange / startPrice) * 100;
    
    let outcome, earnings;
    
    if (Math.abs(priceChangePercent) < 0.1) {
        outcome = 'DRAW';
        earnings = 0;
    } else if ((priceChange > 0 && config.direction === 'BULLISH') || (priceChange < 0 && config.direction === 'BEARISH')) {
        outcome = 'WIN';
        earnings = config.stakeAmount; // 2x stake (profit = stake)
    } else {
        outcome = 'LOSS';
        earnings = -config.stakeAmount;
    }
    
    // Complete battle on-chain if it was created on-chain
    if (config.onChain && config.battleId && typeof window.completeBattleOnChain === 'function') {
        try {
            const winner = outcome === 'WIN' ? walletAddress : '0x0000000000000000000000000000000000000000';
            await window.completeBattleOnChain(config.battleId, winner);
        } catch (error) {
            console.error('Error completing battle on-chain:', error);
            showSimpleNotification('Battle completed locally', 'info');
        }
    }
    
    // Show result
    const resultDiv = document.getElementById('battleResult');
    const resultText = document.getElementById('resultText');
    const resultDetails = document.getElementById('resultDetails');
    
    if (outcome === 'WIN') {
        resultText.textContent = '🎉 VICTORY!';
        resultText.className = 'text-3xl font-bold text-green-400 mb-4';
        resultDetails.textContent = `You won ${earnings.toFixed(2)} AION! Price moved ${priceChangePercent.toFixed(2)}% in your favor.`;
    } else if (outcome === 'LOSS') {
        resultText.textContent = '💔 DEFEAT';
        resultText.className = 'text-3xl font-bold text-red-400 mb-4';
        resultDetails.textContent = `You lost ${Math.abs(earnings).toFixed(2)} AION. Price moved ${priceChangePercent.toFixed(2)}% against you.`;
    } else {
        resultText.textContent = '🤝 DRAW';
        resultText.className = 'text-3xl font-bold text-yellow-400 mb-4';
        resultDetails.textContent = `Price change was too small (${priceChangePercent.toFixed(2)}%). Stake returned.`;
    }
    
    resultDiv.classList.remove('hidden');
    
    // Store result for sharing
    lastBattleResult = {
        outcome: outcome,
        earnings: earnings,
        asset: config.asset,
        direction: config.direction,
        priceChange: priceChangePercent,
        startPrice: startPrice,
        endPrice: endPrice
    };
    
    // Save to history
    if (typeof window.moveBattleToHistory === 'function') {
        window.moveBattleToHistory({
            id: battleId,
            type: config.type,
            asset: config.asset,
            direction: config.direction,
            stakeAmount: config.stakeAmount,
            outcome: outcome,
            earnings: earnings,
            startPrice: startPrice,
            endPrice: endPrice,
            priceChange: priceChangePercent,
            txHash: config.txHash
        });
    }
    
    // Update UI
    updateUserInfo();
    
    // Show notification
    if (outcome === 'WIN') {
        showSimpleNotification(`🎉 You won ${earnings.toFixed(2)} AION!`, 'success');
    } else if (outcome === 'LOSS') {
        showSimpleNotification(`💔 You lost ${Math.abs(earnings).toFixed(2)} AION`, 'error');
    } else {
        showSimpleNotification('🤝 Battle ended in a draw', 'info');
    }
}

/**
 * Close battle arena
 */
function closeBattleArena() {
    const arena = document.getElementById('battleArena');
    if (arena) {
        arena.remove();
    }
}

// Store last battle result for sharing
let lastBattleResult = null;

/**
 * Share battle result on X (Twitter)
 */
function shareOnX() {
    if (!lastBattleResult) {
        showSimpleNotification('No battle result to share!', 'warning');
        return;
    }
    
    const { outcome, earnings, asset, direction, priceChange } = lastBattleResult;
    
    const outcomeEmoji = outcome === 'WIN' ? '🎉' : outcome === 'LOSS' ? '💔' : '🤝';
    const directionEmoji = direction === 'BULLISH' ? '📈' : '📉';
    
    const tweetText = `${outcomeEmoji} AION Battle Result!\n\n` +
        `${asset} ${directionEmoji} ${direction}\n` +
        `Price Change: ${priceChange.toFixed(2)}%\n` +
        `Result: ${outcome}\n` +
        `Earnings: ${earnings >= 0 ? '+' : ''}${earnings.toFixed(2)} AION\n\n` +
        `⚔️ Play now: https://aion-battle-arena.vercel.app\n` +
        `#AION #Web3Gaming #CryptoBattle`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
    window.open(twitterUrl, '_blank', 'width=550,height=420');
    showSimpleNotification('𝕏 Opening X to share your result!', 'success');
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showSimpleNotification('✅ Result copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

/**
 * Fallback copy to clipboard
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showSimpleNotification('✅ Result copied to clipboard!', 'success');
    } catch (err) {
        showSimpleNotification('❌ Failed to copy result', 'error');
    }
    document.body.removeChild(textArea);
}

// ============================================
// GOVERNANCE FUNCTIONS
// ============================================

/**
 * Filter proposals
 */
function filterProposals() {
    console.log('Filtering proposals...');
}

/**
 * Open create proposal
 */
function openCreateProposal() {
    showSimpleNotification('Create proposal feature coming soon!', 'info');
}

/**
 * Show proposal detail
 */
function showProposalDetail(id) {
    showSimpleNotification(`Viewing proposal ${id} details`, 'info');
}

/**
 * Vote on proposal
 */
function voteProposal(id, vote) {
    if (!isConnected) {
        showSimpleNotification('Please connect your wallet first!', 'warning');
        return;
    }
    showSimpleNotification(`Voted ${vote} on proposal ${id}`, 'success');
}

// ============================================
// LEADERBOARD FUNCTIONS
// ============================================

/**
 * Show model detail
 */
function showModelDetail(id) {
    showSimpleNotification(`Viewing AI model ${id} details`, 'info');
}

// ============================================
// DASHBOARD FUNCTIONS
// ============================================

// Dashboard live update interval
let dashboardInterval = null;

/**
 * Update dashboard prediction
 */
function updateDashboardPrediction() {
    const aiSelect = document.getElementById('dash-ai-select');
    const coinSelect = document.getElementById('dash-coin-select');
    
    if (!aiSelect || !coinSelect) return;
    
    const aiModels = ['GPT-4 Oracle', 'Claude Predictor', 'Llama Vision', 'Gemini Forecast', 'Mistral Analyzer'];
    const categorySelect = document.getElementById('dash-category-select');
    const category = categorySelect?.value || 'crypto';
    
    const categoryAssets = {
        crypto: [
            { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: 'orange', basePrice: 95234 },
            { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: 'blue', basePrice: 3456 },
            { name: 'Solana', symbol: 'SOL', icon: 'S', color: 'purple', basePrice: 145 },
            { name: 'BNB', symbol: 'BNB', icon: 'B', color: 'yellow', basePrice: 612 },
            { name: 'Cardano', symbol: 'ADA', icon: 'A', color: 'blue', basePrice: 0.58 }
        ],
        market: [
            { name: 'S&P 500', symbol: 'SPX', icon: 'S', color: 'green', basePrice: 5234 },
            { name: 'NASDAQ', symbol: 'NDX', icon: 'N', color: 'blue', basePrice: 18456 },
            { name: 'Gold', symbol: 'GOLD', icon: 'Au', color: 'yellow', basePrice: 2034 },
            { name: 'Oil (WTI)', symbol: 'OIL', icon: 'O', color: 'orange', basePrice: 78 },
            { name: 'EUR/USD', symbol: 'EUR', icon: '€', color: 'blue', basePrice: 1.08 }
        ],
        esport: [
            { name: 'Team Liquid', symbol: 'TL', icon: '🐴', color: 'blue', basePrice: 85 },
            { name: 'Fnatic', symbol: 'FNC', icon: '🦁', color: 'orange', basePrice: 78 },
            { name: 'G2 Esports', symbol: 'G2', icon: 'G2', color: 'red', basePrice: 92 },
            { name: 'T1', symbol: 'T1', icon: 'T1', color: 'red', basePrice: 88 },
            { name: 'Cloud9', symbol: 'C9', icon: '☁️', color: 'blue', basePrice: 76 }
        ]
    };
    
    const coins = categoryAssets[category] || categoryAssets.crypto;
    
    const selectedAI = aiModels[aiSelect.value];
    const coinIndex = parseInt(coinSelect.value) || 0;
    const selectedCoin = coins[coinIndex] || coins[0];
    const confidence = (Math.random() * 5 + 93).toFixed(1);
    
    // Random prediction direction
    const isBullish = Math.random() > 0.4;
    const direction = isBullish ? 'BULLISH' : 'BEARISH';
    const emoji = isBullish ? '📈' : '📉';
    const colorClass = isBullish ? 'green' : 'red';
    
    // Update coin info
    document.getElementById('dash-coin-icon').textContent = selectedCoin.icon;
    document.getElementById('dash-coin-icon').className = `w-12 h-12 bg-${selectedCoin.color}-500 rounded-full flex items-center justify-center text-white font-bold text-xl`;
    document.getElementById('dash-coin-name').textContent = selectedCoin.name;
    document.getElementById('dash-ai-info').textContent = `${selectedAI} • ${confidence}%`;
    
    // Update live price with fluctuation
    const fluctuation = (Math.random() - 0.5) * 0.02;
    const currentPrice = selectedCoin.basePrice * (1 + fluctuation);
    document.getElementById('dash-live-price').textContent = `$${currentPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;    document.getElementById('dash-live-price').className = `font-bold text-xl ${isBullish ? 'text-green-400' : 'text-red-400'}`;
    
    // Update direction badge
    const directionBadge = document.getElementById('dash-direction-badge');
    directionBadge.className = `mb-3 p-3 bg-${colorClass}-500/20 border border-${colorClass}-500/40 rounded-lg text-center`;
    directionBadge.innerHTML = `
        <div class="text-2xl mb-1">${emoji}</div>
        <div class="text-${colorClass}-400 font-bold text-lg">${direction} TREND</div>
        <div class="text-xs text-gray-400 mt-1">AI predicts price will ${isBullish ? 'rise' : 'fall'}</div>
    `;
    
    // Update timeframe predictions - each with different realistic values
    const timeframes = [
        { id: 'm1', label: 'M1', baseChange: 0.1 },
        { id: 'm5', label: 'M5', baseChange: 0.3 },
        { id: 'm10', label: 'M10', baseChange: 0.6 },
        { id: 'm15', label: 'M15', baseChange: 1.0 },
        { id: 'm30', label: 'M30', baseChange: 1.8 },
        { id: 'h1', label: 'H1', baseChange: 3.2 }
    ];
    
    timeframes.forEach((tf) => {
        const tfEl = document.getElementById(`tf-${tf.id}`);
        if (!tfEl) return;
        
        // Each timeframe gets unique random variation
        const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
        const directionMultiplier = isBullish ? 1 : -1;
        const change = tf.baseChange * directionMultiplier * randomFactor;
        
        // Some timeframes might go opposite direction (market volatility)
        const volatility = Math.random();
        const finalChange = volatility < 0.15 ? -change : change; // 15% chance of opposite
        
        const tfEmoji = finalChange > 0 ? '📈' : '📉';
        const tfColor = finalChange > 0 ? 'green' : 'red';
        
        tfEl.className = `bg-${tfColor}-500/20 border border-${tfColor}-500/40 rounded px-2 py-2 text-center`;
        tfEl.innerHTML = `
            <div class="text-[10px] text-gray-400 mb-1">${tf.label}</div>
            <div class="text-sm text-${tfColor}-400 font-bold">${tfEmoji}</div>
            <div class="text-[9px] text-${tfColor}-400 mt-0.5">${finalChange >= 0 ? '+' : ''}${finalChange.toFixed(1)}%</div>
        `;
    });
}

/**
 * Update dashboard category
 */
function updateDashboardCategory() {
    const categorySelect = document.getElementById('dash-category-select');
    const coinSelect = document.getElementById('dash-coin-select');
    
    if (!categorySelect || !coinSelect) return;
    
    const category = categorySelect.value;
    
    // Define assets per category
    const categoryAssets = {
        crypto: [
            { name: 'Bitcoin (BTC)', symbol: 'BTC', icon: '₿', color: 'orange', basePrice: 95234 },
            { name: 'Ethereum (ETH)', symbol: 'ETH', icon: 'Ξ', color: 'blue', basePrice: 3456 },
            { name: 'Solana (SOL)', symbol: 'SOL', icon: 'S', color: 'purple', basePrice: 145 },
            { name: 'BNB', symbol: 'BNB', icon: 'B', color: 'yellow', basePrice: 612 },
            { name: 'Cardano (ADA)', symbol: 'ADA', icon: 'A', color: 'blue', basePrice: 0.58 }
        ],
        market: [
            { name: 'S&P 500', symbol: 'SPX', icon: 'S', color: 'green', basePrice: 5234 },
            { name: 'NASDAQ', symbol: 'NDX', icon: 'N', color: 'blue', basePrice: 18456 },
            { name: 'Gold', symbol: 'GOLD', icon: 'Au', color: 'yellow', basePrice: 2034 },
            { name: 'Oil (WTI)', symbol: 'OIL', icon: 'O', color: 'orange', basePrice: 78 },
            { name: 'EUR/USD', symbol: 'EUR', icon: '€', color: 'blue', basePrice: 1.08 }
        ],
        esport: [
            { name: 'Team Liquid', symbol: 'TL', icon: '🐴', color: 'blue', basePrice: 85 },
            { name: 'Fnatic', symbol: 'FNC', icon: '🦁', color: 'orange', basePrice: 78 },
            { name: 'G2 Esports', symbol: 'G2', icon: 'G2', color: 'red', basePrice: 92 },
            { name: 'T1', symbol: 'T1', icon: 'T1', color: 'red', basePrice: 88 },
            { name: 'Cloud9', symbol: 'C9', icon: '☁️', color: 'blue', basePrice: 76 }
        ]
    };
    
    // Update coin dropdown based on category
    const assets = categoryAssets[category] || categoryAssets.crypto;
    coinSelect.innerHTML = assets.map((asset, i) => 
        `<option value="${i}">${asset.name}</option>`
    ).join('');
    
    // Update prediction with new category
    updateDashboardPrediction();
}

/**
 * Start dashboard live updates
 */
function startDashboardLiveUpdates() {
    if (dashboardInterval) clearInterval(dashboardInterval);
    
    // Initial update
    updateDashboardPrediction();
    
    // Update every 5 seconds (more realistic for AI predictions)
    dashboardInterval = setInterval(() => {
        updateDashboardPrediction();
    }, 5000);
    
    console.log('✅ Dashboard live updates started');
}

/**
 * Stop dashboard live updates
 */
function stopDashboardLiveUpdates() {
    if (dashboardInterval) {
        clearInterval(dashboardInterval);
        dashboardInterval = null;
        console.log('⏹️ Dashboard live updates stopped');
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

/**
 * Simple notification fallback
 */
function showSimpleNotification(message, type = 'info') {
    // Try to use the advanced notification system from polygon-integration.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        // Fallback to console and alert
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // Create simple toast
        const toast = document.createElement('div');
        const colors = {
            success: 'bg-green-600',
            error: 'bg-red-600',
            warning: 'bg-yellow-600',
            info: 'bg-blue-600'
        };
        
        toast.className = `fixed top-20 right-4 ${colors[type] || colors.info} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize app on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AION Battle Arena - App initialized');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set initial page
    showPage('dashboard');
    
    // Update wallet UI
    updateWalletUI();
});

// ============================================
// EXPORT FUNCTIONS TO WINDOW
// ============================================

// Navigation
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleTheme = toggleTheme;

// Wallet
window.connectWallet = connectWallet;
window.updateWalletUI = updateWalletUI;

// User Info
window.updateUserInfo = updateUserInfo;
window.refreshUserInfo = refreshUserInfo;
window.exportUserData = exportUserData;
window.editProfile = editProfile;
window.changePhoto = changePhoto;
window.loadUserProfile = loadUserProfile;
window.updateDashboardUserInfo = updateDashboardUserInfo;
window.updateVotingPower = updateVotingPower;

// Marketplace
window.filterMarket = filterMarket;
window.showItemDetail = showItemDetail;
window.buyItem = buyItem;
window.closeModal = closeModal;

// Battle
window.startAIvAIBattle = startAIvAIBattle;
window.startAIvHumanBattle = startAIvHumanBattle;
window.startHumanvHumanBattle = startHumanvHumanBattle;
window.closeBattleModal = closeBattleModal;
window.openBattleModal = openBattleModal;
window.selectDirection = selectDirection;
window.startBattleWithBet = startBattleWithBet;
window.startBattleSimulation = startBattleSimulation;
window.runBattleSimulation = runBattleSimulation;
window.endBattle = endBattle;
window.closeBattleArena = closeBattleArena;
window.shareOnX = shareOnX;
window.updateModalLivePrice = updateModalLivePrice;
window.updateBattleAssets = updateBattleAssets;

// Governance
window.filterProposals = filterProposals;
window.openCreateProposal = openCreateProposal;
window.showProposalDetail = showProposalDetail;
window.voteProposal = voteProposal;

// Leaderboard
window.showModelDetail = showModelDetail;

// Dashboard
window.updateDashboardPrediction = updateDashboardPrediction;
window.updateDashboardCategory = updateDashboardCategory;
window.startDashboardLiveUpdates = startDashboardLiveUpdates;
window.stopDashboardLiveUpdates = stopDashboardLiveUpdates;

console.log('✅ All functions exported to window');
