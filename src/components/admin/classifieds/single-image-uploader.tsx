'use client'

import { MAX_IMAGE_SIZE } from '@/config/constants'
import { endpoints } from '@/config/endpoints'
import { api } from '@/lib/api-client'
import { cn, convertToMb } from '@/lib/utils'
import { ImagePlus, Loader2 } from 'lucide-react'
import { type ChangeEvent, type DragEvent, useRef, useState } from 'react'

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
}

export const ImageUploader = (props: ImageUploaderProps) => {
  const { onUploadComplete } = props
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [draggingOver, setDraggingOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File size exceeds ${convertToMb(file.size)} limit`)
      return
    }

    setError(null)
    setIsUploading(true)

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await api.post<{ url: string }>(
        endpoints.images.singleUpload,
        {
          body: formData,
        }
      )
      const { url } = response
      onUploadComplete(url)
      setUploadComplete(true)
    } catch (error) {
      setError(`Failed to upload image. Please try again. / ${error}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = async (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDraggingOver(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) {
      return
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError(`File size exceeds ${convertToMb(file.size)} limit`)
      return
    }

    setError(null)
    setIsUploading(true)

    const reader = new FileReader()

    reader.onloadend = () => {
      setPreview(reader.result as string)
    }

    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await api.post<{ url: string }>(
        endpoints.images.singleUpload,
        {
          body: formData,
        }
      )

      const { url } = response

      onUploadComplete(url)
      setUploadComplete(true)
    } catch (error) {
      setError(`Failed to upload image. Please try again. / ${error}`)
    } finally {
      setIsUploading(false)
    }
  }

  const stopEvent = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragEnter = (e: DragEvent<HTMLButtonElement>) => {
    stopEvent(e)
  }
  const handleDragLeave = (e: DragEvent<HTMLButtonElement>) => {
    stopEvent(e)
    setDraggingOver(false)
  }
  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    stopEvent(e)
    setDraggingOver(true)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="mx-auto w-full">
      <button
        type="button"
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className={cn(
          'relative flex aspect-3/2 w-full cursor-pointer flex-col items-center justify-center rounded-md',
          error && 'border-2 border-red-500 border-dotted',
          isUploading && 'pointer-events-none opacity-50',
          draggingOver && 'opacity-50',
          !uploadComplete && 'border-2 border-gray-300 border-dashed'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading}
          multiple={false}
        />
        {preview ? (
          // biome-ignore lint/nursery/noImgElement: <explanation>
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded-md object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <ImagePlus className="mx-atuo h-12 w-12 text-gray-400" />
            <p className="mt-1 text-gray-600 text-sm">
              Click or drag to upload image (max 2mb)
            </p>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        )}
      </button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </div>
  )
}
