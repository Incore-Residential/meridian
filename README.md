# The Meridian at Pine Island — Landing Page

A luxury apartment property landing page for **The Meridian at Pine Island Road** in Cape Coral, FL.

## About

Single-page marketing website targeting ambitious professionals (28–45) at their "meridian moment" — peak career and life convergence.

## Tech Stack

This is an npm workspaces monorepo with two packages:

- **`webapp/`** — React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui (port `8000`)
- **`backend/`** — [Hono](https://hono.dev) on Node.js running via [tsx](https://tsx.is) + [Resend](https://resend.com) for email (port `3000`)

## Prerequisites

- Node.js `>= 20`
- npm `>= 10`

## Quick start

```bash
git clone https://github.com/Incore-Residential/meridian.git
cd meridian
npm install

cp backend/.env.example backend/.env
cp webapp/.env.example webapp/.env

npm run dev
```

The webapp will be at <http://localhost:8000> and the backend at <http://localhost:3000>. The Vite dev server proxies `/api/*` to the backend, so the frontend uses relative URLs in both dev and prod.

## Scripts

Run from the repo root:

| Script | What it does |
| --- | --- |
| `npm run dev` | Starts both `backend` and `webapp` dev servers |
| `npm run dev:backend` | Just the backend (with hot reload via `tsx watch`) |
| `npm run dev:webapp` | Just the webapp (Vite dev server) |
| `npm run build` | Builds the webapp for production into `webapp/dist` |
| `npm run start` | Runs the backend in production mode |
| `npm run typecheck` | Type-checks both workspaces |
| `npm run lint` | Lints the webapp |

## Environment variables

### `backend/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | no | Backend port (defaults to `3000`) |
| `CORS_ORIGIN` | no | Comma-separated allowed origins. Use `*` for any origin. Defaults to `http://localhost:8000` |
| `RESEND_API_KEY` | yes (for contact form) | Your [Resend](https://resend.com) API key |
| `CONTACT_FROM_EMAIL` | no | "From" address for contact-form emails. Must be a verified Resend domain. Defaults to `onboarding@resend.dev` |
| `CONTACT_TO_EMAIL` | no | Where contact-form submissions are emailed |

### `webapp/.env`

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_BACKEND_URL` | no | Override backend URL. Leave blank to use relative URLs (recommended) |
| `VITE_BACKEND_PROXY_TARGET` | no | Override the Vite dev-server proxy target (defaults to `http://localhost:3000`) |

## Deploying to Vercel (recommended)

The repo is preconfigured to deploy as a single Vercel project: the webapp is built as a static site, and the Hono backend runs as a Vercel serverless function under `/api/*` on the same domain (no CORS, no second deployment).

The relevant pieces:

- `vercel.json` — sets `buildCommand`, `outputDirectory: webapp/dist`, and a SPA rewrite for non-`/api` paths
- `api/[[...route]].ts` — entrypoint that wraps the Hono app via `hono/vercel`
- `backend/src/app.ts` — exported app shared between the local dev server and the Vercel function

### Project setup

1. In Vercel, **Import** the GitHub repo `Incore-Residential/meridian`.
2. **Root Directory:** leave as the repo root (`./`). Do **not** set it to `webapp` — that breaks the workspaces install.
3. **Framework Preset:** *Other* (`vercel.json` handles configuration).
4. **Build Command / Output Directory / Install Command:** leave on defaults — they're picked up from `vercel.json`.

### Environment variables

Add these in **Project Settings → Environment Variables**:

| Variable | Required | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Your Resend API key |
| `CONTACT_FROM_EMAIL` | optional | Defaults to `onboarding@resend.dev` (only valid for testing — verify your domain in Resend for production) |
| `CONTACT_TO_EMAIL` | optional | Defaults to `mlich@incoreresidential.com` |
| `CORS_ORIGIN` | optional | Not needed when frontend + API share the domain. Set if you point a separate frontend at the API |

`PORT` is **not** needed on Vercel (functions don't bind ports).

### Local dev (unchanged)

The dev workflow above (`npm run dev`) still works. The Vite dev-server proxy forwards `/api/*` to the local Hono server on `:3000`, while in production the same `/api/*` URLs hit the serverless function.

## Self-hosted deploy (alternative)

If you'd rather run the backend yourself:

1. `npm install`
2. `npm run build` (produces `webapp/dist`)
3. Serve `webapp/dist` from your CDN / static host
4. Run the backend with `npm run start` with `RESEND_API_KEY` and `CORS_ORIGIN` set to the webapp's origin
5. Either host the webapp at the same origin as the backend (recommended — relative `/api` URLs just work), or set `VITE_BACKEND_URL` at build time

## Sections

1. **Nav** — Fixed header with logo, nav links, "Schedule a Tour" CTA
2. **Hero** — Full-screen dark hero with animated headline, brand promise, stats
3. **Story** — Three messaging pillars (Convergence, Zenith, Positioned Perfectly)
4. **Amenities** — 4-column amenity grid on dark charcoal background
5. **Floor Plans** — Interactive floor plan selector with 6 plans (sidebar + large preview)
6. **Location** — Map embed + proximity highlights on coastal navy
7. **Contact** — Lead capture form (POSTs to `/api/contact`, emails via Resend)
8. **Footer** — Pre-leasing badge, navigation, brand mark

## Brand

- **Primary Colors:** Meridian Charcoal (`#384349`), Zenith Gold (`#D4A574`), Coastal Navy (`#1B2B44`)
- **Typography:** Montserrat (headlines), Inter (body), Cormorant Garamond (accent/luxury)
- **Tagline:** "The Defining Line of Luxury | Where Everything Aligns"

## Assets

All images live in `webapp/public/images/`:

- `meridian-logo.png` — Brand logo
- `floor-plan-1.png` through `floor-plan-6.png` — Floor plan images
- `hero-aerial.jpg`, `hero-building.jpg` — Hero imagery
