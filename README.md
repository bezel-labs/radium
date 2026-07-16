# Radium

Radium is a [shadcn/ui](https://ui.shadcn.com)-based component library and design system,
delivered as a Turborepo monorepo. It pairs a publishable React component package with a Storybook
showcase and a design-token build step, so components and their theming stay in sync.

## What's inside

| Package | Description |
| --- | --- |
| [`packages/ui`](packages/ui) — `@radium/ui` | The component library: ~60 shadcn/ui components built on [Base UI](https://base-ui.com), Tailwind CSS v4, and Radix-style primitives. Publishable, with granular per-component exports. |
| [`apps/storybook`](apps/storybook) — `@radium/storybook` | A Storybook 10 app that showcases every component plus full-page examples (auth, dashboard, marketing). |

Design tokens are generated into `packages/ui/src/styles` by
[`@bezel-labs/bezel-kit`](https://www.npmjs.com/package/@bezel-labs/bezel-kit)
from the token config in [`bezel.json`](bezel.json); the generated CSS/TS is consumed by the
component styles.

## Requirements

- Node.js **>= 22**
- npm (the repo uses npm workspaces; see the pinned `packageManager` in `package.json`)

## Getting started

```bash
npm install
npm run storybook   # generates tokens, then starts Storybook on http://localhost:5004
```

## Scripts

Run from the repo root:

| Script | What it does |
| --- | --- |
| `npm run dev` | Generate tokens and run all workspaces in dev via Turbo. |
| `npm run storybook` | Generate tokens and start the Storybook dev server (port 5004). |
| `npm run build` | Generate tokens, build all workspaces, and copy the Storybook build to `dist/`. |
| `npm run build:storybook` | Generate tokens and build the Storybook app. |
| `npm run tokens` | Regenerate design tokens with style-accelerator. |
| `npm run lint` | Lint all workspaces. |
| `npm run format` | Format with Prettier. |
| `npm run typecheck` | Type-check all workspaces. |

## Using the components

Import components from the `@radium/ui` package:

```tsx
import { Button } from "@radium/ui/components/button"
```

To add a new shadcn/ui component into the library, run the shadcn CLI against the `ui` package:

```bash
npx shadcn@latest add button -c packages/ui
```

## License

[MIT](LICENSE)
