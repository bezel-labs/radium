import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@radium/ui/globals.css"
import { applyContext } from "@radium/theme"
import { App } from "./App.tsx"

applyContext()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
