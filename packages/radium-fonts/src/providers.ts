import type { FontDef, FontProvider } from "./types.js"

function sortedWeights(font: FontDef): number[] {
  return font.weights && font.weights.length ? [...font.weights].sort((a, b) => a - b) : []
}

/** Google Fonts css2 param, e.g. `family=Montserrat:wght@400;600`. */
function googleParam(font: FontDef): string {
  const name = font.family.trim().replace(/\s+/g, "+")
  const weights = sortedWeights(font)
  return `family=${name}${weights.length ? `:wght@${weights.join(";")}` : ""}`
}

/** Bunny Fonts token, e.g. `montserrat:400,600`. */
function bunnyToken(font: FontDef): string {
  const name = font.family.trim().toLowerCase().replace(/\s+/g, "-")
  const weights = sortedWeights(font)
  return `${name}${weights.length ? `:${weights.join(",")}` : ""}`
}

/** Build the stylesheet URL for a provider. Families are sorted for a deterministic URL. */
export function buildHref(
  provider: FontProvider,
  fonts: readonly FontDef[],
  display: string,
): string {
  const sorted = [...fonts].sort((a, b) => a.family.localeCompare(b.family))
  if (provider === "bunny") {
    const families = sorted.map(bunnyToken).join("|")
    return `https://fonts.bunny.net/css?family=${families}&display=${display}`
  }
  const families = sorted.map(googleParam).join("&")
  return `https://fonts.googleapis.com/css2?${families}&display=${display}`
}

/** Hosts to `preconnect` for a provider. */
export function preconnectHosts(provider: FontProvider): string[] {
  if (provider === "bunny") return ["https://fonts.bunny.net"]
  return ["https://fonts.googleapis.com", "https://fonts.gstatic.com"]
}
