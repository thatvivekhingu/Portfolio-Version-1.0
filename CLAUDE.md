# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio website for Vivek Hingu, built with React 19, TypeScript, and Tailwind CSS. The site features animated UI components, third-party API integrations (Spotify, WakaTime), and a component-based architecture with custom UI libraries.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm build

# Run production build locally
npm start

# Lint code
npm run lint
```

## Architecture Overview

### App Structure
- **Next.js App Router**: Uses the `src/app/` directory with App Router convention
- **Layout System**: Root layout (`src/app/layout.tsx`) wraps all pages with:
  - `ThemeProvider` for dark mode support (defaults to dark theme)
  - Global `Navbar` and `Footer` components
  - Geist Sans and Geist Mono fonts
  - Background decorative SVG overlay

### Component Organization
Components are organized into three main categories:

1. **`src/components/ui/`** - Reusable UI primitives and animated components:
   - Animation components: `blur-fade.tsx`, `tracing-beam.tsx`, `meteors.tsx`, `spotlight.tsx`
   - Interactive elements: `button.tsx`, `shimmer-button.tsx`, `morphing-text.tsx`
   - Data display: `globe.tsx`, `marquee.tsx`, `number-ticker.tsx`
   - Base components: `card.tsx`, `badge.tsx`, `tooltip.tsx`

2. **`src/components/home/`** - Page-specific feature sections:
   - `hero.tsx` - Landing section
   - `dashboard.tsx` - Live stats dashboard with API integrations
   - `experience.tsx` - Work experience timeline
   - `projects.tsx` - Project showcase

3. **`src/components/layout/`** - Shared layout components:
   - `navbar.tsx` - Site navigation
   - `footer.tsx` - Site footer

4. **`src/components/magicui/`** - Third-party MagicUI components

### Data Management
- **Central Data Source**: All content lives in `src/data/data.tsx`
  - Experience entries with skills, dates, descriptions
  - Project metadata including technologies, videos, thumbnails
  - Navigation items
  - Social links
  - Tool icons and scratch reveal GIFs
- **Pattern**: Components import and render from this centralized data object

### API Routes
Two serverless API routes handle external integrations:

1. **`src/app/api/spotify/route.ts`**:
   - Fetches recently played track from Spotify
   - Uses OAuth refresh token flow
   - Returns track metadata (title, artist, album, image URL)

2. **`src/app/api/wakatime/route.ts`**:
   - Fetches all-time coding hours from WakaTime
   - Uses Basic auth with API key
   - Returns total hours and formatted text
   - Cached for 1 hour via `next.revalidate`

### Custom Hooks
- **`src/hooks/useSpotify.ts`**: Fetches and manages Spotify track state
- **`src/hooks/useWakaTime.ts`**: Fetches and manages WakaTime coding stats

### Styling System
- **Tailwind CSS**: Configured in `tailwind.config.js` with custom animations
  - Custom keyframes: `meteor`, `shimmer-slide`, `spin-around`, `wiggle`, `spin-grow`
  - Dark mode via class strategy (`darkMode: "class"`)
  - Includes MagicUI component paths in content scanning
- **CSS Modules**: Used for complex grid layouts (e.g., `dashboard.module.css`)
- **Utility Function**: `cn()` in `src/lib/utils.ts` combines clsx and tailwind-merge for conditional classes

### Environment Variables
Required variables (see `.env.example`):
```bash
WAKATIME_API_KEY=          # From https://wakatime.com/settings/account
SPOTIFY_CLIENT_ID=         # Spotify OAuth credentials
SPOTIFY_CLIENT_SECRET=     # Follow: https://leerob.io/blog/spotify-api-nextjs
SPOTIFY_REFRESH_TOKEN=     # Generated via OAuth flow
```

### TypeScript Configuration
- Path alias: `@/*` maps to `src/*`
- Strict mode enabled
- Target: ES2017 with ESNext modules

### Remote Images
Next.js image optimization is configured for:
- Spotify album covers (`i.scdn.co`)
- Animated images (`www.animatedimages.org`)

## Key Technical Patterns

### Page Composition
The home page (`src/app/page.tsx`) composes sections using:
- Staggered `BlurFade` animations with delays
- Sectioned layout with IDs for navigation
- Max-width container (5xl) with responsive spacing

### Animation Integration
- **Framer Motion**: Used via `framer-motion` package for complex animations
- **Tailwind Animations**: Custom keyframes for meteors, shimmer effects, wiggle
- **CSS Modules**: Grid-based layouts with custom CSS where Tailwind is insufficient

### Theme System
- Uses `next-themes` package
- Configured in `ThemeProvider` component with class-based dark mode
- Default theme: dark
- Integrated throughout UI components

### Asset Organization
Public assets in `/public/`:
- `/experience/` - Company logos
- `/projects/` - Project thumbnails and videos
- `/tools/` - Tool/technology icons
- `/layout/` - Background SVG elements
- `/logo/` - Site logo and favicon variants

## Development Notes

- **Component Import Path**: Always use `@/` alias (e.g., `@/components/ui/button`)
- **Data Updates**: Modify `src/data/data.tsx` to update experience, projects, or navigation
- **New UI Components**: Place in appropriate subfolder under `src/components/`
- **Animations**: Leverage existing animation utilities in `tailwind.config.js` before adding new ones
- **API Integration**: Follow existing pattern in `/api` routes with proper error handling and type safety
