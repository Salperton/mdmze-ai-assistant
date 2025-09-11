#!/usr/bin/env node

// MCP Server for Webflow API Integration
const { Server } = require('@modelcontextprotocol/sdk/server/index.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js')

class WebflowMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'webflow-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    )

    this.setupToolHandlers()
    this.setupErrorHandling()
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'extract_webflow_design',
            description: 'Extract design tokens and components from Webflow',
            inputSchema: {
              type: 'object',
              properties: {
                apiKey: {
                  type: 'string',
                  description: 'Webflow API key'
                },
                siteId: {
                  type: 'string',
                  description: 'Webflow Site ID'
                }
              },
              required: ['apiKey', 'siteId']
            }
          },
          {
            name: 'generate_react_component',
            description: 'Generate React component from Webflow data',
            inputSchema: {
              type: 'object',
              properties: {
                componentData: {
                  type: 'object',
                  description: 'Webflow component data'
                }
              },
              required: ['componentData']
            }
          },
          {
            name: 'update_design_system',
            description: 'Update design system with Webflow tokens',
            inputSchema: {
              type: 'object',
              properties: {
                designTokens: {
                  type: 'array',
                  description: 'Array of design tokens from Webflow'
                }
              },
              required: ['designTokens']
            }
          }
        ]
      }
    })

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params

      try {
        switch (name) {
          case 'extract_webflow_design':
            return await this.extractWebflowDesign(args.apiKey, args.siteId)
          
          case 'generate_react_component':
            return await this.generateReactComponent(args.componentData)
          
          case 'update_design_system':
            return await this.updateDesignSystem(args.designTokens)
          
          default:
            throw new Error(`Unknown tool: ${name}`)
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`
            }
          ]
        }
      }
    })
  }

  async extractWebflowDesign(apiKey, siteId) {
    try {
      // Simulate Webflow API call
      const response = await fetch(`https://api.webflow.com/v2/sites/${siteId}/designTokens`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'accept-version': '1.0.0'
        }
      })

      if (!response.ok) {
        throw new Error(`Webflow API error: ${response.status}`)
      }

      const data = await response.json()
      
      return {
        content: [
          {
            type: 'text',
            text: `Successfully extracted ${data.items?.length || 0} design tokens from Webflow site ${siteId}`
          }
        ]
      }
    } catch (error) {
      throw new Error(`Failed to extract Webflow design: ${error.message}`)
    }
  }

  async generateReactComponent(componentData) {
    const { name, styles, html } = componentData
    
    const reactComponent = `
import React from 'react'

const ${name} = () => {
  return (
    <div 
      style={{
        ${Object.entries(styles || {})
          .map(([key, value]) => `${key}: '${value}'`)
          .join(',\n        ')}
      }}
    >
      ${html || 'Component content'}
    </div>
  )
}

export default ${name}
    `

    return {
      content: [
        {
          type: 'text',
          text: `Generated React component:\n\`\`\`jsx\n${reactComponent}\n\`\`\``
        }
      ]
    }
  }

  async updateDesignSystem(designTokens) {
    const cssVariables = designTokens
      .map(token => `--${token.name}: ${token.value};`)
      .join('\n')

    const tailwindConfig = `
module.exports = {
  theme: {
    extend: {
      colors: {
        // Generated from Webflow design tokens
        ${designTokens
          .filter(token => token.type === 'color')
          .map(token => `${token.name}: '${token.value}'`)
          .join(',\n        ')}
      }
    }
  }
}
    `

    return {
      content: [
        {
          type: 'text',
          text: `Updated design system with ${designTokens.length} tokens:\n\nCSS Variables:\n\`\`\`css\n${cssVariables}\n\`\`\`\n\nTailwind Config:\n\`\`\`js\n${tailwindConfig}\n\`\`\``
        }
      ]
    }
  }

  setupErrorHandling() {
    this.server.onerror = (error) => {
      console.error('[MCP Error]', error)
    }

    process.on('SIGINT', async () => {
      await this.server.close()
      process.exit(0)
    })
  }

  async run() {
    const transport = new StdioServerTransport()
    await this.server.connect(transport)
    console.error('Webflow MCP server running on stdio')
  }
}

// Run the server
const server = new WebflowMCPServer()
server.run().catch(console.error)
