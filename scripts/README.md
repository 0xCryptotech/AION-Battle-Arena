# 🛠️ AION Scripts

Utility scripts untuk AION Prediction Market project.

## 📋 Available Scripts

### 🎨 Color Replacement

#### Preview Changes (Safe)
```bash
npm run preview:colors
```
Preview semua warna merah yang akan diganti tanpa mengubah file.

**Output:**
- List file yang akan diubah
- Jumlah total replacements
- Preview perubahan per file

#### Apply Changes
```bash
npm run replace:colors
```
Mengganti semua warna merah menjadi Polygon purple theme.

**What it does:**
- Scans `frontend/src/` and `aion-static/`
- Replaces red Tailwind classes with purple
- Updates `.js`, `.jsx`, `.ts`, `.tsx`, `.html`, `.css` files
- Shows progress and statistics

#### Rollback to Red Theme
```bash
npm run rollback:colors
```
Mengembalikan semua warna ke tema merah original.

**What it does:**
- Reverses all purple colors back to red
- Restores original AION red theme
- Same file types and directories as replace
- Safe to run anytime

## 🎯 Color Mappings

### Background Colors
```
bg-red-600  →  bg-aura-primary    (#7b3fe4)
bg-red-700  →  bg-poly-primary    (#9D5CFF)
bg-red-800  →  bg-aura-bg-2       (#1a0040)
bg-red-500  →  bg-poly-secondary  (#00C8FF)
```

### Text Colors
```
text-red-600  →  text-aura-primary   (#7b3fe4)
text-red-700  →  text-poly-primary   (#9D5CFF)
text-red-800  →  text-aura-heading   (#c3b6ff)
text-red-500  →  text-poly-secondary (#00C8FF)
```

### Gradients
```
from-red-600  →  from-aura-primary
to-red-800    →  to-aura-bg-3
```

## 🚀 Usage Workflow

### 1. Preview First (Recommended)
```bash
npm run preview:colors
```
Review what will change before applying.

### 2. Backup (Optional but Recommended)
```bash
git add .
git commit -m "Backup before color replacement"
```

### 3. Apply Changes
```bash
npm run replace:colors
```

### 4. Test
```bash
npm run start:static
# or
npm run start:frontend
```

### 5. Commit
```bash
git add .
git commit -m "Replace red theme with Polygon purple"
```

## 📁 Files Processed

### Directories
- ✅ `frontend/src/` - React components
- ✅ `aion-static/` - Static HTML

### File Types
- `.js` - JavaScript
- `.jsx` - React JSX
- `.ts` - TypeScript
- `.tsx` - React TypeScript
- `.html` - HTML
- `.css` - CSS

### Skipped
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `.git/`
- ❌ `build/`
- ❌ `dist/`

## ⚠️ Safety Features

### Preview Mode
- No files modified
- Shows what will change
- Safe to run anytime

### Replace Mode
- Only processes specified file types
- Skips node_modules
- Shows progress
- Can be run multiple times safely

## 🔧 Customization

### Add More Replacements

Edit `replace-colors.js`:

```javascript
const replaceMap = [
  // Add your custom replacements
  [/bg-red-900/g, 'bg-aura-bg-1'],
  // ...
];
```

### Process More Directories

```javascript
const dirsToProcess = [
  './frontend/src',
  './aion-static',
  './your-dir',  // Add here
];
```

## 📊 Example Output

### Preview
```bash
👀 AION Color Preview
====================

Scanning for red colors...

📁 Scanning: ./frontend/src
📁 Scanning: ./aion-static

====================
📊 Preview Results:

Files to be updated: 23
Total replacements: 156

Files with changes:

📄 ./frontend/src/App.js
   bg-red-600 → bg-aura-primary
   text-red-600 → text-aura-primary
   ... and 10 more

💡 To apply these changes, run:
   npm run replace:colors
```

### Replace
```bash
🎨 AION Color Replacement Script
================================

Replacing red theme with Polygon purple...

📁 Processing: ./frontend/src
✨ Updated: ./frontend/src/App.js (12 replacements)
✨ Updated: ./frontend/src/pages/Dashboard.jsx (8 replacements)

================================
✅ Color replacement complete!

📊 Statistics:
   Files processed: 156
   Files updated: 23
   Duration: 0.45s

💜 All red colors replaced with Polygon purple!
```

## 🐛 Troubleshooting

### Script Not Found
```bash
# Make sure you're in project root
cd aion-prediction-market-master

# Run with npm
npm run preview:colors
```

### Permission Denied
```bash
chmod +x scripts/*.js
```

### No Changes Detected
- Already using purple theme
- Check if files exist
- Verify file extensions

## 📚 Documentation

- [Color Replacement Guide](./COLOR_REPLACEMENT_GUIDE.md)
- [Theme Guide](../aion-static/THEME_GUIDE.md)
- [Aura Mode Guide](../aion-static/AURA_MODE.md)

## ✅ Best Practices

1. **Always preview first**
   ```bash
   npm run preview:colors
   ```

2. **Backup before replacing**
   ```bash
   git commit -am "Backup"
   ```

3. **Test after replacing**
   ```bash
   npm run start:static
   ```

4. **Review changes**
   ```bash
   git diff
   ```

5. **Commit changes**
   ```bash
   git commit -am "Update to purple theme"
   ```

## 🎉 Result

After running the scripts, your entire AION application will use the beautiful Polygon purple theme! 💜✨

---

**Need help?** Check the [Color Replacement Guide](./COLOR_REPLACEMENT_GUIDE.md) for detailed instructions.
