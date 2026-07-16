#  Astro Coffee

A practice project built while learning Astro — a fictional coffee shop website with a real Express backend powering the menu and contact form.

## Features

- **Static homepage & about page** — pre-rendered HTML, zero JavaScript shipped
- **Menu page with category filtering** — client-side interactivity using vanilla JS (no framework needed)
- **Contact form** — submits data from the browser to a real backend API
- **Express backend** — serves menu data (`GET`) and receives contact messages (`POST`)
- Demonstrates Astro's core idea: most rendering happens at build time, and only small pieces of JavaScript are shipped to the browser when actually needed

## Tech stack

- [Astro](https://astro.build) — static site framework
- [Express](https://expressjs.com) — backend API
- Vanilla TypeScript/JavaScript for client-side interactivity
- CORS for cross-origin requests between frontend and backend

## Project structure

```
.
├── server/              # Express backend
│   ├── server.js        # API routes (GET /api/menu, POST /api/contact)
│   ├── menu.json         # Menu data source
│   └── messages.json     # Contact form submissions (created at runtime)
├── src/
│   ├── components/       # Navbar, Footer
│   ├── data/              # Local menu.json (fallback/reference copy)
│   ├── layouts/           # Shared page layout
│   └── pages/
│       ├── index.astro    # Homepage
│       ├── menu.astro     # Menu with category filter
│       ├── about.astro    # Shop story
│       └── contact.astro  # Contact form
└── package.json
```

## Getting started

This project has two parts that run separately — the Astro frontend and the Express backend. You'll need **two terminals**.

### 1. Install dependencies

```bash
# From the project root
npm install

# In the server folder
cd server
npm install
```

### 2. Start the backend

```bash
cd server
npm start
```
Runs at `http://localhost:3000`.

### 3. Start the frontend (in a new terminal)

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

## Notes

All content — the shop name, menu items, and story — is fictional. This is a learning project, not a real business.
