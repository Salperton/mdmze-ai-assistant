'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ExternalLink, Calendar, Users, BookOpen, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface PubMedArticle {
  uid: string
  title: string
  abstract: string
  authors: string[]
  journal: string
  pubDate: string
  doi?: string
  pmid: string
  keywords?: string[]
}

interface NCBIResponse {
  articles: PubMedArticle[]
  totalCount: number
  searchTerm: string
}

const categories = [
  "All",
  "Tantrums",
  "Communication", 
  "Sleep",
  "Screen Time",
  "Family Time",
  "Emotional Health",
  "Physical Development",
  "Language Development"
]

export default function NCBIResearchPage() {
  const [articles, setArticles] = useState<PubMedArticle[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  const fetchArticles = async (category: string, search: string = '') => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams()
      if (category !== 'All') params.append('category', category)
      if (search) params.append('search', search)
      params.append('limit', '20')

      const response = await fetch(`/api/ncbi?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch research articles')
      }

      const data: NCBIResponse = await response.json()
      setArticles(data.articles)
      setTotalCount(data.totalCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles(selectedCategory, searchTerm)
  }, [selectedCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchArticles(selectedCategory, searchTerm)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchTerm('') // Clear search when changing category
  }

  const formatAuthors = (authors: string[]) => {
    if (authors.length === 0) return 'Unknown Authors'
    if (authors.length <= 3) return authors.join(', ')
    return `${authors.slice(0, 3).join(', ')} et al.`
  }

  const formatDate = (dateStr: string) => {
    // Simple date formatting - in production you'd want more robust parsing
    return dateStr.replace(/<[^>]*>/g, '').trim() || 'Unknown Date'
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 max-w-7xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-sans font-medium hover:text-primary-600 transition-colors"
            style={{ color: 'rgb(24, 64, 46)' }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12 py-12 rounded-xl" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{ color: 'rgb(24, 64, 46)' }}>
            NCBI Research Database
          </h1>
          <p className="text-xl font-sans max-w-3xl mx-auto mb-8" style={{ color: 'rgb(17, 17, 17)' }}>
            Access real-time research studies from PubMed on parenting, child development, and family psychology
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="card mb-8">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for specific research topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Search
              </button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Filter className="w-5 h-5 mt-1" style={{ color: 'rgb(24, 64, 46)' }} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? 'rgb(24, 64, 46)' : 'rgb(249, 245, 234)'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
            {loading ? (
              'Searching...'
            ) : (
              <>
                Found <span className="font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>{totalCount}</span> research articles
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </>
            )}
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin" style={{ color: 'rgb(24, 64, 46)' }} />
            <span className="ml-2 font-sans" style={{ color: 'rgb(17, 17, 17)' }}>Loading research articles...</span>
          </div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article.uid} className="card hover:shadow-xl transition-shadow">
                {/* Article Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 font-sans" style={{ color: 'rgb(24, 64, 46)' }}>
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span className="truncate font-sans">{article.journal}</span>
                  </div>
                  <div className="flex items-center text-sm mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                    <Users className="w-4 h-4 mr-1" />
                    <span className="truncate font-sans">{formatAuthors(article.authors)}</span>
                  </div>
                  <div className="flex items-center text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="font-sans">{formatDate(article.pubDate)}</span>
                  </div>
                </div>

                {/* Abstract */}
                <div className="mb-4">
                  <p className="text-sm line-clamp-4 font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
                    {article.abstract}
                  </p>
                </div>

                {/* Keywords */}
                {article.keywords && article.keywords.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {article.keywords.slice(0, 5).map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full font-sans"
                          style={{ 
                            backgroundColor: 'rgb(249, 245, 234)', 
                            color: 'rgb(24, 64, 46)' 
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${article.pmid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on PubMed
                  </a>
                  {article.doi && (
                    <a
                      href={`https://doi.org/${article.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-4 py-2 text-sm"
                    >
                      DOI
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgb(218, 129, 108)' }} />
            <h3 className="text-xl font-semibold mb-2 font-sans" style={{ color: 'rgb(24, 64, 46)' }}>No articles found</h3>
            <p className="font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
              Try adjusting your search terms or selecting a different category.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-12 card">
          <h3 className="text-lg font-semibold mb-3 font-sans" style={{ color: 'rgb(24, 64, 46)' }}>About NCBI Research Database</h3>
          <div className="space-y-2 font-sans" style={{ color: 'rgb(17, 17, 17)' }}>
            <p>
              This database provides access to real-time research studies from PubMed, 
              the world's largest database of biomedical literature.
            </p>
            <p>
              All articles are filtered to show only high-quality, evidence-based research 
              including randomized controlled trials, systematic reviews, and meta-analyses 
              published in recent years.
            </p>
            <p className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
              Data provided by the National Center for Biotechnology Information (NCBI) 
              at the U.S. National Library of Medicine.
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
