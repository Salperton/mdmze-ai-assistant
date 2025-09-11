'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Brain, Palette, Code, Users, Heart } from 'lucide-react'

export default function Dashboard() {
  const [designTokens, setDesignTokens] = useState([])
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(false)

  const extractDesignData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/webflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey: '1ab7168d3c3f306f227a91405fa2d4a1c0d7894ec0896134aa801270ee311d03',
          siteId: '6419edfba04104bd365d36a3'
        })
      })
      
      const data = await response.json()
      if (response.ok) {
        setDesignTokens(data.designTokens)
        setComponents(data.components)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    extractDesignData()
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
      {/* Header */}
      <header className="py-6 px-8" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
            MDMZE AI Assistant
          </h1>
          <p className="text-lg" style={{ color: 'rgb(17, 17, 17)' }}>
            Your comprehensive platform for parental advice, psychological assessments, and design system management
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 pb-12">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* AI Chat */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-8 h-8 mr-3" style={{ color: 'rgb(24, 64, 46)' }} />
              <h3 className="text-xl font-display font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
                AI Chat Assistant
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgb(17, 17, 17)' }}>
              Get instant, personalized advice for family, childcare, and divorce matters.
            </p>
            <button 
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: 'rgb(24, 64, 46)' }}
            >
              Start Chat
            </button>
          </div>

          {/* Assessment Scales */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
            <div className="flex items-center mb-4">
              <Brain className="w-8 h-8 mr-3" style={{ color: 'rgb(218, 129, 108)' }} />
              <h3 className="text-xl font-display font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
                Assessment Scales
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgb(17, 17, 17)' }}>
              Take psychological assessments for tailored insights and recommendations.
            </p>
            <button 
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: 'rgb(218, 129, 108)' }}
            >
              Take Assessment
            </button>
          </div>

          {/* Design System */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-neutral-100">
            <div className="flex items-center mb-4">
              <Palette className="w-8 h-8 mr-3" style={{ color: 'rgb(243, 157, 153)' }} />
              <h3 className="text-xl font-display font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
                Design System
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: 'rgb(17, 17, 17)' }}>
              Manage your design tokens, colors, and component library.
            </p>
            <button 
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-200"
              style={{ backgroundColor: 'rgb(243, 157, 153)' }}
            >
              View Design System
            </button>
          </div>
        </div>

        {/* Design Tokens */}
        {designTokens.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center mb-6">
              <Code className="w-6 h-6 mr-3" style={{ color: 'rgb(24, 64, 46)' }} />
              <h2 className="text-2xl font-display font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
                Design Tokens ({designTokens.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {designTokens.map((token: any, index) => (
                <div key={index} className="p-4 border rounded-lg" style={{ borderColor: 'rgb(229, 231, 235)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm" style={{ color: 'rgb(24, 64, 46)' }}>
                      {token.name}
                    </span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgb(243, 157, 153)', color: 'white' }}>
                      {token.type}
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
                    {token.value}
                  </div>
                  {token.type === 'color' && (
                    <div 
                      className="w-full h-4 rounded mt-2 border"
                      style={{ backgroundColor: token.value }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Components */}
        {components.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Users className="w-6 h-6 mr-3" style={{ color: 'rgb(24, 64, 46)' }} />
              <h2 className="text-2xl font-display font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
                Site Components ({components.length})
              </h2>
            </div>
            <div className="space-y-4">
              {components.map((component: any, index) => (
                <div key={index} className="p-4 border rounded-lg" style={{ borderColor: 'rgb(229, 231, 235)' }}>
                  <div className="font-medium mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                    {component.name}
                  </div>
                  <div className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                      {JSON.stringify(component.styles, null, 2)}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'rgb(24, 64, 46)' }}></div>
            <p className="mt-4" style={{ color: 'rgb(17, 17, 17)' }}>Loading your design system...</p>
          </div>
        )}
      </div>
    </div>
  )
}
