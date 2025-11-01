# 🎮 AION Battle Arena - Web3 Gaming Platform

A decentralized battle arena platform built on Polygon blockchain where users can participate in AI vs AI, AI vs Human, and Human vs Human prediction battles with real-time price feeds from Pyth Network.

![AION Battle Arena](https://img.shields.io/badge/Blockchain-Polygon-8247E5)
![Web3](https://img.shields.io/badge/Web3-Enabled-00D4AA)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🔗 Wallet Integration (Gelombang 4)
- **MetaMask Connection**: Seamless wallet connection with modal UI
- **Network Detection**: Automatic detection and switching to Polygon network
- **Balance Display**: Real-time MATIC and AION token balance tracking
- **Network Warning**: Visual alerts when connected to wrong network
- **Event Listeners**: Auto-update on account/network changes
- **No Auto-Connect**: User must manually connect wallet (security best practice)

### ⚔️ Battle Modes
1. **AI vs AI Battle** 🤖
   - Watch two AI models compete in price predictions
   - Bet on your favorite AI model
   - Real-time battle simulation

2. **AI vs Human Battle** 🧠
   - Challenge AI models with your own predictions
   - Test your trading skills against advanced algorithms
   - Earn rewards for accurate predictions

3. **Human vs Human Battle** ⚔️
   - PvP prediction battles
   - Compete against other traders
   - Winner takes all

### 📊 Live Price Integration
- **Pyth Network Integration**: Real-time price feeds for crypto and market assets
- **Multi-Asset Support**: 
  - Crypto: BTC, ETH, SOL, BNB, MATIC, DOGE, SHIB
  - Market: Gold, Silver, Oil, S&P 500, NASDAQ, EUR/USD, GBP/USD
- **Auto-Refresh**: Price updates every 2 seconds
- **Fallback System**: Simulated prices when Pyth Network is unavailable

### 🎯 Battle Features
- **Multiple Timeframes**: M1, M5, M10, M15, M30, H1
- **Flexible Betting**: Minimum 10 AION tokens
- **Real-time Results**: Instant battle outcomes with animations
- **Leaderboard**: Track top performers

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Brave)
- MetaMask wallet extension
- MATIC tokens on Polygon network (for gas fees)
- AION tokens (for betting)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/aion-battle-arena.git
cd aion-battle-arena
```

2. **Start local server**

Using Python:
```bash
python3 -m http.server 8000
```

Or using Node.js:
```bash
npx live-server
```

3. **Open in browser**
```
http://localhost:8000
```

### Configuration

The project uses the following network configurations:

**Polygon Mainnet:**
- Chain ID: 137
- RPC: https://polygon-rpc.com
- Explorer: https://polygonscan.com

**Polygon Amoy Testnet:**
- Chain ID: 80002
- RPC: https://rpc-amoy.polygon.technology
- Explorer: https://amoy.polygonscan.com

## 🎮 How to Use

### 1. Connect Wallet
- Click "Connect Wallet" button in header
- Select MetaMask from modal
- Approve connection in MetaMask
- If on wrong network, click "Switch to Polygon" in warning banner

### 2. Start a Battle
- Navigate to Battle Arena page
- Choose battle mode (AI vs AI, AI vs Human, or Human vs Human)
- Select asset and category
- Choose your prediction (BULLISH/BEARISH)
- Set timeframe and bet amount
- Launch arena and watch the battle!

### 3. View Results
- Real-time battle progress with animations
- Instant results with win/loss display
- Automatic balance updates
- Share results on social media

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (ES6+)
- **Blockchain**: Polygon (Layer 2 Ethereum)
- **Web3 Library**: ethers.js v5
- **Price Oracle**: Pyth Network
- **Wallet**: MetaMask
- **Icons**: Lucide Icons

## 📁 Project Structure

```
aion-battle-arena/
├── index.html              # Main application file
├── js/
│   ├── polygon-integration.js  # Wallet & blockchain integration
│   └── theme.js            # Theme management
├── images/
│   └── aion-logo.svg       # Project logo
├── config/
│   ├── contract.js         # Smart contract config
│   └── network.js          # Network configuration
├── docs/
│   └── specs/              # Project specifications
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

## 🔐 Security Features

- No automatic wallet connection (user must manually connect)
- Session-based connection (requires reconnection after page refresh for security)
- Comprehensive error handling with user-friendly messages
- User confirmation required for all blockchain transactions
- Network validation before executing transactions
- Real-time balance updates after transactions

## 🧪 Testing

### Manual Testing Checklist
- [ ] Connect wallet with MetaMask
- [ ] Test network switching
- [ ] Verify balance display
- [ ] Test all three battle modes
- [ ] Check price updates
- [ ] Test disconnect functionality
- [ ] Verify page refresh behavior

### Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Brave
- ⚠️ Safari (limited Web3 support)

## 📝 Smart Contract

The AION token contract is deployed on Polygon network. Contract features:
- ERC-20 compatible
- Battle creation and joining
- Automated reward distribution
- Event emission for tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Polygon Network for scalable blockchain infrastructure
- Pyth Network for real-time price feeds
- MetaMask for wallet integration
- Tailwind CSS for styling framework
- Lucide Icons for beautiful icons

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/aion-battle-arena/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/aion-battle-arena/discussions)

## 🗺️ Roadmap

- [x] Wallet integration (Gelombang 4)
- [x] Live price feeds
- [x] Three battle modes
- [ ] Smart contract deployment
- [ ] WalletConnect support
- [ ] Mobile app version
- [ ] Tournament system
- [ ] NFT rewards
- [ ] Multi-chain support

---

**Made with ❤️ for the Web3 community**
