"use client"

import { useEffect, useRef } from "react"
import {
  listenForContextMessages,
  type ListenForContextMessagesOptions,
} from "./context-bridge.js"

/**
 * React wrapper around {@link listenForContextMessages}. Sets up the listener on mount and
 * tears it down on unmount. The listener is created once; `onSet` is read through a ref so
 * passing an inline callback does not resubscribe on every render.
 *
 * Note: whether `onSet` is used vs. the default `applyContext` fallback is fixed at mount
 * (based on whether `onSet` was supplied) — toggling its presence across renders is not
 * supported. The non-callback options are also read once at mount.
 */
export function useContextBridge(
  options: ListenForContextMessagesOptions = {}
): void {
  const onSetRef = useRef(options.onSet)
  onSetRef.current = options.onSet
  const hasOnSet = useRef(options.onSet != null).current

  useEffect(() => {
    return listenForContextMessages({
      ...options,
      onSet: hasOnSet ? (context) => onSetRef.current?.(context) : undefined,
    })
    // Subscribe once; the latest `onSet` is read via the ref.
  }, [])
}
