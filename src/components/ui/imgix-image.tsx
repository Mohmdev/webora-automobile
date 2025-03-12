"use client"

import { imgixLoader } from "@/lib/imgix-loader"
import Image, { type ImageProps } from "next/image"
import { useState } from "react"

/**
 * ImgixImage component
 *
 * This component uses Imgix for image optimization and transformation.
 * It works with Vercel Blob by taking the Blob URL and passing it through
 * the Imgix service for additional transformations and optimizations.
 *
 * If Imgix fails to load the image, it falls back to the standard Next.js Image component.
 */
type ImgixImageProps = Omit<ImageProps, "priority" | "loading">

export const ImgixImage = (props: ImgixImageProps) => {
  const [error, setError] = useState(false)

  if (error) {
    // Fallback to standard Next.js Image if Imgix fails
    return (
      <Image
        fetchPriority="high"
        {...props}
      />
    )
  }

  return (
    <Image
      fetchPriority="high"
      loader={(imgProps) => imgixLoader(imgProps)}
      onError={() => {
        console.warn(
          "Imgix image failed to load, falling back to standard image:",
          props.src,
        )
        setError(true)
      }}
      {...props}
    />
  )
}
