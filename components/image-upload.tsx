"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import Image from 'next/image'

interface ImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export default function ImageUpload({ onImageUpload, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setUploading(true)
    
    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Import the upload function
      const { uploadBlogImage } = await import('@/lib/supabase')
      
      // Upload to Supabase
      const uploadedUrl = await uploadBlogImage(file)
      console.log('Image uploaded successfully:', uploadedUrl)
      
      onImageUpload(uploadedUrl)
      
    } catch (error) {
      console.error('Upload failed:', error)
      setPreview(null)
      // Show error toast if available
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.error('Failed to upload image')
      }
    } finally {
      setUploading(false)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  })

  const removeImage = () => {
    setPreview(null)
    onImageUpload('')
  }

  return (
    <div className="space-y-4">
      {preview ? (
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-white/5 border border-white/20">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={removeImage}
            className="absolute top-2 right-2"
          >
            Remove
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-white/60 bg-white/10' 
              : 'border-white/30 bg-white/5 hover:border-white/50 hover:bg-white/10'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-white/80">
                {isDragActive
                  ? 'Drop the image here...'
                  : 'Drag & drop an image here, or click to select'}
              </p>
              <p className="text-sm text-white/60 mt-2">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </div>
      )}
      
      {uploading && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-white/80">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Uploading...</span>
          </div>
        </div>
      )}
    </div>
  )
}
