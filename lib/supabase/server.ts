import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Hardcoded Supabase credentials for external Supabase account
const SUPABASE_URL = 'https://yeyfhpzjilkixtihpsfy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleWZocHpqaWxraXh0aWhwc2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDAzMjEsImV4cCI6MjA5MTU3NjMyMX0.hZztCTwNwjby8u_ymn362FrN-cz4cgsYHAPwhF9m1gU'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // The "setAll" method was called from a Server Component.
          }
        },
      },
    },
  )
}
