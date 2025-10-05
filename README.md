# 🔷 Stakelona

A Solana-based proof-of-concept platform that enables users to stake SOL tokens, earn rewards, and access premium services through a decentralized marketplace.

## 📖 Concept

**Stakelona** revolutionizes how users access and pay for digital services by leveraging blockchain staking mechanisms. Instead of traditional subscription models, users can:

1. **Stake SOL tokens** in various pools to earn rewards
2. **Use earned rewards** to pay for services on a per-use basis
3. **Stake tokens for a duration** to gain access to premium services
4. **Provide services** and earn from the platform as a service provider

This creates a sustainable ecosystem where:
- Users are incentivized to stake and hold tokens
- Service providers get a steady stream of committed users
- The platform benefits from increased token utility and engagement

## 🌍 Multi-Language Support

Stakelona supports **4 languages**:
- **English** (Default)
- **Kazakh** (Қазақша)
- **Russian** (Русский)
- **Spanish** (Español)

Switch languages using the language selector in the navigation bar. Your preference is automatically saved.

See [I18N_GUIDE.md](./I18N_GUIDE.md) for detailed internationalization documentation.

## 🎯 How It Works

### For Users

#### 1. Connect Wallet
- Connect your Solana wallet (Phantom, Solflare, etc.)
- The app works on Solana Devnet for testing

#### 2. Stake in Pools
- Browse available staking pools with different APY rates and lock periods
- Choose a pool that matches your risk tolerance and time commitment
- Stake your SOL tokens to start earning rewards
- Rewards accumulate over time based on the pool's APY

#### 3. Browse Marketplace
- Explore various services including:
  - **AI Agents**: Content generators, code assistants, and more
  - **Video Content**: Educational courses and tutorials
  - **File Access**: Research papers, documents, and resources
  - **Event Access**: Virtual conferences and webinars
  - **Game Access**: Premium features in blockchain games

#### 4. Access Services
Two payment models are available:

**Pay-Per-Use**:
- Pay for each service request using your staking rewards
- No long-term commitment required
- Perfect for occasional use

**Stake-Duration**:
- Stake a fixed amount of SOL for a specific period
- Get unlimited access to the service during that time
- Tokens are returned after the period ends
- Ideal for regular users

### For Service Providers

#### 1. Register Services
- Connect your wallet to access the provider dashboard
- Register new services with detailed information
- Choose your pricing model (pay-per-use or stake-duration)
- Set competitive prices to attract users

#### 2. Manage Services
- View all your registered services
- Track key metrics:
  - Total users
  - Revenue generated
  - Active subscriptions
  - User ratings

#### 3. Earn Revenue
- Receive payments when users access your services
- Build a subscriber base through stake-duration model
- Get feedback through ratings and user engagement

## 🏗️ Technical Architecture

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana (Devnet)
- **Wallet Integration**: 
  - @solana/web3.js (v1.95.2)
  - @solana/wallet-adapter-react
  - @solana/wallet-adapter-react-ui
- **Internationalization**:
  - i18next (v23.11.5)
  - react-i18next (v14.1.2)
- **Deployment**: GitHub Pages ready (static export)

### Project Structure

```
stakelona/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Marketplace page
│   ├── staking/page.tsx     # Staking pools page
│   ├── provider/page.tsx    # Service provider dashboard
│   ├── dashboard/page.tsx   # User dashboard
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── WalletProvider.tsx   # Solana wallet provider
│   ├── Navigation.tsx       # App navigation
│   ├── Button.tsx           # Button component
│   ├── Card.tsx             # Card component
│   ├── Modal.tsx            # Modal dialog
│   ├── ServiceCard.tsx      # Service display card
│   └── StakingPoolCard.tsx  # Staking pool card
├── context/                 # React context providers
│   └── AppContext.tsx       # Application state management
├── types/                   # TypeScript type definitions
│   └── index.ts             # All type definitions
├── data/                    # Mock data
│   └── mockData.ts          # Simulated blockchain data
└── public/                  # Static assets
```

### Key Components

#### WalletProvider
Wraps the application with Solana wallet adapter functionality, enabling users to connect their wallets (Phantom, Solflare, etc.).

#### AppContext
Manages global application state including:
- Services list
- Staking pools
- User data (stakes, rewards, usage)
- Actions (stake, use service, register service)

#### Navigation
Responsive navigation bar with wallet connection button and route navigation.

#### Service & Pool Cards
Reusable components for displaying services and staking pools with consistent styling.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Solana wallet (Phantom, Solflare, etc.)
- Some Devnet SOL for testing (get from [Solana Faucet](https://faucet.solana.com/))

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stakelona
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

Build the static site for deployment:

```bash
npm run build
# or
yarn build
```

This creates an optimized production build in the `out/` directory.

## 🌐 Deployment to GitHub Pages

### Setup

1. **Update next.config.js**
Make sure the `basePath` and `assetPrefix` match your repository name:
```javascript
basePath: '/stakelona',
assetPrefix: '/stakelona/',
```

2. **Create .nojekyll file**
```bash
touch out/.nojekyll
```

3. **Deploy to GitHub Pages**

**Option A: Using GitHub Actions**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: touch out/.nojekyll
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**Option B: Manual Deployment**
```bash
npm run build
cd out
touch .nojekyll
git init
git add -A
git commit -m 'Deploy to GitHub Pages'
git push -f git@github.com:<username>/<repository>.git main:gh-pages
```

4. **Enable GitHub Pages**
- Go to your repository settings
- Navigate to Pages section
- Select `gh-pages` branch as source
- Save and wait for deployment

## 🎨 Features

### Marketplace
- Browse all available services with filtering by type
- View detailed service information
- Pay per use with rewards or stake for duration
- Real-time rewards balance display

### Staking Pools
- Multiple pools with different APY rates and lock periods
- Estimated rewards calculator
- Visual progress tracking
- Detailed pool statistics

### Service Provider Dashboard
- Easy service registration with intuitive form
- Flexible pricing models
- Comprehensive analytics:
  - User metrics
  - Revenue tracking
  - Subscription management
  - Rating system

### User Dashboard
- Complete overview of staking activity
- Active pool stakes with progress bars
- Service subscriptions tracking
- Detailed usage history
- Real-time statistics

## 🔐 Security Notes

⚠️ **This is a proof of concept for demonstration purposes**

- No actual blockchain transactions are performed
- All data is simulated and stored in memory
- No smart contracts are deployed
- Wallet connection is real but no actual tokens are transferred
- For production use, you would need:
  - Smart contracts for staking logic
  - On-chain service registry
  - Secure payment processing
  - Backend API for data persistence
  - Proper security audits

## 🛠️ Development

### Key Technologies & Best Practices

- **TypeScript**: Full type safety across the application
- **Component-Based Architecture**: Reusable, modular components
- **Context API**: Efficient state management without prop drilling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Code Organization**: Clear separation of concerns
- **DRY Principle**: Minimal code duplication

### Adding New Features

1. **New Service Type**: Add to `ServiceType` in `types/index.ts`
2. **New Pool**: Add to `mockStakingPools` in `data/mockData.ts`
3. **New Page**: Create in `app/` directory with appropriate routing

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📧 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for the Solana ecosystem**

