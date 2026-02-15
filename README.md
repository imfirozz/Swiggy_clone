# Swiggy Clone (React + Parcel + Tailwind)

A feature-rich Swiggy-inspired food delivery web app built with React, Redux Toolkit, Parcel, and Tailwind CSS.

## Features

- Home landing page with:
  - location selection modal
  - live search navigation
  - food, grocery, and dineout discovery sections
- Restaurant listing and top chains sections
- Collection pages (`/collections/:id`) with:
  - sorting and quick filters
  - static JSON fallback for deploy-safe rendering
- Restaurant detail pages with:
  - deals, top picks, category sections
  - veg/non-veg filters
  - in-restaurant dish search
- Search page (`/search`) for restaurants + dishes
- Cart system with:
  - add/increment/decrement quantity controls
  - cart preview in header
- Checkout flow with:
  - address modal
  - coupon drawer (flat/percent discount handling)
  - payment options modal
- Support page UI flow
- Shared responsive headers/footers

## Tech Stack

- React 19
- React Router 7
- Redux Toolkit + React Redux
- Parcel 2
- Tailwind CSS 3 + PostCSS

## Project Structure

```text
.
├── netlify.toml
├── package.json                  # workspace scripts
└── src
    ├── package.json              # app scripts + app deps
    ├── Swiggy_src.jsx            # app entry + routes
    ├── swiggy_src.css            # global styles + tailwind directives
    ├── Store                     # redux store + slices
    ├── data                      # static JSON/data files
    ├── features
    │   ├── home
    │   ├── restaurant
    │   ├── checkout
    │   ├── grocery
    │   ├── dineout
    │   └── support
    ├── shared
    │   ├── layout
    │   └── modals
    └── Utils
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

From project root:

```bash
npm install
```

### Run locally (development)

```bash
npm run dev
```

App runs on:

- `http://localhost:1234`

## Build

From project root:

```bash
npm run build
```

Build output directory:

- `src/dist`

## Scripts

### Root scripts

- `npm run dev` → runs app dev server from `src`
- `npm run build` → installs deps, clears cache, creates production build
- `npm run clean` → clears Parcel cache and build artifacts in `src`

### App scripts (`src/package.json`)

- `npm --prefix src run dev`
- `npm --prefix src run build`
- `npm --prefix src run clean`

## Deployment (Netlify)

`netlify.toml` is already configured:

- Build command: `npm install --prefix src --include=dev && npm run build`
- Publish directory: `src/dist`
- SPA redirect fallback to `/index.html`

## Data Strategy

- Core UI relies on local JSON data in `src/data`.
- Collection pages use local fallback data for production/deploy environments where direct Swiggy API fetch may fail due to CORS/network constraints.

## Troubleshooting

### 1) `Unable to read file data.mdb`

```bash
npm run clean
```

Then build again:

```bash
npm run build
```

### 2) Tailwind styles not appearing

- Ensure dependencies are installed (`npm install` at root).
- Verify `src/.postcssrc` includes `tailwindcss`.
- Verify `src/swiggy_src.css` has:
  - `@tailwind base;`
  - `@tailwind components;`
  - `@tailwind utilities;`

### 3) Deploy fails with import path errors

- Check case-sensitive paths for Linux deploy targets (e.g., `Store` vs `store`, `Utils` vs `utils`).

## Notes

- This project is for learning/portfolio use.
- Brand assets and API behavior are inspired by Swiggy.
