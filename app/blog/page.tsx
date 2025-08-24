"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import ShaderBackground from '@/components/shader-background'
import PulsingCircle from '@/components/pulsing-circle'
import { BlogPost, getApprovedBlogPosts } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const data = await getApprovedBlogPosts()
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const truncateContent = (content: string, maxLength: number = 200) => {
    // Remove HTML tags and truncate while preserving spaces
    const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <ShaderBackground>
      <Header />
      <PulsingCircle />
      <div className="relative z-20 min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 xl:px-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-medium italic instrument text-white mb-4">
              Our Blog
            </h1>
            <p className="text-xl text-white/80 font-light">
              Stories, insights, and experiences from our community.
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-white/80">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Loading posts...</span>
              </div>
            </div>
          )}

          {/* No Posts */}
          {!loading && posts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-medium text-white mb-4">No posts yet</h3>
              <p className="text-white/70 mb-8">
                Be the first to share your story with our community!
              </p>
              <Link
                href="/publish"
                className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Write Your Story
              </Link>
            </div>
          )}

          {/* Blog Posts Grid */}
          {!loading && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`}>
                  <Card className="bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group h-full">
                    {post.image_url && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg flex items-center justify-center">
                        <div className="relative w-44 h-44 rounded-xl overflow-hidden">
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <h3 className="text-xl font-semibold text-white group-hover:text-pink-200 transition-colors line-clamp-2 instrument">
                        {post.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-white/60">
                        <span>{post.author_name}</span>
                        <span>•</span>
                        <span>{formatDate(post.approved_at || post.created_at)}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-3 poppins">
                        {truncateContent(post.content)}
                      </p>
                      <div className="mt-4 text-pink-300 text-sm font-medium group-hover:text-pink-200 transition-colors">
                        Read more →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {!loading && posts.length > 0 && (
            <div className="text-center mt-16 pt-16 border-t border-white/20">
              <h3 className="text-2xl font-medium text-white mb-4">
                Have a story to share?
              </h3>
              <p className="text-white/70 mb-8">
                Join our community and inspire others with your experiences.
              </p>
              <Link
                href="/publish"
                className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Write Your Story
              </Link>
            </div>
          )}
        </div>
      </div>
    </ShaderBackground>
  )
}
