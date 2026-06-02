import type { Context } from "./types.js"

/** localStorage key under which the selected context is persisted. */
export const STORAGE_KEY = "radium-context"

/** URL query parameter that overrides the stored context on load. */
export const URL_PARAM = "context"

/**
 * Context-name allowlist: must start with a letter, then letters/digits/dash/underscore.
 * A security boundary — the value is used as a CSS class via `classList.add`, so it must
 * be a valid identifier — and a guard against URL/storage tampering.
 */
export const CONTEXT_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/

export function isValidContextName(value: unknown): value is Context {
  return typeof value === "string" && CONTEXT_NAME_RE.test(value)
}

/** Read the `?context=` URL parameter, validated. Returns `null` outside the browser. */
export function readContextFromUrl(): Context | null {
  if (typeof window === "undefined") return null
  const value = new URLSearchParams(window.location.search).get(URL_PARAM)
  return value && isValidContextName(value) ? value : null
}

/** Read the persisted context from `localStorage`, validated. Safe if storage is unavailable. */
export function readStoredContext(): Context | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value && isValidContextName(value) ? value : null
  } catch {
    return null
  }
}

/** Persist the selected context to `localStorage`. Silently no-ops if storage is unavailable. */
export function writeStoredContext(context: Context): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, context)
  } catch {
    // ignore (private mode, disabled storage, SSR)
  }
}
