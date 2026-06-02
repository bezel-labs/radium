/** A context (theme) name — e.g. `"default"`, `"dark"`, `"light"`. */
export type Context = string

/** The base context name that maps to the `:root` scope (no override class needed). */
export const DEFAULT_CONTEXT = "default"

/** Options shared by the discovery + apply helpers. */
export interface ContextOptions {
  /**
   * Explicit list of contexts. When provided, CSS scanning is skipped entirely
   * (use for SSR, cross-origin stylesheets, or tests). The first entry is treated
   * as the base/default.
   */
  contexts?: Context[]
}

/** Options for {@link applyContext}. */
export interface ApplyContextOptions extends ContextOptions {
  /** Element whose `classList` is mutated. Default: `document.documentElement`. */
  target?: HTMLElement
  /** Persist the choice to `localStorage`. Default: `true`. */
  persist?: boolean
}

/** Options for resolving the initial context on load. */
export interface ResolveContextOptions extends ContextOptions {
  /** Fallback when neither the URL nor storage yields a valid context. Default: `"default"`. */
  fallback?: Context
}
