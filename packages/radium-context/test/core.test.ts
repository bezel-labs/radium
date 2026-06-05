import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { getContexts } from "../src/get-contexts.js"
import { applyContext, applyStoredContext, resolveInitialContext } from "../src/apply-context.js"
import { STORAGE_KEY, isValidContextName, readStoredContext } from "../src/storage.js"

function injectCss(css: string): HTMLStyleElement {
  const style = document.createElement("style")
  style.textContent = css
  document.head.appendChild(style)
  return style
}

const VARIABLES_CSS = `
  :root { --primary: #111; --background: #fff; }
  .dark { --primary: #eee; --background: #000; }
  .light { --primary: #222; }
  .dark .nested { --primary: #999; }      /* descendant — not a context */
  .bg-primary { background-color: #111; } /* utility — sets no theme var */
`

beforeEach(() => {
  document.head.querySelectorAll("style").forEach((s) => s.remove())
  document.documentElement.className = ""
  window.localStorage.clear()
  window.history.replaceState(null, "", "/")
})

afterEach(() => {
  document.head.querySelectorAll("style").forEach((s) => s.remove())
})

describe("getContexts", () => {
  it("returns the explicit list when provided (bypasses scanning)", () => {
    expect(getContexts({ contexts: ["default", "dark", "light"] })).toEqual(["default", "dark", "light"])
  })

  it("discovers contexts from the loaded CSS, default first", () => {
    injectCss(VARIABLES_CSS)
    expect(getContexts()).toEqual(["default", "dark", "light"])
  })

  it("ignores descendant and utility selectors", () => {
    injectCss(VARIABLES_CSS)
    const result = getContexts()
    expect(result).not.toContain("nested")
    expect(result).not.toContain("bg-primary")
  })
})

describe("applyContext", () => {
  const contexts = ["default", "dark", "light"]

  it("sets exactly one context class on <html>", () => {
    applyContext("dark", { contexts })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    applyContext("light", { contexts })
    expect(document.documentElement.classList.contains("dark")).toBe(false)
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })

  it("persists to localStorage by default and can opt out", () => {
    applyContext("dark", { contexts })
    expect(readStoredContext()).toBe("dark")
    applyContext("light", { contexts, persist: false })
    expect(readStoredContext()).toBe("dark")
  })

  it("targets a custom element when given", () => {
    const el = document.createElement("div")
    applyContext("dark", { contexts, target: el, persist: false })
    expect(el.classList.contains("dark")).toBe(true)
    expect(document.documentElement.classList.contains("dark")).toBe(false)
  })
})

describe("resolveInitialContext", () => {
  const contexts = ["default", "dark", "light"]

  it("prefers a valid URL ?context= over storage", () => {
    window.history.replaceState(null, "", "/?context=light")
    window.localStorage.setItem(STORAGE_KEY, "dark")
    expect(resolveInitialContext({ contexts })).toBe("light")
  })

  it("falls back to storage, then to default", () => {
    window.localStorage.setItem(STORAGE_KEY, "dark")
    expect(resolveInitialContext({ contexts })).toBe("dark")
    window.localStorage.clear()
    expect(resolveInitialContext({ contexts })).toBe("default")
  })

  it("ignores values not in the known contexts list", () => {
    window.history.replaceState(null, "", "/?context=bogus")
    expect(resolveInitialContext({ contexts })).toBe("default")
  })
})

describe("applyStoredContext", () => {
  it("resolves and applies without persisting (so a URL preview is not saved)", () => {
    window.history.replaceState(null, "", "/?context=dark")
    const applied = applyStoredContext({ contexts: ["default", "dark", "light"] })
    expect(applied).toBe("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(readStoredContext()).toBeNull()
  })
})

describe("isValidContextName", () => {
  it("accepts identifiers and rejects junk", () => {
    expect(isValidContextName("dark")).toBe(true)
    expect(isValidContextName("high-contrast_2")).toBe(true)
    expect(isValidContextName("9bad")).toBe(false)
    expect(isValidContextName(".dark")).toBe(false)
    expect(isValidContextName(null)).toBe(false)
  })
})
