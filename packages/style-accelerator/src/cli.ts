#!/usr/bin/env node
import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import { resolve } from "node:path"
import { generateVariablesCss } from "./node.js"
import type { RadiumOptions } from "./config.js"

const USAGE = `style-accelerator — convert a W3C Design Tokens (DTCG) file into a scoped variables.css

Usage:
  style-accelerator build [options]

Options:
  -i, --input <path>            Tokens file (default: design-tokens.json)
  -c, --config <path>           Config file (.json or .js exporting RadiumOptions)
      --variables-output <path> Output CSS file (default: variables.css)
      --contexts-output <path>  Also write a generated TS module exporting CONTEXTS
      --fonts-output <path>     Also write a generated TS module exporting FONTS
      --color <format>          Color output: oklch | hex (default: oklch)
      --unit <mode>             Dimension unit: preserve | rem (default: preserve)
      --stdout                  Print CSS to stdout instead of writing the file
      --no-gitignore            Don't create/update .gitignore for generated files
  -h, --help                    Show this help

A radium.json file in the working directory is loaded automatically when -c is omitted.
`

/** Default config file auto-loaded from the working directory when no -c is given. */
const DEFAULT_CONFIG_FILE = "radium.json"

/** Load options from a `.json` or `.js`/`.mjs` config file. */
async function loadConfig(path: string): Promise<RadiumOptions> {
  const abs = resolve(process.cwd(), path)
  if (/\.json$/.test(abs)) {
    return JSON.parse(await readFile(abs, "utf8")) as RadiumOptions
  }
  const mod = (await import(pathToFileURL(abs).href)) as {
    default?: RadiumOptions
  } & RadiumOptions
  return (mod.default ?? mod) as RadiumOptions
}

async function main(argv: string[]): Promise<void> {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      input: { type: "string", short: "i" },
      config: { type: "string", short: "c" },
      "variables-output": { type: "string" },
      "contexts-output": { type: "string" },
      "fonts-output": { type: "string" },
      color: { type: "string" },
      unit: { type: "string" },
      stdout: { type: "boolean" },
      "no-gitignore": { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  })

  if (values.help || positionals[0] === "help") {
    process.stdout.write(USAGE)
    return
  }

  const command = positionals[0] ?? "build"
  if (command !== "build") {
    process.stderr.write(`style-accelerator: unknown command "${command}".\n\n${USAGE}`)
    process.exitCode = 1
    return
  }

  const configPath =
    values.config ??
    (existsSync(resolve(process.cwd(), DEFAULT_CONFIG_FILE))
      ? DEFAULT_CONFIG_FILE
      : undefined)
  const fileConfig = configPath ? await loadConfig(configPath) : {}

  const options: RadiumOptions = { ...fileConfig }
  if (values.input) options.input = values.input
  if (values["variables-output"]) options.variablesOutput = values["variables-output"]
  if (values["contexts-output"]) options.contextsOutput = values["contexts-output"]
  if (values["fonts-output"]) options.fontsOutput = values["fonts-output"]
  if (values.color) options.colorFormat = values.color as RadiumOptions["colorFormat"]
  if (values.unit) options.dimensionUnit = values.unit as RadiumOptions["dimensionUnit"]
  if (values.stdout) options.write = false
  if (values["no-gitignore"]) options.gitignore = false

  const css = await generateVariablesCss(options)

  if (values.stdout) {
    process.stdout.write(css)
  } else {
    process.stderr.write(`style-accelerator: wrote ${options.variablesOutput ?? "variables.css"}\n`)
  }
}

main(process.argv.slice(2)).catch((err: unknown) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`)
  process.exitCode = 1
})
