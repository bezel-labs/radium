import type { DtcgNode, FlatToken, TokenValue } from "./types.js"

/** The W3C "root token" key — the base value of a group / logical token. */
export const ROOT_CONTEXT = "$root"

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

/** A "context wrapper" is a child object that directly holds a `$value` (e.g. `dark`, `light`, `$root`). */
function isContextWrapper(v: unknown): v is DtcgNode {
  return isObject(v) && "$value" in v
}

/** Keys that are DTCG metadata, never traversed as child tokens/contexts. */
function isMetaKey(key: string): boolean {
  return key === "$type" || key === "$description" || key === "$extensions" || key === "$value"
}

/**
 * Collapse a DTCG token tree to the single value that applies for `context`, and
 * flatten it to a map of dot-path → {@link FlatToken}.
 *
 * Handles three node shapes:
 *  - **Simple token** — a node with a direct `$value` (context-invariant).
 *  - **Logical token** — a node whose children include context wrappers (one of
 *    which is `$root`). The value for `context` is picked, falling back to `$root`.
 *  - **Group** — anything else; recursed into.
 *
 * `$type` is inherited from the nearest ancestor that declares one.
 */
export function flattenForContext(tokens: DtcgNode, context: string): Map<string, FlatToken> {
  const out = new Map<string, FlatToken>()

  const walk = (node: DtcgNode, path: string, inheritedType: string | undefined): void => {
    const type = typeof node.$type === "string" ? node.$type : inheritedType

    // Simple token: direct $value.
    if ("$value" in node) {
      out.set(path, {
        path,
        value: node.$value as TokenValue,
        type,
        extensions: node.$extensions,
      })
      return
    }

    // Logical token: has context-wrapper children (dark/light/$root).
    const wrapperKeys = Object.keys(node).filter((k) => !isMetaKey(k) && isContextWrapper(node[k]))
    if (wrapperKeys.length > 0) {
      const chosen =
        (node[context] as DtcgNode | undefined) ??
        (node[ROOT_CONTEXT] as DtcgNode | undefined) ??
        (node[wrapperKeys[0]!] as DtcgNode)
      out.set(path, {
        path,
        value: chosen.$value as TokenValue,
        type,
        extensions: node.$extensions,
      })
      return
    }

    // Group: recurse into non-meta children.
    for (const key of Object.keys(node)) {
      if (isMetaKey(key)) continue
      const child = node[key]
      if (isObject(child)) {
        walk(child as DtcgNode, path ? `${path}.${key}` : key, type)
      }
    }
  }

  walk(tokens, "", undefined)
  return out
}
