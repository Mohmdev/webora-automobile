# Migration from AWS S3 to Vercel Blob

This project has been migrated from AWS S3 to Vercel Blob for file storage. This document outlines the changes made and how to set up Vercel Blob for your environment.

## Changes Made

1. Removed AWS S3 dependencies:
   - `@aws-sdk/client-s3`
   - `@aws-sdk/s3-request-presigner`
   - `aws-sdk`

2. Added Vercel Blob dependency:
   - `@vercel/blob`

3. Created a new Blob utility library:
   - `src/lib/blob.ts` - Provides functions for uploading, listing, and deleting files

4. Refactored API routes:
   - `src/app/api/images/single-upload/route.ts` - Now uses Vercel Blob for single file uploads
   - `src/app/api/images/init-multipart/route.ts` - Simplified to generate a unique ID for multipart uploads
   - `src/app/api/images/get-multipart/route.ts` - Now returns URLs for chunk uploads
   - `src/app/api/images/upload-chunk/route.ts` - New route for handling chunk uploads
   - `src/app/api/images/finalise-multipart/route.ts` - Now combines chunks and uploads the final file to Vercel Blob

5. Updated Next.js configuration:
   - Added Vercel Blob domains to `remotePatterns` in `next.config.ts`

## Step 2: Integrating Imgix with Vercel Blob

After migrating from AWS S3 to Vercel Blob, we needed to update our Imgix integration to work with the new storage provider. Imgix is used for image transformations and optimizations in our project.

### Changes Made

1. Updated the Imgix loader to work with Vercel Blob URLs:
   - Modified `src/lib/imgix-loader.ts` to handle Vercel Blob URLs properly
   - Added logic to extract the pathname from full URLs
   - Created a new URL with the Imgix domain and the extracted pathname

2. Enhanced the ImgixImage component:
   - Updated `src/components/ui/imgix-image.tsx` with better error handling
   - Added documentation explaining how it works with Vercel Blob
   - Improved the fallback mechanism to standard Next.js Image component

3. Updated environment variables:
   - Modified `NEXT_PUBLIC_IMGIX_URL` in `env.mjs` to work with Vercel Blob
   - Removed the optional flag as this is now a required configuration

### Setting Up Imgix with Vercel Blob

To set up Imgix with Vercel Blob:

1. Create an Imgix source:
   - Go to the Imgix dashboard: https://dashboard.imgix.com/
   - Create a new source with the following settings:
     - Source Type: Web Folder
     - Base URL: `https://{your-blob-store-id}.public.blob.vercel-storage.com`
     - Name: Choose a descriptive name for your source

2. Update your environment variables:
   - Set `NEXT_PUBLIC_IMGIX_URL` to your Imgix source URL (e.g., `https://your-source.imgix.net`)
   - Add this to both your local `.env.local` file and your Vercel project environment variables

### How It Works

The integration works as follows:

1. Images are uploaded to Vercel Blob, which returns a URL like:
   `https://{blob-id}.public.blob.vercel-storage.com/uploads/{uuid}/{filename}`

2. When displaying an image with the `ImgixImage` component:
   - The `imgixLoader` extracts the pathname from the Vercel Blob URL
   - It creates a new URL with your Imgix subdomain and the same pathname
   - It adds Imgix parameters for transformations (width, height, quality, etc.)
   - The resulting URL is something like:
     `https://your-source.imgix.net/uploads/{uuid}/{filename}?w=800&auto=format,compress`

3. Imgix fetches the original image from Vercel Blob, applies the transformations, and serves the optimized image

This setup provides the benefits of both Vercel Blob for storage and Imgix for advanced image transformations.

## Setting Up Vercel Blob

1. Create a Vercel Blob store:
   - Go to your Vercel project dashboard
   - Navigate to the Storage tab
   - Click "Connect Database"
   - Select "Blob" and follow the setup instructions

2. Set environment variables:
   - Add `BLOB_READ_WRITE_TOKEN` to your environment variables
   - For local development, add this to your `.env.local` file
   - For production, add it to your Vercel project environment variables

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

## How It Works

### Single File Uploads

Single file uploads now use the `uploadToBlob` function, which directly uploads files to Vercel Blob and returns a URL.

### Multipart Uploads

Multipart uploads now work as follows:

1. Initialize a multipart upload to get a unique ID
2. Get signed URLs for each chunk
3. Upload each chunk to a temporary location in Vercel Blob
4. Finalize the upload by combining all chunks and uploading the final file
5. Clean up temporary chunk files

## Testing

To test the new implementation:

1. Make sure you have set up Vercel Blob and added the `BLOB_READ_WRITE_TOKEN` to your environment
2. If using Imgix, ensure you've set up an Imgix source and added the `NEXT_PUBLIC_IMGIX_URL` to your environment
3. Run the application locally
4. Try uploading files using the existing UI components
5. Check that files are uploaded to Vercel Blob and accessible via the returned URLs
6. Verify that image transformations work correctly through Imgix 