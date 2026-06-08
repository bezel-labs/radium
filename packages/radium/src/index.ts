import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"
import { resolveOptions } from "./config.js"
import { emitCss } from "./emit.js"
import { formatContextsModule, getContexts } from "./contexts.js"
import { formatFontsModule, getFonts } from "./fonts.js"
import type { DtcgNode, RadiumOptions } from "./types.js"

export type {
  RadiumOptions,
  ResolvedOptions,
  DtcgNode,
  FlatToken,
  TokenValue,
  ColorValue,
  DimensionValue,
} from "./types.js"
export { DEFAULT_CONTEXTS } from "./config.js"
export { emitCss } from "./emit.js"
export { getContexts, formatContextsModule, DEFAULT_CONTEXT_NAME } from "./contexts.js"
export { getFonts, formatFontsModule } from "./fonts.js"
export type { FontDef } from "./fonts.js"

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
  }

  return css
}
