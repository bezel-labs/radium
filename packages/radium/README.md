# radium

Convert a [W3C Design Tokens (DTCG) 2025.10](https://www.designtokens.org/tr/2025.10/format/) file into a scoped `variables.css`, with **one CSS scope per context**.

The base context (`$root`) is emitted under `:root` so every theme inherits the full set. Each additional context (e.g. `dark`, `light`) emits **only the variables that differ** from the base, under its own class selector — so flipping a theme is just a class on `<html>`.

```jsonc
// design-tokens.json (W3C DTCG, with the "root token" feature)
"neutral": { "foreground": {
  "$root": { "$value": { "colorSpace": "oklch", "components": [0.31, 0.08, 298] } },
  "dark":  { "$value": { "colorSpace": "oklch", "components": [0.93, 0.00, 174] } },
  "$type": "color"
} }
```

```css
/* variables.css */
:root { --foreground: oklch(0.31 0.08 298); }
.dark { --foreground: oklch(0.93 0 174); }
```

## Install

```sh
npm install --save-dev radium
```

## CLI

```sh
# zero-config: ./design-tokens.json → ./variables.css
npx radium build

# custom paths
npx radium build --input tokens/design-tokens.json --output src/styles/variables.css

# options
npx radium build --color hex --unit rem
npx radium build --stdout            # print instead of writing
npx radium build --config radium.config.js
```

| Flag | Default | Description |
| --- | --- | --- |
| `-i, --input` | `design-tokens.json` | Path to the DTCG tokens file |
| `-o, --output` | `variables.css` | Output CSS path |
| `-c, --config` | — | Config file (`.json` or `.js` exporting options) |
| `--color` | `oklch` | Color output: `oklch` or `hex` |
| `--unit` | `preserve` | Dimensions: `preserve` authored unit or convert px → `rem` |
| `--stdout` | — | Print CSS to stdout instead of writing |

## Programmatic API

```ts
import { generateVariablesCss } from "radium"

const css = await generateVariablesCss({
  input: "design-tokens.json",
  output: "packages/ui/src/styles/variables.css",
  // contexts: { $root: ":root", dark: ".dark", light: ".light" }, // default
  // colorFormat: "oklch", dimensionUnit: "preserve",
  // write: false, // return the string without touching disk
})
```

### Options

- **`input`** / **`output`** — file paths (resolved against `cwd`).
- **`contexts`** — map of context name → CSS selector. The **first** entry is the base (emitted in full); others emit override-only blocks. Default `{ "$root": ":root", "dark": ".dark", "light": ".light" }`.
- **`colorFormat`** — `"oklch"` (default) or `"hex"`.
- **`dimensionUnit`** — `"preserve"` (default) or `"rem"` (converts `px`).
- **`nameExtension`** — `$extensions` key holding the `exportName` array. Default `"com.tokendesigner.app"`.
- **`write`** — set `false` to return the CSS string without writing.

## Naming

If tokens carry `$extensions.<nameExtension>.exportName: string[]`, those names are used verbatim (one token may emit several CSS variables; an empty array means "don't emit"). Otherwise variable names are derived from the token path. References (`"{a.b.c}"`) are resolved per-context with `$root` fallback.
