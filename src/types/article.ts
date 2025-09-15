export interface Article {
  id: string
  title: string
  content: string
  summary: string
  references: ArticleReference[]
  publishDate: Date
  status: 'draft' | 'featured' | 'archived'
  createdAt: Date
  updatedAt: Date
  tags: string[]
  category: string
}

export interface ArticleReference {
  id: string
  articleId?: string
  title: string
  url: string
  quote: string
  domain: string
  publishedDate?: Date
}

export interface CredibleSource {
  domain: string
  name: string
  description: string
  searchTerms: string[]
}

export interface GeneratedArticle {
  title: string
  content: string
  summary: string
  references: ArticleReference[]
  tags: string[]
  category: string
}
