#!/bin/bash

# Script to push AION Battle Arena to GitHub
# Repository: https://github.com/0xCryptotech/AION-Battle-Arena

echo "🚀 Pushing AION Battle Arena to GitHub..."
echo ""

# Check if we have commits to push
if git diff-index --quiet HEAD --; then
    echo "✅ No local changes to commit"
else
    echo "⚠️  You have uncommitted changes. Please commit them first."
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo "🌐 View your repository at: https://github.com/0xCryptotech/AION-Battle-Arena"
else
    echo ""
    echo "❌ Push failed. Please check your credentials."
    echo ""
    echo "💡 To fix authentication issues:"
    echo "1. Make sure you're logged in with account: 0xCryptotech"
    echo "2. Use GitHub Desktop (easiest): https://desktop.github.com/"
    echo "3. Or configure Git credentials:"
    echo "   git config --global user.name '0xCryptotech'"
    echo "   git config --global credential.helper osxkeychain"
fi
