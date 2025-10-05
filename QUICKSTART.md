# 🚀 Quick Start Guide

Get Stakelona up and running in minutes!

## Prerequisites Check

Before you begin, make sure you have:
- ✅ Node.js 18 or higher installed
- ✅ npm or yarn package manager
- ✅ A Solana wallet extension (Phantom or Solflare recommended)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 3. Connect Your Wallet

1. Open the app in your browser
2. Click the **"Select Wallet"** button in the top right
3. Choose your wallet (Phantom, Solflare, etc.)
4. Approve the connection

### 4. Get Test SOL (Devnet)

Since this app runs on Solana Devnet, you'll need some test SOL:

1. Visit [https://faucet.solana.com/](https://faucet.solana.com/)
2. Paste your wallet address
3. Click "Airdrop SOL"
4. Wait a few seconds for the transaction to confirm

**Note**: The app simulates staking and services, so you won't actually spend real SOL!

## Exploring the Platform

### Step 1: Browse the Marketplace

- Navigate to the **Marketplace** (home page)
- Filter services by type (AI Agent, Video Content, etc.)
- Click on any service to see details

### Step 2: Stake in Pools

1. Go to **Staking Pools** section
2. Choose a pool based on APY and lock period
3. Click **"Stake Now"**
4. Enter the amount you want to stake
5. Confirm to start earning rewards

**Tip**: Start with the "Flexible Pool" for shorter commitment!

### Step 3: Use Services

**Pay-Per-Use Services**:
1. Go to Marketplace
2. Find a pay-per-use service (like "AI Content Generator")
3. Click to view details
4. Use your staking rewards to pay

**Stake-Duration Services**:
1. Find a stake-duration service (like "Premium Video Course")
2. Stake the required amount for the duration
3. Get unlimited access during the subscription period

### Step 4: Become a Provider

1. Go to **Service Provider** dashboard
2. Click **"Register New Service"**
3. Fill in:
   - Service name and description
   - Service type
   - Payment model (pay-per-use or stake-duration)
   - Pricing details
4. Submit to list your service!

### Step 5: Track Your Activity

Visit **My Dashboard** to see:
- Total staked amount
- Rewards earned
- Active subscriptions
- Service usage history

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Troubleshooting

### Wallet Won't Connect
- Make sure you have a Solana wallet extension installed
- Try refreshing the page
- Check if the wallet is on Devnet (not Mainnet)

### No Services Showing
- Check your internet connection
- Refresh the page
- Open browser console (F12) to check for errors

### Can't Stake
- Ensure your wallet is connected
- Make sure you have the minimum stake amount
- Check that you're on the correct network (Devnet)

## Testing Different Features

### Test User Flow
1. Connect wallet
2. Stake 5 SOL in "High Yield Pool"
3. Wait a moment (rewards accumulate instantly in this demo)
4. Use rewards to access "AI Content Generator"
5. Check your dashboard to see activity

### Test Provider Flow
1. Connect wallet
2. Go to Service Provider section
3. Register a new AI Agent service
4. Set pay-per-use pricing (e.g., 0.1 SOL)
5. View your service in the provider dashboard

## Next Steps

- **Customize**: Modify the mock data in `data/mockData.ts`
- **Extend**: Add new service types in `types/index.ts`
- **Deploy**: Follow the GitHub Pages deployment guide in README.md
- **Learn**: Check out the full README.md for detailed documentation

## Need Help?

- 📖 Read the full [README.md](./README.md)
- 🐛 Found a bug? Open an issue
- 💡 Have ideas? Submit a feature request

---

**Happy Staking! 🎉**

