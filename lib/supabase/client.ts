import { createBrowserClient } from '@supabase/ssr'

// Hardcoded Supabase credentials for external Supabase account
const SUPABASE_URL = 'https://yeyfhpzjilkixtihpsfy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlleWZocHpqaWxraXh0aWhwc2Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMDAzMjEsImV4cCI6MjA5MTU3NjMyMX0.hZztCTwNwjby8u_ymn362FrN-cz4cgsYHAPwhF9m1gU'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
