#!/bin/bash

echo "🚀 Setting up MDMZE AI Assistant with Webflow API Integration..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Run: brew install node"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Webflow API Configuration
WEBFLOW_API_KEY=your_webflow_api_key_here
WEBFLOW_SITE_ID=your_webflow_site_id_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
EOF
    echo "✅ Created .env.local file. Please update it with your actual API keys."
else
    echo "✅ .env.local already exists"
fi

# Make MCP server executable
chmod +x mcp-server.js

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual API keys"
echo "2. Get your Webflow API key from: https://webflow.com/dashboard"
echo "3. Get your Webflow Site ID from your project settings"
echo "4. Run: npm run dev"
echo "5. Visit: http://localhost:3000/webflow-extractor"
echo ""
echo "For MCP integration:"
echo "1. Update mcp-config.json with your API keys"
echo "2. Run: node mcp-server.js"
echo ""
