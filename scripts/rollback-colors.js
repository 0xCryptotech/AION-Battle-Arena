#!/usr/bin/env node

/**
 * AION Color Rollback Script
 * Restore original red theme colors from Polygon purple theme
 * 
 * Usage: npm run rollback:colors
 */

const fs = require('fs');
const path = require('path');

// Rollback map - reverse of replace-colors.js
const rollbackMap = [
  // Background colors
  [/bg-aura-primary/g, 'bg-red-600'],
  [/bg-poly-primary/g, 'bg-red-700'],
  [/bg-aura-bg-2/g, 'bg-red-800'],
  [/bg-poly-secondary/g, 'bg-red-500'],
  
  // Text colors
  [/text-aura-primary/g, 'text-red-600'],
  [/text-poly-primary/g, 'text-red-700'],
  [/text-aura-heading/g, 'text-red-800'],
  [/text-poly-secondary/g, 'text-red-500'],
  
  // Border colors
  [/border-aura-primary/g, 'border-red-600'],
  [/border-poly-primary/g, 'border-red-700'],
  [/border-aura-border/g, 'border-red-500'],
  
  // Hover states
  [/hover:bg-aura-primary/g, 'hover:bg-red-600'],
  [/hover:bg-poly-primary/g, 'hover:bg-red-700'],
  [/hover:text-aura-accent/g, 'hover:text-red-600'],
  
  // Gradient from/to
  [/from-aura-primary/g, 'from-red-600'],
  [/from-poly-primary/g, 'from-red-700'],
  [/from-aura-bg-2/g, 'from-red-800'],
  [/to-aura-accent/g, 'to-red-600'],
  [/to-poly-secondary/g, 'to-red-700'],
  [/to-aura-bg-3/g, 'to-red-800'],
  
  // Ring colors
  [/ring-aura-primary/g, 'ring-red-600'],
  [/ring-poly-primary/g, 'ring-red-500'],
  
  // Focus states
  [/focus:ring-aura-primary/g, 'focus:ring-red-600'],
  [/focus:border-aura-primary/g, 'focus:border-red-600'],
];

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css'];
const skipDirs = ['node_modules', '.next', '.git', 'build', 'dist', 'scripts'];

let filesProcessed = 0;
let filesUpdated = 0;

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
        processFile(fullPath);
      }
    }
  });
}

function processFile(filePath) {
  filesProcessed++;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let replacements = 0;
  
  rollbackMap.forEach(([regex, replacement]) => {
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, replacement);
      replacements += matches.length;
    }
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesUpdated++;
    console.log(`🔁 Restored: ${filePath} (${replacements} rollbacks)`);
  }
}

function main() {
  console.log('🔄 AION Color Rollback Script');
  console.log('=============================\n');
  console.log('Restoring original red theme colors...\n');
  
  const startTime = Date.now();
  
  const dirsToProcess = [
    './frontend/src',
    './aion-static',
  ];
  
  dirsToProcess.forEach(dir => {
    const fullPath = path.resolve(dir);
    if (fs.existsSync(fullPath)) {
      console.log(`📁 Processing: ${dir}`);
      walkDirectory(fullPath);
    } else {
      console.log(`⚠️  Directory not found: ${dir}`);
    }
  });
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('\n=============================');
  console.log('✅ Color rollback complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Files restored: ${filesUpdated}`);
  console.log(`   Duration: ${duration}s`);
  console.log('\n❤️  All colors restored to original red theme!');
}

try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
