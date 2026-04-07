# Intento Website, Auth, and Billing

This repo now does more than show the landing page. It includes:

- a Vite React marketing site
- Supabase authentication for email/password and Google sign-in
- a download gateway for the desktop app
- an Express API for user session data

## Tech Stack

- `Frontend`: Vite + React + TypeScript + Tailwind
- `Auth`: Supabase Auth
- `Backend`: Express + TypeScript
- `Database`: Supabase Postgres tables in `supabase/schema.sql`

## Environment Setup

1. Copy `.env.example` to `.env`.
2. Fill in the Supabase project values.

Important variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `FRONTEND_URL`
- `ALLOWED_ORIGINS`

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run the SQL from `supabase/schema.sql`.
4. In Supabase Auth, enable:
   - email/password
   - Google OAuth if you want the Google button active
5. Add your site URL and redirect URLs in Supabase Auth settings.

Recommended local redirect URLs:

- `http://localhost:3000/auth`
- `http://localhost:3000/dashboard`

## Run Locally

Install dependencies:

```bash
npm install
```

Run frontend and API together:

```bash
npm run dev:full
```

Or run them separately:

```bash
npm run dev
npm run dev:server
```

## Build

Build the frontend:

```bash
npm run build
```

Build the backend:

```bash
npm run build:server
```

Build both:

```bash
npm run build:all
```

## API Routes

- `GET /api/health`
- `GET /api/user/profile`

Authenticated routes expect a Supabase bearer token.

## What This Enables

- users can create accounts on the website
- authenticated sessions pave the way for the desktop app

## Next Recommended Step

- Start designing the local executable using Electron or Tauri.
- Sync auth tokens from the browser to the desktop environment securely.
