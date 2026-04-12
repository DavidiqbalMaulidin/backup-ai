'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Paperclip } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t border-border bg-card/80 backdrop-blur-sm p-4 shrink-0">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="relative flex items-end gap-2 p-2 rounded-2xl bg-secondary border border-border focus-within:border-primary transition-colors">
          {/* Attachment Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-muted-foreground hover:text-foreground"
            disabled
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tanya apa saja ke IqDav..."
            rows={1}
            className="flex-1 bg-transparent border-0 outline-none resize-none text-foreground placeholder:text-muted-foreground py-2 px-1 max-h-[200px]"
            disabled={isLoading}
          />

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isLoading}
            className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-muted-foreground mt-2">
          IqDav bisa aja salah. Pastikan cek ulang info penting ya!
        </p>
      </form>
    </div>
  )
}
