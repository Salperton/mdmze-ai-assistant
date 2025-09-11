'use client'

import { useState } from 'react'
import { ArrowLeft, ExternalLink, BookOpen, Filter } from 'lucide-react'
import Link from 'next/link'
import { insightsData, categories, Insight } from '@/data/insights'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredInsights, setFilteredInsights] = useState<Insight[]>(insightsData)

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredInsights(insightsData)
    } else {
      setFilteredInsights(insightsData.filter(insight => insight.category === category))
    }
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl md:text-3xl font-display font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
                Evidence-Based Insights
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <BookOpen className="w-4 h-4" />
              <span>{filteredInsights.length} Research Findings</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 max-w-7xl">
        {/* Introduction */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
            Research-Backed Parenting Strategies
          </h2>
          <p className="text-lg font-sans max-w-4xl mx-auto" style={{ color: 'rgb(17, 17, 17)' }}>
            Discover evidence-based parenting strategies backed by scientific research on child development, family dynamics, and effective parenting techniques. 
            Each insight is supported by peer-reviewed studies and presented in accessible language for practical application.
          </p>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl mx-auto">
            <p className="text-sm font-sans text-blue-800">
              <strong>Note:</strong> These insights are based on established research in child development and family psychology. 
              Individual results may vary, and these strategies should complement, not replace, professional guidance when needed.
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 mr-2" style={{ color: 'rgb(24, 64, 46)' }} />
            <h3 className="text-lg font-sans font-semibold" style={{ color: 'rgb(24, 64, 46)' }}>
              Filter by Category
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'text-white shadow-md'
                    : 'text-gray-700 bg-white hover:bg-gray-50 border border-gray-200'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? 'rgb(24, 64, 46)' : undefined
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight) => (
            <Card key={insight.id} className="h-full flex flex-col">
              <div className="flex-1">
                {/* Category Badge */}
                <div className="mb-3">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-sans font-medium"
                    style={{ 
                      backgroundColor: 'rgb(218, 129, 108)', 
                      color: 'white' 
                    }}
                  >
                    {insight.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-display font-semibold mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  {insight.title}
                </h3>

                {/* Summary */}
                <p className="text-sm font-sans mb-4 leading-relaxed" style={{ color: 'rgb(17, 17, 17)' }}>
                  {insight.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {insight.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-sans rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Citation */}
                <div className="text-xs font-sans text-gray-600 mb-4 italic">
                  {insight.citation}
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <a
                  href={insight.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-sans font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Read Full Study
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results Message */}
        {filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Filter className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-sans font-medium mb-2">No insights found</h3>
              <p className="text-sm">Try selecting a different category to see more research findings.</p>
            </div>
            <Button
              onClick={() => handleCategoryFilter('All')}
              variant="primary"
            >
              Show All Insights
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center py-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-display font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
              Stay Updated with Latest Research
            </h3>
            <p className="text-sm font-sans text-gray-600 mb-4">
              We regularly update our insights with the latest peer-reviewed research in child development and family psychology.
            </p>
            <Link href="/">
              <Button variant="primary">
                Back to AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
