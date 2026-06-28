# Pokémon TCG Binder Catalog

A personal collection tracker for Pokémon TCG cards, powered by the [Pokémon TCG API](https://pokemontcg.io). Search for cards by name or rarity, browse live card images, track condition, and organize your binder — all in one place.

Built as a portfolio project to showcase React state management, browser-side persistence, third-party API integration, and the kind of personal tooling that doubles as a real-world use case.

---

## What it does

**My binder** — View your collection as a card grid with actual card images pulled from the API. Filter by type, rarity, and condition. Sort by name, set, or recently added. Hover any card to see its details or remove it.

**Add cards** — Search the Pokémon TCG API by card name or rarity, with paginated results so you can browse through more matches. Results show the card image, set, number, rarity, and energy type. Pick a condition and add to your binder in one click.

---

## Screenshots

![Binder view](public/screenshots/Screenshot%202026-06-27%20at%208.21.37%E2%80%AFPM.png)

![Search view](public/screenshots/Screenshot%202026-06-27%20at%208.21.52%E2%80%AFPM.png)

![Card details and collection view](public/screenshots/Screenshot%202026-06-27%20at%208.21.58%E2%80%AFPM.png)

---

## Tech stack

- **React 18** — `useState`, `useMemo`, and async effects for collection state, filtered views, and persistence
- **Vite** — fast local dev and production builds
- **Pokémon TCG API** (`api.pokemontcg.io`) — free, no-key-required REST API for card data and images
- **sql.js** — browser-local SQLite database for persisting your binder between refreshes
- **Vanilla CSS** — custom properties, dark mode, responsive grid
- No UI library dependencies

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## API key (optional)

The Pokémon TCG API works without a key at up to 1,000 requests/day — more than enough for personal use. For higher limits:

1. Get a free key at [dev.pokemontcg.io](https://dev.pokemontcg.io)
2. Copy `.env.example` to `.env.local`
3. Add your key: `VITE_POKEMON_TCG_API_KEY=your-key-here`

---

## Project structure

```
src/
├── components/
│   ├── BinderView.jsx       # Collection grid with filters + sorting
│   ├── CardSlot.jsx         # Individual card with image, condition, overlay
│   ├── SearchView.jsx       # Search input, rarity filter, pagination, and results list
│   ├── SearchResultRow.jsx  # Single search result with add-to-binder flow
│   └── StatsBar.jsx         # Aggregate stats (card count, sets, rares, top type)
├── utils/
│   ├── api.js               # Pokémon TCG API fetch utilities and pagination support
│   ├── collectionDb.js      # Browser-local SQLite persistence for the binder
│   └── typeColors.js        # Energy type → hex color mapping
├── App.jsx
├── App.css
└── main.jsx
```

---

## Extending this

**Persisting your collection** — This version already saves cards in a browser-local SQLite database via `sql.js`, so your binder survives refreshes and stays available in the same browser.

**CSV export** — Add an export button that maps the collection to CSV rows and triggers a download. Useful for antique store cataloging workflows.

**Price lookup** — The Pokémon TCG API returns TCGPlayer market prices in the card data. Add a price display to the `CardSlot` overlay or detail view.

**Set browser** — Add a third tab that lists all sets from `/v2/sets` so you can browse by release rather than searching by name.

---

## Background

This project grew out of a real side project: cataloging Pokémon TCG collections for antique stores, where documentation and inventory discipline matter as much as knowing the cards. The same systems-thinking I apply to engineering — clear data models, consistent conditions, structured output — turns out to map directly to card cataloging.

The engineering background is also what makes a custom tool worth building: the existing apps are either too complex or not designed for professional catalog workflows.

---

## License

MIT
