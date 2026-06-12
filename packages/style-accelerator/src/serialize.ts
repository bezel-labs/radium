import type { ResolvedCssOptions } from "./options.js"
import type {
  ColorValue,
  DimensionValue,
  TokenValue,
} from "./types.js"

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v)
}

function isColor(v: unknown): v is ColorValue {
  return isObject(v) && "colorSpace" in v && Array.isArray(v.components)
}

function isDimension(v: unknown): v is DimensionValue {
  return isObject(v) && typeof v.value === "number" && "unit" in v
}

/** Round to at most `dp` decimals without trailing zeros. */
function round(n: number, dp: number): number {
  const f = 10 ** dp
  return Math.round(n * f) / f
}

function serializeColor(color: ColorValue, format: ResolvedCssOptions["colorFormat"]): string {
  if (format === "hex" && color.hex) return color.hex.toLowerCase()

  if (color.colorSpace === "oklch") {
    const [l = 0, c = 0, h = 0] = color.components
    const base = `oklch(${round(l, 4)} ${round(c, 4)} ${round(h, 3)})`
    if (color.alpha !== undefined && color.alpha < 1) {
      return `oklch(${round(l, 4)} ${round(c, 4)} ${round(h, 3)} / ${round(color.alpha, 4)})`
    }
    return base
  }

  // Unknown color space: prefer hex fallback, else CSS color() function.
  if (color.hex) return color.hex.toLowerCase()
  return `color(${color.colorSpace} ${color.components.map((n) => round(n, 4)).join(" ")})`
}

function serializeDimension(dim: DimensionValue, unit: ResolvedCssOptions["dimensionUnit"]): string {
  if (unit === "rem" && dim.unit === "px") {
    return `${round(dim.value / 16, 4)}rem`
  }
  return `${dim.value}${dim.unit}`
}

/** Quote a font-family name if it contains whitespace and isn't already quoted. */
function quoteFamily(name: string): string {
  const trimmed = name.trim()
  if (/^['"].*['"]$/.test(trimmed)) return trimmed
  return /\s/.test(trimmed) ? `"${trimmed}"` : trimmed
}

/** Serialize a resolved token value to a CSS declaration value. */
export function serializeValue(value: TokenValue, options: ResolvedCssOptions): string {
  if (isColor(value)) return serializeColor(value, options.colorFormat)
  if (isDimension(value)) return serializeDimension(value, options.dimensionUnit)

  // fontFamily as an array of names.
  if (Array.isArray(value)) {
    return value.map((v) => quoteFamily(String(v))).join(", ")
  }

  if (typeof value === "number") return String(value)

  // Strings: could be a single font-family name or an already-formatted value.
  // Quote multi-word family names; leave comma-lists and plain values untouched.
  const str = String(value)
  if (/\s/.test(str) && !str.includes(",") && !/[()]/.test(str)) {
    return quoteFamily(str)
  }
  return str
}
