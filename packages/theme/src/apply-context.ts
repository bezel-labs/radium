import { CURRENT_CONTEXT } from "./contexts"

export function applyContext(): void {
  document.documentElement.classList.add(CURRENT_CONTEXT)
}
