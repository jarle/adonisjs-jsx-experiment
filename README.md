# AdonisJS JSX Experiment

An experimental project combining **AdonisJS 6** with **server-rendered JSX** and **file-based routing**. This proof-of-concept demonstrates how to achieve modern framework features like loaders, actions, and component-based UI without client-side rendering or hydration.

## Features

- ✨ **Server-rendered JSX** using [`adonisjsx`](https://github.com/adonisjs-community/adonisjsx)
- 🗂️ **File-based routing** similar to Next.js/Remix
- 📡 **Loader/Action patterns** for data fetching and mutations
- 🔒 **Built-in CSRF protection** and session handling
- 🎯 **No client-side JavaScript** required for basic functionality
- ⚡ **Hot reload** during development

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## How It Works

### File-Based Routing

Routes are defined by creating `route.tsx` files in the `app/pages/` directory:

```
app/pages/
├── route.tsx           # → /
├── about/
│   └── route.tsx       # → /about
└── blog/
    ├── route.tsx       # → /blog
    └── :slug/
        └── route.tsx   # → /blog/:slug
```

### Route Modules

Each route file exports a route module with optional `loader`, `action`, `meta`, and required `view`:

```tsx
// app/pages/about/route.tsx
import { defineRoute } from "#lib/route_module"

export default defineRoute({
  // Load data before rendering
  async loader({ ctx }) {
    return { user: await getUserFromSession(ctx) }
  },

  // Handle form submissions
  async action({ ctx }) {
    const email = ctx.request.body()['email']
    ctx.session.flash('message', `Stored email ${email}`)
  },

  // Set page metadata
  meta() {
    return [<title>About</title>]
  },

  // Render the page
  view({ loaderData, ctx }) {
    return (
      <div>
        <h1>About</h1>
        <p>Welcome {loaderData.user?.name}</p>
      </div>
    )
  }
})
```

### Components

Create reusable JSX components in `app/components/`:

```tsx
// app/components/form.tsx
import { Component, csrfField } from 'adonisjsx'

export const Form: Component<FormProps> = ({ children, ...props }) => (
  <form {...props}>
    {csrfField()}
    {children}
  </form>
)
```

### Root Layout

Define your app layout in `app/pages/route.tsx`:

```tsx
export async function Layout({ children, meta }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {await viteAssets(['resources/js/app.js'])}
        {await viteAssets(['resources/css/app.css'])}
        {...meta}
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

## Architecture

The magic happens in the `lib/` directory:

- **`route_module.ts`** - Types and helpers for defining routes
- **`page_resolver.tsx`** - Handles loader execution and page rendering
- **`register_routes.ts`** - Auto-discovers route files and registers them with AdonisJS

## Project Structure

```
├── app/
│   ├── components/          # Reusable JSX components
│   ├── pages/              # File-based routes
│   └── middleware/         # AdonisJS middleware
├── lib/                    # Custom routing system
│   ├── page_resolver.tsx   # Page resolution logic
│   ├── register_routes.ts  # Route registration
│   └── route_module.ts     # Route module types
├── config/                 # AdonisJS configuration
├── resources/              # Static assets
└── start/                  # App bootstrap
```

## Why This Approach?

This experiment explores whether you can get the developer experience of modern frameworks like Next.js or Remix while staying on the server. Benefits include:

- **Simplified deployment** - No build-time static generation or edge functions
- **Better SEO** - Everything is server-rendered by default
- **Reduced complexity** - No client/server boundary to manage
- **Familiar patterns** - Loader/action pattern from Remix, file-based routing from Next.js
- **AdonisJS ecosystem** - Full access to AdonisJS features (ORM, auth, middleware, etc.)

## Development

```bash
npm run dev        # Start dev server with hot reload
npm run build      # Build for production
npm run typecheck  # Run TypeScript checks
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm test           # Run tests
```

## Dependencies

- **AdonisJS 6** - Full-stack framework
- **adonisjsx** - JSX rendering for AdonisJS
- **fast-glob** - File system globbing for route discovery
- **TypeScript** - Type safety throughout

---

This is an experimental project exploring server-side JSX patterns. Use at your own risk in production! 🚀