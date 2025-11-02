# 🚀 AION Battle Arena - Deployment Guide

## Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy from project directory**:
```bash
cd "/Users/idcuq/Documents/AION on Polygon/aion-prediction-market-master"
vercel
```

4. **Follow the prompts**:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (or Y if updating)
   - Project name? **aion-battle-arena**
   - Directory? **./** (current directory)
   - Override settings? **N**

5. **Deploy to production**:
```bash
vercel --prod
```

### Method 2: Vercel Dashboard (Easy)

1. **Go to**: https://vercel.com/new

2. **Import Git Repository**:
   - Click "Add New Project"
   - Import from GitHub/GitLab/Bitbucket
   - Or upload folder directly

3. **Configure Project**:
   - Project Name: `aion-battle-arena`
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete
   - Get your live URL!

### Method 3: GitHub Integration (Automatic)

1. **Push to GitHub**:
```bash
cd "/Users/idcuq/Documents/AION on Polygon/aion-prediction-market-master"
git init
git add .
git commit -m "Initial commit - AION Battle Arena"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Vercel**:
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Vercel will auto-deploy on every push!

## 📋 Pre-Deployment Checklist

- ✅ `index.html` in root directory
- ✅ `js/app.js` exists
- ✅ `js/polygon-integration.js` exists
- ✅ `images/` folder with assets
- ✅ `vercel.json` configuration file
- ✅ `.vercelignore` to exclude files
- ✅ All paths are relative (not absolute)

## 🔧 Environment Variables (Optional)

If you need environment variables, add them in Vercel Dashboard:

1. Go to Project Settings
2. Navigate to "Environment Variables"
3. Add variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS` = `0xC4F95BA0038200F2B92043D43f170F895e813C04`
   - `NEXT_PUBLIC_NETWORK` = `polygon-amoy`

## 🌐 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

## 🔄 Update Deployment

### Using CLI:
```bash
vercel --prod
```

### Using GitHub:
```bash
git add .
git commit -m "Update: description"
git push
```
(Auto-deploys if connected to Vercel)

## 📊 Deployment Status

- **Current URL**: https://aion-battle-arena.vercel.app
- **Status**: 🟢 Live
- **Network**: Polygon Amoy Testnet
- **Contract**: 0xC4F95BA0038200F2B92043D43f170F895e813C04

## 🐛 Troubleshooting

### Issue: 404 Not Found
**Solution**: Check `vercel.json` routes configuration

### Issue: Assets not loading
**Solution**: Ensure all paths are relative (not absolute)

### Issue: JavaScript errors
**Solution**: Check browser console, verify all files are uploaded

### Issue: Wallet not connecting
**Solution**: Ensure MetaMask is installed and on Polygon Amoy network

## 📝 Post-Deployment

1. ✅ Test wallet connection
2. ✅ Test battle creation
3. ✅ Test all navigation
4. ✅ Test on mobile devices
5. ✅ Share URL with team

## 🎉 Success!

Your AION Battle Arena is now live at:
**https://aion-battle-arena.vercel.app**

Share it with the world! 🚀
