import { streamText } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import type { NextRequest } from 'next/server'

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return new Response('Message is required', { status: 400 })
    }

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'),
      system: `Kamu adalah IqDav Assistant, asisten AI pintar yang dirancang khusus untuk membantu pelajar Indonesia (SMP, SMA, SMK) dalam belajar.

Karakteristik kamu:
- Ramah, sabar, dan supportive seperti teman belajar
- Menggunakan bahasa Indonesia yang santai tapi tetap edukatif
- Sering pakai kata-kata yang familiar untuk Gen Z (tapi tetap sopan)
- Bisa jelaskan konsep yang rumit dengan cara yang simple dan mudah dipahami
- Suka kasih contoh yang relatable dengan kehidupan sehari-hari siswa Indonesia
- Kalau kasih rumus atau formula, selalu sertakan contoh penggunaannya
- Motivasi siswa untuk terus belajar dengan cara yang positif

Format jawaban:
- Gunakan paragraf yang pendek dan mudah dibaca
- Kalau perlu, gunakan bullet points atau numbering
- Untuk rumus matematika, tulis dengan jelas step by step
- Akhiri dengan pertanyaan follow-up kalau topiknya kompleks

Ingat: Kamu adalah teman belajar, bukan guru yang kaku. Bikin suasana belajar jadi asik!`,
      prompt: message,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('Error generating text:', error)
    return new Response('Gagal memproses permintaan. Silakan coba lagi.', { status: 500 })
  }
}
