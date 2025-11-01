# 🧪 AION Battle Arena - Testing Guide

## Overview

This guide covers testing for all implemented features in Gelombang 4 (Wave 1) and Wave 2.

---

## 🔧 Test Environment Setup

### Prerequisites:
- ✅ MetaMask installed
- ✅ Polygon Amoy testnet configured
- ✅ Test MATIC in wallet (get from faucet)
- ✅ Modern browser (Chrome/Firefox/Brave)
- ✅ Developer Console open (F12)

### Local Server:
```bash
cd AION-Battle-Arena
python3 -m http.server 8000
# Open: http://localhost:8000
```

---

## 📋 Testing Checklist

### ✅ Gelombang 4: Wallet Integration

#### Test 1.1: Wallet Connection
**Steps:**
1. Open app in browser
2. Click "Connect Wallet" button
3. Select MetaMask from modal
4. Approve connection in MetaMask

**Expected Results:**
- ✅ Modal appears with MetaMask option
- ✅ MetaMask popup opens
- ✅ After approval, wallet address shows in header
- ✅ Success toast: "Wallet connected successfully!"
- ✅ Balance displays (MATIC & AION)

**Console Logs to Check:**
```
✅ Wallet state saved to localStorage
🔄 Starting live price animation for: ai
```

---

#### Test 1.2: Network Detection
**Steps:**
1. Connect wallet on wrong network (e.g., Ethereum Mainnet)
2. Observe warning banner
3. Click "Switch to Polygon"

**Expected Results:**
- ✅ Orange warning banner appears: "Wrong Network Detected"
- ✅ "Switch to Polygon" button visible
- ✅ Clicking button triggers MetaMask network switch
- ✅ After switch, banner disappears
- ✅ Success toast: "Network switched successfully"

---

#### Test 1.3: Balance Display
**Steps:**
1. Connect wallet on Polygon network
2. Check balance display in wallet dropdown

**Expected Results:**
- ✅ MATIC balance shows (e.g., "0.5000 MATIC")
- ✅ AION balance shows (e.g., "0.00 AION")
- ✅ Balances update after transactions
- ✅ "Refresh Balances" button works

---

#### Test 1.4: Wallet Disconnect
**Steps:**
1. Connect wallet
2. Click wallet address in header
3. Click "Disconnect" button

**Expected Results:**
- ✅ Wallet dropdown closes
- ✅ Header shows "Connect Wallet" button again
- ✅ Info toast: "Wallet disconnected"
- ✅ All wallet state cleared

---

### ✅ Wave 2: Wallet Persistence

#### Test 2.1: Auto-Reconnect
**Steps:**
1. Connect wallet
2. Refresh page (F5)
3. Wait for auto-reconnect

**Expected Results:**
- ✅ Wallet automatically reconnects
- ✅ Address shows in header without clicking
- ✅ Balances load automatically
- ✅ Success toast: "Wallet reconnected automatically"

**Console Logs:**
```
🔄 Attempting auto-reconnect...
✅ Wallet state loaded from localStorage: 0x...
✅ Auto-reconnect successful!
```

---

#### Test 2.2: Persistence Expiry
**Steps:**
1. Connect wallet
2. Wait 24+ hours (or manually change timestamp in localStorage)
3. Refresh page

**Expected Results:**
- ✅ Auto-reconnect fails
- ✅ "Connect Wallet" button shows
- ✅ No error messages

**Console Logs:**
```
Saved wallet state expired
No valid saved state
```

---

#### Test 2.3: Account Switch Detection
**Steps:**
1. Connect wallet with Account A
2. Switch to Account B in MetaMask
3. Observe behavior

**Expected Results:**
- ✅ App detects account change
- ✅ New address shows in header
- ✅ Balances update for new account
- ✅ Info toast: "Account switched"

---

### ✅ Wave 2: Battle Session Management

#### Test 3.1: Save Battle Session
**Steps:**
1. Connect wallet
2. Create a battle (AI vs AI mode)
3. Check localStorage

**Expected Results:**
- ✅ Battle saved to localStorage
- ✅ Console log: "✅ Battle session saved: [battleId]"
- ✅ localStorage key: `aion_active_battles`

**Check localStorage:**
```javascript
// In Console:
JSON.parse(localStorage.getItem('aion_active_battles'))
// Should show array with battle data
```

---

#### Test 3.2: Restore Battle Sessions
**Steps:**
1. Create 2-3 battles
2. Refresh page
3. Check if battles restored

**Expected Results:**
- ✅ Console log: "✅ Loaded X active battle sessions"
- ✅ Console log: "🔄 Restoring X active battles..."
- ✅ Info toast: "X active battle(s) restored"

---

#### Test 3.3: Battle History
**Steps:**
1. Complete a battle (simulate)
2. Check battle history in localStorage

**Expected Results:**
- ✅ Battle moved from active to history
- ✅ Console log: "✅ Battle moved to history: [battleId]"
- ✅ localStorage key: `aion_battle_history`

**Check History:**
```javascript
// In Console:
JSON.parse(localStorage.getItem('aion_battle_history'))
// Should show array with completed battles
```

---

### ✅ Wave 2: Player Statistics

#### Test 4.1: Initialize Stats
**Steps:**
1. Connect wallet (first time)
2. Check player stats

**Expected Results:**
- ✅ Stats initialized with zeros
- ✅ Console log: "✅ Player stats saved for: 0x..."

**Check Stats:**
```javascript
// In Console:
getPlayerStats()
// Should return stats object
```

---

#### Test 4.2: Update Stats After Battle
**Steps:**
1. Simulate battle completion with WIN
2. Check updated stats

**Expected Results:**
- ✅ Total battles incremented
- ✅ Wins incremented
- ✅ Win rate calculated
- ✅ Current streak updated
- ✅ Console log with updated stats

**Simulate Win:**
```javascript
// In Console:
updatePlayerStats(walletState.address, {
    outcome: 'WIN',
    earnings: 100,
    stake: 50
});
getPlayerStats();
```

---

#### Test 4.3: Win Streak Tracking
**Steps:**
1. Simulate 3 consecutive wins
2. Check longest win streak

**Expected Results:**
- ✅ Current streak: 3
- ✅ Longest win streak: 3

**Simulate:**
```javascript
// Win 1
updatePlayerStats(walletState.address, {
    outcome: 'WIN', earnings: 100, stake: 50
});
// Win 2
updatePlayerStats(walletState.address, {
    outcome: 'WIN', earnings: 100, stake: 50
});
// Win 3
updatePlayerStats(walletState.address, {
    outcome: 'WIN', earnings: 100, stake: 50
});
getPlayerStats();
```

---

### ✅ Wave 2: Leaderboard System

#### Test 5.1: Generate Leaderboard
**Steps:**
1. Create stats for multiple addresses (simulate)
2. Generate leaderboard

**Expected Results:**
- ✅ Players sorted by net profit
- ✅ Rankings assigned (1, 2, 3, etc.)
- ✅ Console log: "✅ Leaderboard generated: X players"

**Test:**
```javascript
// In Console:
const leaderboard = generateLeaderboard('netProfit', 10);
console.table(leaderboard);
```

---

#### Test 5.2: Get Player Rank
**Steps:**
1. Get current player's rank

**Expected Results:**
- ✅ Rank number returned
- ✅ Total players count
- ✅ Percentile calculated

**Test:**
```javascript
// In Console:
const rank = getPlayerRank(walletState.address);
console.log(rank);
// { rank: 5, totalPlayers: 20, percentile: "75.0" }
```

---

#### Test 5.3: Time Period Filtering
**Steps:**
1. Get weekly leaderboard
2. Compare with all-time

**Expected Results:**
- ✅ Weekly shows only recent players
- ✅ All-time shows all players

**Test:**
```javascript
// In Console:
const weekly = getLeaderboardByPeriod('weekly', 'netProfit', 10);
const allTime = getLeaderboardByPeriod('allTime', 'netProfit', 10);
console.log('Weekly:', weekly.length);
console.log('All-time:', allTime.length);
```

---

### ✅ Wave 2: Enhanced Toast Notifications

#### Test 6.1: Toast Types
**Steps:**
1. Test all toast types

**Expected Results:**
- ✅ Success: Green with ✓
- ✅ Error: Red with ✕
- ✅ Warning: Yellow with ⚠
- ✅ Info: Blue with ℹ

**Test:**
```javascript
// In Console:
showNotification('Success message', 'success');
showNotification('Error message', 'error');
showNotification('Warning message', 'warning');
showNotification('Info message', 'info');
```

---

#### Test 6.2: Toast Queue
**Steps:**
1. Show 5 toasts rapidly
2. Observe queue behavior

**Expected Results:**
- ✅ Max 3 toasts visible
- ✅ Old toasts auto-dismissed
- ✅ Toasts positioned correctly

**Test:**
```javascript
// In Console:
for(let i = 1; i <= 5; i++) {
    showNotification(`Toast ${i}`, 'info');
}
```

---

#### Test 6.3: Dismissible Toasts
**Steps:**
1. Show toast
2. Click × button

**Expected Results:**
- ✅ Toast closes immediately
- ✅ Remaining toasts reposition

---

### ✅ Integration Tests

#### Test 7.1: Full Battle Flow
**Steps:**
1. Connect wallet
2. Create battle
3. Refresh page
4. Check battle restored
5. Complete battle
6. Check stats updated

**Expected Results:**
- ✅ All steps work seamlessly
- ✅ Data persists across refresh
- ✅ Stats update correctly

---

#### Test 7.2: Multi-Account Testing
**Steps:**
1. Connect with Account A
2. Create battles and stats
3. Disconnect
4. Connect with Account B
5. Check separate stats

**Expected Results:**
- ✅ Each account has separate stats
- ✅ No data mixing between accounts

---

#### Test 7.3: Network Switch During Battle
**Steps:**
1. Create battle on Polygon
2. Switch to different network
3. Observe behavior

**Expected Results:**
- ✅ Warning banner appears
- ✅ Battle data preserved
- ✅ Can switch back to Polygon

---

## 🐛 Bug Testing

### Edge Cases to Test:

#### Edge Case 1: localStorage Full
**Test:**
- Fill localStorage to limit
- Try to save battle session

**Expected:**
- Graceful error handling
- Console error logged
- User notified

---

#### Edge Case 2: MetaMask Locked
**Test:**
- Lock MetaMask
- Try to connect

**Expected:**
- Error toast: "Wallet is locked"
- Prompt to unlock

---

#### Edge Case 3: No MetaMask
**Test:**
- Disable MetaMask extension
- Try to connect

**Expected:**
- Error toast: "No Web3 wallet detected"
- Suggestion to install MetaMask

---

#### Edge Case 4: Network Congestion
**Test:**
- Simulate slow network
- Create battle

**Expected:**
- Loading indicator shows
- Timeout after reasonable time
- Error message if fails

---

## 📊 Performance Testing

### Metrics to Check:

1. **Page Load Time**
   - Target: <3 seconds
   - Test: Measure with DevTools

2. **Auto-Reconnect Time**
   - Target: <1 second
   - Test: Refresh and measure

3. **Balance Update Time**
   - Target: <2 seconds
   - Test: Click refresh balances

4. **localStorage Operations**
   - Target: <100ms
   - Test: Console.time() operations

---

## 🔍 Console Debugging

### Useful Console Commands:

```javascript
// Check wallet state
getWalletState()

// Check player stats
getPlayerStats()

// Check active battles
loadBattleSessions()

// Check battle history
loadBattleHistory()

// Check leaderboard
generateLeaderboard('netProfit', 10)

// Get player rank
getPlayerRank(walletState.address)

// Clear all data (for testing)
localStorage.clear()

// Check localStorage usage
console.log('localStorage size:', 
    JSON.stringify(localStorage).length + ' bytes'
);
```

---

## ✅ Test Results Template

### Test Session: [Date]
**Tester:** [Name]  
**Browser:** [Chrome/Firefox/Brave]  
**Environment:** [Local/Vercel]

| Test ID | Feature | Status | Notes |
|---------|---------|--------|-------|
| 1.1 | Wallet Connection | ✅ PASS | - |
| 1.2 | Network Detection | ✅ PASS | - |
| 1.3 | Balance Display | ✅ PASS | - |
| 2.1 | Auto-Reconnect | ✅ PASS | - |
| 3.1 | Save Battle | ✅ PASS | - |
| 4.1 | Player Stats | ✅ PASS | - |
| 5.1 | Leaderboard | ✅ PASS | - |
| 6.1 | Toast Types | ✅ PASS | - |

**Issues Found:** [List any bugs]

**Overall Status:** ✅ PASS / ⚠️ PARTIAL / ❌ FAIL

---

## 🚀 Next Steps After Testing

1. **If All Tests Pass:**
   - Deploy to Vercel
   - Share with beta testers
   - Start Wave 3

2. **If Issues Found:**
   - Document bugs
   - Prioritize fixes
   - Re-test after fixes

---

**Last Updated:** November 2, 2025  
**Version:** Wave 2 Testing  
**Status:** Ready for Testing

---

**Happy Testing! 🧪**
