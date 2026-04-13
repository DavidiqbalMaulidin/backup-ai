'use client'

import { useState, useRef, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { ChatHeader } from './chat-header'
import { ChatMessages } from './chat-messages'
import { ChatInput } from './chat-input'
import { WelcomeScreen } from './welcome-screen'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatContainerProps {
  user: User
  sessionId: string | null
}

export function ChatContainer({ user, sessionId }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // =========================
  // SCROLL
  // =========================
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // =========================
  // LOAD CHAT (FIX UTAMA)
  // =========================
  useEffect(() => {
    const loadChats = async () => {
      if (!sessionId) {
        setMessages([])
        return
      }

      try {
        const res = await fetch(`/api/get-chats?sessionId=${sessionId}`)
        const data = await res.json()

        if (!Array.isArray(data)) {
          console.error('Invalid chat data:', data)
          return
        }

        const formatted = data.map((c: any) => ({
          id: c.id,
          role: c.role,
          content: c.content,
          timestamp: c.created_at ? new Date(c.created_at) : new Date(),
        }))

        setMessages(formatted)
      } catch (err) {
        console.error('load chat error:', err)
      }
    }

    loadChats()
  }, [sessionId])

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage = async (content: string, fileText?: string) => {
    if (!content.trim() || isLoading) return

    setIsLoading(true)

    try {
      let activeSession = sessionId

      if (!activeSession) {
        const res = await fetch('/api/chat-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: content.slice(0, 30) }),
        })

        const data = await res.json()
        activeSession = data.id
      }

      if (!activeSession) return

      // USER UI
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
      }

      setMessages((p) => [...p, userMsg])

      // ASSISTANT PLACEHOLDER
      const assistantId = (Date.now() + 1).toString()

      setMessages((p) => [
        ...p,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        },
      ])

      // CALL AI
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content.trim(),
          fileText: fileText || '',
          sessionId: activeSession,
        }),
      })

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let full = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          full += decoder.decode(value, { stream: true })

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: full } : m
            )
          )
        }
      }

      // SAVE USER
      await fetch('/api/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSession,
          role: 'user',
          content: content.trim(),
        }),
      })

      // SAVE AI
      await fetch('/api/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: activeSession,
          role: 'assistant',
          content: full,
        }),
      })
    } catch (err) {
      console.error('chat error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="flex flex-col flex-1">

        <ChatHeader user={user} />

        <main className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <WelcomeScreen
              userName={user.email?.split('@')[0] || 'User'}
              onQuickAction={(p) => handleSendMessage(p)}
            />
          ) : (
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
            />
          )}
        </main>

        <div ref={messagesEndRef} />

        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />

      </div>
    </div>
  )
}