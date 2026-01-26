# Primer Grito Landing Page

A landing page for the novel "Primer Grito" built with Astro.js, featuring sections for hero, author, reviews, and purchase.

## Requirements

- Node.js (version 22 or higher)
- Astro
- pnpm

## Installation

```sh
pnpm install
```

## Commands

- `pnpm dev`: Start development server at `localhost:4321`
- `pnpm build`: Build production site to `./dist/`
- `pnpm preview`: Preview build locally

## Project Structure

```
/
├── public/          # Static assetsno
├── src/
│   ├── assets/      # Images, backgrounds, icons
│   ├── components/  # Reusable components
│   ├── features/    # Feature-specific code
│   ├── layouts/     # Page layouts
│   ├── pages/       # Route pages
│   └── styles/      # Global styles
├── Dockerfile       # Docker configuration
└── package.json
```

## Git Conventions

- Main branch: `master`
- Branch names: `feature/feature-name`, `fix/fix-name`
- Pull Requests: Create PRs against `master` with descriptions

## Environment Variables

No environment variables required.

## Local Testing

Run `pnpm dev` and open `http://localhost:4321` in your browser.
