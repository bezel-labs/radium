import type { FlatToken, TokenValue } from "./types.js"

const REFERENCE_RE = /^\{([^{}]+)\}$/

/** Returns the referenced path if `value` is a whole-value DTCG alias `"{a.b.c}"`, else `null`. */
export function aliasTarget(value: TokenValue): string | null {
  if (typeof value !== "string") return null
  const match = REFERENCE_RE.exec(value.trim())
  return match ? match[1]!.trim() : null
}

/**
 * Resolve whole-value references (`"{a.b.c}"`) in a flattened, single-context token
 * map, in place. Because the map was collapsed for one context, following an alias
 * yields that context's value (with `$root` fallback already applied during collapse).
 *
 * Multi-hop aliases are followed, results memoized, and cycles guarded against.
 */
export function resolveReferences(tokens: Map<string, FlatToken>): Map<string, FlatToken> {
  const resolved = new Map<string, TokenValue>()

  const resolveValue = (value: TokenValue, seen: Set<string>): TokenValue => {
    const target = aliasTarget(value)
    if (target === null) return value

    if (resolved.has(target)) return resolved.get(target)!
    if (seen.has(target)) {
      throw new Error(`radium: circular token reference detected at "{${target}}".`)
    }

    const token = tokens.get(target)
    if (!token) {
      throw new Error(`radium: unresolved token reference "{${target}}".`)
    }

    seen.add(target)
    const value2 = resolveValue(token.value, seen)
    seen.delete(target)
    resolved.set(target, value2)
    return value2
  }

  for (const token of tokens.values()) {
    token.value = resolveValue(token.value, new Set())
  }
  return tokens
}
