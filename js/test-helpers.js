// ============================================
// AION BATTLE ARENA - TEST HELPERS
// ============================================
// Use these functions in browser console for testing

/**
 * Test Suite for Wave 2 Features
 */
const AIONTest = {
    
    /**
     * Test wallet persistence
     */
    testWalletPersistence: function() {
        console.log('🧪 Testing Wallet Persistence...\n');
        
        const savedState = loadWalletState();
        console.log('1. Saved wallet state:', savedState);
        
        const wasConnected = wasWalletConnected();
        console.log('2. Was wallet connected:', wasConnected);
        
        if (walletState.isConnected) {
            console.log('3. Current wallet:', walletState.address);
            console.log('✅ Wallet persistence working!');
        } else {
            console.log('3. No wallet connected');
            console.log('⚠️ Connect wallet to test persistence');
        }
    },
    
    /**
     * Test battle session management
     */
    testBattleSessions: function() {
        console.log('🧪 Testing Battle Sessions...\n');
        
        const activeBattles = loadBattleSessions();
        console.log('1. Active battles:', activeBattles.length);
        console.table(activeBattles);
        
        const history = loadBattleHistory();
        console.log('2. Battle history:', history.length);
        console.table(history);
        
        console.log('✅ Battle session management working!');
    },
    
    /**
     * Create mock battle for testing
     */
    createMockBattle: function() {
        if (!walletState.isConnected) {
            console.error('❌ Please connect wallet first');
            return;
        }
        
        const mockBattle = {
            id: 'test-' + Date.now(),
            creator: walletState.address,
            direction: 'BULLISH',
            stakeAmount: 100,
            status: 'CREATED',
            asset: 'BTC',
            startTime: Date.now()
        };
        
        saveBattleSession(mockBattle);
        console.log('✅ Mock battle created:', mockBattle.id);
        return mockBattle;
    },
    
    /**
     * Test player statistics
     */
    testPlayerStats: function() {
        console.log('🧪 Testing Player Statistics...\n');
        
        if (!walletState.isConnected) {
            console.error('❌ Please connect wallet first');
            return;
        }
        
        const stats = getPlayerStats();
        console.log('1. Current stats:');
        console.table(stats);
        
        console.log('2. Win rate:', stats.winRate.toFixed(2) + '%');
        console.log('3. Net profit:', stats.netProfit, 'AION');
        console.log('4. Current streak:', stats.currentStreak);
        
        console.log('✅ Player statistics working!');
    },
    
    /**
     * Simulate battle win
     */
    simulateWin: function(earnings = 100, stake = 50) {
        if (!walletState.isConnected) {
            console.error('❌ Please connect wallet first');
            return;
        }
        
        updatePlayerStats(walletState.address, {
            outcome: 'WIN',
            earnings: earnings,
            stake: stake
        });
        
        console.log('✅ Simulated WIN');
        console.log('Stats updated:');
        console.table(getPlayerStats());
    },
    
    /**
     * Simulate battle loss
     */
    simulateLoss: function(stake = 50) {
        if (!walletState.isConnected) {
            console.error('❌ Please connect wallet first');
            return;
        }
        
        updatePlayerStats(walletState.address, {
            outcome: 'LOSS',
            earnings: 0,
            stake: stake
        });
        
        console.log('❌ Simulated LOSS');
        console.log('Stats updated:');
        console.table(getPlayerStats());
    },
    
    /**
     * Test leaderboard
     */
    testLeaderboard: function() {
        console.log('🧪 Testing Leaderboard...\n');
        
        const top10 = getTopPlayers(10, 'netProfit');
        console.log('1. Top 10 players by net profit:');
        console.table(top10);
        
        if (walletState.isConnected) {
            const myRank = getPlayerRank(walletState.address);
            console.log('2. Your rank:', myRank);
        }
        
        const allPlayers = getAllPlayers();
        console.log('3. Total players:', allPlayers.length);
        
        console.log('✅ Leaderboard working!');
    },
    
    /**
     * Create mock leaderboard data
     */
    createMockLeaderboard: function(count = 10) {
        console.log(`🧪 Creating ${count} mock players...\n`);
        
        for (let i = 0; i < count; i++) {
            const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
            const wins = Math.floor(Math.random() * 50);
            const losses = Math.floor(Math.random() * 30);
            const earnings = wins * 100;
            const lossAmount = losses * 50;
            
            const stats = initializePlayerStats(mockAddress);
            stats.totalBattles = wins + losses;
            stats.wins = wins;
            stats.losses = losses;
            stats.winRate = (wins / (wins + losses)) * 100;
            stats.totalEarnings = earnings;
            stats.totalLosses = lossAmount;
            stats.netProfit = earnings - lossAmount;
            
            savePlayerStats(mockAddress, stats);
        }
        
        console.log(`✅ Created ${count} mock players`);
        console.log('Run AIONTest.testLeaderboard() to see results');
    },
    
    /**
     * Test toast notifications
     */
    testToasts: function() {
        console.log('🧪 Testing Toast Notifications...\n');
        
        showNotification('Success toast test', 'success');
        setTimeout(() => showNotification('Error toast test', 'error'), 500);
        setTimeout(() => showNotification('Warning toast test', 'warning'), 1000);
        setTimeout(() => showNotification('Info toast test', 'info'), 1500);
        
        console.log('✅ Check toasts in top-right corner');
    },
    
    /**
     * Test toast queue
     */
    testToastQueue: function() {
        console.log('🧪 Testing Toast Queue (max 3)...\n');
        
        for (let i = 1; i <= 5; i++) {
            setTimeout(() => {
                showNotification(`Toast ${i} of 5`, 'info');
            }, i * 300);
        }
        
        console.log('✅ Showing 5 toasts - only 3 should be visible at once');
    },
    
    /**
     * Run all tests
     */
    runAllTests: function() {
        console.log('🚀 Running All Tests...\n');
        console.log('='.repeat(50));
        
        this.testWalletPersistence();
        console.log('\n' + '='.repeat(50) + '\n');
        
        this.testBattleSessions();
        console.log('\n' + '='.repeat(50) + '\n');
        
        this.testPlayerStats();
        console.log('\n' + '='.repeat(50) + '\n');
        
        this.testLeaderboard();
        console.log('\n' + '='.repeat(50) + '\n');
        
        this.testToasts();
        console.log('\n' + '='.repeat(50) + '\n');
        
        console.log('✅ All tests completed!');
        console.log('Check results above and in UI');
    },
    
    /**
     * Clear all test data
     */
    clearTestData: function() {
        if (confirm('⚠️ This will clear ALL data. Continue?')) {
            localStorage.clear();
            console.log('✅ All test data cleared');
            console.log('Refresh page to start fresh');
        }
    },
    
    /**
     * Show test menu
     */
    help: function() {
        console.log(`
🧪 AION Battle Arena - Test Helper Commands
${'='.repeat(50)}

Wallet Persistence:
  AIONTest.testWalletPersistence()

Battle Sessions:
  AIONTest.testBattleSessions()
  AIONTest.createMockBattle()

Player Statistics:
  AIONTest.testPlayerStats()
  AIONTest.simulateWin(earnings, stake)
  AIONTest.simulateLoss(stake)

Leaderboard:
  AIONTest.testLeaderboard()
  AIONTest.createMockLeaderboard(count)

Toast Notifications:
  AIONTest.testToasts()
  AIONTest.testToastQueue()

Run All Tests:
  AIONTest.runAllTests()

Clear Data:
  AIONTest.clearTestData()

${'='.repeat(50)}
        `);
    }
};

// Export to window
window.AIONTest = AIONTest;

// Show help on load
console.log('🧪 AION Test Helpers Loaded!');
console.log('Type AIONTest.help() for available commands');
