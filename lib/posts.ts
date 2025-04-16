import type { Post } from "./types"
import { supabase } from "./supabase"

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Breaking the Glass Ceiling: Women Leaders in Tech",
    slug: "breaking-glass-ceiling-women-leaders-tech",
    excerpt:
      "Explore the journeys of women who have shattered barriers in the tech industry and their advice for aspiring leaders.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>The Journey Begins</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-28",
    readingTime: 5,
    category: "leadership",
    authors: [
      {
        id: "1",
        name: "Jessica Chen",
        role: "Tech Executive",
        bio: "Jessica is a tech executive with over 15 years of experience in the industry.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "2",
    title: "Finding Your Voice: Public Speaking for Women",
    slug: "finding-your-voice-public-speaking-women",
    excerpt: "Practical tips and strategies to help women overcome anxiety and excel in public speaking opportunities.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>Overcoming Fear</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-25",
    readingTime: 4,
    category: "career",
    authors: [
      {
        id: "2",
        name: "Maya Johnson",
        role: "Communication Coach",
        bio: "Maya helps women find their authentic voice and communicate with confidence.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "3",
    title: "Self-Care Isn't Selfish: Prioritizing Mental Health",
    slug: "self-care-isnt-selfish-prioritizing-mental-health",
    excerpt:
      "Why taking care of your mental health is essential for success and how to incorporate self-care into your busy schedule.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>Making Time for Yourself</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-20",
    readingTime: 6,
    category: "wellness",
    authors: [
      {
        id: "3",
        name: "Dr. Sarah Williams",
        role: "Psychologist",
        bio: "Dr. Williams specializes in women's mental health and work-life balance.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "4",
    title: "My Journey from Refugee to CEO",
    slug: "journey-from-refugee-to-ceo",
    excerpt:
      "A personal story of resilience, determination, and the power of education in transforming one woman's life.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>Early Challenges</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-15",
    readingTime: 8,
    category: "stories",
    authors: [
      {
        id: "4",
        name: "Amina Hassan",
        role: "CEO & Founder",
        bio: "Amina founded her company after overcoming significant personal challenges as a refugee. She now advocates for immigrant women in business.",
      },
    ],
  },
  {
    id: "5",
    title: "Advocating for Equal Pay: What You Need to Know",
    slug: "advocating-equal-pay-what-to-know",
    excerpt:
      "Understanding the gender pay gap and practical strategies for negotiating fair compensation in your workplace.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>The Data Behind the Gap</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-10",
    readingTime: 7,
    category: "advocacy",
    authors: [
      {
        id: "5",
        name: "Elena Rodriguez",
        role: "Labor Rights Attorney",
        bio: "Elena specializes in gender discrimination cases and advocates for workplace equality.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "6",
    title: "Balancing Motherhood and Career: Real Stories",
    slug: "balancing-motherhood-career-real-stories",
    excerpt:
      "Women share their experiences navigating the challenges and joys of being working mothers in different industries.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>Finding Support Systems</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-05",
    readingTime: 6,
    category: "stories",
    authors: [
      {
        id: "6",
        name: "Olivia Taylor",
        role: "Work-Life Balance Coach",
        bio: "Olivia helps working mothers find balance and fulfillment in their personal and professional lives.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "7",
        name: "Sophia Kim",
        role: "HR Director",
        bio: "Sophia advocates for family-friendly workplace policies and flexible work arrangements.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "7",
    title: "Financial Independence: Investment Strategies for Women",
    slug: "financial-independence-investment-strategies-women",
    excerpt:
      "Essential financial literacy and investment tips to help women build wealth and secure their financial future.",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p><h2>Starting Your Investment Journey</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl vel nisl.</p>",
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-04-28",
    readingTime: 5,
    category: "career",
    authors: [
      {
        id: "8",
        name: "Priya Patel",
        role: "Financial Advisor",
        bio: "Priya specializes in helping women achieve financial independence through smart investment strategies.",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        featured,
        created_at,
        users (full_name, avatar_url)
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) throw error

    if (!data || data.length === 0) {
      return mockPosts
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      author: post.users.full_name,
      authorAvatar: post.users.avatar_url,
      category: post.category,
      tags: [],
      coverImage: '/placeholder.jpg',
      featured: post.featured,
      publishedAt: new Date(post.created_at).toISOString(),
      readingTime: '5 min read'
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return mockPosts
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        category,
        featured,
        created_at,
        users (full_name, avatar_url)
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error

    if (!data) {
      const mockPost = mockPosts.find(post => post.slug === slug)
      return mockPost || null
    }

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      author: data.users.full_name,
      authorAvatar: data.users.avatar_url,
      category: data.category,
      tags: [],
      coverImage: '/placeholder.jpg',
      featured: data.featured,
      publishedAt: new Date(data.created_at).toISOString(),
      readingTime: '5 min read'
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    const mockPost = mockPosts.find(post => post.slug === slug)
    return mockPost || null
  }
}

export async function getRelatedPosts(currentPost: Post): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        category,
        featured,
        created_at,
        users (full_name, avatar_url)
      `)
      .eq('status', 'published')
      .eq('category', currentPost.category)
      .neq('id', currentPost.id)
      .limit(3)

    if (error) throw error

    if (!data || data.length === 0) {
      return mockPosts.filter(post => 
        post.category === currentPost.category && 
        post.id !== currentPost.id
      ).slice(0, 3)
    }

    return data.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: '',
      author: post.users.full_name,
      authorAvatar: post.users.avatar_url,
      category: post.category,
      tags: [],
      coverImage: '/placeholder.jpg',
      featured: post.featured,
      publishedAt: new Date(post.created_at).toISOString(),
      readingTime: '5 min read'
    }))
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return mockPosts.filter(post => 
      post.category === currentPost.category && 
      post.id !== currentPost.id
    ).slice(0, 3)
  }
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

