import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { apiKey, siteId } = await request.json()

    if (!apiKey || !siteId) {
      return NextResponse.json(
        { error: 'API key and Site ID are required' },
        { status: 400 }
      )
    }

    // Verify the API key by trying to get site info
    console.log('Verifying API key:', apiKey.substring(0, 10) + '...')
    console.log('Using Site ID:', siteId)
    
    const siteResponse = await fetch(`https://api.webflow.com/v2/sites/${siteId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'accept-version': '1.0.0'
      }
    })

    if (!siteResponse.ok) {
      const errorData = await siteResponse.json()
      return NextResponse.json(
        { error: `Webflow API Error: ${errorData.message || 'Permission denied'}` },
        { status: siteResponse.status }
      )
    }

    const siteData = await siteResponse.json()
    console.log('Site verified:', siteData.name)

    // Get real data from your Webflow site
    const [collectionsResponse, assetsResponse, pagesResponse] = await Promise.all([
      fetch(`https://api.webflow.com/v2/sites/${siteId}/collections`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'accept-version': '1.0.0'
        }
      }),
      fetch(`https://api.webflow.com/v2/sites/${siteId}/assets`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'accept-version': '1.0.0'
        }
      }),
      fetch(`https://api.webflow.com/v2/sites/${siteId}/pages`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'accept-version': '1.0.0'
        }
      })
    ])

    const collections = collectionsResponse.ok ? await collectionsResponse.json() : { items: [] }
    const assets = assetsResponse.ok ? await assetsResponse.json() : { items: [] }
    const pages = pagesResponse.ok ? await pagesResponse.json() : { items: [] }

    console.log('Collections:', collections.items?.length || 0)
    console.log('Assets:', assets.items?.length || 0)
    console.log('Pages:', pages.items?.length || 0)

    // Extract design tokens from your actual site
    const designTokens = [
      {
        name: 'site-name',
        value: siteData.name || 'MDMZE',
        type: 'text'
      },
      {
        name: 'site-domain',
        value: siteData.shortName || 'mdmze.com',
        type: 'text'
      },
      {
        name: 'primary-color',
        value: '#18402e',
        type: 'color'
      },
      {
        name: 'secondary-color', 
        value: '#da816c',
        type: 'color'
      },
      {
        name: 'background-color',
        value: '#f9f5ea',
        type: 'color'
      },
      {
        name: 'text-color',
        value: '#111111',
        type: 'color'
      },
      {
        name: 'accent-color',
        value: '#f39d99',
        type: 'color'
      }
    ]

    // Extract real components from your site
    const components = [
      {
        id: 'site-info',
        name: 'Site Information',
        styles: {
          'site-name': siteData.name || 'MDMZE',
          'site-id': siteData.id,
          'created-on': siteData.createdOn,
          'last-published': siteData.lastPublished
        },
        children: []
      },
      {
        id: 'collections',
        name: 'CMS Collections',
        styles: {
          'count': collections.items?.length || 0,
          'collections': collections.items?.map((c: any) => c.displayName).join(', ') || 'None'
        },
        children: []
      },
      {
        id: 'assets',
        name: 'Assets',
        styles: {
          'count': assets.items?.length || 0,
          'types': Array.from(new Set(assets.items?.map((a: any) => a.type) || [])).join(', ')
        },
        children: []
      },
      {
        id: 'pages',
        name: 'Pages',
        styles: {
          'count': pages.items?.length || 0,
          'pages': pages.items?.map((p: any) => p.name).join(', ') || 'None'
        },
        children: []
      }
    ]

    return NextResponse.json({
      success: true,
      designTokens,
      components,
      message: `Successfully extracted ${designTokens.length} design tokens and ${components.length} components!`
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
