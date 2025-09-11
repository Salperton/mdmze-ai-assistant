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
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI Family Support
            <span className="text-primary-600 block">Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant, personalized advice on family matters, childcare, and divorce. 
            Our AI-powered assistant combines psychological insights with expert guidance 
            to help you navigate life's challenges.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card text-center">
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">AI Chat Support</h3>
            <p className="text-gray-600">
              Get instant answers to your family and parenting questions with our advanced AI assistant.
            </p>
          </div>
          
          <div className="card text-center">
            <Brain className="w-12 h-12 text-secondary-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Psychological Assessments</h3>
            <p className="text-gray-600">
              Take personalized assessments to better understand your situation and get tailored advice.
            </p>
          </div>
          
          <div className="card text-center">
            <Users className="w-12 h-12 text-accent-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
            <p className="text-gray-600">
              Access evidence-based strategies and professional insights for family challenges.
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="card">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                  activeTab === 'chat'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab('assessment')}
                className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
                  activeTab === 'assessment'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
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
        <footer className="text-center py-8 mt-12 text-gray-600">
          <p>Powered by MDMZE Family Support Center</p>
          <p className="text-sm mt-2">
            This AI assistant provides general guidance and should not replace professional counseling.
          </p>
        </footer>
      </div>
    </main>
  )
}
