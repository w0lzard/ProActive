# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
# Development
npm run dev              # Start local dev server at http://localhost:3000

# Build & Production
npm run build            # Production build
npm run start            # Run production build locally
npm run lint             # ESLint check

# Database (Cloudflare D1)
npm run d1:migrate:local # Run migrations on local SQLite
npm run d1:migrate       # Run migrations on remote D1

# Cloudflare Deployment
npm run preview          # Build and preview locally with Wrangler
npm run deploy           # Build and deploy to Cloudflare Pages
```

## Architecture Overview

This is a **Next.js 14 App Router** full-stack application for a physiotherapy clinic, deployed to **Cloudflare Pages/Workers**.

### Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, React Hook Form + Zod validation
- **Backend**: Next.js API routes, NextAuth.js (Credentials provider), bcryptjs
- **Database**: SQLite locally (`proactive.db`), Cloudflare D1 in production
- **Deployment**: Cloudflare via `@opennextjs/cloudflare` adapter

### Key Directories
- `app/` - Next.js App Router pages and API routes
- `app/api/` - Backend endpoints: `/auth/[...nextauth]`, `/auth/register`, `/appointments`, `/contact`
- `components/layout/` - Navbar, Footer
- `components/sections/` - Home page sections (Hero, WhyChooseProActive, etc.)
- `components/ui/` - Reusable primitives (Button, Card, Input)
- `lib/` - Utilities: `db.ts` (database), `validations.ts` (Zod schemas), `constants.ts` (site config), `api.ts` (client helpers)
- `migrations/` - SQL schema files for D1

### Authentication Flow
- NextAuth.js with Credentials provider in `app/api/auth/[...nextauth]/route.ts`
- Custom registration endpoint at `app/api/auth/register/route.ts`
- Passwords hashed with bcryptjs
- Protected routes check session (e.g., `/my-bookings`)

### Form Validation
All forms use Zod schemas defined in `lib/validations.ts`:
- `contactSchema` - name, email, message
- `appointmentSchema` - name, email, phone, date (future), service

### Color Theme (Blue)
Primary colors configured in `tailwind.config.ts`:
- Primary: `#2563eb` (blue-600)
- Background light: `#eff6ff` (blue-50)
- Background dark: `#0f172a` (slate-900)
- Dark mode supported via Tailwind `class` strategy

### Database Schema
Three tables in `migrations/0001_init.sql`:
- `users` - id, name, email (unique), password, timestamps
- `appointments` - id, userId (FK), service, therapist, date, time, status
- `contact_messages` - id, firstName, lastName, email, subject, message

### Site Constants
Defined in `lib/constants.ts`: `SITE_NAME`, `CONTACT_EMAIL`, `CONTACT_PHONE`, `CONTACT_ADDRESS`
