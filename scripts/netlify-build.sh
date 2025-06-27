#!/bin/bash

echo "🔧 Pre-build verification..."

# Check Node.js version
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Verify package.json exists
if [ ! -f "package.json" ]; then
  echo "❌ package.json not found"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Generate Contentlayer content
echo "📝 Generating content..."
npx contentlayer2 build

# Run the actual build
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"
