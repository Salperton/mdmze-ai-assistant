'use client'

import { useState } from 'react'
import HeaderVariant from '@/components/HeaderVariant'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { MessageCircle, Brain, Users, BookOpen, ArrowRight, Search } from 'lucide-react'
import Link from 'next/link'

type HeaderVariant = 'default' | 'minimal' | 'centered' | 'modern'
type LayoutVariant = 'default' | 'grid' | 'cards' | 'sidebar'

export default function DesignTestPage() {
  const [headerVariant, setHeaderVariant] = useState<HeaderVariant>('default')
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>('default')

  const renderLayout = () => {
    switch (layoutVariant) {
      case 'grid':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageCircle, title: "AI Chat Support", desc: "Get personalized parenting advice", color: "rgb(24, 64, 46)" },
              { icon: Brain, title: "Psychological Assessments", desc: "Take evidence-based assessments", color: "rgb(218, 129, 108)" },
              { icon: Users, title: "Expert Guidance", desc: "Access research insights", color: "rgb(24, 64, 46)" },
              { icon: BookOpen, title: "NCBI Research", desc: "Browse real research studies", color: "rgb(218, 129, 108)" },
              { icon: Search, title: "Research AI Chat", desc: "Evidence-based answers from research", color: "rgb(24, 64, 46)" }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <item.icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" style={{ color: item.color }} />
                <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>{item.title}</h3>
                <p className="font-sans mb-4" style={{ color: 'rgb(17, 17, 17)' }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-6">
            {[
              { icon: MessageCircle, title: "AI Chat Support", desc: "Get personalized parenting advice", color: "rgb(24, 64, 46)" },
              { icon: Brain, title: "Psychological Assessments", desc: "Take evidence-based assessments", color: "rgb(218, 129, 108)" },
              { icon: Users, title: "Expert Guidance", desc: "Access research insights", color: "rgb(24, 64, 46)" },
              { icon: BookOpen, title: "NCBI Research", desc: "Browse real research studies", color: "rgb(218, 129, 108)" },
              { icon: Search, title: "Research AI Chat", desc: "Evidence-based answers from research", color: "rgb(24, 64, 46)" }
            ].map((item, index) => (
              <Card key={index} className="flex items-center space-x-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
                  <item.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-200" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-display font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>{item.title}</h3>
                  <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>{item.desc}</p>
                </div>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" style={{ color: item.color }} />
              </Card>
            ))}
          </div>
        )

      case 'sidebar':
        return (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <Card className="p-6">
                <h3 className="text-lg font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { icon: MessageCircle, title: "Start Chat", color: "rgb(24, 64, 46)" },
                    { icon: Brain, title: "Take Assessment", color: "rgb(218, 129, 108)" },
                    { icon: Users, title: "View Insights", color: "rgb(24, 64, 46)" },
                    { icon: BookOpen, title: "Browse Research", color: "rgb(218, 129, 108)" }
                  ].map((item, index) => (
                    <button key={index} className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      <span className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>{item.title}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
            <div className="lg:w-2/3">
              <Card className="p-8">
                <h2 className="text-3xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
                  Welcome to Mind Maze
                </h2>
                <p className="text-lg font-sans mb-6" style={{ color: 'rgb(17, 17, 17)' }}>
                  Your comprehensive family support center with AI-powered guidance, 
                  psychological assessments, and evidence-based research insights.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
                    <h4 className="font-display font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>AI Chat</h4>
                    <p className="text-sm font-sans" style={{ color: 'rgb(17, 17, 17)' }}>Get personalized advice</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
                    <h4 className="font-display font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>Assessments</h4>
                    <p className="text-sm font-sans" style={{ color: 'rgb(17, 17, 17)' }}>Take psychological tests</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )

      default:
        return (
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
              Mind Maze
              <span className="block" style={{ color: 'rgb(24, 64, 46)' }}>Family Support Center</span>
            </h1>
            <p className="text-xl font-sans max-w-3xl mx-auto mb-8" style={{ color: 'rgb(17, 17, 17)' }}>
              Your comprehensive family support center with AI-powered guidance, 
              psychological assessments, and evidence-based research insights.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MessageCircle, title: "AI Chat Support", desc: "Get personalized parenting advice", color: "rgb(24, 64, 46)" },
                { icon: Brain, title: "Psychological Assessments", desc: "Take evidence-based assessments", color: "rgb(218, 129, 108)" },
                { icon: Users, title: "Expert Guidance", desc: "Access research insights", color: "rgb(24, 64, 46)" },
                { icon: BookOpen, title: "NCBI Research", desc: "Browse real research studies", color: "rgb(218, 129, 108)" },
              { icon: Search, title: "Research AI Chat", desc: "Evidence-based answers from research", color: "rgb(24, 64, 46)" }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <item.icon className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" style={{ color: item.color }} />
                  <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>{item.title}</h3>
                  <p className="font-sans mb-4" style={{ color: 'rgb(17, 17, 17)' }}>{item.desc}</p>
                  <div className="inline-flex items-center text-sm font-sans font-medium" style={{ color: item.color }}>
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen">
      <HeaderVariant variant={headerVariant} />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 max-w-7xl">
        {/* Design Controls */}
        <Card className="mb-8 p-6">
          <h2 className="text-2xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
            Design Testing Controls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
                Header Variants
              </h3>
              <div className="space-y-2">
                {(['default', 'minimal', 'centered', 'modern'] as HeaderVariant[]).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setHeaderVariant(variant)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      headerVariant === variant ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: headerVariant === variant ? 'rgb(24, 64, 46)' : 'rgb(249, 245, 234)'
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
                Layout Variants
              </h3>
              <div className="space-y-2">
                {(['default', 'grid', 'cards', 'sidebar'] as LayoutVariant[]).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setLayoutVariant(variant)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      layoutVariant === variant ? 'text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    style={{
                      backgroundColor: layoutVariant === variant ? 'rgb(24, 64, 46)' : 'rgb(249, 245, 234)'
                    }}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgb(218, 129, 108)' }}>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => {
                  setHeaderVariant('default')
                  setLayoutVariant('default')
                }}
                className="btn-secondary"
              >
                Reset to Original
              </Button>
              <Link href="/" className="btn-primary">
                Back to Main Site
              </Link>
            </div>
          </div>
        </Card>

        {/* Live Preview */}
        <div className="mb-8">
          <h3 className="text-lg font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
            Live Preview
          </h3>
          <div className="border-2 border-dashed rounded-lg p-4" style={{ borderColor: 'rgb(218, 129, 108)' }}>
            {renderLayout()}
          </div>
        </div>
      </div>
    </main>
  )
}
