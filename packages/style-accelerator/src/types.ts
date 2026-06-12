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
