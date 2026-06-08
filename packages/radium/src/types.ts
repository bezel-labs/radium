/**
 * Minimal type surface for the W3C Design Tokens (DTCG) 2025.10 format, plus
 * the internal shapes the generator passes between stages.
 *
 * @see https://www.designtokens.org/tr/2025.10/format/
 */

/** A DTCG color value (e.g. `{ colorSpace: "oklch", components: [...], hex, alpha }`). */
export interface ColorValue {
  colorSpace: string
  components: number[]
  hex?: string
  alpha?: number
}

/** A DTCG dimension value (e.g. `{ value: 12, unit: "px" }`). */
export interface DimensionValue {
  value: number
  unit: string
}

/** Any DTCG token value: a literal, a reference string `"{a.b.c}"`, or a typed object. */
export type TokenValue =
  | string
  | number
  | ColorValue
  | DimensionValue
  | (string | number)[]
  | Record<string, unknown>

/**
 * An arbitrary DTCG node — either a group (nested nodes) or a token (`$value`).
 * Indexed loosely because we walk it structurally rather than by a fixed schema.
 */
export interface DtcgNode {
  $value?: TokenValue
  $type?: string
  $description?: string
  $extensions?: Record<string, unknown>
  [key: string]: unknown
}

/** A single logical token after the tree has been collapsed + flattened for one context. */
export interface FlatToken {
  /** Dot-path of the token in the source tree (contexts already stripped). */
  path: string
  /** The token's value for the active context (may still be a `"{ref}"`). */
  value: TokenValue
  /** Resolved/inherited `$type`, if known. */
  type?: string
  /** Vendor extensions carried through from the source token. */
  extensions?: Record<string, unknown>
}

/** Options for {@link generateVariablesCss}. All optional; defaults make the zero-config case work. */
export interface RadiumOptions {
  /** Path to the DTCG tokens file. Default: `"design-tokens.json"` (resolved from `cwd`). */
  input?: string
  /** Path to write the generated CSS. Default: `"variables.css"` (resolved from `cwd`). */
  variablesOutput?: string
  /** Base directory paths are resolved against. Default: `process.cwd()`. */
  cwd?: string
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
  /**
   * When set, also write a generated TypeScript module exporting `CONTEXTS` (the list of
   * context names derived from the tokens). Path resolved against `cwd`. Default: none.
   */
  contextsOutput?: string
  /**
   * When set, also write a generated TypeScript module exporting `FONTS` (the web fonts
   * derived from the tokens). Path resolved against `cwd`. Default: none.
   */
  fontsOutput?: string
  /** When `false`, return the CSS string without touching the filesystem. Default: `true`. */
  write?: boolean
}

/** Fully-resolved options (no `undefined`), produced by `resolveOptions`. */
export interface ResolvedOptions {
  inputPath: string
  variablesOutputPath: string
  contexts: Record<string, string>
  colorFormat: "oklch" | "hex"
  dimensionUnit: "preserve" | "rem"
  nameExtension: string
  contextsOutput: string | null
  fontsOutput: string | null
  write: boolean
}
