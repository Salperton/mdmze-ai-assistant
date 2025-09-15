'use client'

import { useState } from 'react'
import { X, Code, Copy, Download, Palette, Eye } from 'lucide-react'
import Button from '@/components/ui/Button'

interface DesignModalProps {
  design: {
    id: string
    name: string
    type: string
    html: string
    css: string
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
    }
  }
  isOpen: boolean
  onClose: () => void
}

export default function DesignModal({ design, isOpen, onClose }: DesignModalProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css' | 'tokens'>('preview')

  if (!isOpen) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const downloadDesign = () => {
    const content = `/* ${design.name} */
/* Generated from Webflow Design Reference */

${design.css}

${design.html}`
    
    const blob = new Blob([content], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${design.name.toLowerCase().replace(/\s+/g, '-')}.css`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'rgb(24, 64, 46)' }}>
              {design.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {design.metadata.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          {[
            { id: 'preview', label: 'Preview', icon: Eye },
            { id: 'html', label: 'HTML', icon: Code },
            { id: 'css', label: 'CSS', icon: Code },
            { id: 'tokens', label: 'Design Tokens', icon: Palette }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[60vh]">
          {activeTab === 'preview' && (
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This is how the design will look when implemented
                </p>
              </div>
              <div 
                className="border rounded-lg p-4"
                style={{ 
                  borderColor: 'rgb(218, 129, 108)',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <style dangerouslySetInnerHTML={{ __html: design.css }} />
                <div dangerouslySetInnerHTML={{ __html: design.html }} />
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">HTML Code</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(design.html)}
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadDesign}
                    size="sm"
                    style={{ backgroundColor: 'rgb(218, 129, 108)' }}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{design.html}</code>
              </pre>
            </div>
          )}

          {activeTab === 'css' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">CSS Code</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => copyToClipboard(design.css)}
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    onClick={downloadDesign}
                    size="sm"
                    style={{ backgroundColor: 'rgb(218, 129, 108)' }}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{design.css}</code>
              </pre>
            </div>
          )}

          {activeTab === 'tokens' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Design Tokens</h3>
              
              {/* Colors */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  Colors
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(design.designTokens.colors).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: value }}
                      />
                      <div>
                        <div className="text-sm font-medium">{key}</div>
                        <div className="text-xs text-gray-500">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  Typography
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Fonts</div>
                    <div className="text-sm text-gray-600">
                      {Array.isArray(design.designTokens.typography.fonts) 
                        ? design.designTokens.typography.fonts.join(', ')
                        : 'Not specified'
                      }
                    </div>
                  </div>
                  {design.designTokens.typography.sizes && (
                    <div>
                      <div className="text-sm font-medium mb-1">Sizes</div>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(design.designTokens.typography.sizes).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Spacing */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  Spacing
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(design.designTokens.spacing).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Border Radius */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  Border Radius
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {Object.entries(design.designTokens.borderRadius).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shadows */}
              <div>
                <h4 className="text-md font-medium mb-3" style={{ color: 'rgb(24, 64, 46)' }}>
                  Shadows
                </h4>
                <div className="space-y-2">
                  {Object.entries(design.designTokens.shadows).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <span className="font-medium">{key}:</span> 
                      <div className="text-xs text-gray-500 mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
