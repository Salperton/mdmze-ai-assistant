import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a compassionate and knowledgeable AI Family Support Assistant for MDMZE Family Support Center. Your role is to provide helpful, evidence-based guidance on family matters, parenting, childcare, and divorce-related questions.

Key guidelines:
- Be empathetic, non-judgmental, and supportive
- Provide practical, actionable advice when appropriate
- Always encourage professional help for serious issues
- Focus on family dynamics, parenting strategies, and relationship guidance
- Use a warm, professional tone
- If asked about medical or legal advice, recommend consulting appropriate professionals
- Keep responses concise but comprehensive (2-3 paragraphs max)
- End responses with encouragement and next steps when appropriate

Remember: You're here to support families through challenging times with wisdom, compassion, and practical guidance.`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again."

    return NextResponse.json({ response })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
}
