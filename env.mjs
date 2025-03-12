import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    KV_REST_API_URL: z.string().url().optional(),
    KV_REST_API_TOKEN: z.string().optional(),
    KV_URL: z.string().url().optional(),
    KV_REST_API_READ_ONLY_TOKEN: z.string().optional(),
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
    //
    // Vercel Blob
    BLOB_READ_WRITE_TOKEN: z.string(),
    // S3 (now optional as we're using Vercel Blob)
    // S3_BUCKET_ACCESS_KEY: z.string().optional(),
    // S3_BUCKET_SECRET_KEY: z.string().optional(),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    X_AUTH_TOKEN: z.string(),
    OPENAI_API_KEY: z.string().optional(), // TODO: remove optional when we have api key
    // Clerk
    CLERK_SECRET_KEY: z.string(),
    // Clerk URLs
    CLERK_SIGN_IN_URL: z.string().default("/auth/sign-in"),
    CLERK_SIGN_UP_URL: z.string().default("/auth/sign-up"),
    CLERK_AFTER_SIGN_IN_URL: z.string().default("/admin/dashboard"),
    CLERK_AFTER_SIGN_UP_URL: z.string().default("/admin/dashboard"),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGIX_URL: z.string().url(), // https://{blob-id}.public.blob.vercel-storage.com
    // S3 (now optional as we're using Vercel Blob)
    // NEXT_PUBLIC_S3_BUCKET_REGION: z.string().optional(),
    // NEXT_PUBLIC_S3_BUCKET_NAME: z.string().optional(),
    // NEXT_PUBLIC_S3_URL: z.string().optional(),
    NEXT_PUBLIC_TINYMCE_API_KEY: z.string(),
    // Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Redis
    KV_REST_API_URL: process.env.KV_REST_API_URL,
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN,
    KV_URL: process.env.KV_URL,
    KV_REST_API_READ_ONLY_TOKEN: process.env.KV_REST_API_READ_ONLY_TOKEN,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    // Vercel Blob
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    // S3
    // S3_BUCKET_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
    // S3_BUCKET_SECRET_KEY: process.env.S3_BUCKET_SECRET_KEY,
    // NEXT_PUBLIC_S3_BUCKET_REGION: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
    // NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    // NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    // Resend
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    // Auth
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    X_AUTH_TOKEN: process.env.X_AUTH_TOKEN,
    //
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    //
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
    // Clerk
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // Clerk URLs
    CLERK_SIGN_IN_URL: process.env.CLERK_SIGN_IN_URL || "/auth/sign-in",
    CLERK_SIGN_UP_URL: process.env.CLERK_SIGN_UP_URL || "/auth/sign-up",
    CLERK_AFTER_SIGN_IN_URL:
      process.env.CLERK_AFTER_SIGN_IN_URL || "/admin/dashboard",
    CLERK_AFTER_SIGN_UP_URL:
      process.env.CLERK_AFTER_SIGN_UP_URL || "/admin/dashboard",
  },
})
