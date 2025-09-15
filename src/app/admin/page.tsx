'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, ExternalLink, BookOpen, CheckCircle, Clock, Eye } from 'lucide-react'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Article {
  id: string
  title: string
  content: string
  summary: string
  publishDate: string
  status: 'draft' | 'featured' | 'archived'
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

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<'draft' | 'featured' | 'archived'>('draft')

  useEffect(() => {
    fetchArticles()
  }, [selectedStatus])

  const fetchArticles = async () => {
    try {
      const response = await fetch(`/api/articles?status=${selectedStatus}&limit=50`)
      const data = await response.json()
      
      if (data.success) {
        setArticles(data.data)
      } else {
        setError(data.message || 'Failed to fetch articles')
      }
    } catch (err) {
      setError('Failed to fetch articles')
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateArticleStatus = async (articleId: string, newStatus: 'draft' | 'featured' | 'archived') => {
    try {
      const response = await fetch(`/api/admin/articles/${articleId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      const data = await response.json()
      
      if (data.success) {
        // Refresh articles
        fetchArticles()
      } else {
        console.error('Failed to update article status:', data.message)
      }
    } catch (err) {
      console.error('Error updating article status:', err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'rgb(156, 163, 175)' // gray
      case 'featured':
        return 'rgb(34, 197, 94)' // green
      case 'archived':
        return 'rgb(107, 114, 128)' // gray-500
      default:
        return 'rgb(156, 163, 175)'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <Clock className="w-4 h-4" />
      case 'featured':
        return <CheckCircle className="w-4 h-4" />
      case 'archived':
        return <Eye className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
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
            <p className="text-lg" style={{ color: 'rgb(24, 64, 46)' }}>Loading articles...</p>
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
            Article Management
          </h1>
          <p className="text-lg font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
            Manage article status and review content before publication
          </p>
        </div>

        {/* Status Filter */}
        <div className="mb-8">
          <div className="flex space-x-4">
            {(['draft', 'featured', 'archived'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedStatus === status
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                style={{
                  backgroundColor: selectedStatus === status ? getStatusColor(status) : 'transparent',
                  border: selectedStatus === status ? 'none' : `1px solid ${getStatusColor(status)}`
                }}
              >
                <span className="capitalize">{status}</span>
                <span className="ml-2 text-xs">({articles.length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        {error ? (
          <div className="text-center py-12">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchArticles}
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: 'rgb(218, 129, 108)' }}
            >
              Try Again
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
              No {selectedStatus} Articles
            </h3>
            <p className="text-gray-600">
              {selectedStatus === 'draft' 
                ? 'No draft articles available. New articles are generated weekly.'
                : `No ${selectedStatus} articles found.`
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <Card key={article.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      {/* Status Badge */}
                      <div className="flex items-center mb-2">
                        <span 
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full mr-3"
                          style={{ 
                            backgroundColor: getStatusColor(article.status) + '20',
                            color: getStatusColor(article.status)
                          }}
                        >
                          {getStatusIcon(article.status)}
                          <span className="ml-1 capitalize">{article.status}</span>
                        </span>
                        <span 
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full"
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
                      <h2 className="text-xl font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                        {article.title}
                      </h2>

                      {/* Summary */}
                      <p className="text-sm mb-4 line-clamp-2" style={{ color: 'rgb(17, 17, 17)' }}>
                        {article.summary}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-xs mb-4" style={{ color: 'rgb(17, 17, 17)' }}>
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(article.publishDate)}
                        </div>
                        
                        {article.tags.length > 0 && (
                          <div className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {article.tags.slice(0, 3).join(', ')}
                            {article.tags.length > 3 && ` +${article.tags.length - 3} more`}
                          </div>
                        )}

                        {article.references.length > 0 && (
                          <div className="flex items-center">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {article.references.length} sources
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link 
                        href={`/articles/${article.id}`}
                        className="px-3 py-1 text-xs font-medium rounded border hover:opacity-75 transition-opacity"
                        style={{ 
                          borderColor: 'rgb(218, 129, 108)', 
                          color: 'rgb(24, 64, 46)',
                          backgroundColor: 'transparent'
                        }}
                      >
                        Preview
                      </Link>
                      
                      {article.status === 'draft' && (
                        <button
                          onClick={() => updateArticleStatus(article.id, 'featured')}
                          className="px-3 py-1 text-xs font-medium rounded text-white hover:opacity-75 transition-opacity"
                          style={{ backgroundColor: 'rgb(34, 197, 94)' }}
                        >
                          Publish
                        </button>
                      )}
                      
                      {article.status === 'featured' && (
                        <button
                          onClick={() => updateArticleStatus(article.id, 'archived')}
                          className="px-3 py-1 text-xs font-medium rounded text-white hover:opacity-75 transition-opacity"
                          style={{ backgroundColor: 'rgb(107, 114, 128)' }}
                        >
                          Archive
                        </button>
                      )}
                      
                      {article.status === 'archived' && (
                        <button
                          onClick={() => updateArticleStatus(article.id, 'featured')}
                          className="px-3 py-1 text-xs font-medium rounded text-white hover:opacity-75 transition-opacity"
                          style={{ backgroundColor: 'rgb(34, 197, 94)' }}
                        >
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
