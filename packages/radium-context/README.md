# radium-context

Runtime theme/context switching for CSS that defines context scopes — e.g. the `:root` / `.dark` / `.light` blocks emitted by [`radium`](https://www.npmjs.com/package/radium). It discovers the available contexts, applies the chosen one by setting a class on `<html>`, persists the choice, and ships both a headless hook and a drop-in dropdown.

## Install

```sh
npm install radium-context
```

## Quick start

At app startup, restore the saved context (precedence: URL `?context=` → localStorage → default):

```ts
import { applyStoredContext } from "radium-context"
applyStoredContext() // adds e.g. class="dark" to <html>
```

Drop in the switcher:

```tsx
import { ContextSwitcher } from "radium-context"
import { CONTEXTS } from "@radium/ui/styles/contexts" // token-derived list (recommended)

<ContextSwitcher contexts={[...CONTEXTS]} className="my-select" />
```

…or build your own UI with the headless hook:

```tsx
import { useContextSwitcher } from "radium-context"

function ThemeMenu() {
  const { contexts, current, setContext } = useContextSwitcher({ contexts: [...CONTEXTS] })
  return (
    <div>
      {contexts.map((c) => (
        <button key={c} aria-pressed={c === current} onClick={() => setContext(c)}>{c}</button>
      ))}
    </div>
  )
}
```

## How contexts are discovered

- **Explicit (recommended):** pass `contexts` — e.g. the `CONTEXTS` constant `radium` generates from your `design-tokens.json`. Authoritative, SSR-safe.
- **Zero-config fallback:** with no `contexts`, `getContexts()` scans the loaded same-origin CSS for the context selectors that your variables file defines (`:root` → `default`, plus single-class scopes like `.dark`/`.light` that re-declare `:root` custom properties). Tailwind `dark:` variant rules and utility classes are ignored by construction.

## API

- `applyContext(name, { target?, contexts?, persist? })` — swap the class on `target` (default `<html>`), removing other context classes; persists unless `persist: false`.
- `resolveInitialContext({ contexts?, fallback? })` — URL → localStorage → fallback (`"default"`).
- `applyStoredContext(options?)` — resolve + apply at startup (does not persist, so a `?context=` preview won't overwrite the saved choice).
- `getContexts({ contexts? })` — the discovered/explicit context list.
- `useContextSwitcher(options?)` → `{ contexts, current, setContext }` (React).
- `<ContextSwitcher contexts? className? aria-label? formatLabel? />` — native-`<select>` switcher (React).

The non-React helpers have no React dependency; `react` is an optional peer.
