import { describe, expect, it } from "vitest"
import { END, START, mergeGitignore } from "../src/gitignore.js"

const ENTRIES = ["/packages/ui/src/styles/variables.css", "/packages/ui/src/styles/fonts.ts"]
const BLOCK = `${START}\n${ENTRIES.join("\n")}\n${END}`

describe("mergeGitignore", () => {
  it("returns just the block for empty input", () => {
    expect(mergeGitignore("", ENTRIES)).toBe(`${BLOCK}\n`)
    expect(mergeGitignore("\n\n", ENTRIES)).toBe(`${BLOCK}\n`)
  })

  it("appends the block after existing rules", () => {
    expect(mergeGitignore("node_modules\ndist\n", ENTRIES)).toBe(
      `node_modules\ndist\n\n${BLOCK}\n`,
    )
  })

  it("replaces an existing block in place, preserving surrounding rules", () => {
    const existing = `node_modules\n\n${START}\n/old/path.css\n${END}\n\n# my own rule\n*.log\n`
    expect(mergeGitignore(existing, ENTRIES)).toBe(
      `node_modules\n\n${BLOCK}\n\n# my own rule\n*.log\n`,
    )
  })

  it("is idempotent — re-merging its own output is a no-op", () => {
    const once = mergeGitignore("node_modules\n", ENTRIES)
    expect(mergeGitignore(once, ENTRIES)).toBe(once)
  })

  it("drops stale entries when the output set changes", () => {
    const once = mergeGitignore("", ["/a.css", "/b.ts"])
    const next = mergeGitignore(once, ["/a.css"])
    expect(next).toContain("/a.css")
    expect(next).not.toContain("/b.ts")
  })
})
