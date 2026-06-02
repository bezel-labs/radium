"use client"

import { PaletteIcon } from "lucide-react"
import { useContextSwitcher } from "radium-context"

import { cn } from "@radium/ui/lib/utils"
import { Button } from "@radium/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radium/ui/components/dropdown-menu"
import { CONTEXTS } from "@radium/ui/styles/contexts"

function titleCase(value: string): string {
  return value.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

export interface ThemeSwitcherProps {
  className?: string
  /** Map a context name to a human label. Default: Title-cases the name. */
  formatLabel?: (context: string) => string
}

/**
 * Theme/context switcher dropdown. Lists the contexts generated from the design tokens
 * (`CONTEXTS`) and applies + persists the selection via `radium-context`.
 */
function ThemeSwitcher({ className, formatLabel = titleCase }: ThemeSwitcherProps) {
  const { current, setContext } = useContextSwitcher({ contexts: [...CONTEXTS] })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="icon" />}
        aria-label="Switch theme"
        className={cn(className)}
        data-slot="theme-switcher"
      >
        <PaletteIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={current} onValueChange={setContext}>
          {CONTEXTS.map((context) => (
            <DropdownMenuRadioItem key={context} value={context}>
              {formatLabel(context)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ThemeSwitcher }
