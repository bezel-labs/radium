import { fontsHref } from "./fonts-href.js"
import { preconnectHosts } from "./providers.js"
import type { FontDef, LoadFontsOptions } from "./types.js"

/** Attribute marking elements this library injected, so loads are idempotent. */
const MARKER = "data-radium-fonts"

/**
 * Dynamically load web fonts by injecting a webfont CDN stylesheet (and `preconnect`
 * hints) into `<head>`.
 *
 * Idempotent: if the same stylesheet is already present it is left in place; if the font
 * set changed, the previous stylesheet is replaced. Safe to call during SSR (no-op when
 * there is no `document`). Returns the stylesheet `<link>`, or `null` if nothing was done.
 *
 * @example
 * import { FONTS } from "@radium/ui/styles/fonts"
 * loadFonts([...FONTS])                       // Google Fonts
 * loadFonts([...FONTS], { provider: "bunny" }) // GDPR-friendly mirror
 */
export function loadFonts(
  fonts: readonly FontDef[],
  options: LoadFontsOptions = {},
): HTMLLinkElement | null {
  const doc = options.document ?? (typeof document !== "undefined" ? document : undefined)
  if (!doc || fonts.length === 0) return null

  const provider = options.provider ?? "google"
  const href = fontsHref(fonts, options)

  const existing = doc.head.querySelector<HTMLLinkElement>(`link[${MARKER}="stylesheet"]`)
  if (existing) {
    if (existing.href === href) return existing
    existing.remove()
  }

  if (options.preconnect ?? true) {
    for (const host of preconnectHosts(provider)) {
      if (doc.head.querySelector(`link[${MARKER}="preconnect"][href="${host}"]`)) continue
      const pre = doc.createElement("link")
      pre.rel = "preconnect"
      pre.href = host
      if (host.includes("gstatic")) pre.crossOrigin = "anonymous"
      pre.setAttribute(MARKER, "preconnect")
      doc.head.appendChild(pre)
    }
  }

  const link = doc.createElement("link")
  link.rel = "stylesheet"
  link.href = href
  link.setAttribute(MARKER, "stylesheet")
  doc.head.appendChild(link)
  return link
}
