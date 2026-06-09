import { isAbsolute, resolve } from "node:path"
import { DEFAULT_INPUT, DEFAULT_VARIABLES_OUTPUT } from "./defaults.js"
import { resolveCssOptions, type CssOptions } from "./options.js"

export { DEFAULT_CONTEXTS, DEFAULT_INPUT, DEFAULT_VARIABLES_OUTPUT, DEFAULT_NAME_EXTENSION } from "./defaults.js"

/**
 * Options for {@link generateVariablesCss} — the Node, file-oriented surface.
 * Extends the pure {@link CssOptions} with input/output paths. All optional;
 * defaults make the zero-config case work.
 */
export interface RadiumOptions extends CssOptions {
  /** Path to the DTCG tokens file. Default: `"design-tokens.json"` (resolved from `cwd`). */
  input?: string
  /** Path to write the generated CSS. Default: `"variables.css"` (resolved from `cwd`). */
  variablesOutput?: string
  /** Base directory paths are resolved against. Default: `process.cwd()`. */
  cwd?: string
  /**
   * When set, also write a generated TypeScript module exporting `CONTEXTS` (the list of
   * context names derived from the tokens). Path resolved against `cwd`. Default: none.
   */
  contextsOutput?: string
  /**
   * When set, also write a generated TypeScript module exporting `FONTS` (the web fonts
   * derived from the tokens). Path resolved against `cwd`. Default: none.
   */
  fontsOutput?: string
  /** When `false`, return the CSS string without touching the filesystem. Default: `true`. */
  write?: boolean
}

/** Fully-resolved options (no `undefined`), produced by {@link resolveOptions}. */
export interface ResolvedOptions {
  inputPath: string
  variablesOutputPath: string
  contexts: Record<string, string>
  colorFormat: "oklch" | "hex"
  dimensionUnit: "preserve" | "rem"
  nameExtension: string
  contextsOutput: string | null
  fontsOutput: string | null
  write: boolean
}

/** Apply defaults and resolve input/output paths against `cwd`. */
export function resolveOptions(options: RadiumOptions = {}): ResolvedOptions {
  const cwd = options.cwd ?? process.cwd()
  const toAbs = (p: string) => (isAbsolute(p) ? p : resolve(cwd, p))

  const css = resolveCssOptions(options)

  return {
    inputPath: toAbs(options.input ?? DEFAULT_INPUT),
    variablesOutputPath: toAbs(options.variablesOutput ?? DEFAULT_VARIABLES_OUTPUT),
    ...css,
    contextsOutput: options.contextsOutput ? toAbs(options.contextsOutput) : null,
    fontsOutput: options.fontsOutput ? toAbs(options.fontsOutput) : null,
    write: options.write ?? true,
  }
}
