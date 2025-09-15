import { NextRequest, NextResponse } from 'next/server'
import { ArticleDatabase } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const article = await ArticleDatabase.getArticleById(params.id)
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: article
    })

  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch article',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
