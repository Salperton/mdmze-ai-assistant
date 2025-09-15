'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, ExternalLink, BookOpen, Search, Filter } from 'lucide-react'

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

export default function ArchivePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([])

  const categories = [
    'all',
    'Child Development',
    'Parenting Strategies', 
    'Mental Health',
    'Education',
    'Family Dynamics',
    'Health & Wellness',
    'Behavior Management',
    'Communication'
  ]

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    filterArticles()
  }, [articles, searchTerm, selectedCategory])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles?status=archived&limit=50')
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

  const filterArticles = () => {
    let filtered = articles

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory)
    }

    setFilteredArticles(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
            <p className="text-lg" style={{ color: 'rgb(24, 64, 46)' }}>Loading archived articles...</p>
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
            Article Archive
          </h1>
          <p className="text-lg font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
            Browse all our evidence-based articles on parenting and child development
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgb(218, 129, 108)' }} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{ 
                  borderColor: 'rgb(218, 129, 108)'
                }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: 'rgb(218, 129, 108)' }} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{ 
                  borderColor: 'rgb(218, 129, 108)'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(218, 129, 108)' }}>
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
              {searchTerm || selectedCategory !== 'all' ? 'No Articles Found' : 'No Archived Articles Yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Check back soon for archived articles.'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: 'rgb(218, 129, 108)' }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
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

        {/* Featured Link */}
        <div className="mt-12 text-center">
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
            View Featured Articles
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
