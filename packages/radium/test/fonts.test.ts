import { describe, expect, it } from "vitest"
import { formatFontsModule, getFonts } from "../src/fonts.js"
import type { DtcgNode } from "../src/types.js"

const tokens: DtcgNode = {
  base: {
    typography: {
      "font-family": {
        sans: { $root: { $value: "Montserrat" }, $type: "fontFamily" },
        mono: { $root: { $value: "Source Code Pro" }, $type: "fontFamily" },
      },
    },
  },
  semantic: {
    typography: {
      body: {
        sm: {
          "font-family": { $root: { $value: "{base.typography.font-family.sans}" }, $type: "fontFamily" },
          "font-weight": { $root: { $value: 400 }, $type: "fontWeight" },
        },
      },
      heading: {
        h1: {
          "font-family": { $root: { $value: "{base.typography.font-family.sans}" }, $type: "fontFamily" },
          "font-weight": { $root: { $value: 600 }, $type: "fontWeight" },
        },
      },
    },
  },
}

describe("getFonts", () => {
  it("collects families with per-family weights from composites, sorted", () => {
    expect(getFonts(tokens)).toEqual([
      { family: "Montserrat", weights: [400, 600] },
      { family: "Source Code Pro", weights: [400] }, // no composite usage → default 400
    ])
  })

  it("ignores generic family keywords", () => {
    const t: DtcgNode = {
      a: { $root: { $value: ["Geist Variable", "sans-serif"] }, $type: "fontFamily" },
      b: { $root: { $value: "sans-serif" }, $type: "fontFamily" },
    }
    expect(getFonts(t)).toEqual([{ family: "Geist Variable", weights: [400] }])
  })
})

describe("formatFontsModule", () => {
  it("renders a typed FONTS module", () => {
    const out = formatFontsModule([{ family: "Montserrat", weights: [400, 600] }])
    expect(out).toContain('export const FONTS = [')
    expect(out).toContain('{ family: "Montserrat", weights: [400, 600] },')
    expect(out).toContain("export type FontDef")
  })
})
