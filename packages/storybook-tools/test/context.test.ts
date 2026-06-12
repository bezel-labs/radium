import { beforeEach, describe, expect, it } from "vitest"
import { resolveInitialContext } from "../src/context/resolve-initial-context.js"

const CONTEXTS = ["default", "dark", "light"]

beforeEach(() => {
  window.localStorage.clear()
  window.history.replaceState(null, "", "/")
})

describe("resolveInitialContext", () => {
  it("prefers a valid URL ?context= over storage", () => {
    window.history.replaceState(null, "", "/?context=light")
    window.localStorage.setItem("radium-context", "dark")
    expect(resolveInitialContext({ contexts: CONTEXTS })).toBe("light")
  })

  it("falls back to storage, then to the default", () => {
    window.localStorage.setItem("radium-context", "dark")
    expect(resolveInitialContext({ contexts: CONTEXTS })).toBe("dark")
    window.localStorage.clear()
    expect(resolveInitialContext({ contexts: CONTEXTS })).toBe("default")
  })

  it("honors a custom fallback", () => {
    expect(resolveInitialContext({ contexts: CONTEXTS, fallback: "dark" })).toBe("dark")
  })

  it("ignores values not in the known contexts list", () => {
    window.history.replaceState(null, "", "/?context=bogus")
    expect(resolveInitialContext({ contexts: CONTEXTS })).toBe("default")
  })

  it("ignores identifier-invalid values from storage", () => {
    window.localStorage.setItem("radium-context", ".dark")
    expect(resolveInitialContext({ contexts: CONTEXTS })).toBe("default")
  })

  it("accepts any identifier-valid value when no contexts list is given", () => {
    window.history.replaceState(null, "", "/?context=high-contrast_2")
    expect(resolveInitialContext()).toBe("high-contrast_2")
  })
})
