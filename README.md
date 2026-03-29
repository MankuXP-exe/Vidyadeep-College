# Vidyadeep Paramedical Institute

Production-ready Next.js 14 website for Vidyadeep Paramedical Institute with a premium academic-medical UI, secure admin dashboard, admission form persistence, gallery management, and Vercel-ready deployment structure.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Shadcn-style UI components
- Prisma with PostgreSQL or Supabase Postgres
- NextAuth credentials-based admin authentication
- Supabase Storage support for gallery uploads

## Key Features

- Mobile-first premium public website
- Course catalogue with dynamic detail pages
- Faculty, facilities, admissions, placements, gallery, and contact pages
- Online admission form with validation, rate limiting, and DB persistence
- Role-based admin panel for courses, faculty, gallery, applications, testimonials, and website content
- Security headers, origin checks, password hashing, and guarded admin routes
- SEO metadata and schema markup

## Setup

1. Install dependencies.
   - `npm install`
2. Copy environment variables.
   - `copy .env.example .env`
3. Configure PostgreSQL or Supabase Postgres in `DATABASE_URL`.
4. Run Prisma migration tools.
   - `npx prisma generate`
   - `npx prisma db push`
5. Start the dev server.
   - `npm run dev`

## Admin Login

The first admin user is auto-created from:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

This happens when the first credentials login attempt is made.

## Gallery Uploads

If `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET` are configured, the admin gallery page can upload files directly to Supabase Storage. Without those values, admins can still save direct image URLs.

## Vercel Deployment

- Add the environment variables from `.env.example` in Vercel.
- Set up a Postgres database in Supabase or another PostgreSQL provider.
- Run `npx prisma db push` against production before first launch.
- Deploy as a standard Next.js project.

## Suggested Folder Structure

- `app/` public pages, admin pages, and API routes
- `components/` shared UI and management components
- `lib/` auth, validation, data, and helper utilities
- `prisma/` database schema
- `public/` static assets
