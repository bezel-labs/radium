"use client"

import type { ChangeEvent } from "react"
import { useContextSwitcher, type UseContextSwitcherOptions } from "./use-context-switcher.js"
import type { Context } from "./types.js"

export interface ContextSwitcherProps extends UseContextSwitcherOptions {
  /** Class applied to the underlying `<select>`. */
  className?: string
  /** Accessible label for the control. Default: `"Theme"`. */
  "aria-label"?: string
  /** Map a context name to a human label. Default: Title-cases the name. */
  formatLabel?: (context: Context) => string
}

function titleCase(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

/**
 * A self-contained, dependency-free theme switcher: a native `<select>` listing the
 * available contexts that applies + persists the choice on change. Style it via
 * `className`, or use {@link useContextSwitcher} to build your own UI.
 */
export function ContextSwitcher({
  className,
  formatLabel = titleCase,
  "aria-label": ariaLabel = "Theme",
  ...options
}: ContextSwitcherProps) {
  const { contexts, current, setContext } = useContextSwitcher(options)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setContext(event.target.value)
  }

  return (
    <select
      data-slot="context-switcher"
      className={className}
      aria-label={ariaLabel}
      value={current}
      onChange={onChange}
    >
      {contexts.map((context) => (
        <option key={context} value={context}>
          {formatLabel(context)}
        </option>
      ))}
    </select>
  )
}
