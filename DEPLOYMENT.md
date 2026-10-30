# Netlify and Supabase Deployment

ShopEasy can deploy its Vite frontend and Express API together on Netlify.
Netlify Functions adapt the existing Express API, while Supabase hosts
PostgreSQL.

## 1. Prepare Supabase

1. Create a Supabase project.
2. Open the Supabase SQL Editor and run
   [`backend/sql/schema.sql`](./backend/sql/schema.sql).
3. In the Supabase project dashboard, get a PostgreSQL connection string.
   For a serverless API, use the Supabase session pooler or transaction pooler
   as appropriate for your project/network. Ensure the connection uses SSL.
4. Keep the connection string and database password private.

The schema is intended for a new/empty database. `IF NOT EXISTS` does not
migrate or repair a pre-existing table with a different structure.

## 2. Deploy to Netlify

1. Push the project to a Git provider and import it into Netlify.
2. Use the repository root as the base directory. The checked-in
   `netlify.toml` configures `npm run build`, `dist`, Netlify Functions, API
   routing, and the React single-page-app fallback.
3. In the Netlify site environment variables, set:
   - `DATABASE_URL`: the Supabase PostgreSQL connection string.
   - `JWT_SECRET`: a long, unique, randomly generated secret.
   - `NODE_ENV`: `production`.
   - `DB_POOL_MAX`: `1` (optional; conservative default for serverless).
   - `VITE_API_BASE_URL`: `/api` (optional; this is the same-origin default).
4. Trigger a deploy. Vite embeds `VITE_API_BASE_URL` during the build, so
   changing that variable requires a new deploy.

Netlify provides `URL` and `DEPLOY_PRIME_URL` for the deployed site and deploy
preview. The API uses those values as allowed CORS origins. If you have a
custom domain, add its exact origin to `FRONTEND_ORIGINS`, comma-separated
when there is more than one.

## 3. Verify the deployment

- Open the Netlify site and navigate to app routes, including refreshing
  `/products` and `/profile`.
- Visit `/api/health`; a healthy response confirms the function can query
  Supabase.
- Register, log in, refresh while logged in, place an order, and view order
  history.
- Confirm users and orders are saved in Supabase.
- Review Netlify function logs for server-side errors. Do not log or commit
  database connection strings, passwords, or JWT secrets.

## Local development

- Copy `.env.example` to the repository root; the frontend default uses
  `http://localhost:5001/api` for local development. If the variable is
  unset, the frontend uses the same-origin `/api` path configured for Netlify.
- Copy `backend/.env.example` to `backend/.env` and set local PostgreSQL
  credentials, or set `DATABASE_URL` to a Supabase connection string.
- Run `backend/sql/schema.sql` against the database.
- Install dependencies from the repository root with `npm install`.
- Start the API with `npm --prefix backend run dev` and the frontend with
  `npm run dev`.

## Demo limitations

Products are sourced from DummyJSON. The checkout currently offers a card
selection but does not integrate a payment processor. This setup is suitable
for a demo or portfolio deployment, not real payment processing.

## Deployment change record

- 2026-10-30: Added configurable frontend API URLs, hosted PostgreSQL
  connection support, production CORS configuration, and the database schema.
- 2026-10-30: Configured Netlify to serve the frontend and Express API through
  a Netlify Function, added Supabase PostgreSQL connection support and schema
  setup instructions, and documented deployment and verification steps.
