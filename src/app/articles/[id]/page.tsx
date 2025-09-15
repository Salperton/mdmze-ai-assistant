'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, ExternalLink, BookOpen, Clock, User } from 'lucide-react'

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

export default function ArticlePage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchArticle()
  }, [params.id])

  const fetchArticle = async () => {
    try {
      const response = await fetch(`/api/articles/${params.id}`)
      const data = await response.json()
      
      if (data.success) {
        setArticle(data.data)
      } else {
        setError(data.message || 'Article not found')
      }
    } catch (err) {
      setError('Failed to fetch article')
      console.error('Error fetching article:', err)
    } finally {
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

  const formatContent = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-6" style="color: rgb(24, 64, 46)">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-4 mt-8" style="color: rgb(24, 64, 46)">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-3 mt-6" style="color: rgb(24, 64, 46)">$1</h3>')
      .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/^\* (.*$)/gim, '<li class="mb-2">$1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: rgb(24, 64, 46)">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-4" style="color: rgb(17, 17, 17)">')
      .replace(/\n/g, '<br>')
      .replace(/^(.*)$/gim, '<p class="mb-4" style="color: rgb(17, 17, 17)">$1</p>')
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
            <p className="text-lg" style={{ color: 'rgb(24, 64, 46)' }}>Loading article...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !article) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
              Article Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'The article you\'re looking for doesn\'t exist or has been removed.'}
            </p>
            <Link 
              href="/featured"
              className="inline-flex items-center px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: 'rgb(218, 129, 108)' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Featured Articles
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/featured" 
            className="inline-flex items-center text-sm font-sans font-medium hover:opacity-75 transition-opacity mb-4"
            style={{ color: 'rgb(24, 64, 46)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Featured Articles
          </Link>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <span 
              className="inline-block px-3 py-1 text-sm font-medium rounded-full"
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
          <h1 className="text-4xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm mb-6" style={{ color: 'rgb(17, 17, 17)' }}>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(article.publishDate)}
            </div>
            
            {article.tags.length > 0 && (
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-1" />
                {article.tags.join(', ')}
              </div>
            )}

            {article.references.length > 0 && (
              <div className="flex items-center">
                <ExternalLink className="w-4 h-4 mr-1" />
                {article.references.length} research source{article.references.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
            className="article-content"
          />
        </div>

        {/* References Section */}
        {article.references.length > 0 && (
          <Card className="mb-8">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
                References
              </h3>
              <div className="space-y-4">
                {article.references.map((reference, index) => (
                  <div key={reference.id} className="border-l-4 pl-4" style={{ borderColor: 'rgb(218, 129, 108)' }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                          {reference.title}
                        </h4>
                        <p className="text-sm mb-2 italic" style={{ color: 'rgb(17, 17, 17)' }}>
                          "{reference.quote}"
                        </p>
                        <div className="flex items-center text-xs" style={{ color: 'rgb(17, 17, 17)' }}>
                          <span className="font-medium">{reference.domain}</span>
                          {reference.publishedDate && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{formatDate(reference.publishedDate)}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 p-2 rounded-lg hover:opacity-75 transition-opacity"
                        style={{ backgroundColor: 'rgb(218, 129, 108)' }}
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Related Articles */}
        <div className="text-center">
          <Link 
            href="/featured"
            className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg border-2 hover:opacity-75 transition-opacity"
            style={{ 
              borderColor: 'rgb(218, 129, 108)', 
              color: 'rgb(24, 64, 46)',
              backgroundColor: 'transparent'
            }}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            View More Articles
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
