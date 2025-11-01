# 🚀 Deployment Guide - AION Battle Arena

## Deploy to Vercel (Recommended)

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit: https://vercel.com/new
   - Login with your GitHub account

2. **Import Repository**
   - Click **"Import Project"**
   - Select **"Import Git Repository"**
   - Choose: `0xCryptotech/AION-Battle-Arena`

3. **Configure Project**
   - **Project Name**: `aion-battle-arena` (or your preferred name)
   - **Framework Preset**: `Other`
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (static site)
   - **Output Directory**: `AION Battle Arena`
   - **Install Command**: Leave empty

4. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete (usually 1-2 minutes)
   - Your site will be live at: `https://aion-battle-arena.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `aion-battle-arena`
   - In which directory is your code located? `./`

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Method 3: Auto-Deploy (Continuous Deployment)

Once connected to Vercel, every push to `main` branch will automatically deploy!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically:
- ✅ Detect changes
- ✅ Build and deploy
- ✅ Update live site

---

## 🌐 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. Go to your project in Vercel Dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain (e.g., `aion.yourdomain.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-30 minutes)

---

## 📊 Environment Variables (If Needed)

If you need to add environment variables:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Add variables:
   - `NEXT_PUBLIC_CONTRACT_ADDRESS`
   - `NEXT_PUBLIC_POLYGON_RPC`
   - etc.

---

## 🔧 Vercel Configuration

The project includes `vercel.json` with:
- ✅ Static file serving
- ✅ CORS headers
- ✅ Proper routing for SPA
- ✅ Optimized for Web3 apps

---

## 🚨 Troubleshooting

### Issue: 404 on page refresh
**Solution**: Already configured in `vercel.json` with proper routing

### Issue: MetaMask not connecting
**Solution**: Make sure you're using HTTPS (Vercel provides this automatically)

### Issue: Slow loading
**Solution**: 
- Enable Vercel Analytics
- Use Vercel Image Optimization
- Check Network tab in DevTools

---

## 📱 Preview Deployments

Every pull request gets a preview deployment:
- Unique URL for testing
- Doesn't affect production
- Perfect for testing features

---

## 🎯 Post-Deployment Checklist

After deployment, verify:
- [ ] Site loads correctly
- [ ] MetaMask connection works
- [ ] Network switching works
- [ ] Live prices update
- [ ] All battle modes work
- [ ] Responsive on mobile
- [ ] No console errors

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Your Repository**: https://github.com/0xCryptotech/AION-Battle-Arena

---

## 💡 Tips

1. **Use Preview Deployments** for testing before production
2. **Enable Vercel Analytics** to track performance
3. **Set up Notifications** for deployment status
4. **Use Environment Variables** for sensitive data
5. **Enable HTTPS** (automatic on Vercel)

---

**Need help?** Check Vercel documentation or open an issue on GitHub!
