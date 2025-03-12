import { InitialiseMultipartUploadSchema } from "@/app/schemas/images.schema"
import { auth } from "@/auth"
import { forbidden } from "next/navigation"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export const POST = auth(async (req) => {
  try {
    if (!req.auth) forbidden()
    const data = await req.json()
    const validated = InitialiseMultipartUploadSchema.safeParse(data)
    if (!validated.success) return NextResponse.error()
    const { name, uuid } = validated.data
    const key = `uploads/${uuid}/${name}`.replace(/\s+/g, "-")

    // Generate a unique ID for this upload
    const uploadId = uuidv4()

    return NextResponse.json(
      {
        fileId: uploadId,
        fileKey: key,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(`Error in initialising multipart upload: ${error}`)
    return NextResponse.error()
  }
})
