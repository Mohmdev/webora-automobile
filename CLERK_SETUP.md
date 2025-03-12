# Clerk Setup Instructions

This document provides instructions on how to set up Clerk for authentication middleware in your Next.js application.

## 1. Create a Clerk Account

1. Go to [clerk.com](https://clerk.com/) and sign up for an account
2. Create a new application in the Clerk dashboard

## 2. Configure Clerk Settings

### Authentication Strategies

1. In the Clerk dashboard, go to **User & Authentication** > **Email, Phone, Username**
2. Enable **Email Address** and make it required for sign-up and sign-in
3. Go to **Authentication factors** and enable **Password**

### JWT Templates

1. Go to **JWT Templates** in the Clerk dashboard
2. Create a new template with the following claims:
   ```json
   {
     "userId": "{{user.id}}",
     "requires2FA": "{{user.public_metadata.requires2FA}}",
     "email": "{{user.email_addresses[0].email_address}}"
   }
   ```

### Application URLs

1. Go to **User & Authentication** > **Paths**
2. Set the following paths:
   - Sign-in URL: `/auth/sign-in`
   - Sign-up URL: `/auth/sign-up`
   - After sign-in URL: `/admin/dashboard`
   - After sign-up URL: `/admin/dashboard`

## 3. Get API Keys

1. Go to **API Keys** in the Clerk dashboard
2. Copy the **Publishable Key** and **Secret Key**
3. Add these keys to your `.env.local` file:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
   CLERK_SECRET_KEY=sk_test_your_secret_key
   ```

## 4. Migrating Users from NextAuth to Clerk

To migrate your existing users from NextAuth to Clerk:

1. Clone the Clerk migration script repository:
   ```
   git clone https://github.com/clerk/migration-script
   ```

2. Create a `.env` file in the migration script directory with your Clerk Secret Key:
   ```
   CLERK_SECRET_KEY=sk_test_your_secret_key
   ```

3. Export your users from your database into a `users.json` file in the following format:
   ```json
   [
     {
       "userId": "user_id",
       "email": "user@example.com",
       "firstName": "First Name",
       "lastName": "Last Name",
       "password": "hashed_password",
       "passwordHasher": "bcrypt"
     }
   ]
   ```

4. Run the migration script:
   ```
   npm start
   ```

5. Verify that your users have been migrated by checking the Users page in the Clerk dashboard

## 5. Custom Claims for 2FA

To maintain your 2FA flow with Clerk, you need to set the `requires2FA` flag in the user's public metadata. This can be done using the Clerk API:

```typescript
// Example code to set the requires2FA flag
import { clerkClient } from "@clerk/nextjs/server";

await clerkClient.users.updateUser(userId, {
  publicMetadata: {
    requires2FA: true
  }
});
```

## 6. Testing the Integration

After completing the setup, test the following flows:

1. Sign in with an existing user
2. Verify that the 2FA challenge works correctly
3. Verify that protected routes are properly guarded
4. Verify that public routes are accessible without authentication 