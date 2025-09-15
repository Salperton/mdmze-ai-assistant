import { NextRequest, NextResponse } from 'next/server'
import { ArticleDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as 'draft' | 'featured' | 'archived' | null
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!status) {
      return NextResponse.json({ error: 'Status parameter is required' }, { status: 400 })
    }

    const articles = await ArticleDatabase.getArticlesByStatus(status, limit)
    
    return NextResponse.json({
      success: true,
      data: articles
    })

  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch articles',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
