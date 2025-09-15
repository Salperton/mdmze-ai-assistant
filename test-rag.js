// Simple test script to verify RAG API functionality
const fetch = require('node-fetch')

async function testRAG() {
  try {
    console.log('Testing RAG API...')
    
    const response = await fetch('http://localhost:3000/api/rag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: 'How can I help my child with tantrums?' 
      }),
    })

    const data = await response.json()
    
    console.log('Response status:', response.status)
    console.log('Sources found:', data.sources?.length || 0)
    console.log('Answer preview:', data.answer?.substring(0, 200) + '...')
    
    if (data.sources && data.sources.length > 0) {
      console.log('First source:', data.sources[0].title)
    }
    
  } catch (error) {
    console.error('Test error:', error.message)
  }
}

testRAG()
