# Next.js Pages Router to App Router Migration Summary

## Migration Completed Successfully

This document summarizes the migration of the Genshin Dictionary project from Next.js Pages Router to App Router.

## What Changed

### Directory Structure

**Old Structure (Pages Router):**
```
src/pages/
├── _app.tsx
├── _document.tsx
├── index.tsx
├── [wordid].tsx
├── 404.tsx
├── 500.tsx
├── about.tsx
├── history.tsx
├── opendata.tsx
└── tags/
    └── [id].tsx
```

**New Structure (App Router):**
```
app/
├── layout.tsx (root layout)
└── [locale]/
    ├── layout.tsx (locale layout)
    ├── page.tsx (replaces index.tsx)
    ├── [wordid]/
    │   └── page.tsx
    ├── about/
    │   └── page.tsx
    ├── history/
    │   └── page.tsx
    ├── opendata/
    │   └── page.tsx
    ├── tags/
    │   └── [id]/
    │       └── page.tsx
    ├── error.tsx (replaces 500.tsx)
    └── not-found.tsx (replaces 404.tsx)
```

### Key Changes

1. **Root Layout (`app/layout.tsx`)**
   - Replaced `_document.tsx` with `app/layout.tsx`
   - Uses `<Html>`, `<Head>`, and `<Body>` from `next/document`
   - Includes global metadata and scripts

2. **Locale Layout (`app/[locale]/layout.tsx`)**
   - Replaced `_app.tsx` functionality
   - Moved locale-specific layout logic
   - Implements `generateStaticParams()` for static generation of all locales
   - Uses async component pattern with `await params`

3. **Page Routes**
   - All pages converted to async Server Components
   - `getStaticProps` replaced with direct async operations
   - `getStaticPaths` replaced with `generateStaticParams()` in layout
   - Pages receive `params` as a Promise that must be awaited

4. **Error Handling**
   - `404.tsx` → `app/[locale]/not-found.tsx`
   - `500.tsx` → `app/[locale]/error.tsx` (as a Client Component with "use client")
   - Errors are now handled per-route segment

5. **Middleware Updates (`src/middleware.ts`)**
   - Updated to work with App Router's pathname-based routing
   - Removed dependency on `req.nextUrl.locale` (Pages Router specific)
   - Now checks pathname with regex to detect locale
   - Updated locale detection logic for App Router

6. **Configuration (`next.config.ts`)**
   - Removed `i18n` configuration (not used in App Router)
   - Updated `redirects()` to include locale patterns: `/:locale(en|ja|zh-CN)/:path*`
   - Headers and other configuration remain the same

7. **Component Updates**
   - **HamburgerMenu.tsx**: 
     - Removed `useRouter` from `next/router`
     - Now uses `getAvailableLocales()` function
     - Updated all navigation links to include locale: `/en/about/`, `/ja/about/`, etc.
   
   - **Layout.tsx**:
     - Updated home link to include locale: `/${locale}/`

8. **TypeScript Configuration**
   - Added `jsxImportSource: "react"` for better JSX support
   - Created `next-env.d.ts` for Next.js type definitions

### Files Deleted

- `src/pages/` directory (completely removed)
  - `_app.tsx` - functionality moved to `app/[locale]/layout.tsx`
  - `_document.tsx` - functionality moved to `app/layout.tsx`
  - All page files moved to `app/[locale]/*` structure

### Files Created

- `app/layout.tsx` - Root layout
- `app/[locale]/layout.tsx` - Locale-specific layout
- `app/[locale]/page.tsx` - Home page
- `app/[locale]/[wordid]/page.tsx` - Word detail page
- `app/[locale]/about/page.tsx` - About page
- `app/[locale]/history/page.tsx` - History page
- `app/[locale]/opendata/page.tsx` - Open data page
- `app/[locale]/tags/[id]/page.tsx` - Tags page
- `app/[locale]/error.tsx` - Error handling
- `app/[locale]/not-found.tsx` - 404 handling
- `next-env.d.ts` - Next.js type definitions

### Files Modified

- `src/middleware.ts` - Updated for App Router locale handling
- `next.config.ts` - Removed i18n config, updated redirects
- `tsconfig.json` - Added jsxImportSource option
- `src/components/HamburgerMenu.tsx` - Removed next/router dependency
- `src/components/Layout.tsx` - Updated navigation links

## Key Differences in App Router

### Server vs Client Components
- All pages and layouts are Server Components by default
- Components that use hooks like `useState` are Client Components (marked with `"use client"`)
- Error boundaries use `"use client"` directive

### Parameter Handling
- `params` is now a Promise and must be awaited: `const { locale } = await params`
- Dynamic segments work the same way: `const { wordid } = await params`

### Static Generation
- Use `generateStaticParams()` exported from layouts/pages
- Returns array of objects matching the segment structure
- No separate `getStaticPaths` function

### Data Fetching
- Direct async operations in Server Components
- No need for `getStaticProps` - just use async functions
- Caching behavior is handled through fetch/revalidate options

### Locale Routing
- Middleware handles initial locale detection and redirection
- All routes are under `[locale]` segment
- Links must include locale: `/en/path`, `/ja/path`, `/zh-CN/path`

## Migration Verification Checklist

✅ All page routes migrated to App Router structure
✅ Locale parameter integrated into routing structure
✅ Middleware updated for pathname-based detection
✅ Static generation configured with generateStaticParams
✅ Error pages created (error.tsx and not-found.tsx)
✅ Components updated to work with new routing
✅ Old Pages Router directory removed
✅ Configuration updated for App Router

## Build Instructions

To build the project after this migration:

```bash
# Install dependencies
npm install
# or
pnpm install

# Build the project
npm run build
# or
pnpm build

# Start the development server
npm run dev
# or
pnpm dev
```

## Notes

- The project uses strict TypeScript checking
- All locale operations (`en`, `ja`, `zh-CN`) are preserved
- Middleware-based locale detection remains intact
- Static pre-rendering of all locale variants is maintained
- The migration preserves all existing functionality while using modern Next.js patterns
