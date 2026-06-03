import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@radium/ui/globals.css"
import { applyStoredContext } from "radium-context"
import { loadFonts } from "radium-fonts"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { FONTS } from "@radium/ui/styles/fonts"
import { App } from "./App.tsx"

loadFonts([...FONTS])
applyStoredContext({ contexts: [...CONTEXTS] })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
