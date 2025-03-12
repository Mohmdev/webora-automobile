import { FinaliseMultipartUploadSchema } from "@/app/schemas/images.schema"
import { auth } from "@/auth"
import { deleteBlob } from "@/lib/blob"
import { put } from "@vercel/blob"
import { forbidden } from "next/navigation"
import { NextResponse } from "next/server"

export const maxDuration = 300

export const POST = auth(async (req) => {
  try {
    if (!req.auth) forbidden()
    const data = await req.json()

    const validated = FinaliseMultipartUploadSchema.safeParse(data)
    if (!validated.success) return NextResponse.error()
    const { fileId, fileKey, parts } = validated.data
    const { default: mimetype } = await import("mime-types")
    const mime = mimetype.lookup(fileKey)

    const { default: orderBy } = await import("lodash.orderby")

    // Sort parts by part number
    const orderedParts = orderBy(parts, ["PartNumber"], ["asc"])

    // Fetch all the part chunks and combine them
    const chunks: Buffer[] = []

    for (const part of orderedParts) {
      const partUrl = part.ETag
      const response = await fetch(partUrl)

      if (!response.ok) {
        throw new Error(`Failed to fetch part ${part.PartNumber}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      chunks.push(Buffer.from(arrayBuffer))
    }

    // Combine all chunks into a single buffer
    const combinedBuffer = Buffer.concat(chunks)

    // Upload the combined file to Vercel Blob
    const blob = await put(fileKey, combinedBuffer, {
      access: "public",
      contentType: mime?.toString() || "application/octet-stream",
      addRandomSuffix: false,
    })

    // Clean up the temporary chunk files
    for (const part of orderedParts) {
      try {
        await deleteBlob(part.ETag)
      } catch (error) {
        console.log(`Error deleting chunk: ${error}`)
        // Continue even if deletion fails
      }
    }

    return NextResponse.json(
      {
        url: blob.url,
        key: blob.url,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(`Error in finalising multipart upload: ${error}`)
    return NextResponse.error()
  }
})
