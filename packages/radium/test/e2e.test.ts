import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { describe, expect, it } from "vitest"
import { generateVariablesCss } from "../src/index.js"

const here = dirname(fileURLToPath(import.meta.url))
const input = join(here, "fixtures", "tokens.json")

describe("generateVariablesCss (e2e)", () => {
  it("produces scoped CSS with override-only contexts", async () => {
    const css = await generateVariablesCss({ input, write: false })

    // :root has the full set, with references resolved to literal values.
    expect(css).toContain(":root {")
    expect(css).toContain("--primary: oklch(0.8 0.18 151.7);") // resolved {base.color.green.500}
    expect(css).toContain("--font-sans: \"Geist Variable\", sans-serif;")

    // 1-to-many exportName fan-out.
    expect(css).toContain("--foreground: oklch(0.31 0.082 298.1);")
    expect(css).toContain("--card-foreground: oklch(0.31 0.082 298.1);")
    expect(css).toContain("--popover-foreground: oklch(0.31 0.082 298.1);")

    // Empty exportName ([""]) is skipped; base ramps (no exportName) are reference-only.
    expect(css).not.toContain("--md:")
    expect(css).not.toContain("--green-500")
    expect(css).not.toContain("--color-green-500")

    // .dark overrides only what differs: primary flips (aqua), foreground changes.
    expect(css).toContain(".dark {")
    expect(css).toContain("--primary: oklch(0.75 0.12 200);")
    expect(css).toMatch(/\.dark \{[^}]*--foreground: oklch\(0\.93 0\.003 173\.9\);/s)
    // Context-aware references: primary-foreground is $root-only but references
    // neutral.foreground, which HAS a dark variant — so it correctly changes in .dark.
    expect(css).toMatch(/\.dark \{[^}]*--primary-foreground: oklch\(0\.93 0\.003 173\.9\);/s)

    // .light overrides only neutral.foreground.
    expect(css).toContain(".light {")
    expect(css).toMatch(/\.light \{[^}]*--foreground: oklch\(0\.36 0\.044 186\.5\);/s)
  })
})
