'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()
  const router = useRouter()

  const validate = () => {
    if (!password || !confirmPassword) {
      setError('Password tidak boleh kosong')
      return false
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter')
      return false
    }

    if (password !== confirmPassword) {
      setError('Password tidak sama')
      return false
    }

    setError('')
    return true
  }

  const handleUpdate = async () => {
    if (!validate()) return

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push('/chat')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-950 to-black text-white px-4">

      <div className="w-full max-w-md bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 backdrop-blur">

        {/* Title */}
        <h1 className="text-2xl font-bold text-pink-400 text-center">
          Reset Password 🔐
        </h1>

        <p className="text-sm text-zinc-400 text-center mt-2">
          Buat password baru yang aman
        </p>

        {/* ERROR */}
        {error && (
          <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/30 p-2 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* PASSWORD */}
        <div className="mt-5 relative">

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-black border border-zinc-700 focus:border-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="mt-4 relative">

          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Konfirmasi password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-black border border-zinc-700 focus:border-blue-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full mt-6 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-pink-500 hover:opacity-90 transition font-semibold"
        >
          {loading ? 'Menyimpan...' : 'Update Password'}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-zinc-500 text-center mt-6">
          IqDav AI • Secure Reset System
        </p>

      </div>
    </div>
  )
}