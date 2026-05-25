import { CURRENT_CONTEXT } from "@radium/ui/constants/contexts"

export function applyContext(): void {
  document.documentElement.classList.add(CURRENT_CONTEXT)
}
