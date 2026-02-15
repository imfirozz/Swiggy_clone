# Swiggy Clone

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Build output: `src/dist`

## If you see `Unable to read file data.mdb`

Run:

```bash
npm run clean
```

This removes Parcel cache (`src/.parcel-cache`) and rebuilds cleanly.
