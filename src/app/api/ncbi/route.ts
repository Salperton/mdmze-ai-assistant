import { NextRequest, NextResponse } from 'next/server'

const NCBI_API_KEY = process.env.NCBI_API_KEY
const NCBI_BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

interface PubMedArticle {
  uid: string
  title: string
  abstract: string
  authors: string[]
  journal: string
  pubDate: string
  doi?: string
  pmid: string
  keywords?: string[]
}

interface NCBIResponse {
  articles: PubMedArticle[]
  totalCount: number
  searchTerm: string
}

// Search terms for different categories
const SEARCH_TERMS = {
  'Tantrums': 'child behavior problems positive discipline parenting',
  'Communication': 'parent child communication responsive caregiving attachment',
  'Sleep': 'child sleep bedtime routines family routines',
  'Screen Time': 'children screen time digital media parenting',
  'Family Time': 'family meals family activities child development',
  'Emotional Health': 'child emotional development emotion coaching parenting',
  'Physical Development': 'child physical activity motor development',
  'Language Development': 'child language development reading literacy'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || 'All'
    const searchTerm = searchParams.get('search') || ''
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!NCBI_API_KEY) {
      return NextResponse.json({ error: 'NCBI API key not configured' }, { status: 500 })
    }

    let query = ''
    
    if (searchTerm) {
      query = searchTerm
    } else if (category !== 'All' && SEARCH_TERMS[category as keyof typeof SEARCH_TERMS]) {
      query = SEARCH_TERMS[category as keyof typeof SEARCH_TERMS]
    } else {
      // Default search for general parenting research
      query = 'parenting child development evidence based'
    }

    // Add filters for recent, high-quality studies
    const fullQuery = `${query} AND (("2020"[Date - Publication] : "2024"[Date - Publication]) OR ("2018"[Date - Publication] : "2024"[Date - Publication])) AND (randomized controlled trial[Publication Type] OR systematic review[Publication Type] OR meta-analysis[Publication Type])`

    // Step 1: Search for article IDs
    const searchUrl = `${NCBI_BASE_URL}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(fullQuery)}&retmax=${limit}&retmode=json&api_key=${NCBI_API_KEY}`
    
    const searchResponse = await fetch(searchUrl)
    if (!searchResponse.ok) {
      throw new Error(`NCBI search failed: ${searchResponse.statusText}`)
    }
    
    const searchData = await searchResponse.json()
    const articleIds = searchData.esearchresult?.idlist || []

    if (articleIds.length === 0) {
      return NextResponse.json({
        articles: [],
        totalCount: 0,
        searchTerm: query
      })
    }

    // Step 2: Fetch article details
    const fetchUrl = `${NCBI_BASE_URL}/efetch.fcgi?db=pubmed&id=${articleIds.join(',')}&retmode=xml&api_key=${NCBI_API_KEY}`
    
    const fetchResponse = await fetch(fetchUrl)
    if (!fetchResponse.ok) {
      throw new Error(`NCBI fetch failed: ${fetchResponse.statusText}`)
    }
    
    const xmlData = await fetchResponse.text()
    const articles = parsePubMedXML(xmlData)

    return NextResponse.json({
      articles,
      totalCount: searchData.esearchresult?.count || 0,
      searchTerm: query
    })

  } catch (error) {
    console.error('NCBI API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch research data' },
      { status: 500 }
    )
  }
}

function parsePubMedXML(xml: string): PubMedArticle[] {
  const articles: PubMedArticle[] = []
  
  // Simple XML parsing for PubMed data
  // In a production app, you'd want to use a proper XML parser
  const articleMatches = xml.match(/<PubmedArticle>[\s\S]*?<\/PubmedArticle>/g) || []
  
  articleMatches.forEach((articleXml, index) => {
    try {
      const title = extractValue(articleXml, '<ArticleTitle>', '</ArticleTitle>') || 'No title available'
      const abstract = extractValue(articleXml, '<AbstractText>', '</AbstractText>') || 'No abstract available'
      const journal = extractValue(articleXml, '<Title>', '</Title>') || 'Unknown Journal'
      const pubDate = extractValue(articleXml, '<PubDate>', '</PubDate>') || 'Unknown Date'
      const pmid = extractValue(articleXml, '<PMID>', '</PMID>') || `temp-${index}`
      
      // Extract authors
      const authorMatches = articleXml.match(/<Author[\s\S]*?<\/Author>/g) || []
      const authors = authorMatches.map(author => {
        const lastName = extractValue(author, '<LastName>', '</LastName>') || ''
        const firstName = extractValue(author, '<ForeName>', '</ForeName>') || ''
        return `${lastName}${firstName ? ', ' + firstName : ''}`
      }).filter(name => name.trim())

      // Extract keywords
      const keywordMatches = articleXml.match(/<Keyword[\s\S]*?<\/Keyword>/g) || []
      const keywords = keywordMatches.map(keyword => 
        extractValue(keyword, '<Keyword>', '</Keyword>')
      ).filter(keyword => keyword)

      // Extract DOI
      const doi = extractValue(articleXml, '<ELocationID EIdType="doi">', '</ELocationID>')

      articles.push({
        uid: pmid,
        title: cleanText(title),
        abstract: cleanText(abstract),
        authors: authors.slice(0, 5), // Limit to first 5 authors
        journal: cleanText(journal),
        pubDate: cleanText(pubDate),
        doi: doi || undefined,
        pmid,
        keywords: keywords.filter(k => k !== null).slice(0, 10) // Limit to first 10 keywords
      })
    } catch (error) {
      console.error('Error parsing article:', error)
    }
  })

  return articles
}

function extractValue(xml: string, startTag: string, endTag: string): string | null {
  const startIndex = xml.indexOf(startTag)
  if (startIndex === -1) return null
  
  const endIndex = xml.indexOf(endTag, startIndex)
  if (endIndex === -1) return null
  
  return xml.substring(startIndex + startTag.length, endIndex)
}

function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}
