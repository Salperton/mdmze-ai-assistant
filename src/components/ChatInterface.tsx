'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, MessageCircle, Sparkles, Star, Heart } from 'lucide-react'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface AssessmentResults {
  assessmentId: string
  assessmentTitle: string
  score: number
  maxScore: number
  scoreRange: any
  answers: Record<string, number>
  completedAt: string
  dassScores?: {
    depression: number
    anxiety: number
    stress: number
  }
}

interface ChatInterfaceProps {
  assessmentResults?: AssessmentResults | null
}

export default function ChatInterface({ assessmentResults }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize messages on client side only
  useEffect(() => {
    setIsClient(true)
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your AI Family Support Assistant. I'm here to help with questions about family matters, childcare, divorce, and parenting. How can I assist you today?",
        role: 'assistant',
        timestamp: new Date()
      }
    ])
  }, [])

  // Handle assessment results
  useEffect(() => {
    if (assessmentResults && isClient) {
      let assessmentMessage = `I just completed the ${assessmentResults.assessmentTitle}. My score was ${assessmentResults.score}/${assessmentResults.maxScore} (${assessmentResults.scoreRange?.label}). ${assessmentResults.scoreRange?.description}`
      
      // Add DASS-21 subscale information if available
      if (assessmentResults.dassScores) {
        assessmentMessage += ` My subscale scores are: Depression: ${assessmentResults.dassScores.depression}, Anxiety: ${assessmentResults.dassScores.anxiety}, Stress: ${assessmentResults.dassScores.stress}.`
      }
      
      assessmentMessage += ` Can you provide personalized feedback and recommendations based on these results?`
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: assessmentMessage,
        role: 'user',
        timestamp: new Date()
      }])
      
      // Automatically send to AI
      handleAIMessage(assessmentMessage)
    }
  }, [assessmentResults, isClient])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAIMessage = async (message: string) => {
    if (isLoading) return

    setShowWelcome(false)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setShowWelcome(false)
    
    await handleAIMessage(input)
  }

  return (
    <div className="flex flex-col h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Family Support Assistant</h3>
            <p className="text-green-100 text-sm">Here to help with parenting & family matters</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-container">
        {/* Welcome Message */}
        {showWelcome && messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome to your AI Assistant!</h4>
            <p className="text-gray-600 mb-4">I'm here to help with family, parenting, and relationship questions.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setInput("How can I help my child with bedtime routines?")}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                Bedtime routines
              </button>
              <button
                onClick={() => setInput("What are some effective discipline strategies?")}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                Discipline strategies
              </button>
              <button
                onClick={() => setInput("How do I handle tantrums?")}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                Tantrum handling
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`flex items-start space-x-3 max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-md'
                }`}
              >
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Star className="w-4 h-4" />}
              </div>
              
              {/* Message Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm ${
                  message.role === 'user'
                    ? 'bg-green-600 text-white rounded-br-md'
                    : 'bg-gray-50 text-gray-800 rounded-bl-md border border-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {isClient && (
                  <p className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start animate-fadeIn">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center shadow-md">
                <Star className="w-4 h-4" />
              </div>
              <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about family, parenting, or relationships..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to send • AI responses are for guidance only
        </p>
      </div>
    </div>
  )
}
