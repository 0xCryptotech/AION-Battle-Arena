#!/usr/bin/env node

/**
 * AION Color Replacement Script
 * Automatically replaces red theme colors with Polygon purple theme
 * 
 * Usage: npm run replace:colors
 */

const fs = require('fs');
const path = require('path');

// Color replacement map
const replaceMap = [
  // Background colors
  [/bg-red-600/g, 'bg-aura-primary'],
  [/bg-red-700/g, 'bg-poly-primary'],
  [/bg-red-800/g, 'bg-aura-bg-2'],
  [/bg-red-500/g, 'bg-poly-secondary'],
  
  // Text colors
  [/text-red-600/g, 'text-aura-primary'],
  [/text-red-700/g, 'text-poly-primary'],
  [/text-red-800/g, 'text-aura-heading'],
  [/text-red-500/g, 'text-poly-secondary'],
  
  // Border colors
  [/border-red-600/g, 'border-aura-primary'],
  [/border-red-700/g, 'border-poly-primary'],
  [/border-red-500/g, 'border-aura-border'],
  
  // Hover states
  [/hover:bg-red-600/g, 'hover:bg-aura-primary'],
  [/hover:bg-red-700/g, 'hover:bg-poly-primary'],
  [/hover:text-red-600/g, 'hover:text-aura-accent'],
  
  // Gradient from/to
  [/from-red-600/g, 'from-aura-primary'],
  [/from-red-700/g, 'from-poly-primary'],
  [/from-red-800/g, 'from-aura-bg-2'],
  [/to-red-600/g, 'to-aura-accent'],
  [/to-red-700/g, 'to-poly-secondary'],
  [/to-red-800/g, 'to-aura-bg-3'],
  
  // Ring colors
  [/ring-red-600/g, 'ring-aura-primary'],
  [/ring-red-500/g, 'ring-poly-primary'],
  
  // Focus states
  [/focus:ring-red-600/g, 'focus:ring-aura-primary'],
  [/focus:border-red-600/g, 'focus:border-aura-primary'],
];

// File extensions to process
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css'];

// Directories to skip
const skipDirs = ['node_modules', '.next', '.git', 'build', 'dist', 'scripts'];

let filesProcessed = 0;
let filesUpdated = 0;

/**
 * Walk through directory recursively
 */
function walkDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (skipDirs.includes(file)) {
        return;
      }
      walkDirectory(fullPath);
    } else if (stat.isFile()) {
      // Process files with matching extensions
      const ext = path.extname(fullPath);
      if (extensions.includes(ext)) {
        processFile(fullPath);
      }
    }
  });
}

/**
 * Process a single file
 */
function processFile(filePath) {
  filesProcessed++;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let replacements = 0;
  
  // Apply all replacements
  replaceMap.forEach(([regex, replacement]) => {
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, replacement);
      replacements += matches.length;
    }
  });
  
  // Write back if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesUpdated++;
    console.log(`✨ Updated: ${filePath} (${replacements} replacements)`);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🎨 AION Color Replacement Script');
  console.log('================================\n');
  console.log('Replacing red theme with Polygon purple theme...\n');
  
  const startTime = Date.now();
  
  // Process different directories
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
  
  console.log('\n================================');
  console.log('✅ Color replacement complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Files processed: ${filesProcessed}`);
  console.log(`   Files updated: ${filesUpdated}`);
  console.log(`   Duration: ${duration}s`);
  console.log('\n💜 All red colors replaced with Polygon purple theme!');
}

// Run the script
try {
  main();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
