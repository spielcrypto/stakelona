# 🎯 Getting Started with Stakelona

Quick reference guide to get up and running immediately!

## ⚡ Quick Commands

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

## 🔗 Quick Links

- **Development**: http://localhost:3000
- **Solana Faucet**: https://faucet.solana.com
- **Phantom Wallet**: https://phantom.app
- **Solflare Wallet**: https://solflare.com

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README.md](./README.md) | Complete project documentation |
| [QUICKSTART.md](./QUICKSTART.md) | Fast-track guide to using the app |
| [INSTALLATION.md](./INSTALLATION.md) | Detailed installation instructions |
| [FEATURES.md](./FEATURES.md) | All features explained |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Technical overview |

## 🗺️ Application Map

```
Stakelona Platform
│
├─ 🏪 Marketplace (/)
│  └─ Browse and access services
│
├─ 💰 Staking Pools (/staking)
│  └─ Stake SOL to earn rewards
│
├─ ⚙️ Service Provider (/provider)
│  └─ Register and manage services
│
└─ 📊 User Dashboard (/dashboard)
   └─ Track stakes and usage
```

## 🎬 First Steps

### 1. Install & Run (2 minutes)
```bash
cd /home/spielcrypto/solana/stakelona
npm install
npm run dev
```

### 2. Connect Wallet (1 minute)
- Install Phantom wallet extension
- Open http://localhost:3000
- Click "Select Wallet"
- Connect your wallet

### 3. Get Test SOL (1 minute)
- Switch wallet to Devnet
- Visit https://faucet.solana.com
- Request airdrop

### 4. Try Features (5 minutes)
1. **Stake**: Go to Staking Pools → Stake 1 SOL
2. **Browse**: Visit Marketplace → View services
3. **Use**: Access a pay-per-use service
4. **Provide**: Register your own service
5. **Track**: Check your dashboard

## 🎨 Page Features

### Marketplace Page
- 6 pre-loaded services
- Filter by type
- Two payment models
- Real-time balance

### Staking Page
- 3 pools (8-12.5% APY)
- Rewards calculator
- Progress tracking
- Flexible lock periods

### Provider Page
- Service registration
- Analytics dashboard
- Revenue tracking
- User metrics

### Dashboard Page
- Overview cards
- Active stakes list
- Service subscriptions
- Usage history

## 🔧 Customization Points

Want to modify the app? Start here:

### Add New Service
**File**: `data/mockData.ts`
```typescript
{
  id: 'new-service',
  name: 'Your Service',
  description: '...',
  type: 'ai_agent',
  // ... rest of config
}
```

### Add New Pool
**File**: `data/mockData.ts`
```typescript
{
  id: 'pool4',
  name: 'Your Pool',
  apy: 15.0,
  // ... rest of config
}
```

### Modify Theme
**File**: `tailwind.config.ts`
```typescript
colors: {
  primary: {
    // Change colors here
  }
}
```

### Add New Page
**File**: `app/yourpage/page.tsx`
```typescript
export default function YourPage() {
  return <div>Your content</div>;
}
```

## 🐛 Common Issues & Fixes

### Port in Use
```bash
PORT=3001 npm run dev
```

### Dependencies Error
```bash
npm install --legacy-peer-deps
```

### Build Error
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Wallet Won't Connect
1. Refresh page
2. Check wallet extension is installed
3. Try different browser
4. Clear cache

## 📱 Test Checklist

- [x] App loads without errors
- [x] Wallet connects successfully
- [x] Can navigate between pages
- [x] Can filter services
- [x] Can open service modals
- [x] Can stake in pools
- [x] Can register new service
- [x] Dashboard shows data
- [x] Mobile view works
- [x] No console errors

## 🚀 Deployment Steps

### GitHub Pages
1. Update `next.config.js` with your repo name
2. Push to GitHub
3. Enable GitHub Pages in settings
4. GitHub Actions will auto-deploy

### Custom Domain
1. Build: `npm run build`
2. Upload `out/` folder to hosting
3. Configure domain
4. Done!

## 💡 Pro Tips

1. **Hot Reload**: Files update instantly in dev mode
2. **Console**: Keep F12 open to catch errors
3. **Network**: Use devnet for testing, mainnet for production
4. **TypeScript**: VSCode provides best experience
5. **Components**: All reusable in `components/`

## 📖 Learning Path

### Beginner
1. Read README.md
2. Follow QUICKSTART.md
3. Explore the UI
4. Try all features

### Intermediate
1. Read FEATURES.md
2. Study component code
3. Modify mock data
4. Customize styling

### Advanced
1. Read PROJECT_SUMMARY.md
2. Understand state management
3. Add new features
4. Integrate smart contracts

## 🤝 Contributing

Interested in contributing?
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

- **Issues**: Open a GitHub issue
- **Questions**: Check documentation first
- **Features**: Submit feature request
- **Bugs**: Provide detailed report

## 🎓 What You'll Learn

- ✅ Solana wallet integration
- ✅ Next.js 14 App Router
- ✅ React Context API
- ✅ TypeScript best practices
- ✅ Tailwind CSS
- ✅ Component architecture
- ✅ Static site deployment

## 🏆 Success Metrics

You've successfully set up when:
- ✅ App runs locally
- ✅ Wallet connects
- ✅ Can stake SOL
- ✅ Can use services
- ✅ Dashboard shows data
- ✅ No errors in console

## 🎉 You're Ready!

Everything is set up and ready to go. Start exploring and building!

**Next Action**: Run `npm install && npm run dev`

---

**Happy Coding! 🚀**
