/**
 * radium — isomorphic entry.
 *
 * The pure transform core: convert an in-memory W3C Design Tokens (DTCG) object
 * into a scoped `variables.css` string. Imports no `node:*`, so it runs anywhere
 * — browser, edge, Node. For the filesystem/CLI conveniences (reading a tokens
 * file, writing outputs), import from `radium/node`.
 */
import { emitCss } from "./emit.js"
import { resolveCssOptions, type CssOptions } from "./options.js"
import type { DtcgNode } from "./types.js"

export type { CssOptions, ResolvedCssOptions } from "./options.js"
export type { DtcgNode, FlatToken, TokenValue, ColorValue, DimensionValue } from "./types.js"
export { DEFAULT_CONTEXTS, DEFAULT_NAME_EXTENSION } from "./defaults.js"
export { emitCss } from "./emit.js"
export { resolveCssOptions } from "./options.js"
export { getContexts, formatContextsModule, DEFAULT_CONTEXT_NAME } from "./contexts.js"
export { getFonts, formatFontsModule } from "./fonts.js"
export type { FontDef } from "./fonts.js"

/**
 * Convert a DTCG token object into a scoped `variables.css` string.
 *
 * Resolves each configured context (with `$root` fallback and reference
 * resolution) and emits one CSS scope per context — the base context in full,
 * others as override-only blocks. Pure: no filesystem access.
 *
 * @example
 * const css = tokensToCss(tokens)
 *
 * @example
 * const css = tokensToCss(tokens, { colorFormat: "hex", contexts: { $root: ":root" } })
 */
export function tokensToCss(tokens: DtcgNode, options: CssOptions = {}): string {
  return emitCss(tokens, resolveCssOptions(options))
}
