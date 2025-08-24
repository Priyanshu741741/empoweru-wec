"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/header'
import ShaderBackground from '@/components/shader-background'
import PulsingCircle from '@/components/pulsing-circle'
import { BlogPost, getAllBlogPostsForAdmin, updateBlogPostStatus, deleteBlogPost, authenticateAdmin } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import Image from 'next/image'
import { toast } from 'sonner'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)


  useEffect(() => {
    if (isAuthenticated) {
      loadPosts()
    }
  }, [isAuthenticated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthenticating(true)

    try {
      await authenticateAdmin(email, password)
      setIsAuthenticated(true)
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error('Invalid credentials')
    } finally {
      setAuthenticating(false)
    }
  }

  const loadPosts = async () => {
    setLoading(true)
    try {
      const data = await getAllBlogPostsForAdmin()
      setPosts(data || [])
    } catch (error) {
      console.error('Error loading posts:', error)
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (postId: string, status: 'approved' | 'rejected') => {
    try {
      await updateBlogPostStatus(postId, status) // No admin ID needed for demo
      toast.success(`Post ${status} successfully`)
      loadPosts() // Reload posts
    } catch (error) {
      console.error('Error updating post status:', error)
      toast.error(`Failed to ${status} post`)
    }
  }

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${postTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      await deleteBlogPost(postId)
      toast.success('Post deleted successfully')
      loadPosts() // Reload posts
    } catch (error) {
      console.error('Error deleting post:', error)
      toast.error('Failed to delete post')
    }
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    const text = content.replace(/<[^>]*>/g, '')
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  if (!isAuthenticated) {
    return (
      <ShaderBackground>
        <Header />
        <PulsingCircle />
        <div className="relative z-20 min-h-screen pt-32 pb-16 flex items-center justify-center px-4">
          <Card className="w-full max-w-sm mx-auto bg-white/10 border-white/20 backdrop-blur-md shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-white text-center text-2xl instrument">
                Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white instrument">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 instrument focus:border-white/50 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white instrument">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60 instrument focus:border-white/50 transition-colors"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={authenticating}
                  className="w-full bg-white text-black hover:bg-white/90 instrument font-medium transition-all duration-300 hover:shadow-lg"
                >
                  {authenticating ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </ShaderBackground>
    )
  }

  return (
    <ShaderBackground>
      <Header />
      <PulsingCircle />
      <div className="relative z-20 min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-medium italic instrument text-white mb-4">
                Admin Dashboard
              </h1>
              <p className="text-xl text-white/80">
                Review and manage blog post submissions
              </p>
            </div>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  {posts.filter(p => p.status === 'pending').length}
                </div>
                <div className="text-white/70">Pending Review</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">
                  {posts.filter(p => p.status === 'approved').length}
                </div>
                <div className="text-white/70">Approved</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-300 mb-2">
                  {posts.filter(p => p.status === 'rejected').length}
                </div>
                <div className="text-white/70">Rejected</div>
              </CardContent>
            </Card>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-white/80">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Loading posts...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="bg-white/10 border-white/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image */}
                      {post.image_url && (
                        <div className="relative w-full lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.image_url}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-white line-clamp-2">
                            {post.title}
                          </h3>
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>

                        <div className="text-sm text-white/60">
                          By {post.author_name} ({post.author_email}) • {formatDate(post.created_at)}
                        </div>

                        <p className="text-white/80 text-sm">
                          {truncateContent(post.content)}
                        </p>

                        {/* View Full Post Button */}
                        <div className="flex items-center space-x-3 pt-2">
                          <Button
                            onClick={() => window.open(`/admin/preview/${post.id}`, '_blank')}
                            size="sm"
                            variant="outline"
                            className="border-white/30 text-white hover:bg-white/10"
                          >
                            Preview Post
                          </Button>

                          {/* Actions */}
                          {post.status === 'pending' && (
                            <>
                              <Button
                                onClick={() => handleUpdateStatus(post.id, 'approved')}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleUpdateStatus(post.id, 'rejected')}
                                size="sm"
                                variant="destructive"
                              >
                                Reject
                              </Button>
                            </>
                          )}

                          {/* Delete Button for All Posts */}
                          <Button
                            onClick={() => handleDeletePost(post.id, post.title)}
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {posts.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-medium text-white mb-4">No posts yet</h3>
                  <p className="text-white/70">
                    Posts will appear here when users submit them for review.
                  </p>
                </div>
              )}
            </div>
          )}


        </div>
      </div>
    </ShaderBackground>
  )
}
