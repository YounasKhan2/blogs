#!/usr/bin/env node
/**
 * YAML Cleanup Script for Content Files
 * Fixes common YAML parsing issues in blog content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', 'content');

function fixYamlFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Fix array syntax - convert from ["item1", "item2"] to proper YAML array
    content = content.replace(/^(\s*\w+:\s*)\[(.*?)\]$/gm, (match, prefix, items) => {
      // Parse the items and convert to YAML array format
      const itemsArray = items.split(',').map(item => {
        return item.trim().replace(/^["']|["']$/g, ''); // Remove quotes
      });
      
      const yamlArray = itemsArray.map(item => `  - "${item}"`).join('\n');
      modified = true;
      return `${prefix}\n${yamlArray}`;
    });

    // Fix Windows line endings that cause "true\r" issues
    content = content.replace(/:\s*true\r\n/g, ': true\n');
    content = content.replace(/:\s*false\r\n/g, ': false\n');
    content = content.replace(/:\s*"([^"]+)"\r\n/g, ': "$1"\n');

    // Fix carriage returns at end of quoted strings
    content = content.replace(/"\r$/gm, '"');

    if (modified || content.includes('\r')) {
      // Normalize all line endings to LF
      content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${path.relative(contentDir, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  let fixedCount = 0;

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fixedCount += processDirectory(fullPath);
    } else if (item.endsWith('.md')) {
      if (fixYamlFile(fullPath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

function main() {
  console.log('🔧 Starting YAML cleanup...\n');
  
  if (!fs.existsSync(contentDir)) {
    console.error(`Content directory not found: ${contentDir}`);
    process.exit(1);
  }

  const fixedCount = processDirectory(contentDir);
  
  console.log(`\n✅ Cleanup complete! Fixed ${fixedCount} files.`);
  console.log('\n🔄 Run "npm run build" to verify the fixes.');
}

main();
