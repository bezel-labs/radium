import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  CONTEXT_MESSAGE_READY,
  CONTEXT_MESSAGE_SET,
  listenForContextMessages,
  postContext,
} from "../src/context-bridge.js"

/** Dispatch a `message` event with the given `data` (and optional `origin`). */
function dispatchMessage(data: unknown, origin?: string): void {
  window.dispatchEvent(new MessageEvent("message", { data, origin }))
}

beforeEach(() => {
  document.documentElement.className = ""
  window.localStorage.clear()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("postContext", () => {
  it("posts a set-message with the right shape", () => {
    const target = { postMessage: vi.fn() } as unknown as Window
    postContext(target, "dark")
    expect(target.postMessage).toHaveBeenCalledWith(
      { type: CONTEXT_MESSAGE_SET, context: "dark" },
      "*",
    )
  })

  it("forwards a custom targetOrigin", () => {
    const target = { postMessage: vi.fn() } as unknown as Window
    postContext(target, "light", "https://example.csb.app")
    expect(target.postMessage).toHaveBeenCalledWith(expect.anything(), "https://example.csb.app")
  })

  it("skips invalid context names", () => {
    const target = { postMessage: vi.fn() } as unknown as Window
    postContext(target, "$root")
    postContext(target, "")
    expect(target.postMessage).not.toHaveBeenCalled()
  })

  it("no-ops on a missing window", () => {
    expect(() => postContext(null, "dark")).not.toThrow()
  })
})

describe("listenForContextMessages", () => {
  it("calls onSet with a valid context", () => {
    const onSet = vi.fn()
    const teardown = listenForContextMessages({ onSet, announceReady: false })
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "dark" })
    expect(onSet).toHaveBeenCalledWith("dark")
    teardown()
  })

  it("falls back to applyContext (html class) when no onSet is given", () => {
    const teardown = listenForContextMessages({
      announceReady: false,
      applyOptions: { contexts: ["default", "dark", "light"], persist: false },
    })
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "dark" })
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    teardown()
  })

  it("ignores malformed and invalid messages", () => {
    const onSet = vi.fn()
    const teardown = listenForContextMessages({ onSet, announceReady: false })
    dispatchMessage({ type: "something-else", context: "dark" })
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "$root" })
    dispatchMessage({ type: CONTEXT_MESSAGE_SET })
    dispatchMessage(null)
    dispatchMessage("not-an-object")
    expect(onSet).not.toHaveBeenCalled()
    teardown()
  })

  it("honors an allowedOrigins allowlist", () => {
    const onSet = vi.fn()
    const teardown = listenForContextMessages({
      onSet,
      announceReady: false,
      allowedOrigins: ["https://editor.example"],
    })
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "dark" }, "https://evil.example")
    expect(onSet).not.toHaveBeenCalled()
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "light" }, "https://editor.example")
    expect(onSet).toHaveBeenCalledWith("light")
    teardown()
  })

  it("teardown removes the listener", () => {
    const onSet = vi.fn()
    const teardown = listenForContextMessages({ onSet, announceReady: false })
    teardown()
    dispatchMessage({ type: CONTEXT_MESSAGE_SET, context: "dark" })
    expect(onSet).not.toHaveBeenCalled()
  })

  it("announces readiness to the parent window on init", () => {
    const parent = { postMessage: vi.fn() } as unknown as Window
    const fakeWindow = {
      parent,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as Window
    const teardown = listenForContextMessages({
      targetWindow: fakeWindow,
      contexts: ["default", "dark"],
    })
    expect(parent.postMessage).toHaveBeenCalledWith(
      { type: CONTEXT_MESSAGE_READY, contexts: ["default", "dark"] },
      "*",
    )
    teardown()
  })

  it("does not announce when the window has no distinct parent", () => {
    const fakeWindow = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as unknown as { parent?: Window } & Window
    // self-parent (top window): parent === self → no announce
    ;(fakeWindow as { parent: Window }).parent = fakeWindow
    const postSpy = vi.fn()
    ;(fakeWindow as unknown as { postMessage: typeof postSpy }).postMessage = postSpy
    const teardown = listenForContextMessages({ targetWindow: fakeWindow })
    expect(postSpy).not.toHaveBeenCalled()
    teardown()
  })
})
