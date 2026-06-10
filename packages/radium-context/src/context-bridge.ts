import { applyContext } from "./apply-context.js"
import { isValidContextName } from "./storage.js"
import type { ApplyContextOptions, Context } from "./types.js"

/** postMessage `type`: host instructs the embedded app to switch context. */
export const CONTEXT_MESSAGE_SET = "radium-context:set"

/**
 * postMessage `type`: the embedded app announces it is listening, so a host can
 * send the current context without racing the app's startup.
 */
export const CONTEXT_MESSAGE_READY = "radium-context:ready"

/** Host → app: switch to `context`. */
export interface ContextSetMessage {
  type: typeof CONTEXT_MESSAGE_SET
  context: Context
}

/** App → `window.parent`: the app is ready to receive set-messages. */
export interface ContextReadyMessage {
  type: typeof CONTEXT_MESSAGE_READY
  contexts?: Context[]
}

export interface ListenForContextMessagesOptions {
  /**
   * Invoked with a validated context name on each set-message. When provided it
   * REPLACES the default `applyContext` behavior — e.g. a Storybook host drives
   * its own global instead of touching `<html>`. Set `applyHtmlClass: true` to
   * also apply the class.
   */
  onSet?: (context: Context) => void
  /** Also call `applyContext` even when `onSet` is supplied. Default `false`. */
  applyHtmlClass?: boolean
  /** Options forwarded to `applyContext` (e.g. `{ contexts, persist: false }`). */
  applyOptions?: ApplyContextOptions
  /** Announce readiness to `window.parent` on init. Default `true`. */
  announceReady?: boolean
  /** Contexts to advertise in the ready handshake. */
  contexts?: Context[]
  /** Window to attach the listener to. Default `window`. */
  targetWindow?: Window
  /**
   * Restrict which origins may drive the context. When set, a message whose `event.origin`
   * is not listed is ignored. Left undefined (the default), messages from any origin are
   * accepted — the context value is still regex-validated, so a hostile message can at worst
   * flip the theme. Provide this when the embedder's origin is known and fixed; omit it when
   * the embedder origin is dynamic/unknown at build time (e.g. a CodeSandbox preview).
   */
  allowedOrigins?: string[]
}

/**
 * Listen for `radium-context:set` messages and switch context. Use inside an app
 * embedded in a cross-origin iframe (where `localStorage`/URL are not live channels).
 *
 * On init, announces `{ type: "radium-context:ready" }` to `window.parent` so the host
 * can send the current context without racing startup (disable via `announceReady: false`).
 * Each set-message is validated (`isValidContextName`) before it is honored; invalid or
 * malformed messages are ignored silently.
 *
 * Returns a teardown function that removes the listener. No-ops outside the browser.
 */
export function listenForContextMessages(
  options: ListenForContextMessagesOptions = {},
): () => void {
  const win = options.targetWindow ?? (typeof window !== "undefined" ? window : undefined)
  if (!win) return () => {}

  const handle = (event: MessageEvent): void => {
    if (options.allowedOrigins && !options.allowedOrigins.includes(event.origin)) return
    const data = event.data as Partial<ContextSetMessage> | null | undefined
    if (!data || data.type !== CONTEXT_MESSAGE_SET) return
    if (!isValidContextName(data.context)) return

    if (options.onSet) {
      options.onSet(data.context)
      if (options.applyHtmlClass) applyContext(data.context, options.applyOptions)
    } else {
      applyContext(data.context, options.applyOptions)
    }
  }

  win.addEventListener("message", handle)

  if ((options.announceReady ?? true) && win.parent && win.parent !== win) {
    const ready: ContextReadyMessage = { type: CONTEXT_MESSAGE_READY, contexts: options.contexts }
    win.parent.postMessage(ready, "*")
  }

  return () => win.removeEventListener("message", handle)
}

/**
 * Host-side helper: post a context-set message to a target window (e.g. an iframe's
 * `contentWindow`). No-ops on an invalid context name or a missing window.
 *
 * `targetOrigin` defaults to `"*"` because an embedded preview's origin is often dynamic
 * (e.g. CodeSandbox `*.csb.app`); the only payload is a regex-validated context name, so
 * it is class-injection-safe and carries no secrets. Pass a specific origin to lock it down.
 */
export function postContext(
  targetWindow: Window | null | undefined,
  context: Context,
  targetOrigin = "*",
): void {
  if (!targetWindow || !isValidContextName(context)) return
  const message: ContextSetMessage = { type: CONTEXT_MESSAGE_SET, context }
  targetWindow.postMessage(message, targetOrigin)
}
