"use client"

import { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import Image from 'next/image'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageCropUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
}

export default function ImageCropUpload({ onImageUpload, currentImage }: ImageCropUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 60,
    x: 5,
    y: 20
  })
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setOriginalFile(file)
    
    // Create preview for cropping
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageToCrop(e.target?.result as string)
      setShowCropDialog(true)
    }
    reader.readAsDataURL(file)
  }, [])

  const getCroppedImg = useCallback((
    image: HTMLImageElement,
    crop: PixelCrop,
    fileName: string
  ): Promise<File> => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty')
        }
        const file = new File([blob], fileName, {
          type: 'image/jpeg',
        })
        resolve(file)
      }, 'image/jpeg', 0.95)
    })
  }, [])

  const handleCropComplete = async () => {
    if (!completedCrop || !imgRef.current || !originalFile) return

    setUploading(true)
    try {
      const croppedFile = await getCroppedImg(
        imgRef.current,
        completedCrop,
        `cropped_${originalFile.name}`
      )

      // Create preview
      const previewUrl = URL.createObjectURL(croppedFile)
      setPreview(previewUrl)

      // Upload to Supabase
      const { uploadBlogImage } = await import('@/lib/supabase')
      const uploadedUrl = await uploadBlogImage(croppedFile)
      
      console.log('Cropped image uploaded successfully:', uploadedUrl)
      onImageUpload(uploadedUrl)
      
      setShowCropDialog(false)
      setImageToCrop(null)
      
    } catch (error) {
      console.error('Crop upload failed:', error)
      if (typeof window !== 'undefined' && (window as any).toast) {
        (window as any).toast.error('Failed to upload cropped image')
      }
    } finally {
      setUploading(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
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
                PNG, JPG, GIF up to 10MB
              </p>
              <p className="text-xs text-white/50 mt-1">
                You'll be able to crop the image after upload
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Crop Dialog */}
      <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
        <DialogContent className="max-w-4xl bg-black/90 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white">Crop Your Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-white/70 text-sm">
              Drag to select the area you want to use. This exact crop will be displayed in your blog post.
            </p>
            
            {imageToCrop && (
              <div className="flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1} // Square aspect ratio
                  className="max-w-full max-h-96"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imageToCrop}
                    className="max-w-full max-h-96"
                  />
                </ReactCrop>
              </div>
            )}
            
            <div className="flex justify-center space-x-4 pt-4">
              <Button
                onClick={() => setShowCropDialog(false)}
                variant="outline"
                className="border-white/30 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCropComplete}
                disabled={uploading || !completedCrop}
                className="bg-white text-black hover:bg-white/90"
              >
                {uploading ? 'Uploading...' : 'Use This Crop'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {uploading && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 text-white/80">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Processing image...</span>
          </div>
        </div>
      )}
    </div>
  )
}
