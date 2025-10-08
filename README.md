# FoundX — Lost & Found Web App

FoundX is a full‑stack Lost & Found application. Frontend is a Next.js + TypeScript app (client folder) and the backend is an Express + TypeScript API (server folder). This README explains how to run, build, and deploy both parts, plus required environment variables (including Meilisearch).

## Contents
- Overview
- Features
- Tech stack
- Repo layout
- Quick start (local)
- Environment variables (.env examples)
- Meilisearch notes
- Postman collection
- Deployment (Vercel for frontend + recommended for backend)
- Troubleshooting & tips
- License

## Overview
FoundX lets users post found items with images, answer verification questions, submit claim requests, and search items. The frontend is in `FoundX-Client`, backend in `FoundX-Server`.

## Features
- User auth (JWT + refresh)
- Item CRUD with image upload (Cloudinary)
- Claim request workflow
- Full‑text search (Meilisearch)
- Social sharing + native share
- Responsive UI (Tailwind CSS + HeroUI)
- Deployed frontend on Vercel (recommended)

## Tech stack
- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS, HeroUI, React Query
- Backend: Node.js, Express, TypeScript, MongoDB, Meilisearch, Cloudinary
- Dev/deploy: Vercel (frontend), Render/Heroku/VM (backend), Postman for API testing

## Repo layout
- FoundX-Client/ — Next.js frontend
- FoundX-Server/ — Express API + TypeScript
- README.md — this file
- FoundX-Server/FoundX.postman_collection.json — Postman collection

## Quick start (local)

Prereqs:
- Node 18+
- yarn or npm
- MongoDB instance (local or Atlas)
- Meilisearch instance (optional for search)
- Cloudinary account (optional for image uploads)

Server
```bash
cd FoundX-Server
yarn install
# create .env (see sample below)
yarn dev        # development with ts-node-dev
yarn build      # compile to dist
yarn start      # run compiled server
```

Client
```bash
cd FoundX-Client
yarn install
# create .env.local (see sample below)
yarn dev        # run Next.js dev server
yarn build      # production build
yarn start      # run build locally
```

## Environment variables

FoundX-Server (.env)
```text
PORT=5000
MONGO_URI=
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
MEILISEARCH_HOST=https://xxx.meilisearch.io
MEILISEARCH_API_KEY=your_meili_key
```

FoundX-Client (.env.local)
```text
NEXT_PUBLIC_BACKEND_URL=https://api.your-backend.com/api/v1
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
NEXT_PUBLIC_MEILISEARCH_HOST=https://xxx.meilisearch.io
# any other NEXT_PUBLIC_* variables required by client
```

Important: The client needs NEXT_PUBLIC_BACKEND_URL (or envConfig.backendURL) during build to avoid prerender errors like `Failed to parse URL from undefined/...`.

## Meilisearch
- Configure MEILISEARCH_HOST and MEILISEARCH_API_KEY on the server.
- Create an index named `items` and tune searchable attributes (title, description, location).
- Index documents after item create/update/delete (server-side hook).

Basic server client example:
```ts
import { MeiliSearch } from "meilisearch";
const meili = new MeiliSearch({ host: process.env.MEILISEARCH_HOST, apiKey: process.env.MEILISEARCH_API_KEY });
await meili.index('items').addDocuments([...]);
```

## Postman
Import `FoundX-Server/FoundX.postman_collection.json`. Update the `BASE_API` variable to your server URL (e.g. `http://localhost:5000/api/v1`).

## Deployment

Frontend (Vercel)
- Connect the `FoundX-Client` repo to Vercel, set Root Directory to `FoundX-Client` if needed.
- Add env vars in Project → Settings (NEXT_PUBLIC_BACKEND_URL, etc.).
- Build Command: `yarn build` (Next auto-detected).
- Deploy.

Backend
- Deploy to Render / Heroku / your preferred host.
- Ensure environment variables are configured on the host (MONGO_URI, Cloudinary, Meilisearch keys, JWT secrets).
- If you deploy serverless (Vercel functions), adapt routes accordingly.

## Troubleshooting & tips
- Tailwind: ensure `postcss.config.js` uses `@tailwindcss/postcss` (install `@tailwindcss/postcss` + `autoprefixer`) for newer Tailwind/PostCSS setups.
- Prerender error: set NEXT_PUBLIC_BACKEND_URL to avoid `Failed to parse URL from undefined/...`.
- Edge runtime warnings: libraries like axios may use Node APIs; avoid importing them in Edge-compiled serverless functions.
- If global CSS not applied, ensure `src/app/layout.tsx` imports `./globals.css` and layout is a server component.

## Contributing
- Fork → new branch → PR.
- Run linter/formatter and tests (if added).
- Keep envs out of the repo; include `.env.example` only.

## License
MIT

## Contact
Repository links:
- Live Link: https://foundx-item.vercel.app
- Backend GitHub : https://github.com/mstsurnalyakter/FondX-server
- Frontend GitHub: https://github.com/mstsurnalyakter/FoundX-Client