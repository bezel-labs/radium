import type { FlatToken } from "./types.js"

/** Leading path segments dropped when deriving a CSS name from a token path. */
const DROPPED_PREFIXES = new Set(["base", "semantic"])
/** Trailing path segments dropped (a group's "default"/root token maps to the bare group name). */
const DROPPED_SUFFIXES = new Set(["default", "$root"])

function exportNames(token: FlatToken, nameExtension: string): string[] | undefined {
  const ext = token.extensions?.[nameExtension]
  if (ext && typeof ext === "object" && "exportName" in ext) {
    const names = (ext as { exportName: unknown }).exportName
    if (Array.isArray(names)) return names.filter((n): n is string => typeof n === "string")
  }
  return undefined
}

/** True if any token in the map declares an `exportName` under `nameExtension`. */
export function usesExportNames(
  tokens: Iterable<FlatToken>,
  nameExtension: string,
): boolean {
  for (const token of tokens) {
    if (exportNames(token, nameExtension) !== undefined) return true
  }
  return false
}

/** Derive a CSS variable name from a dot-path (fallback when no `exportName` exists). */
export function nameFromPath(path: string): string {
  const segments = path.split(".")
  while (segments.length > 1 && DROPPED_PREFIXES.has(segments[0]!)) segments.shift()
  while (segments.length > 1 && DROPPED_SUFFIXES.has(segments[segments.length - 1]!)) {
    segments.pop()
  }
  return segments.join("-")
}

/**
 * Resolve the CSS variable name(s) a token emits (without the leading `--`).
 *
 * - In **exportName mode** (`useExportName`), names come solely from the token's
 *   `exportName` array. A token without one — or with only empty strings — emits
 *   nothing (it exists purely as a reference target). One token may emit many names.
 * - Otherwise (generic DTCG), the name is derived from the token's path.
 */
export function cssNames(
  token: FlatToken,
  nameExtension: string,
  useExportName: boolean,
): string[] {
  if (useExportName) {
    const names = exportNames(token, nameExtension)
    if (!names) return []
    return names.filter((n) => n.length > 0)
  }
  return [nameFromPath(token.path)]
}
