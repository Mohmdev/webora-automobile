import { GetMultipartUploadSchema } from "@/app/schemas/images.schema"
import { auth } from "@/auth"
import { forbidden } from "next/navigation"
import { NextResponse } from "next/server"

export const POST = auth(async (req) => {
  try {
    if (!req.auth) forbidden()
    const data = await req.json()
    const validated = GetMultipartUploadSchema.safeParse(data)
    if (!validated.success) return NextResponse.error()
    const { fileId, fileKey, parts } = validated.data

    // For Vercel Blob, we don't need to generate presigned URLs for each part
    // Instead, we'll return a structure that's compatible with the existing client code
    // but will use a different upload mechanism

    const partSignedUrlList = Array.from({ length: parts }, (_, index) => ({
      signedUrl: `/api/images/upload-chunk?fileId=${fileId}&fileKey=${fileKey}&partNumber=${index + 1}`,
      PartNumber: index + 1,
    }))

    return NextResponse.json(
      {
        parts: partSignedUrlList,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(`Error in getting multipart upload: ${error}`)
    return NextResponse.error()
  }
})
