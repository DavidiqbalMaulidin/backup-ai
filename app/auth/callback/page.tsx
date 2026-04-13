'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()

      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        router.push('/auth/error')
        return
      }

      // 🔥 CEK APAKAH MODE RECOVERY
      const { data: userData } = await supabase.auth.getUser()

      const isRecovery =
        userData?.user?.recovery_sent_at !== null ||
        window.location.hash.includes('type=recovery')

      if (isRecovery) {
        router.push('/reset-password')
        return
      }

      router.push('/chat')
    }

    run()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      Authenticating...
    </div>
  )
}