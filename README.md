## Landing Page (React + TypeScript + Vite)

A production-ready landing page built with React 19, TypeScript, Vite 7, and Tailwind CSS 4. Includes Radix UI primitives, React Router, and a multi-stage Docker setup for building and serving the static site with Nginx.

### Tech stack
- **Framework**: React 19 + React Router
- **Build**: Vite 7, TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI**: Radix UI, Lucide icons
- **Animation**: Motion

## Getting started

### Prerequisites
- **Node.js**: 20+ (recommended 22 to match the Docker image)
- **npm**: 10+

### Install dependencies
```bash
npm ci
```

### Run in development
```bash
npm run dev
```
Dev server runs on `http://localhost:3000` (see `vite.config.ts`).

### Build for production
```bash
npm run build
```
Output is generated in the `dist` directory.

### Preview the production build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Environment variables
This project uses Vite envs. At runtime, only variables prefixed with `VITE_` are exposed to the client.

- **VITE_API_BASE_URL**: Base URL for any API calls (if used by the app).

Local `.env` example:
```env
VITE_API_BASE_URL=https://api.example.com
```
Place it in the project root as `.env.local` or `.env`.

Note: In a Docker build, this value must be provided at build-time (see Docker section). A typical static build cannot read runtime container env vars unless additional runtime injection is implemented.

## Scripts
- **dev**: Start Vite dev server
- **build**: Type-check and build the app
- **preview**: Preview the production build
- **lint**: Run ESLint

## Docker
Multi-stage build: Node image to build the static assets, then Nginx to serve from `/usr/share/nginx/html`.

### Build image
```bash
docker build \
  -t landing-page:latest \
  --build-arg VITE_API_BASE_URL=https://api.example.com \
  .
```

### Run container
```bash
docker run -d \
  --name landing-page \
  -p 8080:80 \
  landing-page:latest
```
The site will be available at `http://localhost:8080`.

### Passing environment variables
Because this is a static SPA, env vars must be provided at build-time:

- At build: `--build-arg VITE_API_BASE_URL=...`
- At run: `-e VITE_API_BASE_URL=...` will not affect the already-built assets unless you add a runtime env injection strategy.

### Nginx configuration
The Dockerfile expects an `nginx.conf` at the repository root. If you don’t have one, create it with the following minimal config to support SPA routing:

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }
}
```

Save it as `nginx.conf` in the project root so the Dockerfile can copy it to `/etc/nginx/conf.d/default.conf`.

## Project structure (high level)
```
src/
  app/            # App shell, routing
  assets/         # Images and static assets
  components/     # UI components (Hero, Features, FAQ, etc.)
  lib/            # Utilities
  pages/          # Standalone pages (PrivacyPolicy, ContactForm)
  style/          # CSS (Tailwind, fonts, colors)
public/           # Static public assets (favicon, sitemap, manifest)
```

## Deployment
The app builds to static files in `dist`. You can deploy to any static hosting (Nginx, Netlify, Vercel, S3 + CloudFront, etc.). The provided Docker image serves the build via Nginx.

