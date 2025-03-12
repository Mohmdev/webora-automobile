import { env } from "@/env"
import type { ImageLoaderProps } from "next/image"

interface LoaderProps extends ImageLoaderProps {
  height?: number
}

export const imgixLoader = ({ src, width, height, quality }: LoaderProps) => {
  // Check if the src is already a full URL (like from Vercel Blob)
  const isFullUrl = src.startsWith("http")

  // For Vercel Blob URLs, extract just the pathname
  let path = src
  if (isFullUrl) {
    try {
      const url = new URL(src)
      path = url.pathname
    } catch (e) {
      console.error("Invalid URL in imgixLoader:", src)
    }
  }

  // Create a new URL with the Imgix domain
  const imgixUrl = new URL(`${env.NEXT_PUBLIC_IMGIX_URL}`)

  // Set the path and parameters
  imgixUrl.pathname = path
  imgixUrl.searchParams.set("w", width.toString())
  imgixUrl.searchParams.set("auto", "format,compress")
  if (height) imgixUrl.searchParams.set("h", height.toString())
  if (quality) imgixUrl.searchParams.set("q", quality.toString())

  return imgixUrl.toString()
}
