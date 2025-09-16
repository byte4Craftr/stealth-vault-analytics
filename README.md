# 📊 Stealth Vault Analytics

> **Next-Generation Privacy-Preserving DeFi Portfolio Management**

Transform your DeFi portfolio management with cutting-edge FHE (Fully Homomorphic Encryption) technology. Experience the future of private financial analytics where your data remains encrypted while enabling public verification of performance metrics.

## ✨ Core Capabilities

- **🔒 Zero-Knowledge Privacy**: Your portfolio data stays encrypted at all times
- **💼 Multi-Wallet Support**: Seamless integration with Rainbow, MetaMask, and 50+ wallets
- **📈 Encrypted Analytics**: Track performance, risk, and P&L without data exposure
- **🌐 Public Verification**: Share metrics publicly while keeping sensitive data private
- **⚡ Stealth Operations**: Complete privacy mode for sensitive transactions
- **🔗 Cross-Chain Ready**: Built for Sepolia with mainnet compatibility

## 🏗️ Architecture & Technology

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React 18 + TypeScript + Vite | Modern, fast development experience |
| **UI Framework** | Tailwind CSS + shadcn/ui | Beautiful, accessible components |
| **Blockchain** | Ethereum + FHE (Zama Network) | Privacy-preserving smart contracts |
| **Wallet Layer** | RainbowKit + Wagmi + Viem | Universal wallet connectivity |
| **Encryption** | FHE Solidity Libraries | Zero-knowledge data processing |
| **Build System** | Vite + npm | Optimized production builds |

## 🎯 Quick Start Requirements

- **Node.js** v18+ (LTS recommended)
- **Package Manager** npm/yarn/pnpm
- **Git** for version control
- **Web3 Wallet** (MetaMask, Rainbow, etc.)
- **Test ETH** on Sepolia network

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/byte4Craftr/stealth-vault-analytics.git
cd stealth-vault-analytics
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

### 4. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

## 🔧 Smart Contract Deployment

### 1. Compile Contracts

```bash
npm run compile
```

### 2. Run Tests

```bash
npm run test
```

### 3. Deploy to Sepolia

```bash
npm run deploy
```

## 📁 Project Structure

```
stealth-vault-analytics/
├── contracts/              # Smart contracts
│   └── StealthVaultAnalytics.sol
├── scripts/                # Deployment scripts
│   └── deploy.ts
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Logo.tsx       # Application logo
│   │   ├── PortfolioDashboard.tsx
│   │   ├── StatsCard.tsx
│   │   └── WalletConnect.tsx
│   ├── config/            # Configuration files
│   │   └── env.ts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   │   ├── contract.ts    # Contract interactions
│   │   ├── fhe-utils.ts   # FHE utilities
│   │   └── utils.ts
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   ├── StealthMode.tsx
│   │   ├── PublicAnalytics.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx            # Main application
│   └── main.tsx           # Application entry point
├── public/                # Static assets
├── hardhat.config.ts      # Hardhat configuration
└── package.json
```

## 🔐 Privacy & Security Architecture

- **🔒 FHE Encryption**: All sensitive data encrypted using Fully Homomorphic Encryption
- **🎭 Zero-Knowledge Privacy**: Portfolio data remains private while enabling public verification
- **🔑 Secure Wallet Integration**: Private keys never leave the user's device
- **📦 Encrypted Smart Contracts**: On-chain data encrypted and accessible only to authorized parties
- **🗑️ Data Clearing**: Built-in functions to clear private data when needed
- **🔐 Access Controls**: Proper permission management for all contract functions

## 🌐 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Smart Contract**: [Coming Soon]

## ⚠️ Disclaimer

This is a demonstration project for educational purposes. Always conduct thorough testing before using in production environments.
