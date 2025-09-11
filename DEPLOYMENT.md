# Deployment Guide - MDMZE AI Family Support Assistant

## 🚀 Quick Deployment to Vercel

### Step 1: Get Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the API key (starts with `sk-`)

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository"
3. Name it `mdmze-ai-assistant`
4. Make it public or private (your choice)
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### Step 3: Upload Files to GitHub
I'll help you push the files to GitHub using terminal commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: MDMZE AI Family Support Assistant"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mdmze-ai-assistant.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository `mdmze-ai-assistant`
4. Vercel will auto-detect it's a Next.js project
5. Add environment variable:
   - Name: `OPENAI_API_KEY`
   - Value: Your OpenAI API key from Step 1
6. Click "Deploy"

### Step 5: Test Your Deployment
1. Vercel will give you a URL like `https://mdmze-ai-assistant.vercel.app`
2. Visit the URL to test your app
3. Try the AI chat and assessments

## 🔧 Integration with Your Existing Website

### Option 1: Embed as iframe
Add this to your Webflow site:
```html
<iframe 
  src="https://your-vercel-url.vercel.app" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

### Option 2: Link to New Page
Add a button/link on your main website that opens the AI assistant in a new tab.

### Option 3: Subdomain
Set up a subdomain like `ai.mdmze.com` that points to your Vercel deployment.

## 🎨 Customization

### Colors and Branding
Edit `tailwind.config.js` to match your exact brand colors:
```javascript
colors: {
  primary: {
    // Your brand colors here
  }
}
```

### Content
- Update the header in `src/components/Header.tsx`
- Modify the hero section in `src/app/page.tsx`
- Add your logo and branding

### AI Behavior
Edit the system prompt in `src/app/api/chat/route.ts` to customize how the AI responds.

## 📱 Features Included

✅ **AI Chat Interface** - OpenAI-powered responses
✅ **Psychological Assessments** - 2 assessment scales included
✅ **Responsive Design** - Works on all devices
✅ **Modern UI** - Professional, clean interface
✅ **Fast Loading** - Optimized for performance
✅ **Secure** - Environment variables for API keys

## 🔒 Security Notes

- Your OpenAI API key is stored securely in Vercel's environment variables
- No sensitive data is stored in the browser
- All API calls are server-side only

## 📞 Support

If you need help with deployment or customization, I'm here to assist!

## Next Steps

1. Deploy the app following the steps above
2. Test all features thoroughly
3. Customize the branding to match your site
4. Add more assessment scales if needed
5. Monitor usage and gather feedback

Your AI Family Support Assistant is ready to help families get the guidance they need! 🎉
