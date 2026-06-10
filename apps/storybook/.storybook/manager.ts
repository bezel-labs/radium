import { addons, type API } from "storybook/manager-api"
import { themes, type ThemeVars } from "storybook/theming"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { listenForContextMessages } from "radium-context"

/**
 * Lets a parent app that embeds this Storybook in an iframe control the
 * manager chrome (left nav, top toolbar, addons panel) and its theme two ways:
 *
 *  1. URL query params on load, e.g.
 *     `?nav=false&toolbar=false&panel=false&navSize=0&theme=dark`
 *  2. Live `postMessage` (no reload), e.g.
 *     iframe.contentWindow.postMessage(
 *       { type: "radium:storybook-ui", target: "nav", show: false }, "*")
 *     iframe.contentWindow.postMessage(
 *       { type: "radium:storybook-ui", target: "theme", value: "dark" }, "*")
 *     For visibility targets, omit `show` to flip the current state.
 *     For "theme", omit `value` to flip between light/dark.
 *
 * postMessage is cross-origin-safe (works from a different parent origin such
 * as the CodeSandbox `*.csb.app` host); reading our own `location.search` is
 * same-origin to this iframe document.
 */

const MESSAGE_TYPE = "radium:storybook-ui"

type Target = "nav" | "toolbar" | "panel" | "fullscreen" | "theme"
type ThemeName = "light" | "dark"

interface UiControlMessage {
  type: typeof MESSAGE_TYPE
  target: Target
  /** Visibility targets (nav/toolbar/panel/fullscreen); omit to toggle. */
  show?: boolean
  /** "theme" target; omit to flip between light/dark. */
  value?: ThemeName
}

// Storybook's built-in manager theme starts light; track it so an omitted
// `value` can flip to the opposite.
let currentTheme: ThemeName = "light"

function applyTheme(api: API, value?: ThemeName) {
  const next = value ?? (currentTheme === "dark" ? "light" : "dark")
  currentTheme = next
  api.setOptions({ theme: themes[next] as ThemeVars })
}

function applyTarget(api: API, message: UiControlMessage) {
  switch (message.target) {
    case "nav":
      return api.toggleNav(message.show)
    case "toolbar":
      return api.toggleToolbar(message.show)
    case "panel":
      return api.togglePanel(message.show)
    case "fullscreen":
      return api.toggleFullscreen(message.show)
    case "theme":
      return applyTheme(api, message.value)
  }
}

function isUiControlMessage(value: unknown): value is UiControlMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { type?: unknown }).type === MESSAGE_TYPE
  )
}

addons.register("radium/ui-control", (api) => {
  // 1) Initial visibility from this iframe's own URL query params.
  const query = new URLSearchParams(window.location.search)
  const boolParam = (key: string): boolean | undefined => {
    if (!query.has(key)) return undefined
    const raw = query.get(key)
    return raw !== "false" && raw !== "0"
  }

  // Defer to the next tick so the layout store is initialized before we toggle.
  setTimeout(() => {
    const nav = boolParam("nav")
    const toolbar = boolParam("toolbar")
    const panel = boolParam("panel")
    if (nav !== undefined) api.toggleNav(nav)
    if (toolbar !== undefined) api.toggleToolbar(toolbar)
    if (panel !== undefined) api.togglePanel(panel)
    if (query.has("navSize")) api.setSizes({ navSize: Number(query.get("navSize")) })
    const theme = query.get("theme")
    if (theme === "light" || theme === "dark") applyTheme(api, theme)
  }, 0)

  // 2) Live control from the embedding parent, no reload.
  window.addEventListener("message", (event: MessageEvent) => {
    if (!isUiControlMessage(event.data)) return
    applyTarget(api, event.data)
  })

  // 3) Context (theme) bridge: a parent app drives the active context. This must live
  // in the manager (top window the parent posts to) — updating the `context` global
  // here propagates to the nested preview iframe and re-runs its decorator.
  listenForContextMessages({
    contexts: [...CONTEXTS],
    onSet: (context) => api.updateGlobals({ context }),
  })
})
