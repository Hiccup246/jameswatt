# Architecture

Broad-strokes map of this repo for colleagues and AI agents. For setup and the pool game's feature description, see `README.md`.

## What this is

[jameswatt.io](https://jameswatt.io): a single-page personal portfolio for James Watt. It is a static-feeling Next.js site with no backend, no database and no API routes. All content lives in TypeScript files in the repo. The one complex piece is the playable 8-ball pool game at the top of the page.

## Stack

| Concern    | Choice                                                                 |
| ---------- | ---------------------------------------------------------------------- |
| Framework  | Next.js 16, App Router, React 19                                       |
| Language   | TypeScript (strict type-check via `tsc` and `next build`)              |
| Styling    | Tailwind CSS 4 (via `@tailwindcss/postcss`), dark mode via `html.dark` |
| Unit tests | Jest 30 + Testing Library, jsdom, snapshot tests                       |
| E2E tests  | Playwright (`e2e/`)                                                    |
| Tooling    | pnpm 10, ESLint 9, Prettier (with tailwind plugin), Husky pre-commit   |
| Hosting    | Vercel                                                                 |

## Layout

```
app/            Next.js App Router entry: layout.tsx, page.tsx, robots/sitemap/manifest
components/     React components
  sections/     One component per page section, composed by app/page.tsx
  layouts/      SectionLayout: shared section wrapper (width, padding, background)
  Icons/        One small SVG component per icon
  pool/         Pool game: engine, geometry, rendering, theme (see below)
  PoolHero.tsx  Coin + open/close shell around the game
  *.tsx         Shared UI: ThemeProvider, ThemeToggle, TabsManager, BookshelfTable, ...
constants/      Content as data: Projects, WorkExperiences, Books, TechnologyIcons
e2e/            Playwright specs (index.spec.tsx, pool-hero.spec.tsx)
lib/            Test helper (snapshotResolver.js)
public/         Images, icons, resume PDF, social preview image
styles/         globals.css (Tailwind entry and theme tokens)
.github/        CI workflows: unit tests, e2e tests, style check (build + prettier)
.husky/         pre-commit hook
```

Unit tests sit next to the code they cover (`Foo.tsx` + `Foo.test.tsx`). Snapshots live in `__snapshots__/` folders beside the tests.

## How the page is built

`app/layout.tsx` sets fonts (Roboto, Open Sans), global metadata, and wraps the app in `ThemeProvider`. `app/page.tsx` is a server component that renders the sections in order:

`IntroSection` > `WorkExperienceSection` > `ProjectShowcaseSection` > `TechnologiesSection` > `AboutMeSection` > `BookshelfSection` > `CreditsSection` > `FooterSection`

Each section wraps itself in `SectionLayout`. Section content comes from `constants/*`, so editing the site's copy, projects, jobs or books usually means editing a constants file, not a component. Technology icons are mapped by name in `constants/TechnologyIcons.tsx`.

### Theming

`ThemeProvider` reads and writes the `dark` class on `<html>` and stores the choice in `localStorage.theme`. Tailwind `dark:` variants do the rest. Colours set from JS (the pool game) read the same class and use `pool/theme.ts`.

## The pool hero

`IntroSection` renders `PoolHero`: a photo "coin" that tilts toward the cursor and opens into a playable 8-ball table against a computer opponent (also called James). No AI model is involved. The opponent is plain geometry plus a little randomness.

The code is split so game rules are testable without a DOM:

| File                              | Role                                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `components/PoolHero.tsx`         | Client shell. Coin tilt, open/close transition, breakpoint and theme detection, scale-to-fit. Lazy-loads the game.           |
| `components/pool/PoolGame.tsx`    | The table UI. Rendering, pointer and keyboard input, the `requestAnimationFrame` loop, opponent turn timing, pot animations. |
| `components/pool/engine.ts`       | Pure logic: physics, rules, ball in hand, opponent shot planning. No DOM, no React.                                          |
| `components/pool/geometry.ts`     | Pure helpers: furniture sizes, cushion polygons, aim guide lines, placement overlay.                                         |
| `components/pool/ballPaint.ts`    | Pure maths turning a ball's 3D orientation into CSS transforms.                                                              |
| `components/pool/StatusPanel.tsx` | Message, scoreboard, "End game" and "Play again", portalled below the table.                                                 |
| `components/pool/theme.ts`        | Light and dark palettes and ball colours.                                                                                    |

### Key design decisions

- **Engine is separate from rendering.** `PoolEngine` works in table space: `u` along the long side, `v` across it. `PoolGame` converts to screen space with `map()`, swapping axes on the portrait (mobile) table, so one engine serves both orientations. Table sizes come from `tableConfig(mobile)`.
- **No per-frame React renders.** React draws the static table once. A `requestAnimationFrame` loop writes ball and cue positions straight to element styles. React state is bumped only when a shot resolves, to refresh the status panel.
- **Lazy loading.** `PoolGame` is loaded with `next/dynamic` (`ssr: false`) on first hover, focus or click of the coin, to keep it out of the initial bundle.
- **Layout is frozen while a game is open.** `PoolHero` follows the 768px breakpoint only while closed (`layoutMobile`). The layout is the React `key` on `PoolGame`, so crossing the breakpoint mid-game would otherwise remount it and reset the match.
- **Pointer ownership.** `PoolGame` records the `pointerId` that starts an aim or cue drag and ignores other pointers until it ends (multi-touch safety).
- **Opening break** is detected with `engine.shots === 0`, not ball count.
- **Coin size is duplicated** by hand: `COIN_SIZE` in `PoolHero.tsx` and `coinDiameter` in `pool/geometry.ts` must match.

## Testing

| Command                      | What it runs                                                                   |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `pnpm test:unit`             | Jest. Component snapshots plus deterministic engine, geometry and paint tests. |
| `pnpm test:e2e`              | Playwright. Page wiring and pool game behaviour, not shot outcomes.            |
| `pnpm type-check`            | `tsc`                                                                          |
| `pnpm lint` / `pnpm format`  | ESLint check / autofix                                                         |
| `pnpm prettier` / `pnpm fix` | Prettier check / write                                                         |

Pre-commit (`.husky/pre-commit`) runs unit tests, type-check, `fix` and `format`. If a UI change is intentional and a snapshot fails, update it with `pnpm test:unit -u` and review the diff.

CI (`.github/workflows`) runs unit tests, e2e tests, and a style check (`pnpm build` plus `pnpm prettier`).

## Conventions and gotchas

- Content changes go in `constants/`. Layout and styling changes go in `components/`.
- Section components stay thin: wrap in `SectionLayout`, map over constants.
- Keep game rules in `engine.ts` and cover them with unit tests there. Keep `PoolGame.tsx` for input and drawing.
- Tailwind classes must appear as literals so the compiler can see them (no string-built class names).
- Browser-only code (`window`, `matchMedia`, `localStorage`) belongs in effects inside `"use client"` components.
- There is no backend and no secrets in the code. `.env` holds contact email and Umami analytics IDs; see `.env.sample`.
