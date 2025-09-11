'use client'

import { useState } from 'react'
import { MessageCircle, Brain, Users, Heart } from 'lucide-react'
import ChatInterface from '@/components/ChatInterface'
import AssessmentScales from '@/components/AssessmentScales'
import Header from '@/components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'assessment'>('chat')

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 py-12 rounded-xl" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
            AI Family Support
            <span className="block" style={{ color: 'rgb(24, 64, 46)' }}>Assistant</span>
          </h1>
          <p className="text-xl font-sans max-w-3xl mx-auto mb-8" style={{ color: 'rgb(17, 17, 17)' }}>
            Get instant, personalized advice on family matters, childcare, and divorce. 
            Our AI-powered assistant combines psychological insights with expert guidance 
            to help you navigate life's challenges.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="card text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgb(24, 64, 46)' }} />
            <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>AI Chat Support</h3>
            <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
              Get instant answers to your family and parenting questions with our advanced AI assistant.
            </p>
          </div>
          
          <div className="card text-center">
            <Brain className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgb(218, 129, 108)' }} />
            <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>Psychological Assessments</h3>
            <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
              Take personalized assessments to better understand your situation and get tailored advice.
            </p>
          </div>
          
          <div className="card text-center">
            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: 'rgb(24, 64, 46)' }} />
            <h3 className="text-xl font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>Expert Guidance</h3>
            <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
              Access evidence-based strategies and professional insights for family challenges.
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          <div className="card">
            {/* Tab Navigation */}
            <div className="flex border-b border-neutral-200 mb-6">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-4 text-center font-sans font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`flex-1 py-3 px-4 text-center font-sans font-medium transition-colors ${
                  activeTab === 'assessment'
                    ? 'text-primary-500 border-b-2 border-primary-500'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <Brain className="w-5 h-5 inline mr-2" />
                Assessments
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'chat' ? (
              <ChatInterface />
            ) : (
              <AssessmentScales />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 mt-12 text-neutral-600 font-sans">
          <p>Powered by MDMZE Family Support Center</p>
          <p className="text-sm mt-2">
            This AI assistant provides general guidance and should not replace professional counseling.
          </p>
        </footer>
      </div>
    </main>
  )
}
