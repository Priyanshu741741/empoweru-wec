import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function testSupabaseConnection() {
  if (typeof window === 'undefined') return false
  
  try {
    const { data, error } = await supabase.from('posts').select('*', { count: 'exact', head: true })
    return !error
  } catch (err) {
    console.error('Supabase connection test failed:', err)
    return false
  }
}

export type UserRole = 'admin' | 'writer'
export type PostStatus = 'draft' | 'pending' | 'published' | 'rejected'

export interface User {
  id: string
  role: UserRole
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  content: string
  author_id: string
  status: PostStatus
  category: string | null
  featured: boolean
  rejection_reason: string | null
  created_at: string
  updated_at: string
}

