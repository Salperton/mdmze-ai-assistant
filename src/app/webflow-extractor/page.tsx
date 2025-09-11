'use client'

import { useState } from 'react'

export default function WebflowExtractor() {
  const [apiKey, setApiKey] = useState('1ab7168d3c3f306f227a91405fa2d4a1c0d7894ec0896134aa801270ee311d03')
  const [siteId, setSiteId] = useState('6419edfba04104bd365d36a3')
  const [designTokens, setDesignTokens] = useState([])
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(false)

  const extractDesignData = async () => {
    if (!apiKey || !siteId) {
      alert('Please enter your API key and Site ID')
      return
    }

    setLoading(true)
    setDesignTokens([])
    setComponents([])
    
    try {
      console.log('Starting extraction...')
      
      const response = await fetch('/api/webflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          siteId
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract data')
      }
      
      console.log('Extraction successful:', data)
      
      setDesignTokens(data.designTokens)
      setComponents(data.components)
      
      alert(data.message || `Successfully extracted ${data.designTokens.length} design tokens and ${data.components.length} components!`)
    } catch (error) {
      console.error('Error extracting data:', error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      alert(`Error extracting data: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'rgb(249, 245, 234)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8" style={{ color: 'rgb(24, 64, 46)' }}>
          Webflow Design Extractor
        </h1>
        
        <div className="space-y-6">
          {/* API Configuration */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
              Webflow API Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Your Webflow API key"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: 'rgb(209, 213, 219)',
                    color: 'rgb(17, 17, 17)',
                    backgroundColor: 'rgb(255, 255, 255)'
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(17, 17, 17)' }}>
                  Site ID
                </label>
                <input
                  type="text"
                  value={siteId}
                  onChange={(e) => setSiteId(e.target.value)}
                  placeholder="Your Webflow Site ID"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200"
                  style={{
                    borderColor: 'rgb(209, 213, 219)',
                    color: 'rgb(17, 17, 17)',
                    backgroundColor: 'rgb(255, 255, 255)'
                  }}
                />
              </div>
              
              <button
                onClick={extractDesignData}
                disabled={loading}
                className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200"
                style={{ backgroundColor: 'rgb(24, 64, 46)' }}
              >
                {loading ? 'Extracting...' : 'Extract Design Data'}
              </button>
            </div>
          </div>

          {/* Design Tokens */}
          {designTokens.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
                Design Tokens ({designTokens.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {designTokens.map((token: any, index) => (
                  <div key={index} className="p-4 border rounded-lg" style={{ borderColor: 'rgb(229, 231, 235)' }}>
                    <div className="font-medium" style={{ color: 'rgb(24, 64, 46)' }}>
                      {token.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
                      {token.value}
                    </div>
                    <div className="text-xs" style={{ color: 'rgb(107, 106, 103)' }}>
                      {token.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Components */}
          {components.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
                Components ({components.length})
              </h2>
              <div className="space-y-4">
                {components.map((component: any, index) => (
                  <div key={index} className="p-4 border rounded-lg" style={{ borderColor: 'rgb(229, 231, 235)' }}>
                    <div className="font-medium mb-2" style={{ color: 'rgb(24, 64, 46)' }}>
                      {component.name}
                    </div>
                    <div className="text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                        {JSON.stringify(component.styles, null, 2)}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-display font-semibold mb-4" style={{ color: 'rgb(24, 64, 46)' }}>
            How to Get Your Webflow API Credentials
          </h2>
          <div className="space-y-3 text-sm" style={{ color: 'rgb(17, 17, 17)' }}>
            <p>1. Go to your Webflow dashboard</p>
            <p>2. Navigate to Project Settings → Integrations</p>
            <p>3. Generate an API key</p>
            <p>4. Find your Site ID in the URL or project settings</p>
            <p>5. Enter both credentials above and click "Extract Design Data"</p>
          </div>
        </div>
      </div>
    </div>
  )
}
