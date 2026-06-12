# @keypuncherlabs/storybook-tools

Runtime helpers for the Radium Storybook preview. Each tool lives in its own folder under
`src/` and is re-exported from the package root, so new Storybook helpers can be added as
needed without changing the import surface.

```ts
import { resolveInitialContext, loadFonts } from "@keypuncherlabs/storybook-tools"
```

## Tools

### `context` — initial theme resolution

`resolveInitialContext({ contexts?, fallback? })` decides which theme context to apply on
load. Precedence: URL `?context=` → `localStorage` → `fallback` (default `"default"`). A
value is only honored if it matches the identifier allowlist `/^[a-zA-Z][a-zA-Z0-9_-]*$/`
and (when `contexts` is given) is a member of that list.

```ts
import { CONTEXTS } from "@radium/ui/styles/contexts"
const context = resolveInitialContext({ contexts: [...CONTEXTS] })
```

> The `localStorage` key is `"radium-context"` (kept stable across renames), matching the
> `radium-context:set` / `radium-context:ready` postMessage protocol the embedding host
> (e.g. the Gundam editor) uses to drive the active context live.

### `fonts` — design-token web fonts

`loadFonts(fonts, options?)` injects a webfont CDN stylesheet (Google Fonts by default,
`bunny` optional) plus `preconnect` hints into `<head>`. Idempotent and SSR-safe.

```ts
import { FONTS } from "@radium/ui/styles/fonts"
loadFonts([...FONTS])
loadFonts([...FONTS], { provider: "bunny" }) // GDPR-friendly mirror
```

Also exports `fontsHref`, `buildHref`, and `preconnectHosts` for building URLs without
injecting.

## Adding a tool

Create `src/<tool>/` with its own `index.ts`, then add `export * from "./<tool>/index.js"`
to `src/index.ts`.
