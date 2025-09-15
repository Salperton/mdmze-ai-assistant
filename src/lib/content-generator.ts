import OpenAI from 'openai'
import { CREDIBLE_SOURCES, SEARCH_TOPICS, ARTICLE_CATEGORIES } from './sources'
import { GeneratedArticle, ArticleReference, CredibleSource } from '@/types/article'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export class ContentGenerator {
  // Search for credible content from whitelisted sources
  static async searchCredibleContent(topic: string, maxResults: number = 5): Promise<ArticleReference[]> {
    const references: ArticleReference[] = []
    
    try {
      // For now, we'll simulate finding content from credible sources
      // In a real implementation, you would use web scraping or APIs
      const mockReferences: ArticleReference[] = [
        {
          id: `ref_${Date.now()}_1`,
          title: `Research on ${topic}: Evidence-Based Approaches`,
          url: `https://harvard.edu/research/${topic.replace(/\s+/g, '-')}`,
          quote: `Recent studies show that ${topic} has significant impact on child development and family dynamics.`,
          domain: 'harvard.edu',
          publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
        },
        {
          id: `ref_${Date.now()}_2`,
          title: `Understanding ${topic}: A Comprehensive Guide`,
          url: `https://apa.org/psychology/${topic.replace(/\s+/g, '-')}`,
          quote: `The American Psychological Association emphasizes the importance of ${topic} in modern parenting approaches.`,
          domain: 'apa.org',
          publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: `ref_${Date.now()}_3`,
          title: `${topic}: Best Practices and Recommendations`,
          url: `https://pediatrics.org/guidelines/${topic.replace(/\s+/g, '-')}`,
          quote: `Pediatric research indicates that proper implementation of ${topic} strategies leads to positive outcomes.`,
          domain: 'pediatrics.org',
          publishedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
        }
      ]

      return mockReferences.slice(0, maxResults)
    } catch (error) {
      console.error('Error searching credible content:', error)
      return []
    }
  }

  // Generate article using AI
  static async generateArticle(topic: string, references: ArticleReference[]): Promise<GeneratedArticle> {
    try {
      const referencesText = references.map((ref, index) => 
        `${index + 1}. ${ref.title} (${ref.domain})\n   Quote: "${ref.quote}"\n   URL: ${ref.url}`
      ).join('\n\n')

      const systemPrompt = `You are an expert content writer specializing in family psychology, child development, and parenting advice. 

Your task is to write a comprehensive, evidence-based article about "${topic}" that will help parents and families.

IMPORTANT REQUIREMENTS:
1. Write a minimum of 500 words
2. Use a warm, supportive, and professional tone
3. Include practical, actionable advice
4. Base your content on the provided research references
5. Structure the article with clear headings
6. End with a "References" section that includes all provided sources
7. Make the content engaging and easy to understand
8. Focus on evidence-based strategies that parents can implement

RESEARCH REFERENCES TO USE:
${referencesText}

Write the article in markdown format with proper headings, bullet points, and formatting.`

      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please write a comprehensive article about "${topic}" using the provided research references.` }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      })

      const content = completion.choices[0]?.message?.content || ''
      
      // Extract title from content (first heading)
      const titleMatch = content.match(/^#\s+(.+)$/m)
      const title = titleMatch ? titleMatch[1] : `Understanding ${topic}: A Parent's Guide`

      // Generate summary (first paragraph or first 150 characters)
      const summaryMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/ms)
      const summary = summaryMatch ? summaryMatch[1].substring(0, 200) + '...' : content.substring(0, 200) + '...'

      // Determine category based on topic
      const category = this.determineCategory(topic)

      // Generate tags
      const tags = this.generateTags(topic, content)

      return {
        title,
        content,
        summary,
        references,
        tags,
        category
      }
    } catch (error) {
      console.error('Error generating article:', error)
      throw error
    }
  }

  // Determine article category based on topic
  private static determineCategory(topic: string): string {
    const topicLower = topic.toLowerCase()
    
    if (topicLower.includes('development') || topicLower.includes('milestone')) {
      return 'Child Development'
    } else if (topicLower.includes('parenting') || topicLower.includes('discipline')) {
      return 'Parenting Strategies'
    } else if (topicLower.includes('mental health') || topicLower.includes('stress')) {
      return 'Mental Health'
    } else if (topicLower.includes('education') || topicLower.includes('learning')) {
      return 'Education'
    } else if (topicLower.includes('family') || topicLower.includes('communication')) {
      return 'Family Dynamics'
    } else if (topicLower.includes('health') || topicLower.includes('nutrition')) {
      return 'Health & Wellness'
    } else if (topicLower.includes('behavior') || topicLower.includes('management')) {
      return 'Behavior Management'
    } else {
      return 'Communication'
    }
  }

  // Generate relevant tags
  private static generateTags(topic: string, content: string): string[] {
    const baseTags = topic.toLowerCase().split(' ').filter(word => word.length > 3)
    const contentTags: string[] = []
    
    const commonTags = [
      'parenting', 'children', 'family', 'development', 'psychology',
      'behavior', 'communication', 'education', 'health', 'wellness'
    ]
    
    commonTags.forEach(tag => {
      if (content.toLowerCase().includes(tag)) {
        contentTags.push(tag)
      }
    })
    
    return [...new Set([...baseTags, ...contentTags])].slice(0, 5)
  }

  // Generate multiple articles for the week
  static async generateWeeklyArticles(): Promise<GeneratedArticle[]> {
    try {
      // Select 3 random topics for the week
      const selectedTopics = SEARCH_TOPICS
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      const articles: GeneratedArticle[] = []

      for (const topic of selectedTopics) {
        console.log(`Generating article for topic: ${topic}`)
        
        // Search for credible content
        const references = await this.searchCredibleContent(topic, 3)
        
        if (references.length === 0) {
          console.warn(`No references found for topic: ${topic}`)
          continue
        }

        // Generate article
        const article = await this.generateArticle(topic, references)
        articles.push(article)
        
        console.log(`Generated article: ${article.title}`)
      }

      return articles
    } catch (error) {
      console.error('Error generating weekly articles:', error)
      throw error
    }
  }
}
