// Webflow API Integration
// This will help you extract exact design data from your Webflow site

interface WebflowDesignToken {
  name: string
  value: string
  type: 'color' | 'spacing' | 'typography' | 'shadow'
}

interface WebflowComponent {
  id: string
  name: string
  styles: Record<string, string>
  children: WebflowComponent[]
}

class WebflowAPI {
  private apiKey: string
  private siteId: string

  constructor(apiKey: string, siteId: string) {
    this.apiKey = apiKey
    this.siteId = siteId
  }

  // Get design tokens from Webflow
  async getDesignTokens(): Promise<WebflowDesignToken[]> {
    try {
      const response = await fetch(`https://api.webflow.com/v2/sites/${this.siteId}/designTokens`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'accept-version': '1.0.0'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error('Error fetching design tokens:', error)
      return []
    }
  }

  // Get components from Webflow
  async getComponents(): Promise<WebflowComponent[]> {
    try {
      const response = await fetch(`https://api.webflow.com/v2/sites/${this.siteId}/components`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'accept-version': '1.0.0'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      return data.items || []
    } catch (error) {
      console.error('Error fetching components:', error)
      return []
    }
  }

  // Convert Webflow styles to CSS
  convertToCSS(styles: Record<string, string>): string {
    return Object.entries(styles)
      .map(([property, value]) => `${property}: ${value};`)
      .join('\n')
  }

  // Generate React component from Webflow data
  generateReactComponent(component: WebflowComponent): string {
    const styles = this.convertToCSS(component.styles)
    
    return `
import React from 'react'

const ${component.name} = () => {
  return (
    <div 
      className="${component.name.toLowerCase()}"
      style={{
        ${Object.entries(component.styles)
          .map(([key, value]) => `${key}: '${value}'`)
          .join(',\n        ')}
      }}
    >
      {/* Component content */}
    </div>
  )
}

export default ${component.name}
    `
  }
}

export default WebflowAPI
