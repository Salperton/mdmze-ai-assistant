'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, ExternalLink, BookOpen, Clock } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'

interface Article {
  id: string
  title: string
  content: string
  summary: string
  publishDate: string
  status: string
  createdAt: string
  updatedAt: string
  tags: string[]
  category: string
  references: Array<{
    id: string
    title: string
    url: string
    quote: string
    domain: string
    publishedDate?: string
  }>
}

export default function FeaturedPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Add a small delay to ensure the component is fully mounted
    setTimeout(() => {
      fetchArticles()
    }, 100)
  }, [])

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles...')
      const response = await fetch(`${window.location.origin}/api/articles?status=featured&limit=6`)
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('API Response:', data)
      
      if (data.success) {
        console.log('Setting articles:', data.data)
        setArticles(data.data)
      } else {
        console.error('API Error:', data.message)
        setError(data.message || 'Failed to fetch articles')
      }
    } catch (err) {
      console.error('Fetch Error:', err)
      setError(`Failed to fetch articles: ${err.message}`)
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  console.log('Render state:', { loading, articles: articles.length, error, mounted })

  if (!mounted) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-lg" style={{ color: 'rgb(24, 64, 46)' }}>Initializing...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white animate-pulse" />
            </div>
            <p className="text-lg" style={{ color: 'rgb(24, 64, 46)' }}>Loading featured articles...</p>
            <p className="text-sm mt-2" style={{ color: 'rgb(17, 17, 17)' }}>Debug: Loading={loading.toString()}, Articles={articles.length}</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchArticles}
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: 'rgb(218, 129, 108)' }}
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-sans font-medium hover:opacity-75 transition-opacity mb-4"
            style={{ color: 'rgb(24, 64, 46)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl font-display font-bold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
            Featured Articles
          </h1>
          <p className="text-lg font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
            Evidence-based parenting and child development articles, updated weekly
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
              No Featured Articles Yet
            </h3>
            <p className="text-gray-600">
              Check back soon for new evidence-based articles on parenting and child development.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="h-full flex flex-col">
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span 
                      className="inline-block px-3 py-1 text-xs font-medium rounded-full"
                      style={{ 
                        backgroundColor: 'rgb(249, 245, 234)', 
                        color: 'rgb(24, 64, 46)',
                        border: '1px solid rgb(218, 129, 108)'
                      }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold mb-3 line-clamp-2" style={{ color: 'rgb(24, 64, 46)' }}>
                    {article.title}
                  </h2>

                  {/* Summary */}
                  <p className="text-sm mb-4 flex-1 line-clamp-3" style={{ color: 'rgb(17, 17, 17)' }}>
                    {article.summary}
                  </p>

                  {/* Meta Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs" style={{ color: 'rgb(17, 17, 17)' }}>
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDate(article.publishDate)}
                    </div>
                    
                    {article.tags.length > 0 && (
                      <div className="flex items-center text-xs" style={{ color: 'rgb(17, 17, 17)' }}>
                        <Tag className="w-3 h-3 mr-1" />
                        {article.tags.slice(0, 3).join(', ')}
                        {article.tags.length > 3 && ` +${article.tags.length - 3} more`}
                      </div>
                    )}

                    {article.references.length > 0 && (
                      <div className="flex items-center text-xs" style={{ color: 'rgb(17, 17, 17)' }}>
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {article.references.length} research source{article.references.length !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>

                  {/* Read More Button */}
                  <Link 
                    href={`/articles/${article.id}`}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'rgb(218, 129, 108)' }}
                  >
                    Read Article
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Archive Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/archive"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg border-2 hover:opacity-75 transition-opacity"
            style={{ 
              borderColor: 'rgb(218, 129, 108)', 
              color: 'rgb(24, 64, 46)',
              backgroundColor: 'transparent'
            }}
          >
            <Clock className="w-4 h-4 mr-2" />
            View All Articles Archive
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
