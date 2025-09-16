# Stealth Vault Analytics

A privacy-preserving DeFi portfolio analytics platform built with FHE (Fully Homomorphic Encryption) technology. This platform enables users to manage their DeFi portfolios with complete privacy while maintaining publicly verifiable performance analytics.

## 🚀 Features

- **Privacy-First Design**: All sensitive portfolio data is encrypted using FHE technology
- **Real Wallet Integration**: Connect with Rainbow, MetaMask, and other popular wallets
- **Encrypted Portfolio Management**: Track positions, P&L, and risk metrics privately
- **Public Analytics**: Share performance metrics without exposing sensitive data
- **Stealth Mode**: Complete privacy mode for sensitive operations
- **Multi-Chain Support**: Built for Ethereum Sepolia testnet with mainnet compatibility

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Blockchain**: Ethereum + FHE (Zama Network)
- **Wallet Integration**: RainbowKit + Wagmi + Viem
- **Smart Contracts**: Solidity with FHE encryption
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- MetaMask or compatible wallet
- Sepolia ETH for testing

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
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
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

## 🔐 Security Features

- **FHE Encryption**: All sensitive data is encrypted using Fully Homomorphic Encryption
- **Zero-Knowledge Privacy**: Portfolio data remains private while enabling public verification
- **Secure Wallet Integration**: Private keys never leave the user's device
- **Encrypted Smart Contracts**: On-chain data is encrypted and can only be decrypted by authorized parties

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
