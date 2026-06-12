/**
 * radium — `.gitignore` managed-block merging.
 *
 * Pure string transforms (no `node:fs`): given the existing `.gitignore` contents
 * and the list of generated outputs to ignore, produce the new contents. Radium's
 * entries live inside a marked block so repeated runs rewrite just that span —
 * renamed/removed outputs drop out automatically and entries never duplicate, while
 * the user's own rules outside the markers are preserved.
 */

/** Opening marker for the Radium-managed block. */
export const START = "# radium:start (generated — do not edit)"
/** Closing marker for the Radium-managed block. */
export const END = "# radium:end"

/**
 * Merge Radium's managed block into existing `.gitignore` contents.
 *
 * - Empty `existing` → just the block.
 * - An existing block (delimited by {@link START}…{@link END}) → replaced in place,
 *   preserving everything before and after.
 * - No block → appended after the existing content, separated by a blank line.
 *
 * The result always ends with a single trailing newline.
 */
export function mergeGitignore(existing: string, entries: string[]): string {
  const block = [START, ...entries, END].join("\n")

  if (existing.trim() === "") return `${block}\n`

  const start = existing.indexOf(START)
  if (start !== -1) {
    const endMarker = existing.indexOf(END, start)
    if (endMarker !== -1) {
      const before = existing.slice(0, start).replace(/\n+$/, "")
      const after = existing.slice(endMarker + END.length).replace(/^\n+/, "")
      const head = before === "" ? "" : `${before}\n\n`
      const tail = after === "" ? "" : `\n\n${after.replace(/\n+$/, "")}`
      return `${head}${block}${tail}\n`
    }
  }

  return `${existing.replace(/\n+$/, "")}\n\n${block}\n`
}
