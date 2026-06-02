#!/usr/bin/env node
import { readFile } from "node:fs/promises"
import { pathToFileURL } from "node:url"
import { parseArgs } from "node:util"
import { resolve } from "node:path"
import { generateVariablesCss } from "./index.js"
import type { RadiumOptions } from "./types.js"

const USAGE = `radium — convert a W3C Design Tokens (DTCG) file into a scoped variables.css

Usage:
  radium build [options]

Options:
  -i, --input <path>            Tokens file (default: design-tokens.json)
  -o, --output <path>           Output CSS file (default: variables.css)
  -c, --config <path>           Config file (.json or .js exporting RadiumOptions)
      --contexts-output <path>  Also write a generated TS module exporting CONTEXTS
      --color <format>          Color output: oklch | hex (default: oklch)
      --unit <mode>             Dimension unit: preserve | rem (default: preserve)
      --stdout                  Print CSS to stdout instead of writing the file
  -h, --help                    Show this help
`

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
      output: { type: "string", short: "o" },
      config: { type: "string", short: "c" },
      "contexts-output": { type: "string" },
      color: { type: "string" },
      unit: { type: "string" },
      stdout: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  })

  if (values.help || positionals[0] === "help") {
    process.stdout.write(USAGE)
    return
  }

  const command = positionals[0] ?? "build"
  if (command !== "build") {
    process.stderr.write(`radium: unknown command "${command}".\n\n${USAGE}`)
    process.exitCode = 1
    return
  }

  const fileConfig = values.config ? await loadConfig(values.config) : {}

  const options: RadiumOptions = { ...fileConfig }
  if (values.input) options.input = values.input
  if (values.output) options.output = values.output
  if (values["contexts-output"]) options.contextsOutput = values["contexts-output"]
  if (values.color) options.colorFormat = values.color as RadiumOptions["colorFormat"]
  if (values.unit) options.dimensionUnit = values.unit as RadiumOptions["dimensionUnit"]
  if (values.stdout) options.write = false

  const css = await generateVariablesCss(options)

  if (values.stdout) {
    process.stdout.write(css)
  } else {
    process.stderr.write(`radium: wrote ${options.output ?? "variables.css"}\n`)
  }
}

main(process.argv.slice(2)).catch((err: unknown) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`)
  process.exitCode = 1
})
