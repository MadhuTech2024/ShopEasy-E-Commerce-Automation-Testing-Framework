# ShopEasy Deployment Guide

ShopEasy uses Vercel for the React/Vite frontend, Render for the Express API,
and Neon PostgreSQL for application data.

## Render backend

Configure the Render web service with:

- Root directory: `backend`
- Build command: `npm ci`
- Start command: `npm start`
- Health check path: `/api/health`

Set these Render environment variables without committing their values:

- `NODE_ENV=production`
- `DATABASE_URL`: the Neon PostgreSQL connection string, including the SSL
  requirements provided by Neon.
- `JWT_SECRET`: a long, unique random secret.
- `FRONTEND_ORIGINS=https://shop-easy-e-commerce-automation-tes.vercel.app`

Render supplies `PORT`. The API uses the exact frontend origin for CORS; do not
add a trailing slash. Add other trusted origins as comma-separated values only
when they are needed.

## Neon database

The application schema is in [`backend/sql/schema.sql`](backend/sql/schema.sql).
For a new database, apply it using the Neon SQL Editor before starting the API.
The script uses `CREATE TABLE IF NOT EXISTS`; it does not migrate or repair
existing tables with a different structure.

The production database was previously initialized. Do not rerun schema
changes against production unless the change has been reviewed and the
database is backed up. For local migration work, use a separate development
database.

## Vercel frontend

Configure the Vercel project to use the repository root with:

- Build command: `npm run build`
- Output directory: `dist`
- Production environment variable:
  `VITE_API_BASE_URL=https://shopeasy-e-commerce-automation-testing.onrender.com/api`

Keep local development configuration in the root `.env` as
`VITE_API_BASE_URL=http://localhost:5001/api`. Vite embeds this value at build
time, so changes to the Vercel variable require a new frontend deployment.

[`vercel.json`](vercel.json) provides the SPA fallback so routes such as
`/login`, `/SignUp`, and `/products` serve the application entry point on
direct navigation and refresh.

## Local development

From PowerShell at the repository root:

```powershell
npm ci
npm --prefix backend ci
Copy-Item .env.example .env
Copy-Item backend\.env.example backend\.env
npm --prefix backend run dev
```

In a second terminal, run `npm run dev`. Configure local PostgreSQL connection
values only in `backend\.env`. Never put `DATABASE_URL` or `JWT_SECRET` in a
Vite environment file.

## Deployment verification

After deployment, check:

- `https://shopeasy-e-commerce-automation-testing.onrender.com/api/health`
- `https://shopeasy-e-commerce-automation-testing.onrender.com/api/auth/test`
- The Vercel homepage and direct refreshes of `/login` and `/SignUp`
- Registration, login, profile retrieval, cart totals, checkout, and order
  history using a disposable account

The card payment option is a placeholder and is not connected to a payment
processor. Products are supplied by DummyJSON.
