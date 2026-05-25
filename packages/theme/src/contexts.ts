export const CONTEXTS = ["default", "light", "dark"] as const

export type Context = (typeof CONTEXTS)[number]

export const CURRENT_CONTEXT: Context = "default"
