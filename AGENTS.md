# SQL Course - Agent Instructions

## Project Overview

A gamified PostgreSQL learning platform built with Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, Drizzle ORM, and Neon database.

## Commands

```bash
# Development
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm typecheck    # Run TypeScript type checking

# Database (after Drizzle setup)
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Run migrations
pnpm db:push      # Push schema to database
pnpm db:studio    # Open Drizzle Studio
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components (sidebar, header)
│   ├── course/             # Course-related components
│   ├── practice/           # Practice/question components
│   ├── dashboard/          # Dashboard components
│   └── common/             # Shared components
├── lib/
│   ├── db/                 # Drizzle schema and queries
│   ├── auth/               # NextAuth.js configuration
│   ├── services/           # Business logic services
│   ├── utils/              # Utility functions
│   └── validators/         # Zod schemas for validation
├── hooks/                  # Custom React hooks
├── store/                  # Zustand stores
├── types/                  # TypeScript type definitions
└── config/                 # App configuration
```

## Conventions

- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Use atomic commits (one logical change per commit)
- Components use PascalCase, files use kebab-case
- Server components by default, add `'use client'` only when needed
- Use Zod for runtime validation
- Use Drizzle ORM for database operations
- Prefer server actions for mutations

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **State:** Zustand
- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle
- **Auth:** NextAuth.js
- **Deployment:** Vercel
