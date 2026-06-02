"use client"

import { useCallback, useEffect, useState } from "react"
import { applyContext, resolveInitialContext } from "./apply-context.js"
import { getContexts } from "./get-contexts.js"
import type { ApplyContextOptions, Context, ContextOptions } from "./types.js"

export interface UseContextSwitcherOptions extends ContextOptions, ApplyContextOptions {}

export interface ContextSwitcherState {
  /** All available contexts (the first is the base/default). */
  contexts: Context[]
  /** The currently-applied context. */
  current: Context
  /** Apply a context (swaps the class on the target element and persists by default). */
  setContext: (context: Context) => void
}

/**
 * React hook for reading and switching the active context.
 *
 * Pass `options.contexts` to supply the list explicitly (recommended — e.g. the
 * token-derived `CONTEXTS` constant). Without it, the contexts are discovered from the
 * loaded CSS via {@link getContexts}. The list is resolved once on mount.
 */
export function useContextSwitcher(options: UseContextSwitcherOptions = {}): ContextSwitcherState {
  const [contexts, setContexts] = useState<Context[]>(() => options.contexts ?? [])
  const [current, setCurrent] = useState<Context>(() =>
    resolveInitialContext({ contexts: options.contexts }),
  )

  // Discover contexts on mount when not supplied explicitly (CSS may not be parsed during SSR).
  useEffect(() => {
    if (options.contexts) return
    const discovered = getContexts()
    setContexts(discovered)
    setCurrent((prev) => (discovered.includes(prev) ? prev : resolveInitialContext({ contexts: discovered })))
  }, [options.contexts])

  const setContext = useCallback(
    (context: Context) => {
      applyContext(context, { ...options, contexts: options.contexts ?? contexts })
      setCurrent(context)
    },
    [contexts, options],
  )

  return { contexts, current, setContext }
}
