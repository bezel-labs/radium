import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "@radium/ui/globals.css"
import { appendContext } from "@radium/theme"
import { App } from "./App.tsx"

appendContext()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
