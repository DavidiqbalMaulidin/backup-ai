import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'IqDav Assistant - AI Asisten Pintar untuk Pelajar Indonesia',
  description: 'IqDav Assistant adalah AI chatbot canggih yang dirancang khusus untuk membantu pelajar SMP, SMA, dan SMK Indonesia dalam belajar. Powered by Grok AI.',
  keywords: ['AI', 'chatbot', 'pelajar', 'SMP', 'SMA', 'SMK', 'Indonesia', 'belajar', 'assistant'],
  authors: [{ name: 'IqDav Team' }],
  openGraph: {
    title: 'IqDav Assistant - AI Asisten Pintar untuk Pelajar',
    description: 'AI chatbot canggih untuk membantu pelajar Indonesia belajar lebih efektif.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#00b4d8' },
    { media: '(prefers-color-scheme: dark)', color: '#0077b6' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
