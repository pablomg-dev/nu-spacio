# AGENTS.md - Nu-Spacio Web Development Guide

This document provides guidance for agents working on the Nu-Spacio website codebase.

## Project Overview

- **Type**: Astro static site with React components
- **Stack**: Astro 5.x, React 19, Tailwind CSS 4, TypeScript
- **Purpose**: Centro Holístico Nu-Spacio website (therapies, courses, holistic center)

## Build Commands

```bash
# Development
npm run dev           # Start Astro dev server

# Build
npm run build         # Build for production
npm run preview       # Preview production build

# Astro CLI
npm run astro dev    # Run Astro commands
npm run astro build
npm run astro preview
```

**Note**: No testing framework is currently configured. Do not add tests unless explicitly requested.

**Note**: No linting tools are configured. Do not add ESLint or Prettier unless explicitly requested.

## Project Structure

```
nu-spacio-web/
├── src/
│   ├── components/     # Astro components (.astro) and React (.tsx)
│   ├── layouts/       # Astro layouts
│   ├── pages/         # Astro pages (routing)
│   ├── scripts/       # Client-side JavaScript
│   └── styles/        # Global CSS (Tailwind)
├── public/            # Static assets (images, videos)
├── astro.config.mjs   # Astro configuration
├── tailwind.config.js # Tailwind configuration
└── tsconfig.json     # TypeScript configuration
```

## Code Style Guidelines

### General

- Use 2-space indentation
- Use single quotes for strings
- Use trailing commas in objects/arrays
- Maximum line length: 100 characters (soft limit)

### Astro Files (.astro)

- Frontmatter between `---` fences at top
- CSS classes in Tailwind utility classes
- Props defined in frontmatter with TypeScript interfaces
- Use `<slot />` for content projection

Example:
```astro
---
import Component from '../components/Component.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = "" } = Astro.props;
---

<div class="container">
  <h1>{title}</h1>
  <slot />
</div>
```

### React Components (.tsx)

- Use functional components with arrow functions or `function` keyword
- Define prop interfaces with `interface`
- Use `React.FC<Props>` for typing (optional)
- Hooks: `useState`, `useEffect`, `useRef` for state/effects
- Event handlers typed with appropriate event types

Example:
```tsx
import React, { useState } from "react";

interface Props {
  items: string[];
}

const Component: React.FC<Props> = ({ items }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="p-4">
      {items.map(item => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
};

export default Component;
```

### TypeScript

- Use strict TypeScript (extends `astro/tsconfigs/strict`)
- Define interfaces for all data structures
- Avoid `any` types
- Use proper typing for event handlers

### Tailwind CSS

- Use utility classes directly in markup
- Custom classes only when necessary
- Responsive: `md:`, `lg:` prefixes for breakpoints
- Use semantic color names (e.g., `text-blue-800`, `bg-white`)

### Import Conventions

```typescript
// React
import React, { useState, useEffect } from "react";

// Astro
import Layout from '../layouts/Layout.astro';
import Component from '../components/Component.astro';

// Relative paths (no aliases configured)
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HeaderMenu.tsx`, `Hero.astro`)
- **Files**: kebab-case for Astro pages (e.g., `quienes-somos.astro`)
- **Interfaces**: PascalCase with `Props` suffix (e.g., `HeaderMenuProps`)
- **Variables/functions**: camelCase

### Error Handling

- No specific error boundaries configured
- Use try/catch for async operations
- Console.error for debugging (temporary)

### Accessibility

- Include `aria-label` on icon-only buttons
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`)
- Ensure sufficient color contrast

## TypeScript Configuration

The project uses strict TypeScript mode. Key settings:
- `jsx: "react-jsx"`
- `jsxImportSource: "react"`
- Extends `astro/tsconfigs/strict`

## Recommended VSCode Extensions

- Astro VSCode (`astro-build.astro-vscode`) - Already recommended in .vscode/extensions.json

## Working with This Codebase

1. **Creating new pages**: Add `.astro` files in `src/pages/`
2. **Adding components**: Create in `src/components/` (use `.tsx` for React, `.astro` for Astro)
3. **Styling**: Use Tailwind utility classes; avoid custom CSS unless necessary
4. **Images**: Place in `public/` directory; reference with absolute paths (e.g., `/logo1.jpeg`)
5. **Scripts**: Client-side JS goes in `src/scripts/`

## What NOT To Do

- Do not add testing frameworks (Vitest, Jest, etc.)
- Do not add linting tools (ESLint, Prettier)
- Do not change the framework (Astro + React)
- Do not switch from Tailwind to other CSS frameworks
- Do not add unnecessary dependencies