import { getContexts } from "./get-contexts.js"
import { readContextFromUrl, readStoredContext, writeStoredContext } from "./storage.js"
import {
  DEFAULT_CONTEXT,
  type ApplyContextOptions,
  type Context,
  type ResolveContextOptions,
} from "./types.js"

/**
 * Apply a context by swapping the class on a target element (default `<html>`).
 *
 * Removes every known context class first so only one is ever present (mirrors the
 * cascade expectation of generated `:root` + `.dark`/`.light` CSS), then adds `name`.
 * Persists the choice to `localStorage` unless `persist: false`.
 */
export function applyContext(name: Context, options: ApplyContextOptions = {}): void {
  const target = options.target ?? document.documentElement
  const contexts = options.contexts ?? getContexts()
  target.classList.remove(...contexts)
  target.classList.add(name)
  if (options.persist ?? true) writeStoredContext(name)
}

/**
 * Resolve the context to use on load. Precedence: URL `?context=` → `localStorage`
 * → `fallback` (default `"default"`). A resolved value is only honored if it is one
 * of the known `contexts` (when those are known); otherwise it falls through.
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

/**
 * Resolve and apply the initial context in one call — use at app startup (in place of a
 * hand-rolled `applyContext()`). Does not persist, so a URL `?context=` preview doesn't
 * overwrite the user's stored preference.
 */
export function applyStoredContext(options: ApplyContextOptions & ResolveContextOptions = {}): Context {
  const contexts = options.contexts ?? getContexts()
  const context = resolveInitialContext({ ...options, contexts })
  applyContext(context, { ...options, contexts, persist: options.persist ?? false })
  return context
}
