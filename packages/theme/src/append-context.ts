const THEME_PARAM = "theme"
const MIN_LENGTH = 1
const MAX_LENGTH = 20
const ALPHA_NUMERIC_WITH_SPACE = /^[A-Za-z0-9]+(?:[ ][A-Za-z0-9]+)*$/

function sanitize(input: string): string {
  return input
    .replace(/[\n\r\t]/g, " ")
    .replace(/[<>\\/]/g, "")
    .trim()
    .replace(/\s+/g, " ")
}

export function appendContext(
  search: string = window.location.search
): string | null {
  const raw = new URLSearchParams(search).get(THEME_PARAM)
  if (raw === null) {
    return null
  }

  const value = sanitize(raw)
  if (
    value.length < MIN_LENGTH ||
    value.length > MAX_LENGTH ||
    !ALPHA_NUMERIC_WITH_SPACE.test(value)
  ) {
    return null
  }

  document.documentElement.classList.add(...value.split(" "))
  return value
}
