import { buildHref } from "./providers.js"
import type { FontDef, FontsHrefOptions } from "./types.js"

/**
 * Build the webfont stylesheet URL for the given fonts.
 *
 * @example
 * fontsHref([{ family: "Montserrat", weights: [400, 600] }])
 * // "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
 */
export function fontsHref(fonts: readonly FontDef[], options: FontsHrefOptions = {}): string {
  return buildHref(options.provider ?? "google", fonts, options.display ?? "swap")
}
