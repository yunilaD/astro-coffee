# Astro Coffee

A fictional coffee shop site built with Astro + Express — practice project covering static rendering, reusable components, a real frontend-to-backend API flow, CICD, and a live AWS deployment.

**Live site:** https://d1eqe5ok1xaa5k.cloudfront.net

## Features

- **Static homepage & about page** — pre-rendered HTML, zero JavaScript shipped by default
- **Menu page with category filtering** — client-side interactivity using vanilla JS, no framework required
- **Reusable Astro components** — `Badge` (category pills), `Testimonial` (customer quotes), `Hours` (opening hours table), each built to take props instead of hardcoded content
- **One interactive island** — a `Like` component built in React (`Like.tsx`), hydrated with `client:visible` so it only ships JS once it's actually visible on screen
- **Contact form** — submits data from the browser to a real backend API, receives and persists it server-side
- **Express backend** — serves menu data (`GET`) and receives contact messages (`POST`), deployed live on AWS Elastic Beanstalk
- **Environment-based API URLs** — the same code points at `localhost` in development and the live backend in production, switched via `.env` / `.env.production`
- **CI pipeline** — GitHub Actions builds the site (backend included) on every push, catching broken builds before they matter
- Demonstrates Astro's core idea throughout: most rendering happens at build time, and only small, deliberate pieces of JavaScript are shipped to the browser

## Tech stack

- [Astro](https://astro.build) — static site framework
- [Express](https://expressjs.com) — backend API
- React — used for a single interactive island (`Like.tsx`)
- TypeScript for component props and data typing
- CORS for cross-origin requests between frontend and backend
- GitHub Actions — CI pipeline
- AWS — S3 + CloudFront (frontend hosting/CDN), Elastic Beanstalk (backend hosting)

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yml          # CI pipeline: builds backend + frontend on every push
├── server/                  # Express backend
│   ├── server.js            # API routes (GET /api/menu, POST /api/contact)
│   ├── menu.json            # Menu data source
│   └── messages.json        # Contact form submissions (created at runtime, gitignored)
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Badge.astro       # category pill, takes a `category` prop
│   │   ├── Testimonial.astro # customer quote card
│   │   ├── Hours.astro       # opening hours table
│   │   └── Like.tsx          # React island, client:visible
│   ├── data/                 # local menu.json (reference copy)
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro       # Homepage — featured items, testimonials, Like island
│       ├── menu.astro        # Full menu with category filter + badges
│       ├── about.astro       # Shop story
│       ├── drinks.astro
│       └── message.astro     # Contact form (POSTs to backend)
├── .env                      # local dev API URL (gitignored)
├── .env.production           # production API URL (gitignored)
└── package.json
```

## Getting started (local development)

This project has two parts that run separately — the Astro frontend and the Express backend. You'll need **two terminals**.

### 1. Install dependencies

```bash
# From the project root
npm install

# In the server folder
cd server
npm install
```

### 2. Set up your local environment file

Create `.env` in the project root:
```
API_URL=http://localhost:3000
PUBLIC_API_URL=http://localhost:3000
```

### 3. Start the backend

```bash
cd server
npm start
```
Runs at `http://localhost:3000`.

### 4. Start the frontend (in a new terminal)

```bash
npm run dev
```
Runs at `http://localhost:4321`.

> The backend must be running before you start or build the frontend — the menu page fetches data from it at build time.

## API endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/menu` | Returns the full coffee/pastry menu as JSON |
| `POST` | `/api/contact` | Accepts `{ name, email, message }`, stores it in `server/messages.json` |

## CI/CD

Every push to `master` runs a GitHub Actions pipeline (`.github/workflows/ci.yml`) with three jobs:

1. **`build`** — installs and syntax-checks the backend, starts it, waits until it's reachable, then runs a full Astro build against it. This is the safety gate — nothing deploys if this fails.
2. **`deploy-backend`** *(runs only on push to `master`, after `build` passes)* — zips the Express server and deploys it to AWS Elastic Beanstalk.
3. **`deploy-frontend`** *(runs after both `build` and `deploy-backend` succeed)* — rebuilds the Astro site against the live production backend, uploads the result to S3, and invalidates the CloudFront cache so changes go live immediately.

Pull requests only trigger the `build` job — deployment is restricted to actual pushes on `master`, so opening a PR never touches the live site.

## Deployment

- **Backend** — deployed to **AWS Elastic Beanstalk** (Node.js platform), reading its port from the `PORT` environment variable Elastic Beanstalk provides
- **Frontend** — built with `API_URL`/`PUBLIC_API_URL` pointed at the live backend, then the static `dist/` output is uploaded to an **S3** bucket and served through **CloudFront** (HTTPS, edge caching, and a CloudFront Function that rewrites folder-style URLs like `/menu` to `/menu/index.html`)

## Notes

All content — the shop name, menu items, and story — is fictional. This is a learning project, not a real business.
