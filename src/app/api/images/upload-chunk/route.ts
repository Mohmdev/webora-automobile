import { auth } from "@/auth"
import { put } from "@vercel/blob"
import { forbidden } from "next/navigation"
import { NextResponse } from "next/server"

export const maxDuration = 300

export const PUT = auth(async (req) => {
  try {
    if (!req.auth) forbidden()

    const { searchParams } = new URL(req.url)
    const fileId = searchParams.get("fileId")
    const fileKey = searchParams.get("fileKey")
    const partNumber = searchParams.get("partNumber")

    if (!fileId || !fileKey || !partNumber) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 },
      )
    }

    // Store the chunk temporarily with a unique name
    // We'll combine these chunks in the finalise-multipart endpoint
    const chunkKey = `${fileKey}.part${partNumber}.${fileId}`

    // Get the content type from the request
    const contentType =
      req.headers.get("content-type") || "application/octet-stream"

    // Get the request body as a Blob
    const blob = await put(chunkKey, await req.blob(), {
      access: "public",
      contentType,
      addRandomSuffix: false,
    })

    // Return the ETag (we'll use the URL as the ETag)
    return NextResponse.json({ ETag: blob.url }, { status: 200 })
  } catch (error) {
    console.log(`Error uploading chunk: ${error}`)
    return NextResponse.error()
  }
})
