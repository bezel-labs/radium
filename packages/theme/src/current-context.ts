// Context name allowlist: must start with a letter, only letters/digits/dash/underscore. Both a
// security boundary (this value is used as a CSS class via classList.add and must be a valid
// identifier) and a sanity check against URL tampering. Anything else falls back to "default".
const CONTEXT_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]*$/

const fromUrl =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("context")
    : null

export const CURRENT_CONTEXT =
  fromUrl && CONTEXT_NAME_RE.test(fromUrl) ? fromUrl : "default"
