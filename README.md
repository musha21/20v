# Malwanahinna Volleyball Ground Maintenance System

A community initiative dedicated to maintaining and developing Malwanahinna Volleyball Ground. Admin records daily cash totals, expenses, and sponsors. Players get view-only access after admin approval.

## Stack

- React + Vite (JavaScript)
- Tailwind CSS
- Progressive Web App (installable on Android and iPhone)
- Supabase Auth + PostgreSQL + RLS

## Setup

1. Copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. In Supabase Dashboard → Authentication → Providers → Email: turn **off** “Confirm email” (login uses synthetic `*@volley.local` addresses).
3. Apply SQL from `supabase/migrations/` (already applied on the linked project).
4. Install and run:

```bash
npm install
npm run dev
```

## PWA install

- Works on **HTTPS** production hosts or `localhost`.
- **Android / Chrome:** use the bottom “Install” banner, or browser Install App menu.
- **iPhone / Safari:** Share → Add to Home Screen (shown in the bottom banner tips).

## First admin

1. Register with mobile + password (or login).
2. On the login screen open **First-time admin setup**.
3. Click **Become first admin** (works only when no admin exists).

New player accounts stay `PENDING` until an admin approves them under **Players**.

## Login model

Mobile + password uses synthetic emails: `{normalizedMobile}@volley.local`.

## Financial rules

- Opening Balance = cash held before the system started (admin-set, not a daily collection)
- Total Collection = sum of daily collections
- Total Income = Opening Balance + Total Collection + Total Sponsorship
- Current Balance = Total Income − Total Expenses
