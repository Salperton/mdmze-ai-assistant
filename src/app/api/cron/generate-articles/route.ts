import { NextRequest, NextResponse } from 'next/server'
import { ArticleDatabase } from '@/lib/database'
import { ContentGenerator } from '@/lib/content-generator'

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (in production, add proper authentication)
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('Starting weekly article generation...')

    // Initialize database
    await ArticleDatabase.initialize()

    // Generate new articles
    const newArticles = await ContentGenerator.generateWeeklyArticles()
    
    if (newArticles.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No articles generated' 
      })
    }

    // Save articles as drafts
    const savedArticles = []
    for (const article of newArticles) {
      const savedArticle = await ArticleDatabase.createArticle({
        title: article.title,
        content: article.content,
        summary: article.summary,
        references: article.references,
        publishDate: new Date(),
        status: 'draft',
        tags: article.tags,
        category: article.category
      })
      savedArticles.push(savedArticle)
    }

    // Archive oldest featured articles (make room for new ones)
    const archivedCount = await ArticleDatabase.archiveOldestFeatured(3)
    
    console.log(`Generated ${savedArticles.length} new articles`)
    console.log(`Archived ${archivedCount} old featured articles`)

    return NextResponse.json({
      success: true,
      message: 'Weekly article generation completed',
      data: {
        newArticles: savedArticles.length,
        archivedArticles: archivedCount,
        articles: savedArticles.map(article => ({
          id: article.id,
          title: article.title,
          status: article.status
        }))
      }
    })

  } catch (error) {
    console.error('Error in article generation cron job:', error)
    return NextResponse.json({
      success: false,
      error: 'Article generation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// Allow POST requests as well for manual triggering
export async function POST(request: NextRequest) {
  return GET(request)
}
