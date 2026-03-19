# AGENTS.md - Nu-Spacio Web Development Guide

This document provides guidance for agents working on the Nu-Spacio website codebase.

## Project Overview

- **Type**: Astro static site with React components
- **Stack**: Astro 5.x, React 19, Tailwind CSS 4, TypeScript
- **Purpose**: Centro Holístico Nu-Spacio website (therapies, courses, holistic center)

## Build Commands

```bash
npm run dev       # Start Astro dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run astro     # Run Astro CLI commands
```

**Note**: No testing or linting framework is configured. Do not add them unless explicitly requested.

## Project Structure

```
src/
├── components/    # Astro (.astro) and React (.tsx) components
├── layouts/       # Astro layouts
├── pages/         # Astro pages (routing)
├── scripts/       # Client-side JavaScript
└── styles/        # Global CSS (Tailwind)
public/            # Static assets (images, videos)
astro.config.mjs   # Astro + Tailwind + React integration
tailwind.config.js # Tailwind configuration
```

## Code Style Guidelines

### General

- 2-space indentation, single quotes for strings, trailing commas, max 100 chars/line

### Astro Files (.astro)

- Frontmatter between `---` fences, Tailwind utility classes, TypeScript interfaces for props, `<slot />` for content projection

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

- Strict mode (`astro/tsconfigs/strict`), interfaces for all data structures, no `any`, proper event handler typing

### Tailwind CSS

- Utility classes in markup, custom CSS only when necessary, responsive prefixes (`md:`, `lg:`)

### Solid & Functions

- Keep functions under 25 lines; split complex logic into smaller helpers

### Import Conventions

```typescript
// React
import React, { useState, useEffect } from "react";

// Astro
import Layout from '../layouts/Layout.astro';
import Component from '../components/Component.astro';

// Astro image optimization
import { Image } from "astro:images";
```

### Naming Conventions

- **Components**: PascalCase (`HeaderMenu.tsx`, `Hero.astro`)
- **Pages**: kebab-case (`quienes-somos.astro`)
- **Interfaces**: PascalCase with `Props` suffix (`HeaderMenuProps`)
- **Variables/functions**: camelCase

## Web Performance

### Images

- **Always** use Astro's `<Image />` component from `astro:images` for optimized WebP/AVIF output, explicit `width`/`height`, and automatic `srcset`

```astro
import { Image } from "astro:images";

<Image src="/logo1.jpeg" alt="Logo" width={48} height={48} />
```

- Images below the fold: add `loading="lazy"` and `decoding="async"`
- Hero/LCP images: preload with `<link rel="preload">` in `<head>`

### Hydration

- Use `client:load` only for above-the-fold interactive components (e.g., navigation menus)
- Use `client:visible` or `client:idle` for below-the-fold interactive components
- Avoid unnecessary React hydration — prefer static `.astro` components

### External Resources

- Avoid heavy icon libraries (Font Awesome, etc.); use inline SVG instead
- Defer non-critical CSS; load external stylesheets with `media="print"` + `onload` trick if blocking
- Load fonts with `display=swap` (already in place); consider `font-display: optional` for non-critical fonts

### CLS Prevention

- Always set explicit `width` and `height` on images and media
- Reserve space with `min-height`, `aspect-ratio`, or skeleton loaders

## Accesibilidad

### ARIA

- Icon-only buttons: always use `aria-label`
- Interactive controls: use `aria-expanded`, `aria-controls`, `aria-haspopup` as appropriate
- Menus: parent `role="menu"` must contain children with `role="menuitem"`
- Use `aria-labelledby` to associate labels with regions

### Contraste

- Text and background must meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- Avoid `text-white/60` or similar low-opacity text on colored backgrounds

### Semántica HTML

- Use semantic elements: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`
- Always set `<html lang="es">`
- Every `<img>` must have a descriptive `alt` attribute

## Error Handling

- No error boundaries configured; use try/catch for async operations
- Console.error for debugging only (remove before commit)

## Recommended VSCode Extensions

- Astro VSCode (`astro-build.astro-vscode`) — already in `.vscode/extensions.json`

## Working with This Codebase

1. **New pages**: Add `.astro` files in `src/pages/`
2. **New components**: Create in `src/components/` (`.tsx` for React, `.astro` for Astro)
3. **Styling**: Tailwind utility classes; custom CSS only when necessary
4. **Images**: Place in `public/`; use `<Image />` from `astro:images` for optimization
5. **Scripts**: Client-side JS goes in `src/scripts/`

## What NOT To Do

- Do not add testing frameworks (Vitest, Jest, etc.)
- Do not add linting tools (ESLint, Prettier)
- Do not change the framework (Astro + React) or switch from Tailwind
- Do not add unnecessary dependencies
- Do not use icon libraries; use inline SVG instead
