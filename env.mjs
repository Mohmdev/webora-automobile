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
    S3_BUCKET_ACCESS_KEY: z.string(),
    S3_BUCKET_SECRET_KEY: z.string(),
    NEXTAUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_FROM_EMAIL: z.string(),
    X_AUTH_TOKEN: z.string(),
    OPENAI_API_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_IMGIX_URL: z.string().url(),
    NEXT_PUBLIC_S3_BUCKET_REGION: z.string(),
    NEXT_PUBLIC_S3_BUCKET_NAME: z.string(),
    NEXT_PUBLIC_S3_URL: z.string(),
    NEXT_PUBLIC_TINYMCE_API_KEY: z.string(),
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
    // S3
    S3_BUCKET_ACCESS_KEY: process.env.S3_BUCKET_ACCESS_KEY,
    S3_BUCKET_SECRET_KEY: process.env.S3_BUCKET_SECRET_KEY,
    NEXT_PUBLIC_S3_BUCKET_REGION: process.env.NEXT_PUBLIC_S3_BUCKET_REGION,
    NEXT_PUBLIC_S3_BUCKET_NAME: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    NEXT_PUBLIC_S3_URL: process.env.NEXT_PUBLIC_S3_URL,
    // Resend
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    //
    NEXT_PUBLIC_IMGIX_URL: process.env.NEXT_PUBLIC_IMGIX_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    X_AUTH_TOKEN: process.env.X_AUTH_TOKEN,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
  },
})
