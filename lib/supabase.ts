import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

console.log('Supabase config:', {
  url: supabaseUrl ? 'Set' : 'Missing',
  key: supabaseAnonKey ? 'Set' : 'Missing'
})

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Blog post types
export interface BlogPost {
  id: string
  title: string
  content: string
  image_url?: string
  author_name: string
  author_email: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
  approved_at?: string
  approved_by?: string
}

export interface CreateBlogPost {
  title: string
  content: string
  image_url?: string
  author_name: string
  author_email: string
}

// Admin user types
export interface AdminUser {
  id: string
  email: string
  created_at: string
}

// Blog post functions
export async function createBlogPost(post: CreateBlogPost) {
  console.log('Creating blog post with Supabase...')
  console.log('Supabase URL:', supabaseUrl)
  console.log('Post data:', post)

  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single()

  console.log('Supabase response:', { data, error })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`Database error: ${error.message}`)
  }
  return data
}

export async function getApprovedBlogPosts() {
  const { data, error } = await supabase
    .from('approved_blog_posts')
    .select('*')

  if (error) throw error
  return data
}

export async function getBlogPostById(id: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('status', 'approved')
    .single()

  if (error) throw error
  return data
}

export async function getAllBlogPostsForAdmin() {
  console.log('Fetching all posts for admin...')
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  console.log('Admin posts response:', { data, error })

  if (error) {
    console.error('Failed to fetch admin posts:', error)
    throw new Error(`Failed to fetch posts: ${error.message}`)
  }
  return data
}

export async function updateBlogPostStatus(
  id: string, 
  status: 'approved' | 'rejected',
  adminId?: string
) {
  console.log('Updating post status:', { id, status, adminId })

  const updateData: any = { 
    status
  }
  
  if (status === 'approved') {
    updateData.approved_at = new Date().toISOString()
  }

  // Only set approved_by if we have a valid adminId
  if (adminId && adminId !== '1') {
    updateData.approved_by = adminId
  }

  console.log('Update data:', updateData)

  const { data, error } = await supabase
    .from('blog_posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  console.log('Update response:', { data, error })

  if (error) {
    console.error('Update error:', error)
    throw new Error(`Failed to update post: ${error.message}`)
  }
  return data
}

export async function deleteBlogPost(id: string) {
  console.log('Deleting blog post:', id)

  const { data, error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)
    .select()
    .single()

  console.log('Delete response:', { data, error })

  if (error) {
    console.error('Delete error:', error)
    throw new Error(`Failed to delete post: ${error.message}`)
  }
  return data
}

// Image upload function
export async function uploadBlogImage(file: File) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file)

  if (error) throw error

  const { data: publicData } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath)

  return publicData.publicUrl
}

// Simple admin authentication (for demo purposes)
export async function authenticateAdmin(email: string, password: string) {
  // In a real app, you'd use proper password hashing comparison
  // For demo, we'll just check if email exists and password is 'wec@EmpowerU'
  if (email === 'admin@wec.com' && password === 'wec@EmpowerU') {
    return { id: '1', email: 'admin@wec.com', created_at: new Date().toISOString() }
  }
  throw new Error('Invalid credentials')
}

// Check if user is admin (simple check for demo)
export function isAdminUser(email?: string) {
  return email === 'admin@wec.com'
}
