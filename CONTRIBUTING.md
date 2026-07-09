# Contributing to Radium

Thanks for your interest in contributing! This guide covers how to get set up and the conventions
we follow.

## Prerequisites

- Node.js **>= 22**
- npm (this repo uses npm workspaces)

## Getting started

```bash
git clone <your-fork-url>
cd radium
npm install
npm run storybook   # generates tokens, then runs Storybook on http://localhost:5004
```

## Repository layout

- [`packages/ui`](packages/ui) (`@radium/ui`) — the component library.
- [`apps/storybook`](apps/storybook) (`@radium/storybook`) — the Storybook showcase.
- Design tokens are generated into `packages/ui/src/styles` by `npm run tokens`; do not hand-edit
  generated files.

## Adding a component

Use the shadcn CLI against the `ui` package so components land in `packages/ui/src/components`:

```bash
npx shadcn@latest add <component> -c packages/ui
```

Add or update a corresponding story under `apps/storybook/src/stories`.

## Before you open a pull request

Run the full check suite from the repo root and make sure it passes:

```bash
npm run tokens
npm run lint
npm run typecheck
npm run build
```

Also run `npm run format` to apply Prettier formatting.

## Pull request guidelines

- Keep PRs focused; one logical change per PR.
- Describe what changed and why, and include screenshots for visual/component changes.
- Ensure lint, typecheck, and build all pass.
- By contributing, you agree that your contributions are licensed under the [MIT License](LICENSE).

## Reporting bugs and requesting features

Use the GitHub issue templates. For security issues, please follow [SECURITY.md](SECURITY.md)
instead of opening a public issue.
