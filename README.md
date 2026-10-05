<h1 align="center">
  jameswatt.io - v2
</h1>

<p align="center">
  The second iteration of <a href="https://jameswatt.io" target="_blank">jameswatt.io</a> built with <a href="https://nextjs.org/" target="_blank">NextJS</a>, styled using <a href="https://tailwindcss.com/" target="_blank">Tailwind</a> and hosted with <a href="https://vercel.com/" target="_blank">Vercel</a>
</p>

<p align="center">
  Previous iterations:
  <a href="https://github.com/Hiccup246/jameswatt-v1" target="_blank">v1</a>
</p>

<div align="center">

![](https://img.shields.io/github/license/Hiccup246/jameswatt)
![](https://img.shields.io/github/languages/code-size/Hiccup246/jameswatt)

</div>
<div align="center">

![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=jameswatt)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/unit-tests.yml?branch=main&label=Unit%20Tests)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/e2e-tests.yml?branch=main&label=E2E%20Tests)
![](https://img.shields.io/github/actions/workflow/status/hiccup246/jameswatt/style-check.yml?branch=main&label=Style%20Check)

</div>

![site-screenshot](https://raw.githubusercontent.com/Hiccup246/jameswatt/main/public/site-screenshot.webp)

<br>

## 🧱 Installation and development setup

1. Install [pnpm](https://pnpm.io/)
   ```sh
   npm install -g pnpm
   ```
2. Install the correct [node version](https://nextjs.org/docs/getting-started) using [NVM](https://github.com/nvm-sh/nvm)
   ```sh
   nvm install
   ```
3. Install dependancies
   ```sh
   pnpm install
   ```
4. Run the development server
   ```sh
   pnpm run dev
   ```

## 🏁 Production setup

1. Create an optimized production build
   ```sh
   pnpm run build
   ```
2. Start the application in production mode
   ```sh
   pnpm run start
   ```

<br>

## 🧠 Understanding the project

A great starting place for understanding this project is the `pages/index.page.tsx` file. This represents the single page of this single page application (SPA) and allows for easy exploration of all the sites components.

This file contains some site metadata and lists out all of the sites 'sections'. These sections are located within `components/sections` and compose components from `components/` to create the functionality of the site. In visual terms the `index.page.tsx` can be represented by:

![project-structure-diagram](https://raw.githubusercontent.com/Hiccup246/jameswatt/main/public/project-structure-diagram.webp)

<br>

## 🎱 The pool hero

The top of the page is a photo "coin" that tilts towards the cursor. Clicking it expands an 8-ball pool table out of the photo, and the visitor plays against an AI called James. There is no hint text under the coin; its tilt invites the click. Once the table is open, the only ways out are "Play again" after a win and the "End game" button, which collapses the table back to the coin (opening it again starts a fresh game). Clicking the photo on the felt does nothing.

### File map

| File                              | Responsibility                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `components/PoolHero.tsx`         | Closed coin, tilt, open state, theme and breakpoint detection, scale-to-fit. Lazy-loads the game.                               |
| `components/pool/PoolGame.tsx`    | The table: rendering, pointer and keyboard input, the `requestAnimationFrame` loop, AI turn timing, sink and pocket animations. |
| `components/pool/engine.ts`       | Pure game logic: physics, rules, AI shot choice. No DOM or React.                                                               |
| `components/pool/geometry.ts`     | Pure helpers: table furniture sizes, cushion polygons, aiming guide lines, ball in hand overlay sizes and W A S D key deltas.   |
| `components/pool/ballPaint.ts`    | Pure maths turning a ball's 3D orientation into CSS transforms for its number and stripes.                                      |
| `components/pool/StatusPanel.tsx` | Message, scoreboard, "End game" and "Play again" buttons, portalled below the table.                                            |
| `components/pool/theme.ts`        | Palettes for colours set from JS (light and dark) and ball colours.                                                             |

### How it works

- **Engine is separate from rendering.** `PoolEngine` works in table space (`u` along the long side, `v` across it). `PoolGame` maps this to screen space with `map()`, swapping axes on the portrait table, so one engine serves both orientations. Engine tests live next to it and run with `pnpm test:unit`.
- **No per-frame React state.** A `requestAnimationFrame` loop steps the engine and writes `transform`, `opacity` and SVG attributes directly to elements held in refs. React state is only bumped when a shot resolves, to refresh the status panel.
- **Lazy loading.** `PoolHero` loads `PoolGame` with `next/dynamic` on first hover, focus or click of the coin, so the game stays out of the initial bundle. The game mounts closed, calls `onReady`, and `PoolHero` then flips `open` so the clip-path transition has something to animate from.
- **Opening animation.** The table layer animates `clip-path: circle()` from the coin's radius out past the corners. The coin fades while an identical photo "sticker" sits on the felt.
- **Ball sinking.** A potted ball rolls to the pocket centre under the hole layer while a clone inside the pocket "well" shrinks, darkens and fades. Sink timings are the `SINK_*` constants in `engine.ts`.
- **Regulation rack.** The front ball sits on the foot spot (`FOOT_SPOT`, 0.75 of the table length) and the rack is tight, with balls `2r + 0.02` apart across a row.
- **Ball in hand.** `engine.place` is `"kitchen"` on the break (the white may go anywhere behind the head string, `HEAD_STRING` at a quarter of the table) and `"anywhere"` for the other player after any foul. A shot clears it. `engine.cueSpotOk` and `engine.placeCue` validate and clamp placements (inside the cushions, in the kitchen on the break, and at least `2.05r` from other balls). While placing, a dashed ring pulses around the white, the kitchen is shaded on the break, and the cursor is `grab` over the white and `grabbing` while dragging it.
- **James.** `engine.planAi` picks the best legal ball and pocket with a small aim error. `PoolGame` plays that out over about five seconds (see the `AI_*` constants). With ball in hand, `engine.pickPlacement` samples a 17 by 9 grid for the legal spot with the best shot, and James slides the white there over the first 1.2 seconds of his turn before aiming.

### Responsive behaviour

- Below Tailwind's `md` breakpoint (768px) the table is portrait (300 by 580 felt); at `md` and up it is landscape (960 by 480). Changing orientation remounts the game, which restarts the match.
- The table is scaled down with a CSS transform to fit narrow containers. Pointer coordinates are converted back through `getBoundingClientRect`, so aiming stays accurate at any scale.
- Touch input uses pointer events with `touch-action: none` on the felt, so dragging to set power does not scroll the page.

### Theming

Static colours use Tailwind `dark:` utilities. Colours set from JS (gradients, cue, pockets) come from `theme.ts`. `PoolHero` watches the `dark` class on `<html>` with a `MutationObserver` and passes `dark` down.

### Accessibility

- The coin is a real `<button aria-label="Open pool game">` with a visible focus ring. Once the table is open the coin is `inert`.
- On opening, focus moves to the felt. Keyboard play: arrow keys aim (hold Shift for bigger steps), hold Space or Enter to charge power, release to shoot. With ball in hand, W A S D move the white (Shift for bigger steps), and the felt's label says so. "End game" returns focus to the coin.
- The status message is a `role="status"` live region, so turn changes, fouls and wins are announced. Balls, cue and chips are decorative and hidden from assistive tech.
- `prefers-reduced-motion` disables the coin tilt, the open and close transition and the pocket effects, and holds the ball in hand ring at full opacity instead of pulsing.

### Changing the game

- Tune physics, table sizes and the rack in `engine.ts`; table furniture sizes in `geometry.ts`; colours in `theme.ts`.
- If you change the coin diameter, update both `COIN_SIZE` in `PoolHero.tsx` and `coinDiameter` in `geometry.ts`.

<br>

## ⛰️ Environment Variables

This project has three environment variables

1. UMAMI_WEBSITE_ID
2. UMAMI_WEBSITE_URL
3. NEXT_PUBLIC_AUTHOR_CONTACT_EMAIL

The first two are related to the projects analytics service [umami](https://umami.is/). These can be removed along with the umami tracking tag in `pages/_document.page.tsx` if you do not plan to utilise the tracking service.

The final environment variable is used to store the email address which is linked to in the `AboutMeSection.tsx`.

<br>

## 🍽️ Fair use and forking

_*Plagarism*_ is **not good**

_*Claiming*_ others work as your own is **not good**

Fair usage of others work with proper attribution is **awesome!**

So feel free to fork this repository or utilise any code snippets but please make an effort to give me proper credit by linking back to [jameswatt.io](https://www.jameswatt.io). If you need some ideas on how to do this check out the credits section of this website :)

Cheers!

<br>

## 🌄 Future Improvements

- Update Jest to inject mock environment variables
- Attempt to improve mobile performance perhaps by web worker usage or
  by refactoring components to be more efficient
  - Use chrome plugn to evaluate performance in more detail
  - Think about useEffect usage and if my usage is appropriate
- Integrate reading statistics into the bookshelf component. These could include:
  - Reading challenge data
  - Books completed in each year/month
- Design and implement a book review system with the ability to write reviews in a text editor
  - The reviews should be stored in a database
  - The reviews should be created in a rich text editor available at a URL
  - No need for advanced functionality like draft posts
  - The reviews should then be accessable via a API so this website can use them
