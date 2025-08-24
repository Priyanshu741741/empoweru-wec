"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import ShaderBackground from '@/components/shader-background'
import PulsingCircle from '@/components/pulsing-circle'
import { BlogPost, getAllBlogPostsForAdmin, updateBlogPostStatus, deleteBlogPost } from '@/lib/supabase'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function AdminPreviewPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadPost(params.id as string)
    }
  }, [params.id])

  const loadPost = async (id: string) => {
    try {
      const allPosts = await getAllBlogPostsForAdmin()
      const foundPost = allPosts.find(p => p.id === id)
      setPost(foundPost || null)
    } catch (error) {
      console.error('Error loading post:', error)
      toast.error('Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (status: 'approved' | 'rejected') => {
    if (!post) return

    setUpdating(true)
    try {
      await updateBlogPostStatus(post.id, status)
      toast.success(`Post ${status} successfully!`)
      router.push('/admin')
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error(`Failed to ${status} post`)
    } finally {
      setUpdating(false)
    }
  }

  const handleDeletePost = async () => {
    if (!post) return

    if (!confirm(`Are you sure you want to permanently delete "${post.title}"? This action cannot be undone.`)) {
      return
    }

    setUpdating(true)
    try {
      await deleteBlogPost(post.id)
      toast.success('Post deleted successfully!')
      router.push('/admin')
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    } finally {
      setUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'rejected':
        return 'bg-red-500/20 text-red-300 border-red-500/30'
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
    }
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

  if (!post) {
    return (
      <ShaderBackground>
        <Header />
        <PulsingCircle />
        <div className="relative z-20 min-h-screen pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-medium text-white mb-4">Post Not Found</h1>
            <Button 
              onClick={() => router.push('/admin')}
              className="bg-white text-black hover:bg-white/90"
            >
              Back to Admin
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
          {/* Admin Controls */}
          <div className="mb-8 p-6 bg-white/10 rounded-2xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-medium text-white">Admin Preview</h2>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
                <Button
                  onClick={() => router.push('/admin')}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  ← Back to Admin
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-white/70 mb-4">
              Submitted by {post.author_name} ({post.author_email}) on {formatDate(post.created_at)}
            </div>

            <div className="flex space-x-4">
              {post.status === 'pending' && (
                <>
                  <Button
                    onClick={() => handleStatusUpdate('approved')}
                    disabled={updating}
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                  >
                    {updating ? 'Processing...' : 'Approve Post'}
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate('rejected')}
                    disabled={updating}
                    variant="destructive"
                    className="px-8"
                  >
                    {updating ? 'Processing...' : 'Reject Post'}
                  </Button>
                </>
              )}
              
              {/* Delete button available for all posts */}
              <Button
                onClick={handleDeletePost}
                disabled={updating}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 px-8"
              >
                {updating ? 'Processing...' : 'Delete Post'}
              </Button>
            </div>
          </div>

          {/* Post Preview (as it would appear to readers) */}
          <article className="bg-white/5 rounded-2xl p-8 border border-white/20">
            {/* Post Header */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-tight instrument">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-4 text-white/70 mb-8">
                <span className="font-medium">{post.author_name}</span>
                <span>•</span>
                <time>{formatDate(post.created_at)}</time>
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

            {/* Post Content */}
            <div 
              className="text-white/90 leading-relaxed poppins prose prose-lg prose-invert max-w-none blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/70 text-sm">Written by</p>
                <p className="text-white font-medium">{post.author_name}</p>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </ShaderBackground>
  )
}
