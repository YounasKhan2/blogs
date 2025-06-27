#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🚀 Pre-deployment verification for Netlify...\n');

const checks = [];

// Check required files
const requiredFiles = [
  'package.json',
  'next.config.ts',
  'netlify.toml',
  'tsconfig.json'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    checks.push({ file, status: '✅', message: 'Found' });
  } else {
    checks.push({ file, status: '❌', message: 'Missing' });
  }
});

// Check environment variables
const envExample = fs.existsSync('.env.local.example');
const envLocal = fs.existsSync('.env.local');

checks.push({ 
  file: '.env.local.example', 
  status: envExample ? '✅' : '❌', 
  message: envExample ? 'Found' : 'Missing' 
});

checks.push({ 
  file: '.env.local', 
  status: envLocal ? '✅' : '⚠️', 
  message: envLocal ? 'Found (remember to set in Netlify)' : 'Missing (create for local dev)' 
});

// Check package.json scripts
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasNextDep = packageJson.dependencies && packageJson.dependencies.next;
const hasBuildScript = packageJson.scripts && packageJson.scripts.build;

checks.push({ 
  file: 'Next.js dependency', 
  status: hasNextDep ? '✅' : '❌', 
  message: hasNextDep ? `Version ${packageJson.dependencies.next}` : 'Missing' 
});

checks.push({ 
  file: 'Build script', 
  status: hasBuildScript ? '✅' : '❌', 
  message: hasBuildScript ? 'Found' : 'Missing' 
});

// Check content directory
const contentExists = fs.existsSync('content');
const postsExists = fs.existsSync('content/posts');

checks.push({ 
  file: 'Content directory', 
  status: contentExists ? '✅' : '❌', 
  message: contentExists ? 'Found' : 'Missing' 
});

checks.push({ 
  file: 'Posts directory', 
  status: postsExists ? '✅' : '❌', 
  message: postsExists ? 'Found' : 'Missing' 
});

// Check for potential issues
const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
const hasStandalone = nextConfig.includes("output: 'standalone'");

if (hasStandalone) {
  checks.push({ 
    file: 'Next.js config', 
    status: '⚠️', 
    message: 'Contains standalone output (may need adjustment for Netlify)' 
  });
} else {
  checks.push({ 
    file: 'Next.js config', 
    status: '✅', 
    message: 'Compatible with Netlify' 
  });
}

// Display results
console.log('Pre-deployment checklist:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.file}: ${check.message}`);
});

const errors = checks.filter(check => check.status === '❌').length;
const warnings = checks.filter(check => check.status === '⚠️').length;

console.log('\n' + '='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('🎉 All checks passed! Ready for Netlify deployment.');
  console.log('\nNext steps:');
  console.log('1. Commit and push your changes to Git');
  console.log('2. Connect your repository to Netlify');
  console.log('3. Set environment variables in Netlify dashboard');
  console.log('4. Deploy!');
} else if (errors === 0) {
  console.log(`⚠️  ${warnings} warning(s) found. Review before deploying.`);
} else {
  console.log(`❌ ${errors} error(s) found. Fix before deploying.`);
  process.exit(1);
}
