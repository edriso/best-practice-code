# Best Practice Code

A personal reference web app for quickly looking up best practices, folder structures, conventions, packages, and code patterns for web frameworks.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4
- react-router-dom (client-side routing)
- react-syntax-highlighter (code blocks with Atom One Dark theme)
- lucide-react (icons)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Current Frameworks

- **Express.js** — 13 sections covering MVC setup, routing, middleware, error handling, auth, security, API features, and deployment
- **React.js** — 13 sections covering component patterns, state management, hooks, routing, React Query, forms, Redux, performance, compound components, styling, and error handling
- **MERN Stack** — 10 sections covering full-stack project structure, API design, auth flow, database design, error handling, file uploads, and deployment
- **JavaScript & OOP** — 12 sections covering OOP classes, prototypes, closures, arrays, async/await, modules, MVC architecture, DOM manipulation, and error handling
- **Advanced CSS** — 12 sections covering Sass 7-1 architecture, BEM naming, responsive design, Flexbox, CSS Grid, animations, clip-path, custom properties, and modern CSS features
- **HTML Semantic** — 10 sections covering semantic elements, heading hierarchy, accessibility, forms, meta/SEO, images, lists/tables, UI patterns, performance, and structured data

## How to Add a New Framework

1. Create a data file at `src/data/[framework-id].js` following the same structure as `src/data/express.js`
2. Add an entry to `src/data/frameworks.js` with the framework's `id`, `name`, `description`, `icon`, and `color`
3. That's it — the app will auto-generate routes, sidebar, and content

## Project Structure

```
src/
  components/
    layout/    — Navbar, Sidebar (with scroll spy), DocLayout
    ui/        — CodeBlock, FolderTree, PackageList, Tip, etc.
  data/        — Framework content as structured data objects
  pages/       — HomePage, FrameworkPage, NotFoundPage
  hooks/       — useActiveSection (IntersectionObserver)
```
