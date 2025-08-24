"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import ShaderBackground from '@/components/shader-background'
import PulsingCircle from '@/components/pulsing-circle'
import { BlogPost, getBlogPostById } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadPost(params.id as string)
    }
  }, [params.id])

  const loadPost = async (id: string) => {
    try {
      const data = await getBlogPostById(id)
      setPost(data)
    } catch (error) {
      console.error('Error loading post:', error)
      setError('Post not found or not available')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <ShaderBackground>
        <Header />
        <PulsingCircle />
        <div className="relative z-20 min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-white/80">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span>Loading post...</span>
            </div>
          </div>
        </div>
      </ShaderBackground>
    )
  }

  if (error || !post) {
    return (
      <ShaderBackground>
        <Header />
        <PulsingCircle />
        <div className="relative z-20 min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-white mb-4">Post Not Found</h1>
            <p className="text-white/70 mb-8">
              {error || 'The post you are looking for does not exist or is not available.'}
            </p>
            <Button 
              onClick={() => router.back()}
              className="bg-white text-black hover:bg-white/90"
            >
              Go Back
            </Button>
          </div>
        </div>
      </ShaderBackground>
    )
  }

  return (
    <ShaderBackground>
      <Header />
      <PulsingCircle />
      <div className="relative z-20 min-h-screen pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight instrument">
              {post.title}
            </h1>
            
            <div className="flex items-center space-x-4 text-white/70 mb-8">
              <span className="font-medium">{post.author_name}</span>
              <span>•</span>
              <time>{formatDate(post.approved_at || post.created_at)}</time>
            </div>

            {post.image_url && (
              <div className="flex justify-center mb-8">
                <div className="relative w-96 h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </header>

          {/* Article Content */}
          <article className="prose prose-lg prose-invert max-w-none">
            <div 
              className="text-white/90 leading-relaxed poppins prose prose-lg prose-invert max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-white/70 text-sm">Written by</p>
                <p className="text-white font-medium">{post.author_name}</p>
              </div>
              
              <div className="flex space-x-4">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  ← Previous
                </Button>
                <Link href="/blog">
                  <Button className="bg-white text-black hover:bg-white/90">
                    View All Posts
                  </Button>
                </Link>
              </div>
            </div>
          </footer>

          {/* Call to Action */}
          <div className="text-center mt-16 pt-16 border-t border-white/20">
            <h3 className="text-2xl font-medium text-white mb-4">
              Inspired by this story?
            </h3>
            <p className="text-white/70 mb-8">
              Share your own experiences and join our community of storytellers.
            </p>
            <Link
              href="/publish"
              className="inline-block px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Write Your Story
            </Link>
          </div>
        </div>
      </div>
    </ShaderBackground>
  )
}
