# MDMZE AI Family Support Assistant

An AI-powered family support tool that provides instant guidance on family matters, parenting, childcare, and divorce-related questions. Features psychological assessments and OpenAI-powered chat assistance.

## Features

- 🤖 **AI Chat Interface** - Get instant, personalized advice using OpenAI's GPT models
- 🧠 **Psychological Assessments** - Take evidence-based assessments for tailored guidance
  - **DASS-21 Scale** - Depression, Anxiety, and Stress assessment
  - **Parenting Stress Assessment** - Evaluate parenting challenges
  - **Relationship Satisfaction** - Assess relationship quality
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, professional interface matching MDMZE branding
- ⚡ **Fast & Secure** - Built with Next.js 14.2.32 and deployed on Vercel

## Latest Update (v0.1.1)
- ✅ Added DASS-21 psychological assessment scale
- ✅ Enhanced AI integration with assessment results
- ✅ Updated to Next.js 14.2.32
- ✅ Fixed security vulnerabilities

## Getting Started

### Prerequisites

- Node.js 18+ (if running locally)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mdmze-ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your OpenAI API key in Vercel's environment variables
4. Deploy!

The app will be automatically deployed and available at your Vercel URL.

## Project Structure

```
src/
├── app/
│   ├── api/chat/          # OpenAI API integration
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/
│   ├── ChatInterface.tsx  # AI chat component
│   ├── AssessmentScales.tsx # Psychological assessments
│   └── Header.tsx         # Navigation header
└── lib/                   # Utility functions
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - AI-powered responses
- **Lucide React** - Beautiful icons
- **Vercel** - Deployment platform

## Customization

### Adding New Assessments

To add new psychological assessments, edit `src/components/AssessmentScales.tsx` and add new assessment objects to the `assessments` array.

### Modifying AI Behavior

Update the system prompt in `src/app/api/chat/route.ts` to change how the AI responds.

### Styling

The app uses Tailwind CSS with custom colors defined in `tailwind.config.js`. Modify the color scheme to match your branding.

## Support

For questions or support, contact MDMZE Family Support Center.

## License

This project is proprietary to MDMZE Family Support Center.
