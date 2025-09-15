'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Brain, UserCircle, Loader2, ArrowLeft, ExternalLink, BookOpen, Calendar, Users, FileText, Search, MessageCircle, Sparkles } from 'lucide-react'

import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  sources?: ResearchArticle[]
  followUpQuestions?: string[]
  isFollowUp?: boolean
}

interface ResearchArticle {
  id: string
  title: string
  abstract: string
  authors: string
  journal: string
  year: string
  pmid: string
  doi?: string
  url: string
}

export default function ResearchChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate follow-up questions based on the user's question
  const generateFollowUpQuestions = (userQuestion: string, answer: string = '', isFollowUp: boolean = false): string[] => {
    if (isFollowUp) {
      // For follow-up questions, provide more personal, supportive follow-ups
      const personalFollowUps = [
        'Can you help me with a specific situation?',
        'What if this approach doesn\'t work for my family?',
        'How do I know if I\'m on the right track?',
        'What should I do if things get worse?',
        'Can you give me more specific steps?',
        'What if my partner has a different approach?',
        'How do I stay consistent with this?',
        'What are some warning signs to watch for?'
      ]
      return personalFollowUps.slice(0, 4)
    } else {
      // For preset questions, provide research-focused follow-ups
      const question = userQuestion.toLowerCase()
      const followUps: string[] = []

      if (question.includes('tantrum') || question.includes('temper')) {
        followUps.push(
          "What are the warning signs before a tantrum starts?",
          "How can I prevent tantrums in public places?",
          "When should I seek professional help for tantrums?",
          "What's the difference between normal and concerning tantrum behavior?"
        )
      } else if (question.includes('sleep') || question.includes('bedtime')) {
        followUps.push(
          "How much sleep does my child need at different ages?",
          "What if my child refuses to go to bed?",
          "How can I handle night wakings?",
          "What are the effects of insufficient sleep on children?"
        )
      } else if (question.includes('screen') || question.includes('digital')) {
        followUps.push(
          "What are the recommended screen time limits by age?",
          "How can I make screen time more educational?",
          "What are the signs of screen addiction in children?",
          "How does screen time affect sleep and behavior?"
        )
      } else if (question.includes('discipline') || question.includes('behavior')) {
        followUps.push(
          "What's the difference between discipline and punishment?",
          "How can I use positive reinforcement effectively?",
          "What are age-appropriate consequences?",
          "How do I handle aggressive behavior in children?"
        )
      } else if (question.includes('development') || question.includes('learning')) {
        followUps.push(
          "What are the key developmental milestones?",
          "How can I support my child's learning at home?",
          "What are signs of developmental delays?",
          "How does play contribute to development?"
        )
      } else {
        // Generic follow-up questions
        followUps.push(
          "What does the latest research say about this?",
          "Are there any age-specific considerations?",
          "What are common mistakes parents make?",
          "When should I consult a professional?"
        )
      }

      return followUps.slice(0, 4) // Limit to 4 follow-up questions
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input.trim()
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Detect if this is a follow-up question
      const isFollowUp = currentInput.includes('my child') || 
                        currentInput.includes('my son') || 
                        currentInput.includes('my daughter') || 
                        currentInput.includes('I have') || 
                        currentInput.includes('I am') || 
                        currentInput.includes('we are') || 
                        currentInput.includes('our family') ||
                        currentInput.includes('my situation') ||
                        currentInput.includes('my experience') ||
                        currentInput.includes('what should I do') ||
                        currentInput.includes('how can I help') ||
                        currentInput.includes('my kid') ||
                        currentInput.includes('my toddler') ||
                        currentInput.includes('my baby')
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: 'assistant',
        timestamp: new Date(),
        sources: data.sources || [],
        followUpQuestions: generateFollowUpQuestions(currentInput, data.answer, isFollowUp),
        isFollowUp
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while searching for research. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFollowUpClick = async (question: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/rag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: question }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      // Detect if this is a follow-up question
      const isFollowUp = question.includes('my child') || 
                        question.includes('my son') || 
                        question.includes('my daughter') || 
                        question.includes('I have') || 
                        question.includes('I am') || 
                        question.includes('we are') || 
                        question.includes('our family') ||
                        question.includes('my situation') ||
                        question.includes('my experience') ||
                        question.includes('what should I do') ||
                        question.includes('how can I help') ||
                        question.includes('my kid') ||
                        question.includes('my toddler') ||
                        question.includes('my baby')
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: 'assistant',
        timestamp: new Date(),
        sources: data.sources || [],
        followUpQuestions: generateFollowUpQuestions(question, data.answer, isFollowUp),
        isFollowUp
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while searching for research. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Auto-submit the form
    const userMessage: Message = {
      id: Date.now().toString(),
      content: suggestion,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Submit the question automatically
    fetch('/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: suggestion }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to get response')
      }
      return response.json()
    })
    .then(data => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        role: 'assistant',
        timestamp: new Date(),
        sources: data.sources || [],
        followUpQuestions: generateFollowUpQuestions(suggestion, '', false)
      }
      setMessages(prev => [...prev, assistantMessage])
    })
    .catch(error => {
      console.error('Error:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while searching for research. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Function to format content with proper bold formatting for structured sections
  const formatContent = (content: string, isFollowUp: boolean = false) => {
    // Define pastel colors for research citations (removed bright pink)
    const pastelColors = [
      'rgb(255, 240, 245)', // Very light pink
      'rgb(173, 216, 230)', // Light blue
      'rgb(144, 238, 144)', // Light green
      'rgb(255, 218, 185)', // Peach
      'rgb(221, 160, 221)', // Plum
      'rgb(255, 228, 196)', // Bisque
      'rgb(176, 224, 230)', // Powder blue
      'rgb(240, 248, 255)', // Alice blue
    ]

    // For follow-up questions, use simple formatting without structured sections
    if (isFollowUp) {
      return content
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
    }

    // For preset questions, use structured formatting with research citations
    let formattedContent = content
      .replace(/\(Research (\d+)\)/g, (match, number) => {
        const colorIndex = (parseInt(number) - 1) % pastelColors.length
        const color = pastelColors[colorIndex]
        return `<span class="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full text-gray-700 cursor-pointer hover:opacity-80 transition-opacity" style="background-color: ${color}; margin: 0 2px;" onclick="document.getElementById('research-sources').scrollIntoView({ behavior: 'smooth' })">${number}</span>`
      })
      .replace(/\(Study (\d+)\)/g, (match, number) => {
        const colorIndex = (parseInt(number) - 1) % pastelColors.length
        const color = pastelColors[colorIndex]
        return `<span class="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full text-gray-700 cursor-pointer hover:opacity-80 transition-opacity" style="background-color: ${color}; margin: 0 2px;" onclick="document.getElementById('research-sources').scrollIntoView({ behavior: 'smooth' })">${number}</span>`
      })

    // Apply structured formatting with more padding above Overview
    formattedContent = formattedContent
      .replace(/\*\*Overview\*\*/g, '<div class="mb-6 mt-8"><h3 class="text-lg font-bold mb-3" style="color: rgb(24, 64, 46)">Overview</h3>')
      .replace(/\*\*Description\*\*/g, '<div class="mb-6"><h3 class="text-lg font-bold mb-3" style="color: rgb(24, 64, 46)">Description</h3>')
      .replace(/\*\*Key Points\*\*/g, '<div class="mb-6"><h3 class="text-lg font-bold mb-3" style="color: rgb(24, 64, 46)">Key Points</h3><ul class="list-disc pl-6 space-y-2">')
      .replace(/\*\*Conclusion\*\*/g, '</ul></div><div class="mb-6 mt-4"><h3 class="text-lg font-bold mb-3" style="color: rgb(24, 64, 46)">Conclusion</h3>')
      .replace(/•\s/g, '<li class="mb-1">')
      .replace(/\n\n/g, '</div><div class="mb-6">')
      .replace(/\n/g, '<br>')

    return formattedContent
  }

  const renderSources = (sources: ResearchArticle[]) => {
    if (!sources || sources.length === 0) return null

    // Define the same pastel colors as in formatContent
    const pastelColors = [
      'rgb(255, 240, 245)', // Very light pink
      'rgb(173, 216, 230)', // Light blue
      'rgb(144, 238, 144)', // Light green
      'rgb(255, 218, 185)', // Peach
      'rgb(221, 160, 221)', // Plum
      'rgb(255, 228, 196)', // Bisque
      'rgb(176, 224, 230)', // Powder blue
      'rgb(240, 248, 255)', // Alice blue
    ]

    return (
      <div id="research-sources" className="mt-4 px-4 py-3 rounded-lg" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
        <h4 className="text-sm font-semibold mb-4 flex items-center" style={{ color: 'rgb(24, 64, 46)' }}>
          <BookOpen className="w-4 h-4 mr-2" />
          Research Sources ({sources.length})
        </h4>
        <div className="space-y-4 mx-4">
          {sources.map((source, index) => {
            const colorIndex = index % pastelColors.length
            const color = pastelColors[colorIndex]
            
            return (
              <div key={source.id} className="text-xs">
                <div className="flex items-start justify-between mb-2">
                  <span 
                    className="font-medium text-xs px-2 py-1 rounded" 
                    style={{ backgroundColor: color, color: 'rgb(17, 17, 17)' }}
                  >
                    {sources.length === 1 ? 'Study' : `Study ${index + 1}`}
                  </span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs hover:underline flex items-center cursor-pointer"
                    style={{ color: 'rgb(24, 64, 46)' }}
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(source.url, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    View <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <h5 
                  className="font-semibold mb-2 cursor-pointer hover:underline leading-tight" 
                  style={{ color: 'rgb(24, 64, 46)' }}
                  onClick={() => window.open(source.url, '_blank', 'noopener,noreferrer')}
                >
                  {source.title}
                </h5>
                <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: 'rgb(17, 17, 17)' }}>
                  <span className="flex items-center">
                    <FileText className="w-3 h-3 mr-1" />
                    {source.journal}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {source.year}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderFollowUpQuestions = (followUpQuestions: string[]) => {
    if (!followUpQuestions || followUpQuestions.length === 0) return null

    return (
      <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: 'rgb(218, 129, 108)', backgroundColor: 'rgb(249, 245, 234)' }}>
        <h4 className="text-sm font-semibold mb-3 flex items-center" style={{ color: 'rgb(24, 64, 46)' }}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Related Questions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {followUpQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleFollowUpClick(question)}
              className="text-left p-3 text-sm rounded-lg border hover:shadow-md transition-all group"
              style={{ 
                borderColor: 'rgb(218, 129, 108)',
                backgroundColor: 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(24, 64, 46)'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.color = 'rgb(17, 17, 17)'
              }}
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Navigation */}
        <div className="p-4 border-b" style={{ borderColor: 'rgb(218, 129, 108)' }}>
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-sans font-medium hover:opacity-75 transition-opacity"
              style={{ color: 'rgb(24, 64, 46)' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4" style={{ color: 'rgb(218, 129, 108)' }} />
              <span className="text-sm font-sans font-medium" style={{ color: 'rgb(24, 64, 46)' }}>
                Research-Powered AI
              </span>
            </div>
          </div>
        </div>

        {/* Chat Header */}
        <div className="p-6 text-center" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
          <h1 className="text-3xl font-display font-bold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
            Research-Powered AI Chat
          </h1>
          <p className="text-lg font-sans max-w-2xl mx-auto" style={{ color: 'rgb(17, 17, 17)' }}>
            Get evidence-based parenting advice backed by real research from PubMed and DOAJ. 
            Every response is grounded in scientific literature.
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                Ask a Research Question
              </h3>
              <p className="text-sm font-sans mb-6" style={{ color: 'rgb(17, 17, 17)' }}>
                Try asking about child development, parenting strategies, or family challenges. 
                I'll search real research to give you evidence-based answers.
              </p>
              <div className="grid md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                {[
                  "How can I help my child with tantrums?",
                  "What's the best way to establish bedtime routines?",
                  "How does screen time affect child development?",
                  "What are effective discipline strategies?"
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="p-3 text-left text-sm rounded-lg border hover:shadow-md transition-all group"
                    style={{ 
                      borderColor: 'rgb(218, 129, 108)',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(24, 64, 46)'
                      e.currentTarget.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white'
                      e.currentTarget.style.color = 'rgb(17, 17, 17)'
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl px-4 py-3 rounded-lg ${
                  message.role === 'user'
                    ? 'text-white'
                    : 'text-gray-900'
                }`}
                style={{
                  backgroundColor: message.role === 'user' 
                    ? 'rgb(24, 64, 46)' 
                    : 'white',
                  border: message.role === 'assistant' ? '1px solid rgb(218, 129, 108)' : 'none'
                }}
              >
                <div className="flex items-start space-x-2">
                  {message.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium opacity-75">
                        {message.role === 'user' ? 'You' : 'Research AI'}
                      </span>
                      <span className="text-xs opacity-75">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <div 
                        className="whitespace-pre-wrap font-sans leading-relaxed"
                        dangerouslySetInnerHTML={{ 
                          __html: formatContent(message.content, message.isFollowUp) 
                        }}
                      />
                    </div>
                    {message.sources && renderSources(message.sources)}
                    {message.followUpQuestions && renderFollowUpQuestions(message.followUpQuestions)}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
                      <UserCircle className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-3xl px-4 py-3 rounded-lg bg-white border" style={{ borderColor: 'rgb(218, 129, 108)' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
                    <Brain className="w-3 h-3 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'rgb(218, 129, 108)' }} />
                    <span className="text-sm font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
                      Searching research databases...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t p-4" style={{ borderColor: 'rgb(218, 129, 108)' }}>
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a research question about parenting or child development..."
                className="w-full px-4 py-3 pr-12 rounded-lg border focus:outline-none focus:ring-2 focus:ring-opacity-50 font-sans"
                style={{
                  borderColor: 'rgb(218, 129, 108)',
                  // focusRingColor: 'rgb(218, 129, 108)' // Not a valid CSS property
                }}
                disabled={isLoading}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgb(218, 129, 108)' }} />
            </div>
            <Button
              // type="submit" // Not a valid prop for Button component
              disabled={!input.trim() || isLoading}
              className="btn-primary px-6 py-3 flex items-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send</span>
            </Button>
          </form>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}