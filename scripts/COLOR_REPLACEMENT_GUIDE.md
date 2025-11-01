# 🎨 AION Color Replacement Guide

## Overview

Script otomatis untuk mengganti semua warna merah (red theme) menjadi Polygon purple theme di seluruh project AION.

## 🚀 Quick Start

### Run Color Replacement

```bash
# From project root
npm run replace:colors
```

## 📋 What Gets Replaced

### Background Colors
```
bg-red-600  →  bg-aura-primary
bg-red-700  →  bg-poly-primary
bg-red-800  →  bg-aura-bg-2
bg-red-500  →  bg-poly-secondary
```

### Text Colors
```
text-red-600  →  text-aura-primary
text-red-700  →  text-poly-primary
text-red-800  →  text-aura-heading
text-red-500  →  text-poly-secondary
```

### Border Colors
```
border-red-600  →  border-aura-primary
border-red-700  →  border-poly-primary
border-red-500  →  border-aura-border
```

### Hover States
```
hover:bg-red-600   →  hover:bg-aura-primary
hover:bg-red-700   →  hover:bg-poly-primary
hover:text-red-600 →  hover:text-aura-accent
```

### Gradients
```
from-red-600  →  from-aura-primary
from-red-700  →  from-poly-primary
from-red-800  →  from-aura-bg-2
to-red-600    →  to-aura-accent
to-red-700    →  to-poly-secondary
to-red-800    →  to-aura-bg-3
```

### Ring & Focus
```
ring-red-600         →  ring-aura-primary
focus:ring-red-600   →  focus:ring-aura-primary
focus:border-red-600 →  focus:border-aura-primary
```

## 📁 Directories Processed

The script processes files in:
- ✅ `frontend/src/` - React components
- ✅ `aion-static/` - Static HTML files

### File Types
- `.js` - JavaScript
- `.jsx` - React JSX
- `.ts` - TypeScript
- `.tsx` - React TypeScript
- `.html` - HTML files
- `.css` - CSS files

### Skipped Directories
- ❌ `node_modules/`
- ❌ `.next/`
- ❌ `.git/`
- ❌ `build/`
- ❌ `dist/`
- ❌ `scripts/`

## 🎯 Color Mapping

### Aura Mode Colors
```css
--aura-primary: #7b3fe4    /* Purple primary */
--aura-accent: #4effa1     /* Neon green */
--aura-heading: #c3b6ff    /* Soft purple */
--aura-bg-1: #0e001b       /* Deep purple-black */
--aura-bg-2: #1a0040       /* Dark purple */
--aura-bg-3: #29005e       /* Medium purple */
```

### Polygon Colors
```css
--poly-primary: #9D5CFF    /* Vibrant purple */
--poly-secondary: #00C8FF  /* Glowing cyan */
--poly-accent: #C084FC     /* Lavender */
```

## 📊 Output Example

```bash
🎨 AION Color Replacement Script
================================

Replacing red theme with Polygon purple theme...

📁 Processing: ./frontend/src
✨ Updated: ./frontend/src/App.js (12 replacements)
✨ Updated: ./frontend/src/pages/Dashboard.jsx (8 replacements)
✨ Updated: ./frontend/src/components/Header.jsx (5 replacements)

📁 Processing: ./aion-static
✨ Updated: ./aion-static/index.html (24 replacements)

================================
✅ Color replacement complete!

📊 Statistics:
   Files processed: 156
   Files updated: 23
   Duration: 0.45s

💜 All red colors replaced with Polygon purple theme!
```

## 🔧 Customization

### Add More Replacements

Edit `scripts/replace-colors.js`:

```javascript
const replaceMap = [
  // Add your custom replacements
  [/bg-red-900/g, 'bg-aura-bg-1'],
  [/text-red-400/g, 'text-aura-muted'],
  // ... more replacements
];
```

### Process Additional Directories

```javascript
const dirsToProcess = [
  './frontend/src',
  './aion-static',
  './your-custom-dir',  // Add here
];
```

### Add More File Extensions

```javascript
const extensions = [
  '.js', '.jsx', '.ts', '.tsx', 
  '.html', '.css',
  '.scss', '.sass',  // Add here
];
```

## ⚠️ Important Notes

### Before Running
1. ✅ Commit your changes to git
2. ✅ Backup important files
3. ✅ Review the replacement map
4. ✅ Test on a small directory first

### After Running
1. ✅ Review changed files
2. ✅ Test the application
3. ✅ Check for any broken styles
4. ✅ Commit the changes

### Safety
- Script creates backups automatically
- Only processes specified file types
- Skips node_modules and build directories
- Can be run multiple times safely

## 🎨 Manual Replacements

If you need to replace colors manually:

### In Tailwind Classes
```jsx
// Before
<div className="bg-red-600 text-white">

// After
<div className="bg-aura-primary text-white">
```

### In CSS
```css
/* Before */
.header {
  background: #DC2626;
}

/* After */
.header {
  background: #7b3fe4;
}
```

### In Inline Styles
```jsx
// Before
<div style={{ background: '#DC2626' }}>

// After
<div style={{ background: '#7b3fe4' }}>
```

## 🔄 Reverting Changes

If you need to revert:

```bash
# Using git
git checkout -- .

# Or restore specific files
git checkout -- frontend/src/App.js
```

## 📝 Testing After Replacement

### Visual Testing
1. Start the application
2. Check all pages
3. Verify colors match design
4. Test hover states
5. Check responsive design

### Automated Testing
```bash
# Run tests
npm test

# Check build
npm run build
```

## 🎯 Best Practices

### Do's ✅
- ✅ Run on a clean git state
- ✅ Review changes before committing
- ✅ Test thoroughly after replacement
- ✅ Update documentation if needed
- ✅ Keep color variables consistent

### Don'ts ❌
- ❌ Run without git backup
- ❌ Skip testing after replacement
- ❌ Modify script without understanding
- ❌ Replace colors in node_modules
- ❌ Ignore warnings or errors

## 🐛 Troubleshooting

### Script Not Running
```bash
# Make script executable
chmod +x scripts/replace-colors.js

# Or run with node directly
node scripts/replace-colors.js
```

### No Files Updated
- Check if directories exist
- Verify file extensions
- Ensure files contain red colors
- Check file permissions

### Unexpected Results
- Review the replacement map
- Check for regex conflicts
- Test on single file first
- Restore from git if needed

## 📚 Additional Resources

- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)
- [Polygon Brand Guidelines](https://polygon.technology/brand-resources)
- [AION Theme Guide](../aion-static/THEME_GUIDE.md)
- [Aura Mode Guide](../aion-static/AURA_MODE.md)

## 🎉 Success!

After running the script, your entire AION application will use the beautiful Polygon purple theme instead of red! 💜✨

---

**Note**: This is a one-time operation. Once colors are replaced, you don't need to run it again unless you add new red-colored components.
