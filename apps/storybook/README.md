# @radium/storybook

The Storybook showcase for [Radium](../../README.md). It documents every component in `@radium/ui`
and includes full-page examples (auth, dashboard, marketing).

## Running

From the repository root (recommended — this also regenerates design tokens first):

```bash
npm run storybook
```

Or from this directory (assumes tokens are already generated):

```bash
npm run dev            # start Storybook on http://localhost:5004
npm run build          # build a static Storybook into ./dist
```

## Live-preview embedding

The Storybook manager and preview ([`.storybook/manager.ts`](.storybook/manager.ts),
[`.storybook/preview.tsx`](.storybook/preview.tsx)) support being embedded in a host app: a parent
page can drive the manager chrome (nav/toolbar/panel/theme) via URL query params or `postMessage`,
and push live CSS/theme context into the preview using
[`@keypuncherlabs/live-preview`](https://www.npmjs.com/package/@keypuncherlabs/live-preview). The
set of parent origins allowed to push CSS defaults to that package's `DEFAULT_PARENT_ORIGINS`; pass
`allowedOrigins` to `createLivePreviewRelay` in `manager.ts` to override it for your own host.
