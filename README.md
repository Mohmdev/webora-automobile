# Webora Motors

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version: v1.2.0-beta.3](https://img.shields.io/badge/version-v1.2.0--beta.3-blue)](package.json)

Webora Motors is a sophisticated vehicle marketplace and dealership web application designed to streamline inventory management, customer relationships, and the overall vehicle sales process. It provides both client-facing interfaces for browsing and purchasing vehicles and comprehensive administrative tools for dealership management.

## ✨ Key Features

*   **Vehicle Marketplace:** Client-facing interface for browsing, searching, and filtering vehicle listings with multiple display templates.
*   **Admin Dashboard:** Secure area for managing inventory, customers, sales, and site settings with comprehensive analytics.
*   **AI-Powered Classification:** Automatic vehicle type classification and taxonomy generation using AI.
*   **Advanced Image Handling:** Multi-part S3 uploads, image optimization, and thumbhash previews.
*   **Advanced Search & Filtering:** Robust search functionality with dynamic filters, range sliders, and saved preferences.
*   **Inventory Management:** Comprehensive tools for adding, updating, and removing vehicle listings with bulk operations.
*   **Secure Authentication:** Multi-factor authentication (Email + Password + OTP) with rate limiting and challenge verification.
*   **Role-Based Access Control:** Distinct permissions for regular users, staff, and administrators.
*   **Responsive Design:** Optimized viewing experience across all devices with mobile-first approach.
*   **Customer Lifecycle Management:** Track customer interactions and sales funnel progression.
*   **Reservation System:** Vehicle reservation workflow with confirmation emails.
*   **Favorites System:** Allow users to save and manage favorite listings.
*   **Motion UI Components:** Rich, interactive UI with animations and transitions for enhanced user experience.

## 🚀 Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) 15.2.4 (App Router, Turbopack)
*   **Language:** [TypeScript](https://www.typescriptlang.org/) 5.8.2
*   **UI Library:** [React](https://reactjs.org/) 19.1.0
*   **Component Toolkit:** [Shadcn UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) Primitives
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4.1.0, `clsx`, `tailwind-merge`
*   **State Management:** React Hooks (useState, useContext, etc.)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) 7.55.0, [Zod](https://zod.dev/) 3.24.2 (Schema Validation)
*   **Animation:** [Motion One](https://motion.dev/) 12.6.3, `tailwindcss-animate`
*   **Database ORM:** [Prisma](https://www.prisma.io/) 6.5.0 (with Accelerate)
*   **Authentication:** [NextAuth.js](https://next-auth.js.org/) v5 (Credentials Provider, Email/OTP 2FA)
*   **API & Server Actions:** Next.js Server Actions, [Ky](https://github.com/sindresorhus/ky) 1.7.5 (HTTP Client)
*   **Email:** [React Email](https://react.email/) 4.0.3, [Resend](https://resend.com/) 4.2.0
*   **AI:** [AI SDK for OpenAI](https://github.com/ai-sdk/openai) 1.3.6, Vercel AI SDK (`ai` package) 4.2.2
*   **Security:** `bcryptjs` 3.0.2 (Password Hashing), `@upstash/ratelimit` 2.0.5 (Rate Limiting), Middleware CSP Headers
*   **Linting/Formatting:** [BiomeJS](https://biomejs.dev/) 1.9.4, Ultracite 4.2.0
*   **Environment Variables:** `@t3-oss/env-nextjs` 0.12.0
*   **Image Handling:** `unlazy` 0.12.4, `thumbhash` 0.1.1, `@aws-sdk/client-s3` 3.779.0
*   **Data Fetching/Caching:** `@tanstack/react-query` 5.71.1
*   **UI Components:** `react-day-picker` 8.10.1, `swiper` 11.2.6, `recharts` 2.15.1
*   **Drag and Drop:** `@dnd-kit/core` 6.3.1, `@dnd-kit/sortable` 10.0.0
*   **Runtime:** [Bun](https://bun.sh/) (used for package management and scripts)

## 🏗️ Project Structure

The project follows an enhanced Next.js App Router structure within the `src/` directory, emphasizing modularity, separation of concerns, and feature-based organization:

```
.
├── public/             # Static assets
│   └── graphics/       # Graphics and images
├── src/
│   ├── ai/             # AI-related functionality
│   │   └── generate-classified/  # AI-powered vehicle classification
│   │       ├── process-details/  # Process vehicle details
│   │       └── process-taxonomy/ # Process vehicle taxonomy
│   ├── app/            # Next.js App Router
│   │   ├── admin/      # Admin dashboard and management
│   │   │   ├── classifieds/  # Vehicle listings management
│   │   │   ├── customers/    # Customer management
│   │   │   ├── dashboard/    # Admin dashboard
│   │   │   └── settings/     # Admin settings
│   │   ├── api/        # API routes
│   │   │   ├── auth/   # Authentication endpoints
│   │   │   ├── favourites/  # Favorites management
│   │   │   ├── images/      # Image upload and processing
│   │   │   └── taxonomy/    # Vehicle taxonomy endpoints
│   │   ├── inventory/  # Vehicle inventory browsing
│   │   └── (presentation)/  # Client-facing pages
│   │       ├── auth/   # Authentication pages
│   │       ├── contact/# Contact pages
│   │       └── favourites/  # User favorites
│   ├── auth/           # Authentication logic and utilities
│   │   ├── actions/    # Auth-related server actions
│   │   └── challenge/  # 2FA challenge implementation
│   ├── components/     # Reusable UI components
│   │   ├── admin/      # Admin-specific components
│   │   ├── auth/       # Authentication components
│   │   ├── blocks/     # Page section blocks
│   │   ├── classified/ # Vehicle listing components
│   │   ├── customers/  # Customer-related components
│   │   ├── filters/    # Search and filtering components
│   │   ├── inventory/  # Inventory display components
│   │   ├── layouts/    # Layout components (header, footer, sidebar)
│   │   ├── motion/     # Animation and motion components
│   │   ├── reserve/    # Vehicle reservation components
│   │   ├── shared/     # Shared utility components
│   │   └── ui/         # Base UI components
│   ├── config/         # Application configuration
│   ├── _data/          # Data utilities and mutations
│   │   ├── classified/ # Vehicle listing data operations
│   │   ├── customer/   # Customer data operations
│   │   └── taxonomy/   # Taxonomy data utilities
│   ├── hooks/          # Custom React hooks
│   │   ├── filters/    # Filter-related hooks
│   │   └── record/     # Record-related hooks
│   ├── lib/            # Core utilities, helpers, constants, Prisma client
│   ├── providers/      # React Context providers
│   │   ├── react-query/# React Query provider
│   │   └── theme/      # Theme provider
│   ├── schemas/        # Zod schemas for validation
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript interfaces and type definitions
│   └── middleware.ts   # Request middleware (auth checks, security headers)
├── prisma/             # Prisma database configuration
│   ├── schema/         # Modular Prisma schema files
│   └── seed/           # Database seed scripts
├── emails/             # React Email templates
│   └── static/         # Static assets for emails
├── env.mjs             # Environment variable validation
├── next.config.ts      # Next.js configuration
├── tsconfig.json       # TypeScript configuration
├── biome.json          # BiomeJS linter/formatter configuration
├── components.json     # Shadcn UI components configuration
├── package.json        # Project dependencies and scripts
└── bun.lock            # Bun lockfile
```

## Database Schema (`prisma/schema/`)

The database schema is modularized into separate files for better organization:

- `schema.prisma` - Main Prisma schema file that imports all other schema modules
- `user.prisma` - User authentication model with role-based access control
- `classified.prisma` - Vehicle listing model with enums for vehicle properties
- `customer.prisma` - Customer information model for lead management
- `customer_lifecycle.prisma` - Customer lifecycle tracking and sales funnel
- `image.prisma` - Image storage model with S3 integration
- `taxonomy.prisma` - Vehicle classification taxonomy for structured vehicle data
- `session.prisma` - Authentication sessions for NextAuth
- `page_view.prisma` - Analytics for page views and user engagement

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
*   `bun run dev:inspect`: Starts the development server with Node.js inspector enabled.
*   `bun run devsafe`: Clears the .next directory and starts the development server with Turbopack.
*   `bun run build`: Builds the application for production.
*   `bun run start`: Starts the production server.
*   `bun run lint`: Lints the codebase using Ultracite.
*   `bun run format`: Formats the codebase using Ultracite.
*   `bun run lint:fix`: Lints and automatically fixes issues using BiomeJS.
*   `bun run format:fix`: Formats and automatically fixes issues using BiomeJS.
*   `bun run fix:ci`: Runs BiomeJS in CI mode with formatting, linting, import organization, and assists enabled.
*   `bun run db:push`: Pushes the Prisma schema state to the database (use with caution, prefer migrations).
*   `bun run db:migrate`: Applies database migrations.
*   `bun run db:generate`: Generates the Prisma client.
*   `bun run db:studio`: Opens the Prisma Studio GUI.
*   `bun run db:seed`: Seeds the database with initial data.
*   `bun run db:tunnel`: Creates a tunnel to the database using Prisma's PPG tunnel.
*   `bun run update-deps`: Removes node_modules and bun.lock, then reinstalls dependencies.
*   `bun run ci`: Installs dependencies in CI mode with frozen lockfile.

## 🔐 Authentication & Security

*   **Authentication Flow:** Uses NextAuth.js v5 with a Credentials provider. Implements a two-step verification process with email/password followed by an OTP sent via email (2FA).
*   **Challenge Verification:** Dedicated challenge verification system in `src/auth/challenge` for secure OTP handling.
*   **Password Hashing:** `bcryptjs` is used to securely hash user passwords with appropriate salt rounds.
*   **Session Management:** Database session strategy via `@auth/prisma-adapter` with custom session handling.
*   **Rate Limiting:** Implemented using `@upstash/ratelimit` and Redis for login, API requests, and OTP verification attempts to prevent brute-force attacks.
*   **Route Protection:** Middleware (`src/middleware.ts`) protects admin routes and API endpoints, redirecting unauthenticated users and implementing role-based access control.
*   **Security Headers:** Middleware sets strict Content Security Policy (CSP), `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`, and `Referrer-Policy` headers.
*   **Environment Variables:** Strictly validated using `@t3-oss/env-nextjs` (`src/env.mjs`) to ensure critical security configurations are present.
*   **Server Actions:** Secure server-side operations with proper validation and error handling.

## 🎨 Coding Style & Conventions

*   **Structure:** Clean, modular, feature-based organization with domain-driven design principles.
*   **Typing:** Strict TypeScript usage with interfaces and types (`src/types/`) and comprehensive type safety.
*   **Components:** Functional components with React Hooks. Props are typed using interfaces with proper documentation.
*   **Naming:** Descriptive variable and function names. Named function declarations preferred over anonymous functions.
*   **Styling:** Utility-first CSS with Tailwind CSS v4 and `cn` utility for conditional class merging.
*   **Server Logic:** Next.js Server Actions with explicit error handling, validation, and rate limiting where appropriate.
*   **Database:** Prisma Client with Accelerate for type-safe database interactions and optimized queries.
*   **Linting/Formatting:** Enforced by BiomeJS (`biome.json`) and Ultracite for consistent code style.
*   **Component Organization:** UI components are organized by feature and domain, with shared components in appropriate directories.
*   **State Management:** React Query for server state, React Context for global state, and local state with hooks.
*   **Error Handling:** Consistent error handling patterns with proper user feedback and logging.
*   **Accessibility:** Focus on accessibility with proper ARIA attributes and keyboard navigation.

## 🤝 Contributing

Contributions are welcome! Please follow the established coding style and conventions. Consider opening an issue first to discuss proposed changes. (If a `CONTRIBUTING.md` exists, link it here).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details (Assuming an MIT license file exists, otherwise remove link or refer to `package.json`).