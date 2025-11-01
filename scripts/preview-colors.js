#!/usr/bin/env node

/**
 * AION Color Preview Script
 * Preview what will be replaced without making changes
 * 
 * Usage: npm run preview:colors
 */

const fs = require('fs');
const path = require('path');

// Color replacement map (same as replace-colors.js)
const replaceMap = [
  [/bg-red-600/g, 'bg-aura-primary'],
  [/bg-red-700/g, 'bg-poly-primary'],
  [/bg-red-800/g, 'bg-aura-bg-2'],
  [/bg-red-500/g, 'bg-poly-secondary'],
  [/text-red-600/g, 'text-aura-primary'],
  [/text-red-700/g, 'text-poly-primary'],
  [/text-red-800/g, 'text-aura-heading'],
  [/text-red-500/g, 'text-poly-secondary'],
  [/border-red-600/g, 'border-aura-primary'],
  [/border-red-700/g, 'border-poly-primary'],
  [/border-red-500/g, 'border-aura-border'],
  [/hover:bg-red-600/g, 'hover:bg-aura-primary'],
  [/hover:bg-red-700/g, 'hover:bg-poly-primary'],
  [/hover:text-red-600/g, 'hover:text-aura-accent'],
  [/from-red-600/g, 'from-aura-primary'],
  [/from-red-700/g, 'from-poly-primary'],
  [/from-red-800/g, 'from-aura-bg-2'],
  [/to-red-600/g, 'to-aura-accent'],
  [/to-red-700/g, 'to-poly-secondary'],
  [/to-red-800/g, 'to-aura-bg-3'],
  [/ring-red-600/g, 'ring-aura-primary'],
  [/ring-red-500/g, 'ring-poly-primary'],
  [/focus:ring-red-600/g, 'focus:ring-aura-primary'],
  [/focus:border-red-600/g, 'focus:border-aura-primary'],
];

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css'];
const skipDirs = ['node_modules', '.next', '.git', 'build', 'dist', 'scripts'];

let filesWithChanges = [];
let totalReplacements = 0;

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (skipDirs.includes(file)) return;
      walkDirectory(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(fullPath);
      if (extensions.includes(ext)) {
        previewFile(fullPath);
      }
    }
  });
}

function previewFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const changes = [];
  
  replaceMap.forEach(([regex, replacement]) => {
    const matches = content.match(regex);
    if (matches) {
      matches.forEach(match => {
        changes.push({ from: match, to: replacement });
      });
    }
  });
  
  if (changes.length > 0) {
    filesWithChanges.push({ file: filePath, changes });
    totalReplacements += changes.length;
  }
}

function main() {
  console.log('👀 AION Color Preview');
  console.log('====================\n');
  console.log('Scanning for red colors that will be replaced...\n');
  
  const dirsToProcess = ['./frontend/src', './aion-static'];
  
  dirsToProcess.forEach(dir => {
    const fullPath = path.resolve(dir);
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Scanning: ${dir}`);
      walkDirectory(fullPath);
    }
  });
  
  console.log('\n====================');
  console.log('📊 Preview Results:\n');
  
  if (filesWithChanges.length === 0) {
    console.log('✨ No red colors found! Already using Polygon theme.');
  } else {
    console.log(`Files to be updated: ${filesWithChanges.length}`);
    console.log(`Total replacements: ${totalReplacements}\n`);
    
    console.log('Files with changes:\n');
    filesWithChanges.slice(0, 10).forEach(({ file, changes }) => {
      console.log(`📄 ${file}`);
      changes.slice(0, 3).forEach(({ from, to }) => {
        console.log(`   ${from} → ${to}`);
      });
      if (changes.length > 3) {
        console.log(`   ... and ${changes.length - 3} more`);
      }
      console.log('');
    });
    
    if (filesWithChanges.length > 10) {
      console.log(`... and ${filesWithChanges.length - 10} more files\n`);
    }
    
    console.log('💡 To apply these changes, run:');
    console.log('   npm run replace:colors\n');
  }
}

try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
