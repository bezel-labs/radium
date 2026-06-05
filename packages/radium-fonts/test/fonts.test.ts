import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { fontsHref } from "../src/fonts-href.js"
import { loadFonts } from "../src/load-fonts.js"
import type { FontDef } from "../src/types.js"

const FONTS: FontDef[] = [
  { family: "Montserrat", weights: [400, 600] },
  { family: "Source Code Pro", weights: [400] },
  { family: "Crimson Text", weights: [400] },
]

describe("fontsHref", () => {
  it("builds a Google Fonts css2 URL with sorted families and weights", () => {
    expect(fontsHref(FONTS)).toBe(
      "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400&family=Montserrat:wght@400;600&family=Source+Code+Pro:wght@400&display=swap",
    )
  })

  it("omits the weight axis when no weights are given", () => {
    expect(fontsHref([{ family: "Inter" }])).toBe(
      "https://fonts.googleapis.com/css2?family=Inter&display=swap",
    )
  })

  it("honors the display option", () => {
    expect(fontsHref([{ family: "Inter" }], { display: "optional" })).toContain("&display=optional")
  })

  it("builds a Bunny Fonts URL", () => {
    expect(fontsHref(FONTS, { provider: "bunny" })).toBe(
      "https://fonts.bunny.net/css?family=crimson-text:400|montserrat:400,600|source-code-pro:400&display=swap",
    )
  })
})

describe("loadFonts", () => {
  beforeEach(() => {
    document.head.querySelectorAll("link").forEach((l) => l.remove())
  })
  afterEach(() => {
    document.head.querySelectorAll("link").forEach((l) => l.remove())
  })

  it("injects a stylesheet + preconnect links for Google", () => {
    loadFonts(FONTS)
    const stylesheet = document.head.querySelector('link[data-radium-fonts="stylesheet"]') as HTMLLinkElement
    expect(stylesheet.rel).toBe("stylesheet")
    expect(stylesheet.href).toBe(fontsHref(FONTS))
    const preconnects = document.head.querySelectorAll('link[data-radium-fonts="preconnect"]')
    expect(preconnects.length).toBe(2) // googleapis + gstatic
  })

  it("is idempotent for the same font set", () => {
    loadFonts(FONTS)
    loadFonts(FONTS)
    expect(document.head.querySelectorAll('link[data-radium-fonts="stylesheet"]').length).toBe(1)
    expect(document.head.querySelectorAll('link[data-radium-fonts="preconnect"]').length).toBe(2)
  })

  it("replaces the stylesheet when the font set changes", () => {
    loadFonts(FONTS)
    loadFonts([{ family: "Inter", weights: [400] }])
    const sheets = document.head.querySelectorAll('link[data-radium-fonts="stylesheet"]')
    expect(sheets.length).toBe(1)
    expect((sheets[0] as HTMLLinkElement).href).toContain("Inter")
  })

  it("can skip preconnect", () => {
    loadFonts(FONTS, { preconnect: false })
    expect(document.head.querySelectorAll('link[data-radium-fonts="preconnect"]').length).toBe(0)
  })

  it("no-ops with an empty font list", () => {
    expect(loadFonts([])).toBeNull()
    expect(document.head.querySelectorAll("link").length).toBe(0)
  })
})
