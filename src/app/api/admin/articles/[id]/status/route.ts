import { NextRequest, NextResponse } from 'next/server'
import { ArticleDatabase } from '@/lib/database'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    
    if (!status || !['draft', 'featured', 'archived'].includes(status)) {
      return NextResponse.json({ 
        error: 'Invalid status. Must be draft, featured, or archived' 
      }, { status: 400 })
    }

    const success = await ArticleDatabase.updateArticleStatus(params.id, status)
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to update article status' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Article status updated to ${status}`
    })

  } catch (error) {
    console.error('Error updating article status:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to update article status',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
