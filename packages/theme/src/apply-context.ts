import { CONTEXT_OPTIONS } from "./context-options"
import { CURRENT_CONTEXT } from "./current-context"

export function applyContext(): void {
  // Remove any previously-applied context class so switching e.g. dark → default doesn't leave
  // the html with `class="dark default"` and keep the dark CSS rules winning.
  document.documentElement.classList.remove(...CONTEXT_OPTIONS)
  document.documentElement.classList.add(CURRENT_CONTEXT)
}
