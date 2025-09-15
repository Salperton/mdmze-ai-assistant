import { Article, ArticleReference } from '@/types/article'

// In-memory storage for development (replace with actual database in production)
let articles: Article[] = []
let references: ArticleReference[] = []

export class ArticleDatabase {
  // Initialize database tables
  static async initialize() {
    try {
      // For development, we'll use in-memory storage
      // In production, replace with actual Vercel Postgres
      console.log('Using in-memory storage for development')
      
      // Add some sample data if empty
      if (articles.length === 0) {
        await this.addSampleData()
      }
      
      return true
    } catch (error) {
      console.error('Error initializing database:', error)
      throw error
    }
  }

  // Add sample data for development
  static async addSampleData() {
    const sampleArticles: Article[] = [
      {
        id: 'sample_1',
        title: 'Understanding Child Development Milestones: A Parent\'s Guide',
        content: `# Understanding Child Development Milestones: A Parent's Guide

Child development milestones are key indicators of your child's growth and development. Understanding these milestones can help parents support their child's learning and identify any potential concerns early.

## What Are Developmental Milestones?

Developmental milestones are skills or abilities that most children can do by a certain age. These include physical, cognitive, social, and emotional development areas.

## Key Milestones by Age

### 0-12 Months
- **Physical**: Lifts head, rolls over, sits without support
- **Cognitive**: Recognizes familiar faces, responds to name
- **Social**: Smiles at people, shows stranger anxiety

### 1-2 Years
- **Physical**: Walks independently, climbs stairs
- **Cognitive**: Says 10-20 words, follows simple instructions
- **Social**: Plays alongside other children, shows independence

### 2-3 Years
- **Physical**: Runs, jumps, uses utensils
- **Cognitive**: Speaks in 2-3 word sentences, sorts objects
- **Social**: Shows empathy, engages in pretend play

## Supporting Your Child's Development

1. **Provide a safe environment** for exploration
2. **Engage in interactive play** and conversation
3. **Read together** daily to support language development
4. **Encourage independence** while providing support
5. **Celebrate achievements** to build confidence

## When to Seek Help

If your child consistently misses milestones or shows regression, consult with your pediatrician or a child development specialist.

## Conclusion

Every child develops at their own pace, but understanding typical milestones helps parents provide appropriate support and identify when additional help might be needed.`,
        summary: 'A comprehensive guide to understanding child development milestones and how parents can support their child\'s growth and development.',
        publishDate: new Date('2024-01-15'),
        status: 'featured',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        tags: ['child development', 'milestones', 'parenting', 'growth'],
        category: 'Child Development',
        references: [
          {
            id: 'ref_1',
            articleId: 'sample_1',
            title: 'Developmental Milestones in Early Childhood',
            url: 'https://pediatrics.org/guidelines/developmental-milestones',
            quote: 'Developmental milestones are key indicators of healthy child development and should be monitored regularly.',
            domain: 'pediatrics.org',
            publishedDate: new Date('2023-12-01')
          }
        ]
      },
      {
        id: 'sample_2',
        title: 'Positive Discipline Strategies for Toddlers',
        content: `# Positive Discipline Strategies for Toddlers

Disciplining toddlers can be challenging, but positive discipline strategies can help guide your child's behavior while maintaining a strong parent-child relationship.

## Understanding Toddler Behavior

Toddlers are learning to express themselves and test boundaries. Their behavior is often driven by curiosity, frustration, or the need for attention.

## Positive Discipline Techniques

### 1. Set Clear Expectations
- Use simple, clear language
- Be consistent with rules
- Explain consequences calmly

### 2. Redirect and Distract
- Guide your child to appropriate activities
- Offer alternatives to unwanted behavior
- Use positive language

### 3. Time-In Instead of Time-Out
- Stay with your child during difficult moments
- Help them process their emotions
- Teach calming strategies

### 4. Natural Consequences
- Let children experience the natural results of their actions
- Ensure safety while allowing learning
- Discuss what happened afterward

## Building Emotional Intelligence

Help your toddler understand and express emotions:
- Name emotions as they occur
- Validate their feelings
- Teach appropriate ways to express frustration

## Consistency is Key

Consistent application of discipline strategies helps children understand expectations and feel secure in their environment.

## Conclusion

Positive discipline focuses on teaching rather than punishing, helping toddlers develop self-control and emotional regulation skills.`,
        summary: 'Learn effective positive discipline strategies for toddlers that promote good behavior while strengthening the parent-child relationship.',
        publishDate: new Date('2024-01-10'),
        status: 'featured',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10'),
        tags: ['discipline', 'toddlers', 'positive parenting', 'behavior'],
        category: 'Parenting Strategies',
        references: [
          {
            id: 'ref_2',
            articleId: 'sample_2',
            title: 'Positive Discipline in Early Childhood',
            url: 'https://apa.org/psychology/positive-discipline',
            quote: 'Positive discipline strategies promote healthy child development and strengthen parent-child relationships.',
            domain: 'apa.org',
            publishedDate: new Date('2023-11-15')
          }
        ]
      }
    ]

    articles.push(...sampleArticles)
    console.log(`Added ${sampleArticles.length} sample articles`)
  }

  // Create a new article
  static async createArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) {
    const id = `article_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    try {
      // Create article with references
      const newArticle: Article = {
        id,
        ...article,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      // Add article to in-memory storage
      articles.push(newArticle)

      // Add references
      for (const reference of article.references) {
        const refId = `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        references.push({
          ...reference,
          id: refId,
          articleId: id
        })
      }

      return newArticle
    } catch (error) {
      console.error('Error creating article:', error)
      throw error
    }
  }

  // Get articles by status
  static async getArticlesByStatus(status: 'draft' | 'featured' | 'archived', limit: number = 10) {
    try {
      // Initialize database if not already done
      if (articles.length === 0) {
        await this.initialize()
      }

      // Filter articles by status
      const filteredArticles = articles
        .filter(article => article.status === status)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit)

      // Add references to each article
      const articlesWithReferences = filteredArticles.map(article => ({
        ...article,
        references: references.filter(ref => ref.articleId === article.id)
      }))

      return articlesWithReferences
    } catch (error) {
      console.error('Error getting articles by status:', error)
      throw error
    }
  }

  // Update article status
  static async updateArticleStatus(id: string, status: 'draft' | 'featured' | 'archived') {
    try {
      const articleIndex = articles.findIndex(article => article.id === id)
      if (articleIndex !== -1) {
        articles[articleIndex].status = status
        articles[articleIndex].updatedAt = new Date()
        return true
      }
      return false
    } catch (error) {
      console.error('Error updating article status:', error)
      throw error
    }
  }

  // Get article by ID
  static async getArticleById(id: string) {
    try {
      // Initialize database if not already done
      if (articles.length === 0) {
        await this.initialize()
      }

      const article = articles.find(article => article.id === id)
      
      if (!article) {
        return null
      }

      const articleReferences = references.filter(ref => ref.articleId === id)

      return {
        ...article,
        references: articleReferences
      }
    } catch (error) {
      console.error('Error getting article by ID:', error)
      throw error
    }
  }

  // Archive oldest featured articles
  static async archiveOldestFeatured(count: number = 3) {
    try {
      const oldestFeatured = articles
        .filter(article => article.status === 'featured')
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .slice(0, count)

      for (const article of oldestFeatured) {
        await this.updateArticleStatus(article.id, 'archived')
      }

      return oldestFeatured.length
    } catch (error) {
      console.error('Error archiving oldest featured articles:', error)
      throw error
    }
  }

  // Get article statistics
  static async getArticleStats() {
    try {
      const stats = articles.reduce((acc, article) => {
        acc[article.status] = (acc[article.status] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      return stats
    } catch (error) {
      console.error('Error getting article stats:', error)
      throw error
    }
  }
}
