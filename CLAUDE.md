# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `npm run dev` - starts dev server with HMR at http://localhost:5173
- **Build**: `npm run build` - creates production build
- **Typecheck**: `npm run typecheck` - runs type generation and TypeScript check
- **Production server**: `npm run start` - serves the production build

## Architecture

This is a React Router v7 application with SSR enabled, using Vite as the build tool.

### Key Files

- `app/routes.ts` - Route configuration using `@react-router/dev/routes`
- `app/root.tsx` - Root layout component with HTML structure, error boundary, and global styles
- `react-router.config.ts` - React Router configuration (SSR enabled by default)
- `vite.config.ts` - Vite config with TailwindCSS and React Router plugins

### Route Structure

Routes are defined in `app/routes.ts` and route modules live in `app/routes/`. Route modules can export:
- `meta` - Page metadata
- `loader` / `action` - Data loading and mutations (server-side)
- Default export - React component

### Path Aliases

Use `~/` to import from the `app/` directory (configured in tsconfig.json).

### Styling

TailwindCSS v4 is configured via `@tailwindcss/vite` plugin. Global styles are in `app/app.css`.
