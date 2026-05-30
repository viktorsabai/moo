#!/bin/bash

# MOO Landing Page Deployment to Vercel
# This script prepares and deploys the site to Vercel

set -e

echo "🚀 MOO Landing Page - Vercel Deployment"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "❌ Git not initialized. Initializing..."
  git init
  git add .
  git commit -m "Initial commit: MOO landing page"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
  echo "❌ Git remote not configured."
  echo ""
  echo "To deploy to Vercel:"
  echo "1. Push your code to GitHub:"
  echo "   git remote add origin https://github.com/YOUR_USERNAME/moo-landing.git"
  echo "   git branch -M main"
  echo "   git push -u origin main"
  echo ""
  echo "2. Go to: https://vercel.com/new"
  echo "3. Import your GitHub repository"
  echo "4. Your site will be live!"
  exit 1
fi

echo "✓ Git configured"
echo ""
echo "To deploy:"
echo "1. Visit: https://vercel.com/new"
echo "2. Import from Git (select this repository)"
echo "3. Click Deploy"
echo ""
echo "Your site will be live at: https://YOUR-PROJECT.vercel.app"
