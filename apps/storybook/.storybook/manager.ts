import { addons, type API } from "storybook/manager-api"
import { themes, type ThemeVars } from "storybook/theming"
import { createLivePreviewRelay } from "@keypuncherlabs/live-preview"

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

/**
 * Origins allowed to push live CSS into the preview (see the live-preview relay
 * below). The parent app embeds this Storybook from one of these origins; CSS
 * from anywhere else is ignored.
 *
 * This Storybook is shared by every Gundam stage, so all embedding origins must
 * be listed here. The relay supports `*` as a single-DNS-label wildcard, so one
 * `https://*.app.tokendesigner.com` entry covers the `dev` stage and every
 * per-developer stage; prod (`app.tokendesigner.com`, no subdomain) is listed
 * exactly. The origins mirror `GET_SITE_BASE_DOMAIN(stage)` in Gundam.
 *
 * These must be literals: the Storybook manager bundle is NOT built by Vite, so
 * `import.meta.env` / `VITE_*` is unavailable here (env-based config never took
 * effect and has been removed).
 */
const LIVE_PREVIEW_PARENT_ORIGINS = [
  "http://localhost:4200", // local Gundam dev
  "http://localhost:4300", // local secondary
  "https://app.tokendesigner.com", // prod
  "https://*.app.tokendesigner.com", // dev + every per-developer stage
]

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
    // Hide the addons panel by default; ?panel=true (or the toolbar / "A" shortcut /
    // postMessage) can still reveal it.
    api.togglePanel(panel ?? false)
    if (query.has("navSize")) api.setSizes({ navSize: Number(query.get("navSize")) })
    const theme = query.get("theme")
    if (theme === "light" || theme === "dark") applyTheme(api, theme)
  }, 0)

  // 2) Live control from the embedding parent, no reload.
  window.addEventListener("message", (event: MessageEvent) => {
    if (!isUiControlMessage(event.data)) return
    applyTarget(api, event.data)
  })

  // 3) Context (theme) bridge: a parent app (e.g. the Gundam editor) drives the active
  // context. This must live in the manager (the top window the parent posts to) —
  // updating the `context` global here propagates to the nested preview iframe and
  // re-runs its decorator. Handled inline so the manager bundle needs no extra deps.
  window.addEventListener("message", (event: MessageEvent) => {
    const data = event.data as { type?: string; context?: unknown } | null | undefined
    if (!data || data.type !== "radium-context:set") return
    const context = data.context
    // The value becomes a CSS class in the preview, so allow only identifier-safe names.
    if (typeof context !== "string" || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(context)) return
    api.updateGlobals({ context })
  })

  // 4) Live CSS bridge: the parent posts validated CSS here (the top window it
  // can reach); relay it one hop down into the nested preview iframe, where a
  // receiver injects it (see preview.tsx). This mirrors the context bridge above
  // — the manager is the only window the parent can post to directly.
  createLivePreviewRelay({
    allowedOrigins: LIVE_PREVIEW_PARENT_ORIGINS,
    getTargetWindow: () =>
      (document.getElementById("storybook-preview-iframe") as HTMLIFrameElement | null)
        ?.contentWindow,
    targetOrigin: window.location.origin,
  })

  // Announce readiness so the parent can send the current context without racing startup.
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({ type: "radium-context:ready" }, "*")
  }
})
