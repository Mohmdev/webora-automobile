import { type PutBlobResult, del, list, put } from "@vercel/blob"

interface UploadToBlobArgs {
  file: Buffer
  filename: string
  mimetype: string
}

export async function uploadToBlob({
  file,
  filename,
  mimetype,
}: UploadToBlobArgs): Promise<PutBlobResult> {
  try {
    const blob = await put(filename, file, {
      access: "public",
      contentType: mimetype,
      cacheControlMaxAge: 31536000, // 1 year in seconds
    })

    return blob
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`Failed to upload file: ${filename}. Error: ${error}`)
  }
}

export async function listBlobs(prefix?: string) {
  try {
    return await list({ prefix })
  } catch (error: unknown) {
    console.log(error)
    throw new Error(
      `Failed to list blobs with prefix: ${prefix}. Error: ${error}`,
    )
  }
}

export async function deleteBlob(url: string) {
  try {
    return await del(url)
  } catch (error: unknown) {
    console.log(error)
    throw new Error(`Failed to delete blob: ${url}. Error: ${error}`)
  }
}
