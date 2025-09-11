#!/bin/bash

# MDMZE AI Assistant - Deployment Script
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
fi

# Add all files
echo "📦 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit: MDMZE AI Family Support Assistant"

echo "✅ Files committed successfully!"
echo ""
echo "Next steps:"
echo "1. Create a GitHub repository at https://github.com/new"
echo "2. Copy the repository URL"
echo "3. Run these commands:"
echo "   git remote add origin YOUR_GITHUB_REPO_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Then deploy to Vercel at https://vercel.com"
echo "5. Add your OpenAI API key in Vercel's environment variables"
echo ""
echo "🎉 Your AI Family Support Assistant is ready to deploy!"
