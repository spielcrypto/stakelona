# 🔧 Installation & Setup Guide

Complete guide to get Stakelona running on your system.

## 📋 System Requirements

### Required
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Operating System**: Windows, macOS, or Linux

### Check Your Versions
```bash
node --version   # Should be v18.0.0 or higher
npm --version    # Should be 8.0.0 or higher
```

If you need to install or update Node.js, visit [nodejs.org](https://nodejs.org/)

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd /home/spielcrypto/solana/stakelona
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages:
- Next.js 14
- React 18
- Solana Web3.js 3.0.0
- Wallet Adapter libraries
- Tailwind CSS
- TypeScript

**Expected time**: 2-5 minutes depending on internet speed

### Step 3: Verify Installation
```bash
npm run lint
```

This should complete without errors.

## 🎮 Running the Application

### Development Mode
```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

**You should see**:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
✓ Ready in 2.3s
```

### Production Build
```bash
npm run build
```

This creates an optimized production build in the `out/` directory.

**Expected output**:
```
✓ Compiled successfully
✓ Generating static pages
✓ Finalizing page optimization
✓ Collecting page data
✓ Export successful
```

### Preview Production Build Locally
After building, you can serve the static files:
```bash
npx serve out
```

## 🔌 Wallet Setup

### Install a Solana Wallet

Choose one of these browser extensions:

**Phantom Wallet** (Recommended)
- Visit: [phantom.app](https://phantom.app)
- Click "Download"
- Install browser extension
- Create new wallet or import existing

**Solflare Wallet**
- Visit: [solflare.com](https://solflare.com)
- Download extension
- Set up wallet

### Get Devnet SOL

1. Open your wallet
2. Switch network to **Devnet** (usually in settings)
3. Copy your wallet address
4. Visit [https://faucet.solana.com/](https://faucet.solana.com/)
5. Paste your address
6. Request airdrop (you can get 1-2 SOL per request)

## ✅ Verification Checklist

After installation, verify everything works:

### 1. Application Loads
- [ ] Navigate to http://localhost:3000
- [ ] See the Stakelona homepage
- [ ] Navigation bar is visible
- [ ] No console errors (press F12 to check)

### 2. Wallet Connection
- [ ] Click "Select Wallet" button
- [ ] See wallet options (Phantom, Solflare, etc.)
- [ ] Successfully connect wallet
- [ ] See wallet address displayed
- [ ] See Devnet SOL balance

### 3. Marketplace
- [ ] See 6 services displayed
- [ ] Filter buttons work
- [ ] Can click on service cards
- [ ] Modal opens with service details
- [ ] Rewards balance shows at top (if connected)

### 4. Staking Pools
- [ ] Navigate to "Staking Pools"
- [ ] See 3 different pools
- [ ] Each pool shows APY, lock period, etc.
- [ ] Click "Stake Now" opens modal
- [ ] Can enter amount and see estimated rewards

### 5. Service Provider
- [ ] Navigate to "Service Provider"
- [ ] See provider dashboard
- [ ] Click "Register New Service"
- [ ] Form opens with all fields
- [ ] Can select service types and payment models

### 6. User Dashboard
- [ ] Navigate to "My Dashboard"
- [ ] See overview cards (staked, rewards, etc.)
- [ ] See sections for stakes and usage
- [ ] Data displays correctly

## 🐛 Troubleshooting

### Issue: Dependencies Won't Install

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Use a different port
PORT=3001 npm run dev

# Or kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### Issue: TypeScript Errors

**Error**: Type errors during build

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try again
npm run build
```

### Issue: Wallet Won't Connect

**Problem**: Wallet button doesn't respond

**Solutions**:
1. Make sure wallet extension is installed
2. Refresh the page (Ctrl/Cmd + R)
3. Check if wallet is unlocked
4. Try a different browser
5. Clear browser cache

### Issue: Build Fails

**Error**: Build process fails

**Solution**:
```bash
# Update dependencies
npm update

# Clear cache and rebuild
rm -rf .next out
npm run build
```

## 📦 Project Structure

After installation, your project should look like this:

```
stakelona/
├── node_modules/          # Installed dependencies (created after npm install)
├── .next/                 # Next.js build cache (created on first run)
├── out/                   # Production build output (created on build)
├── app/                   # Application pages
├── components/            # React components
├── context/               # State management
├── data/                  # Mock data
├── public/                # Static assets
├── types/                 # TypeScript types
├── .github/               # GitHub Actions
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind config
└── next.config.js         # Next.js config
```

## 🔄 Updating Dependencies

To update packages to latest versions:

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm update <package-name>
```

## 🧪 Testing the Application

### Manual Testing Workflow

1. **Connect Wallet**
   - Click wallet button → Select wallet → Approve

2. **Stake in Pool**
   - Go to Staking Pools
   - Click "Stake Now" on any pool
   - Enter amount (e.g., 1 SOL)
   - Click "Confirm Stake"
   - Check dashboard to verify

3. **Use a Service**
   - Go to Marketplace
   - Click on "AI Content Generator"
   - Click "Use Service"
   - Verify rewards are deducted

4. **Register a Service**
   - Go to Service Provider
   - Click "Register New Service"
   - Fill in all fields
   - Submit
   - Verify it appears in your services

5. **Check Dashboard**
   - Go to My Dashboard
   - Verify all stakes show up
   - Check rewards balance
   - Review usage history

## 📊 Performance Tips

### Development
- Use `npm run dev` for hot reloading
- Keep browser DevTools open to catch errors early
- Test on different screen sizes (mobile, tablet, desktop)

### Production
- Always run `npm run build` before deploying
- Test the production build locally with `npx serve out`
- Check for console errors in production build
- Verify all routes work after build

## 🌐 Deployment Preparation

Before deploying to GitHub Pages:

1. **Update Repository Name**
   Edit `next.config.js`:
   ```javascript
   basePath: '/your-repo-name',
   assetPrefix: '/your-repo-name/',
   ```

2. **Build and Test**
   ```bash
   npm run build
   npx serve out
   ```

3. **Commit and Push**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages
   - Select source branch (gh-pages after first deploy)
   - Save

## 🎓 Next Steps

Once installation is complete:

1. ✅ Read the [QUICKSTART.md](./QUICKSTART.md) for a guided tour
2. ✅ Review [README.md](./README.md) for full documentation
3. ✅ Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for technical details
4. ✅ Start customizing and building!

## 💡 Pro Tips

- **Hot Reload**: Files update instantly in dev mode
- **TypeScript**: Use VSCode for best TypeScript experience
- **Debugging**: Use React DevTools extension
- **Console**: Keep browser console open to catch issues
- **Network Tab**: Monitor wallet transactions
- **Mobile Testing**: Use browser's device emulation

## 🆘 Getting Help

If you encounter issues:

1. Check this troubleshooting section
2. Review error messages carefully
3. Search for the error online
4. Check Next.js documentation
5. Check Solana documentation
6. Open an issue in the repository

---

**Installation Complete! 🎉**

You're now ready to explore and develop with Stakelona!

