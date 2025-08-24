"use client"

import { useState } from 'react'
import Header from '@/components/header'
import ShaderBackground from '@/components/shader-background'
import PulsingCircle from '@/components/pulsing-circle'
import RichTextEditor from '@/components/rich-text-editor'
import ImageCropUpload from '@/components/image-crop-upload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createBlogPost, uploadBlogImage } from '@/lib/supabase'
import { toast } from 'sonner'

export default function PublishPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async (url: string) => {
    setImageUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim() || !authorName.trim() || !authorEmail.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      console.log('Submitting post with data:', {
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl || undefined,
        author_name: authorName.trim(),
        author_email: authorEmail.trim(),
      })

      const result = await createBlogPost({
        title: title.trim(),
        content: content.trim(),
        image_url: imageUrl || undefined,
        author_name: authorName.trim(),
        author_email: authorEmail.trim(),
      })

      console.log('Post created successfully:', result)
      toast.success('Your post has been submitted for review!')
      
      // Reset form
      setTitle('')
      setContent('')
      setImageUrl('')
      setAuthorName('')
      setAuthorEmail('')
      
    } catch (error) {
      console.error('Error submitting post:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      toast.error(`Failed to submit post: ${error.message || 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ShaderBackground>
      <Header />
      <PulsingCircle />
      <div className="relative z-20 min-h-screen pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-medium italic instrument text-white mb-4">
              Publish Your Story
            </h1>
            <p className="text-xl text-white/80 font-light">
              Share your experiences and inspire others in our community.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Author Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-white font-medium">
                  Your Name *
                </Label>
                <Input
                  id="authorName"
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Enter your name"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorEmail" className="text-white font-medium">
                  Your Email *
                </Label>
                <Input
                  id="authorEmail"
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-medium">
                Article Title *
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your article"
                className="bg-white/10 border-white/30 text-white placeholder:text-white/60 text-lg h-12"
                required
              />
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label className="text-white font-medium">
                Featured Image (Optional)
              </Label>
              <ImageCropUpload onImageUpload={handleImageUpload} currentImage={imageUrl} />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label className="text-white font-medium">
                Article Content *
              </Label>
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Share your story, insights, or experiences..."
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-3 text-lg bg-white text-black hover:bg-white/90 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </Button>
            </div>

            {/* Info */}
            <div className="text-center text-white/60 text-sm">
              <p>
                Your article will be reviewed by our team before being published. 
                We&apos;ll notify you via email once it&apos;s approved.
              </p>
            </div>
          </form>
        </div>
      </div>
    </ShaderBackground>
  )
}
