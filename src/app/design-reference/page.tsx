'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Download, Eye, Code, Palette, Layout, Component } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DesignModal from '@/components/DesignModal'

interface WebflowDesign {
  id: string
  name: string
  type: 'layout' | 'component' | 'section' | 'page'
  url: string
  html: string
  css: string
  components: any[]
  designTokens: {
    colors: { [key: string]: string }
    typography: { [key: string]: any }
    spacing: { [key: string]: string }
    borderRadius: { [key: string]: string }
    shadows: { [key: string]: string }
  }
  metadata: {
    title: string
    description: string
    category: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }
}

export default function DesignReferencePage() {
  const [designs, setDesigns] = useState<WebflowDesign[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedDesign, setSelectedDesign] = useState<WebflowDesign | null>(null)
  const [extractionUrl, setExtractionUrl] = useState('')
  const [extractionType, setExtractionType] = useState('all')

  const loadDesigns = async () => {
    try {
      console.log('Loading designs...')
      setLoading(true)
      // In a real implementation, this would fetch from your database
      // For now, we'll use mock data
      setDesigns([])
      console.log('Designs loaded (empty array)')
    } catch (err) {
      setError('Failed to load designs')
      console.error('Error loading designs:', err)
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  const extractDesigns = async () => {
    if (!extractionUrl) {
      alert('Please enter a Webflow URL')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/webflow/designs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webflowUrl: extractionUrl,
          extractionType: extractionType
        })
      })

      const data = await response.json()

      if (data.success) {
        setDesigns(data.data.designs)
        alert(`Successfully extracted ${data.data.designs.length} designs!`)
      } else {
        setError(data.message || 'Failed to extract designs')
      }
    } catch (err) {
      setError('Failed to extract designs')
      console.error('Error extracting designs:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.metadata.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.metadata.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = selectedType === 'all' || design.type === selectedType
    
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'layout': return <Layout className="w-4 h-4" />
      case 'component': return <Component className="w-4 h-4" />
      case 'section': return <Layout className="w-4 h-4" />
      case 'page': return <Layout className="w-4 h-4" />
      default: return <Layout className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'layout': return 'bg-blue-100 text-blue-800'
      case 'component': return 'bg-green-100 text-green-800'
      case 'section': return 'bg-purple-100 text-purple-800'
      case 'page': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  console.log('Render state:', { loading, designs: designs.length })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 py-8 px-4" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
              Design Reference Library
            </h1>
            <p className="text-lg" style={{ color: 'rgb(17, 17, 17)' }}>
              Extract and manage Webflow designs for consistent implementation
            </p>
          </div>

          {/* Extraction Form */}
          <Card className="mb-8 p-6">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
              Extract Designs from Webflow
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                  Webflow URL
                </label>
                <input
                  type="url"
                  value={extractionUrl}
                  onChange={(e) => setExtractionUrl(e.target.value)}
                  placeholder="https://your-site.webflow.io"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  style={{ borderColor: 'rgb(218, 129, 108)' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                  Extraction Type
                </label>
                <select
                  value={extractionType}
                  onChange={(e) => setExtractionType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  style={{ borderColor: 'rgb(218, 129, 108)' }}
                >
                  <option value="all">All Designs</option>
                  <option value="layouts">Layouts Only</option>
                  <option value="components">Components Only</option>
                  <option value="sections">Sections Only</option>
                  <option value="pages">Pages Only</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <Button
                  onClick={extractDesigns}
                  className="w-full"
                  style={{ backgroundColor: 'rgb(218, 129, 108)' }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Extract Designs
                </Button>
              </div>
            </div>
          </Card>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgb(17, 17, 17)' }} />
                <input
                  type="text"
                  placeholder="Search designs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  style={{ borderColor: 'rgb(218, 129, 108)' }}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" style={{ color: 'rgb(218, 129, 108)' }} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                style={{ borderColor: 'rgb(218, 129, 108)' }}
              >
                <option value="all">All Types</option>
                <option value="layout">Layouts</option>
                <option value="component">Components</option>
                <option value="section">Sections</option>
                <option value="page">Pages</option>
              </select>
            </div>
          </div>

          {/* Designs Grid */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {filteredDesigns.length === 0 ? (
            <div className="text-center py-12">
              <Palette className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgb(218, 129, 108)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                No designs found
              </h3>
              <p className="text-gray-600 mb-4">
                Extract designs from a Webflow URL to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigns.map((design) => (
                <Card key={design.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(design.type)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(design.type)}`}>
                        {design.type}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedDesign(design)}
                        className="p-2 hover:bg-gray-100 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-100 rounded"
                        title="View Code"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                    {design.name}
                  </h3>
                  
                  <p className="text-sm mb-4" style={{ color: 'rgb(17, 17, 17)' }}>
                    {design.metadata.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {design.metadata.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-gray-500">
                    {new Date(design.metadata.createdAt).toLocaleDateString()}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Design Modal */}
      {selectedDesign && (
        <DesignModal
          design={selectedDesign}
          isOpen={!!selectedDesign}
          onClose={() => setSelectedDesign(null)}
        />
      )}

      <Footer />
    </main>
  )
}
