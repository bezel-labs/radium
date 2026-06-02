import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@radium/ui/globals.css"
import { applyStoredContext } from "radium-context"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { App } from "./App.tsx"

applyStoredContext({ contexts: [...CONTEXTS] })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
