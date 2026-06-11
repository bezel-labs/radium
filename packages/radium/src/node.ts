/**
 * radium/node — Node entry.
 *
 * Re-exports the full isomorphic core, plus the filesystem conveniences:
 * read a DTCG tokens file and write the generated `variables.css` (and optional
 * `contexts.ts`/`fonts.ts`) to disk. This module imports `node:*` and is not
 * browser-safe; for the pure transform use `radium`.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, relative, sep } from "node:path"
import { resolveOptions, type RadiumOptions, type ResolvedOptions } from "./config.js"
import { emitCss } from "./emit.js"
import { formatContextsModule, getContexts } from "./contexts.js"
import { formatFontsModule, getFonts } from "./fonts.js"
import { mergeGitignore } from "./gitignore.js"
import type { DtcgNode } from "./types.js"

export * from "./index.js"
export { resolveOptions } from "./config.js"
export type { RadiumOptions, ResolvedOptions } from "./config.js"

/**
 * Generate a scoped `variables.css` from a W3C DTCG tokens file.
 *
 * Reads the tokens file, resolves each configured context (with `$root` fallback
 * and reference resolution), and writes one CSS scope per context — the base
 * context in full, others as override-only blocks. Returns the generated CSS.
 *
 * @example
 * // zero-config: ./design-tokens.json → ./variables.css
 * await generateVariablesCss()
 *
 * @example
 * await generateVariablesCss({
 *   input: "design-tokens.json",
 *   variablesOutput: "packages/ui/src/styles/variables.css",
 * })
 */
export async function generateVariablesCss(options: RadiumOptions = {}): Promise<string> {
  const resolved = resolveOptions(options)

  let raw: string
  try {
    raw = await readFile(resolved.inputPath, "utf8")
  } catch (err) {
    throw new Error(
      `radium: could not read tokens file at "${resolved.inputPath}". ` +
        `Pass \`input\` to point at your DTCG file.\n${(err as Error).message}`,
    )
  }

  let tokens: DtcgNode
  try {
    tokens = JSON.parse(raw) as DtcgNode
  } catch (err) {
    throw new Error(`radium: "${resolved.inputPath}" is not valid JSON.\n${(err as Error).message}`)
  }

  const css = emitCss(tokens, resolved)

  if (resolved.write) {
    await mkdir(dirname(resolved.variablesOutputPath), { recursive: true })
    await writeFile(resolved.variablesOutputPath, css, "utf8")

    if (resolved.contextsOutput) {
      const contextsModule = formatContextsModule(getContexts(tokens))
      await mkdir(dirname(resolved.contextsOutput), { recursive: true })
      await writeFile(resolved.contextsOutput, contextsModule, "utf8")
    }

    if (resolved.fontsOutput) {
      const fontsModule = formatFontsModule(getFonts(tokens))
      await mkdir(dirname(resolved.fontsOutput), { recursive: true })
      await writeFile(resolved.fontsOutput, fontsModule, "utf8")
    }

    if (resolved.gitignore) {
      await updateGitignore(resolved)
    }
  }

  return css
}

/**
 * Create or update the project `.gitignore` so the generated outputs are ignored.
 * Outputs are written as paths relative to the `.gitignore`, anchored with a leading
 * `/`. Outputs outside the `.gitignore`'s directory can't be anchored from it and are
 * skipped with a warning. The file is only rewritten when its contents actually change.
 */
async function updateGitignore(resolved: ResolvedOptions): Promise<void> {
  const dir = dirname(resolved.gitignorePath)
  const outputs = [
    resolved.variablesOutputPath,
    resolved.contextsOutput,
    resolved.fontsOutput,
  ].filter((p): p is string => p !== null)

  const entries: string[] = []
  for (const output of outputs) {
    const rel = relative(dir, output)
    if (rel === "" || rel.startsWith("..")) {
      process.stderr.write(
        `radium: skipping .gitignore entry for "${output}" — outside ${resolved.gitignorePath}\n`,
      )
      continue
    }
    entries.push(`/${rel.split(sep).join("/")}`)
  }

  if (entries.length === 0) return

  let existing = ""
  try {
    existing = await readFile(resolved.gitignorePath, "utf8")
  } catch {
    // No existing .gitignore — create one.
  }

  const next = mergeGitignore(existing, entries)
  if (next !== existing) {
    await mkdir(dir, { recursive: true })
    await writeFile(resolved.gitignorePath, next, "utf8")
  }
}
