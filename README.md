# Webora Motors

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version: v1.1.0-beta.2](https://img.shields.io/badge/version-v1.1.0--beta.2-blue)](package.json)

Webora Motors is a sophisticated vehicle marketplace and dealership web application designed to streamline inventory management, customer relationships, and the overall vehicle sales process. It provides both client-facing interfaces for browsing and purchasing vehicles and comprehensive administrative tools for dealership management.

## ✨ Key Features

*   **Vehicle Marketplace:** Client-facing interface for browsing, searching, and filtering vehicle listings.
*   **Admin Dashboard:** Secure area for managing inventory, customers, sales, and site settings.
*   **AI-Powered Classification:** Automatic vehicle type classification using AI.
*   **AI Image Processing:** Advanced image handling and processing capabilities.
*   **Advanced Search & Filtering:** Robust search functionality with multiple criteria.
*   **Inventory Management:** Tools for adding, updating, and removing vehicle listings.
*   **Secure Authentication:** Multi-factor authentication (Email + Password + OTP) with rate limiting.
*   **Role-Based Access Control:** Distinct permissions for regular users and administrators.
*   **Responsive Design:** Optimized viewing experience across all devices.
*   **Image Upload & Handling:** Secure image uploads likely utilizing AWS S3.

## 🚀 Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15 (App Router, Turbopack)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://reactjs.org/) 19
*   **Component Toolkit:** [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) Primitives
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4, `clsx`, `tailwind-merge`
*   **State Management:** React Hooks (useState, useContext, etc.)
*   **Forms:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) (Schema Validation)
*   **Animation:** [Framer Motion](https://www.framer.com/motion/), `tailwindcss-animate`
*   **Database ORM:** [Prisma](https://www.prisma.io/) (with Accelerate)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) v5 (Credentials Provider, Email/OTP 2FA)
*   **API & Server Actions:** Next.js Server Actions, [Ky](https://github.com/sindresorhus/ky) (HTTP Client)
*   **Email:** [React Email](https://react.email/), [Resend](https://resend.com/)
*   **AI:** [OpenAI SDK](https://github.com/openai/openai-node), Vercel AI SDK (`ai` package)
*   **Security:** `bcryptjs` (Password Hashing), `@upstash/ratelimit` (Rate Limiting), Middleware CSP Headers
*   **Linting/Formatting:** [BiomeJS](https://biomejs.dev/)
*   **Environment Variables:** `@t3-oss/env-nextjs`
*   **Image Handling:** `unlazy`, `thumbhash`, `@aws-sdk/client-s3`
*   **Data Fetching/Caching:** `@tanstack/react-query` (Potentially, based on presence)
*   **Runtime:** [Bun](https://bun.sh/) (implied by `bun.lockb` and scripts)

## 🏗️ Project Structure

The project follows a standard Next.js App Router structure within the `src/` directory, emphasizing modularity and separation of concerns:

```
.
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router (pages, layouts, API routes, server actions)
│   ├── components/     # Reusable UI components (organized by feature/domain)
│   ├── lib/            # Core utilities, helpers, constants, Prisma client, etc.
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript interfaces and type definitions
│   ├── providers/      # React Context providers (Theme, Auth, etc.)
│   ├── config/         # Application configuration
│   ├── schemas/        # Zod schemas for validation
│   ├── styles/         # Global styles (if any beyond Tailwind)
│   ├── types/          # TypeScript interfaces and type definitions
│   ├── _data/          # Static data files or data utilities
│   └── middleware.ts   # Request middleware (auth checks, security headers)
├── prisma/             # Prisma schema, migrations, seed scripts
├── emails/             # React Email templates
├── .env.example        # Example environment variables
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── biome.json          # BiomeJS linter/formatter configuration
├── package.json        # Project dependencies and scripts
└── bun.lockb           # Bun lockfile
```

## Database Schema (`prisma/schema/`)
- `user.prisma` - User authentication model
- `classified.prisma` - Vehicle listing model with enums for vehicle properties
- `customer.prisma` - Customer information model
- `customer_lifecycle.prisma` - Customer lifecycle tracking
- `image.prisma` - Image storage model
- `taxonomy.prisma` - Vehicle classification taxonomy
- `session.prisma` - Authentication sessions
- `page_view.prisma` - Analytics for page views

## 🏁 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (>=18.20.2 <23.0.0)
*   [Bun](https://bun.sh/) (Recommended package manager)
*   Database (e.g., PostgreSQL - configure in `prisma/.env`)
*   AWS S3 Bucket (for image uploads - configure credentials)
*   Email Provider (e.g., Resend API key)
*   OpenAI API Key (for AI features)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mohmdev/webora-motors.git
    cd webora-motors
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    *   Copy `.env.example` to `.env` (or `prisma/.env` for database URL).
    *   Fill in the required values (Database URL, Auth secret, AWS credentials, Resend API key, OpenAI key, etc.). Refer to `src/env.mjs` for schema details.

4.  **Set up the database:**
    *   Ensure your database server is running.
    *   Apply migrations:
        ```bash
        bun run db:migrate
        ```
    *   (Optional) Seed the database:
        ```bash
        bun run db:seed
        ```

### Running the Development Server

```bash
bun run dev
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## ⚙️ Available Scripts

*   `bun run dev`: Starts the Next.js development server with Turbopack.
*   `bun run build`: Builds the application for production.
*   `bun run start`: Starts the production server.
*   `bun run lint`: Lints the codebase using BiomeJS.
*   `bun run format`: Formats the codebase using BiomeJS.
*   `bun run lint:fix`: Lints and automatically fixes issues.
*   `bun run format:fix`: Formats and automatically fixes issues.
*   `bun run db:push`: Pushes the Prisma schema state to the database (use with caution, prefer migrations).
*   `bun run db:migrate`: Applies database migrations.
*   `bun run db:generate`: Generates the Prisma client.
*   `bun run db:studio`: Opens the Prisma Studio GUI.
*   `bun run db:seed`: Seeds the database with initial data.

## 🔐 Authentication & Security

*   **Authentication Flow:** Uses NextAuth.js with a Credentials provider. Requires email/password followed by an OTP sent via email (2FA).
*   **Password Hashing:** `bcryptjs` is used to securely hash user passwords.
*   **Session Management:** Database session strategy via `@auth/prisma-adapter`.
*   **Rate Limiting:** Implemented using `@upstash/ratelimit` and Redis for login and OTP verification attempts to prevent brute-force attacks.
*   **Route Protection:** Middleware (`src/middleware.ts`) protects admin routes, redirecting unauthenticated users.
*   **Security Headers:** Middleware sets strict Content Security Policy (CSP), `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, and `Referrer-Policy` headers.
*   **Environment Variables:** Strictly validated using `@t3-oss/env-nextjs` (`src/env.mjs`) to ensure critical security configurations are present.

## 🎨 Coding Style & Conventions

*   **Structure:** Clean, modular, feature-based organization.
*   **Typing:** Strict TypeScript usage with interfaces and types (`src/types/`).
*   **Components:** Functional components with React Hooks. Props are typed using interfaces.
*   **Naming:** Descriptive variable and function names. Named function declarations preferred.
*   **Styling:** Utility-first CSS with Tailwind CSS and `cn` utility.
*   **Server Logic:** Next.js Server Actions with explicit error handling and rate limiting where appropriate.
*   **Database:** Prisma Client for type-safe database interactions.
*   **Linting/Formatting:** Enforced by BiomeJS (`biome.json`).

## 🤝 Contributing

Contributions are welcome! Please follow the established coding style and conventions. Consider opening an issue first to discuss proposed changes. (If a `CONTRIBUTING.md` exists, link it here).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (Assuming an MIT license file exists, otherwise remove link or refer to `package.json`). 