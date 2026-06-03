/** A web font to load: a family name and (optionally) the weights to request. */
export interface FontDef {
  family: string
  weights?: readonly number[]
}

/** Supported webfont CDN providers. */
export type FontProvider = "google" | "bunny"

/** Options for building a webfont stylesheet URL. */
export interface FontsHrefOptions {
  /** CDN provider. Default: `"google"`. */
  provider?: FontProvider
  /** `font-display` strategy. Default: `"swap"`. */
  display?: string
}

/** Options for {@link loadFonts}. */
export interface LoadFontsOptions extends FontsHrefOptions {
  /** Document to inject into. Default: the global `document` (no-op if absent). */
  document?: Document
  /** Inject `<link rel="preconnect">` for the provider hosts. Default: `true`. */
  preconnect?: boolean
}
