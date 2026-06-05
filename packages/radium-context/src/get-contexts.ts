import { DEFAULT_CONTEXT, type Context, type ContextOptions } from "./types.js"

/** Matches a selector that is exactly one top-level class, e.g. `.dark` (not `.dark .x`, `:is(...)`). */
const SINGLE_CLASS_RE = /^\.([a-zA-Z][a-zA-Z0-9_-]*)$/

const CUSTOM_PROP_RE = /(--[\w-]+)\s*:/g

/**
 * Collect every `--custom-property` name declared by a style rule.
 *
 * Parses `cssText` rather than enumerating the declaration, because custom-property
 * indexing/`item()` is inconsistent across CSSOM implementations (e.g. jsdom).
 */
function customPropsOf(style: CSSStyleDeclaration): string[] {
  const props: string[] = []
  for (const match of style.cssText.matchAll(CUSTOM_PROP_RE)) {
    props.push(match[1]!)
  }
  return props
}

/** Iterate all style rules across same-origin stylesheets, skipping sheets that throw on access. */
function* eachStyleRule(): Generator<CSSStyleRule> {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      // Cross-origin stylesheet — cssRules access throws SecurityError. Skip it.
      continue
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) yield rule
    }
  }
}

/**
 * Discover the available contexts (theme scopes) by inspecting the loaded CSS.
 *
 * It finds the custom properties declared under `:root`, then treats any rule whose
 * selector is a **single top-level class** (e.g. `.dark`) that re-declares at least one
 * of those properties as a context. The `:root` base maps to `"default"` and comes first.
 *
 * Tailwind `dark:` variant rules (`:is(.dark *)`, `.dark .x`) and utility rules (which set
 * normal CSS properties, not the theme custom properties) are ignored by construction.
 *
 * Pass `options.contexts` to bypass scanning entirely (SSR / cross-origin / tests).
 */
export function getContexts(options: ContextOptions = {}): Context[] {
  if (options.contexts) return [...options.contexts]
  if (typeof document === "undefined") return [DEFAULT_CONTEXT]

  // 1. Gather the theme custom-property names from :root.
  const rootProps = new Set<string>()
  for (const rule of eachStyleRule()) {
    if (rule.selectorText === ":root") {
      for (const prop of customPropsOf(rule.style)) rootProps.add(prop)
    }
  }

  // 2. Any single-class rule that sets ≥1 of those props is a context scope.
  const found: Context[] = []
  const seen = new Set<Context>()
  for (const rule of eachStyleRule()) {
    const match = SINGLE_CLASS_RE.exec(rule.selectorText)
    if (!match) continue
    const name = match[1]!
    if (seen.has(name)) continue
    if (customPropsOf(rule.style).some((p) => rootProps.has(p))) {
      seen.add(name)
      found.push(name)
    }
  }

  // 3. Base context first, then discovered scopes in document order (deduped).
  return [DEFAULT_CONTEXT, ...found.filter((c) => c !== DEFAULT_CONTEXT)]
}
