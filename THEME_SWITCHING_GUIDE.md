# 🎨 AION Theme Switching Guide

## Overview

AION mendukung 2 color schemes utama yang bisa di-switch dengan mudah:
1. **Red Theme** (Original) - Merah AION classic
2. **Purple Theme** (Polygon) - Ungu Polygon branding

Plus 3 mode variations:
- 🌌 Aura Mode (animated gradient)
- 🌑 Dark Mode (static dark)
- ☀️ Light Mode (clean white)

## 🔄 Quick Switch

### Red → Purple (Polygon Theme)
```bash
# Preview changes first
npm run preview:colors

# Apply changes
npm run replace:colors
```

### Purple → Red (Original Theme)
```bash
# Rollback to red
npm run rollback:colors
```

## 🎨 Theme Comparison

### Red Theme (Original)
```css
Primary: #DC2626 (Red 600)
Secondary: #991B1B (Red 700)
Dark: #7F1D1D (Red 800)
Light: #EF4444 (Red 500)
```

**Best for:**
- ✅ Original AION branding
- ✅ High energy, bold look
- ✅ Traditional prediction market feel

### Purple Theme (Polygon)
```css
Primary: #7b3fe4 (Aura Primary)
Secondary: #9D5CFF (Poly Primary)
Accent: #00C8FF (Poly Secondary)
Neon: #4effa1 (Aura Accent)
```

**Best for:**
- ✅ Polygon ecosystem branding
- ✅ Futuristic, tech-forward look
- ✅ Web3 and blockchain aesthetic

## 📋 Complete Workflow

### Switching to Purple Theme

**Step 1: Preview**
```bash
npm run preview:colors
```
Output shows all files that will be changed.

**Step 2: Backup (Optional)**
```bash
git add .
git commit -m "Backup before theme switch"
```

**Step 3: Apply**
```bash
npm run replace:colors
```

**Step 4: Test**
```bash
npm run start:static
# or
npm run start:frontend
```

**Step 5: Commit**
```bash
git add .
git commit -m "Switch to Polygon purple theme"
```

### Switching Back to Red Theme

**Step 1: Rollback**
```bash
npm run rollback:colors
```

**Step 2: Test**
```bash
npm run start:static
```

**Step 3: Commit**
```bash
git add .
git commit -m "Restore original red theme"
```

## 🎯 What Gets Changed

### Tailwind Classes

**Red → Purple:**
```
bg-red-600        → bg-aura-primary
bg-red-700        → bg-poly-primary
text-red-600      → text-aura-primary
border-red-600    → border-aura-primary
hover:bg-red-600  → hover:bg-aura-primary
from-red-600      → from-aura-primary
to-red-800        → to-aura-bg-3
```

**Purple → Red:**
```
bg-aura-primary   → bg-red-600
bg-poly-primary   → bg-red-700
text-aura-primary → text-red-600
border-aura-primary → border-red-600
hover:bg-aura-primary → hover:bg-red-600
from-aura-primary → from-red-600
to-aura-bg-3      → to-red-800
```

## 🎨 Mode Variations

Both color schemes support 3 modes:

### 🌌 Aura Mode
- Animated gradient background
- Neon glow effects
- Futuristic atmosphere
- **Default mode**

### 🌑 Dark Mode
- Static dark background
- Moderate glow effects
- Professional look
- **Toggle with ✨ icon**

### ☀️ Light Mode
- Clean white background
- Subtle shadows
- High readability
- **Toggle with ✨ icon**

## 📁 Files Affected

### Directories
- `frontend/src/` - React components
- `aion-static/` - Static HTML

### File Types
- `.js`, `.jsx` - JavaScript/React
- `.ts`, `.tsx` - TypeScript/React
- `.html` - HTML files
- `.css` - CSS files

### Not Affected
- `node_modules/` - Dependencies
- `.next/` - Build files
- `.git/` - Git files
- `scripts/` - Script files

## 🔧 Advanced Usage

### Custom Color Mapping

Edit `scripts/replace-colors.js`:

```javascript
const replaceMap = [
  // Add custom mappings
  [/bg-red-900/g, 'bg-aura-bg-1'],
  [/text-red-400/g, 'text-aura-muted'],
];
```

### Process Additional Files

```javascript
const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
  '.html', '.css',
  '.scss', '.sass',  // Add more
];
```

### Selective Replacement

Create a custom script for specific directories:

```javascript
const dirsToProcess = [
  './frontend/src/pages',  // Only pages
  // './frontend/src/components',  // Skip components
];
```

## 🎯 Use Cases

### Development
```bash
# Try purple theme
npm run replace:colors

# Test it out
npm run start:static

# Don't like it? Rollback
npm run rollback:colors
```

### Production
```bash
# Preview first
npm run preview:colors

# Apply if looks good
npm run replace:colors

# Test thoroughly
npm test

# Deploy
npm run deploy
```

### A/B Testing
```bash
# Branch A: Red theme
git checkout -b theme-red

# Branch B: Purple theme
git checkout -b theme-purple
npm run replace:colors

# Compare and choose
```

## 📊 Statistics

### Typical Replacement
```
Files processed: ~150
Files updated: ~20-30
Replacements: ~100-200
Duration: <1 second
```

### Typical Rollback
```
Files processed: ~150
Files restored: ~20-30
Rollbacks: ~100-200
Duration: <1 second
```

## ⚠️ Important Notes

### Before Switching
- ✅ Commit current changes
- ✅ Run preview first
- ✅ Backup if needed
- ✅ Test after switching

### After Switching
- ✅ Test all pages
- ✅ Check responsive design
- ✅ Verify hover states
- ✅ Test theme toggle
- ✅ Commit changes

### Safety
- ✅ Scripts are idempotent (safe to run multiple times)
- ✅ Only processes specified file types
- ✅ Skips node_modules
- ✅ Can be reversed anytime

## 🐛 Troubleshooting

### Colors Not Changing
```bash
# Check if files exist
ls frontend/src/

# Verify script permissions
chmod +x scripts/*.js

# Run with node directly
node scripts/replace-colors.js
```

### Partial Changes
```bash
# Run again (safe)
npm run replace:colors

# Or rollback and retry
npm run rollback:colors
npm run replace:colors
```

### Mixed Colors
```bash
# Rollback first
npm run rollback:colors

# Then apply clean
npm run replace:colors
```

## 🎨 Theme Combinations

### Red + Aura Mode
- Original red colors
- Animated gradient background
- Classic AION with modern twist

### Red + Dark Mode
- Original red colors
- Static dark background
- Traditional look

### Red + Light Mode
- Original red colors
- Clean white background
- Professional appearance

### Purple + Aura Mode (Default)
- Polygon purple colors
- Animated gradient background
- Futuristic Web3 aesthetic

### Purple + Dark Mode
- Polygon purple colors
- Static dark background
- Professional blockchain look

### Purple + Light Mode
- Polygon purple colors
- Clean white background
- Modern, accessible design

## 📚 Related Documentation

- [Color Replacement Guide](./scripts/COLOR_REPLACEMENT_GUIDE.md)
- [Scripts README](./scripts/README.md)
- [Theme Guide](./aion-static/THEME_GUIDE.md)
- [Aura Mode Guide](./aion-static/AURA_MODE.md)

## ✅ Best Practices

### 1. Always Preview First
```bash
npm run preview:colors
```

### 2. Commit Before Switching
```bash
git commit -am "Before theme switch"
```

### 3. Test After Switching
```bash
npm run start:static
```

### 4. Document Your Choice
```bash
git commit -am "Switch to purple theme for Polygon branding"
```

### 5. Keep Consistent
- Choose one theme for production
- Use the other for testing/development
- Don't mix themes in same deployment

## 🎉 Conclusion

AION's flexible theme system allows you to:
- ✅ Switch between red and purple themes instantly
- ✅ Maintain consistent branding
- ✅ Test different aesthetics
- ✅ Adapt to different contexts
- ✅ Rollback anytime

**Current Setup:**
- Default: Purple theme (Polygon branding)
- Mode: Aura (animated gradient)
- Switchable: Yes, anytime!

---

**Choose your theme and make AION yours!** 🎨✨
