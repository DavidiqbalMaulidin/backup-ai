'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Paperclip, Image as ImageIcon, X } from 'lucide-react'
import Tesseract from 'tesseract.js'

interface ChatInputProps {
  onSendMessage: (message: string, fileText?: string) => void
  isLoading: boolean
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [fileText, setFileText] = useState('')
  const [fileName, setFileName] = useState('')

  const [imagePreview, setImagePreview] = useState('')
  const [imageText, setImageText] = useState('')
  const [imageName, setImageName] = useState('')

  const [isDragging, setIsDragging] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // =========================
  // FILE INPUT REF (FIX)
  // =========================
  const fileRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 180) + 'px'
    }
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [message])

  // =========================
  // TXT FILE
  // =========================
  const handleFileChange = async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      alert('Hanya file .txt')
      return
    }

    const text = await file.text()
    setFileText(text)
    setFileName(file.name)
  }

  // =========================
  // IMAGE OCR
  // =========================
  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Hanya gambar')
      return
    }

    setImageName(file.name)
    setImagePreview(URL.createObjectURL(file))

    const result = await Tesseract.recognize(file, 'eng+ind')
    setImageText(result.data.text)
  }

  // =========================
  // DRAG
  // =========================
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (file.type.startsWith('image/')) {
      await handleImageFile(file)
    } else if (file.name.endsWith('.txt')) {
      await handleFileChange(file)
    } else {
      alert('File tidak didukung')
    }
  }

  const clearAll = () => {
    setFileText('')
    setFileName('')
    setImagePreview('')
    setImageText('')
    setImageName('')
  }

  // =========================
  // SUBMIT (FIX OCR + FILE MERGE)
  // =========================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!message.trim() && !fileText && !imageText) return

    const finalMessage =
      message +
      (fileText ? `\n\n[FILE TXT]: ${fileText}` : '') +
      (imageText ? `\n\n[TEXT DARI GAMBAR]: ${imageText}` : '')

    onSendMessage(finalMessage, fileText)

    setMessage('')
    clearAll()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border-t p-4 transition-all ${
        isDragging
          ? 'bg-blue-500/10 border-blue-500'
          : 'bg-card/80 border-border'
      }`}
    >

      {/* FILE INPUT HIDDEN (FIX) */}
      <input
        ref={fileRef}
        type="file"
        accept=".txt"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileChange(file)
        }}
      />

      {/* IMAGE INPUT HIDDEN (FIX) */}
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleImageFile(file)
        }}
      />

      <form className="max-w-3xl mx-auto space-y-2" onSubmit={handleSubmit}>

        {/* INPUT BOX */}
        <div className="flex items-end gap-2 p-3 rounded-2xl bg-secondary border border-border">

          {/* 📎 BUTTON FIX */}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="p-2"
          >
            <Paperclip className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* 🖼 BUTTON FIX */}
          <button
            type="button"
            onClick={() => imageRef.current?.click()}
            className="p-2"
          >
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* TEXTAREA */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isDragging
                ? 'Drop file di sini...'
                : 'Tanya apa saja ke IqDav...'
            }
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none resize-none px-2 py-1"
          />

          {/* SEND */}
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent"
          >
            <Send />
          </Button>
        </div>

        {/* PREVIEW */}
        {(fileName || imagePreview) && (
          <div className="flex gap-2 flex-wrap">

            {fileName && (
              <div className="px-3 py-1 bg-zinc-800 text-green-400 rounded-full text-xs flex items-center gap-2">
                📄 {fileName}
                <X size={14} onClick={() => setFileName('')} />
              </div>
            )}

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  className="w-12 h-12 rounded object-cover"
                />
                <X
                  size={14}
                  className="absolute -top-1 -right-1 bg-black rounded-full"
                  onClick={() => setImagePreview('')}
                />
              </div>
            )}

          </div>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Drop file / image langsung ke sini 🔥
        </p>

      </form>
    </div>
  )
}