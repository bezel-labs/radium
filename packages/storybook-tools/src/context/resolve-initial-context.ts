/** A context (theme) name — e.g. `"default"`, `"dark"`, `"light"`. */
export type Context = string

/** The base context name that maps to the `:root` scope (no override class needed). */
export const DEFAULT_CONTEXT = "default"

/**
 * localStorage key under which the selected context is persisted.
 *
 * Kept as `"radium-context"` regardless of this package's name so an existing user's
 * stored theme choice (and the `manager.ts` postMessage protocol) keep working.
 */
const STORAGE_KEY = "radium-context"

/** URL query parameter that overrides the stored context on load. */
const URL_PARAM = "context"

/**
 * Context-name allowlist: must start with a letter, then letters/digits/dash/underscore.
 * A security boundary — the value is applied as a CSS class — and a guard against
 * URL/storage tampering.
 */
const CONTEXT_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/

function isValidContextName(value: unknown): value is Context {
  return typeof value === "string" && CONTEXT_NAME_RE.test(value)
}

/** Read the `?context=` URL parameter, validated. Returns `null` outside the browser. */
function readContextFromUrl(): Context | null {
  if (typeof window === "undefined") return null
  const value = new URLSearchParams(window.location.search).get(URL_PARAM)
  return value && isValidContextName(value) ? value : null
}

/** Read the persisted context from `localStorage`, validated. Safe if storage is unavailable. */
function readStoredContext(): Context | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value && isValidContextName(value) ? value : null
  } catch {
    return null
  }
}

/** Options for resolving the initial context on load. */
export interface ResolveContextOptions {
  /**
   * Known contexts (e.g. the `CONTEXTS` constant `radium` generates from your design
   * tokens). A resolved value is only honored if it is a member of this list.
   */
  contexts?: Context[]
  /** Fallback when neither the URL nor storage yields a valid context. Default: `"default"`. */
  fallback?: Context
}

/**
 * Resolve the context to use on load. Precedence: URL `?context=` → `localStorage` →
 * `fallback` (default `"default"`). A resolved value is only honored if it is one of the
 * known `contexts` (when those are provided); otherwise it falls through.
 */
export function resolveInitialContext(options: ResolveContextOptions = {}): Context {
  const fallback = options.fallback ?? DEFAULT_CONTEXT
  const known = options.contexts
  const allowed = (c: Context | null): c is Context =>
    c !== null && (!known || known.includes(c))

  const fromUrl = readContextFromUrl()
  if (allowed(fromUrl)) return fromUrl

  const fromStorage = readStoredContext()
  if (allowed(fromStorage)) return fromStorage

  return fallback
}
