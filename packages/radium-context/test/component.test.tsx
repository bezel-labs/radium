import { act } from "react"
import { createRoot, type Root } from "react-dom/client"
import { afterEach, beforeEach, describe, expect, it } from "vitest"
import { ContextSwitcher } from "../src/context-switcher.js"
import { readStoredContext } from "../src/storage.js"

const CONTEXTS = ["default", "dark", "light"]

let container: HTMLDivElement
let root: Root

beforeEach(() => {
  document.documentElement.className = ""
  window.localStorage.clear()
  window.history.replaceState(null, "", "/")
  container = document.createElement("div")
  document.body.appendChild(container)
  root = createRoot(container)
})

afterEach(() => {
  act(() => root.unmount())
  container.remove()
})

function render() {
  act(() => {
    root.render(<ContextSwitcher contexts={CONTEXTS} />)
  })
  return container.querySelector("select") as HTMLSelectElement
}

describe("<ContextSwitcher />", () => {
  it("renders an option per context with Title-cased labels", () => {
    const select = render()
    const options = Array.from(select.options)
    expect(options.map((o) => o.value)).toEqual(CONTEXTS)
    expect(options.map((o) => o.textContent)).toEqual(["Default", "Dark", "Light"])
  })

  it("applies + persists the context on change", () => {
    const select = render()
    act(() => {
      select.value = "dark"
      select.dispatchEvent(new Event("change", { bubbles: true }))
    })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(readStoredContext()).toBe("dark")
    expect(select.value).toBe("dark")
  })

  it("initializes from a persisted context", () => {
    window.localStorage.setItem("radium-context", "light")
    const select = render()
    expect(select.value).toBe("light")
  })
})
