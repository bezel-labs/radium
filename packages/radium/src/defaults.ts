/**
 * Pure default constants shared by the isomorphic core and the Node layer.
 * Kept free of `node:*` imports so the browser/edge entry can use them.
 */

/** Default context → selector mapping. The first key is the base context. */
export const DEFAULT_CONTEXTS: Record<string, string> = {
  $root: ":root",
  dark: ".dark",
  light: ".light",
}

export const DEFAULT_INPUT = "design-tokens.json"
export const DEFAULT_VARIABLES_OUTPUT = "variables.css"
export const DEFAULT_NAME_EXTENSION = "com.tokendesigner.app"
