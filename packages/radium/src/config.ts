import { isAbsolute, resolve } from "node:path"
import type { RadiumOptions, ResolvedOptions } from "./types.js"

/** Default context → selector mapping. The first key is the base context. */
export const DEFAULT_CONTEXTS: Record<string, string> = {
  $root: ":root",
  dark: ".dark",
  light: ".light",
}

export const DEFAULT_INPUT = "design-tokens.json"
export const DEFAULT_OUTPUT = "variables.css"
export const DEFAULT_NAME_EXTENSION = "com.tokendesigner.app"

/** Apply defaults and resolve input/output paths against `cwd`. */
export function resolveOptions(options: RadiumOptions = {}): ResolvedOptions {
  const cwd = options.cwd ?? process.cwd()
  const toAbs = (p: string) => (isAbsolute(p) ? p : resolve(cwd, p))

  const contexts = options.contexts ?? DEFAULT_CONTEXTS
  if (Object.keys(contexts).length === 0) {
    throw new Error("radium: `contexts` must define at least one context.")
  }

  return {
    inputPath: toAbs(options.input ?? DEFAULT_INPUT),
    outputPath: toAbs(options.output ?? DEFAULT_OUTPUT),
    contexts,
    colorFormat: options.colorFormat ?? "oklch",
    dimensionUnit: options.dimensionUnit ?? "preserve",
    nameExtension: options.nameExtension ?? DEFAULT_NAME_EXTENSION,
    contextsOutput: options.contextsOutput ? toAbs(options.contextsOutput) : null,
    write: options.write ?? true,
  }
}
