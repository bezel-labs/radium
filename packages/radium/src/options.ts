import { DEFAULT_CONTEXTS, DEFAULT_NAME_EXTENSION } from "./defaults.js"

/**
 * Options for the pure CSS transform ({@link tokensToCss}/{@link emitCss}),
 * decoupled from any filesystem concern so they work in any environment.
 * All optional; defaults make the zero-config case work.
 */
export interface CssOptions {
  /**
   * Map of context name → CSS selector. The first entry is the base context (full
   * output); every other context emits only the variables that differ from the base.
   * Default: `{ "$root": ":root", "dark": ".dark", "light": ".light" }`.
   */
  contexts?: Record<string, string>
  /** Color serialization. Default: `"oklch"`. */
  colorFormat?: "oklch" | "hex"
  /** Dimension handling: keep the authored unit, or convert `px` → `rem`. Default: `"preserve"`. */
  dimensionUnit?: "preserve" | "rem"
  /** `$extensions` key holding the `exportName` array. Default: `"com.tokendesigner.app"`. */
  nameExtension?: string
}

/** Fully-resolved CSS-transform options (no `undefined`). */
export interface ResolvedCssOptions {
  contexts: Record<string, string>
  colorFormat: "oklch" | "hex"
  dimensionUnit: "preserve" | "rem"
  nameExtension: string
}

/** Apply defaults to {@link CssOptions}. Pure — no path resolution, no `node:*`. */
export function resolveCssOptions(options: CssOptions = {}): ResolvedCssOptions {
  const contexts = options.contexts ?? DEFAULT_CONTEXTS
  if (Object.keys(contexts).length === 0) {
    throw new Error("radium: `contexts` must define at least one context.")
  }

  return {
    contexts,
    colorFormat: options.colorFormat ?? "oklch",
    dimensionUnit: options.dimensionUnit ?? "preserve",
    nameExtension: options.nameExtension ?? DEFAULT_NAME_EXTENSION,
  }
}
