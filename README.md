# Webora Motors

## Project Overview
Webora Motors is a vehicle marketplace/dealership web application built with Next.js. The application includes both client-facing and administrative interfaces for managing vehicle listings, customers, and sales.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS, Radix UI
- **Hosting**: Deployed on Vercel
- **Email**: React Email with Resend
- **Storage**: AWS S3 for image storage
- **Formatting/Linting**: Biome

## Directory Structure

### Root Level
- `src/` - Main application code
- `prisma/` - Database schema and seed data
- `public/` - Static assets
- `emails/` - Email templates

### Source Code (`src/`)
- `app/` - Next.js App Router pages and API routes
  - `(presentation)/` - Client-facing pages (inventory, auth, favourites)
  - `admin/` - Admin dashboard and management pages
  - `api/` - API endpoints
  - `_actions/` - Server actions
- `components/` - Reusable UI components
  - `ui/` - Base UI components
  - `shared/` - Shared components across the application
  - `admin/` - Admin-specific components
  - `auth/` - Authentication components
  - `classified/` - Vehicle listing components
  - `customers/` - Customer management components
  - `homepage/` - Homepage specific components
  - `inventory/` - Inventory display components
  - `layouts/` - Layout components
  - `reserve/` - Vehicle reservation components
  - `settings/` - Settings page components
- `lib/` - Utility functions and libraries
- `hooks/` - Custom React hooks
- `styles/` - Global styles
- `config/` - Application configuration

### Database Schema (`prisma/schema/`)
- `user.prisma` - User authentication model
- `classified.prisma` - Vehicle listing model with enums for vehicle properties
- `customer.prisma` - Customer information model
- `customer_lifecycle.prisma` - Customer lifecycle tracking
- `image.prisma` - Image storage model
- `taxonomy.prisma` - Vehicle classification taxonomy
- `session.prisma` - Authentication sessions
- `page_view.prisma` - Analytics for page views

## Key Features
- Vehicle listings management
- Customer relationship management
- User authentication
- Admin dashboard
- Vehicle search and filtering
- Responsive design for multiple devices
- Image upload and management
- Analytics tracking

## Routes Structure
- **Client Routes**:
  - `/` - Homepage
  - `/inventory` - Vehicle listings
  - `/favourites` - User's favourite vehicles
  - `/auth` - Authentication pages

- **Admin Routes**:
  - `/admin/dashboard` - Admin overview
  - `/admin/classifieds` - Manage vehicle listings
  - `/admin/customers` - Customer management
  - `/admin/settings` - Application settings

## Database Models
- **User**: Authentication and user management
- **Classified**: Vehicle listings with detailed specifications
- **Customer**: Customer information and management
- **Image**: Vehicle images storage and management
- **Taxonomy**: Vehicle classification system (make, model, etc.)

## Development Workflow
- Package manager: Bun
- Database operations: Prisma CLI commands
- Development server: `bun dev`
- Formatting: Biome
