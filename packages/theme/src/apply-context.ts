import { CURRENT_CONTEXT } from "./current-context"

export function applyContext(): void {
  document.documentElement.classList.add(CURRENT_CONTEXT)
}
