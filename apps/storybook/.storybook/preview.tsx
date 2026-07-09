import type { Preview } from "@storybook/react-vite"

import { Toaster } from "@radium/ui/components/sonner"
import { TooltipProvider } from "@radium/ui/components/tooltip"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { FONTS } from "@radium/ui/styles/fonts"
import { loadFonts, resolveInitialContext } from "@keypuncherlabs/storybook-utils"
import { startLivePreviewReceiver } from "@keypuncherlabs/live-preview"

import "@radium/ui/globals.css"

import "./preview.css"

loadFonts([...FONTS])

// Listen for live CSS pushed by a host app. The manager relays the message from
// the parent into this preview iframe (see manager.ts), so it always arrives
// same-origin — the receiver only trusts this document's own origin and injects
// the validated CSS into a single <style> in <head>, cascading over component
// styles. Started once at module load, alongside loadFonts above.
startLivePreviewReceiver({
  allowedOrigins: [window.location.origin],
  styleId: "live-preview-styles",
})

const CURRENT_CONTEXT = resolveInitialContext({ contexts: [...CONTEXTS] })

// A host app drives the active context live via the manager (see manager.ts) —
// it updates the `context` global, which propagates here and re-runs the
// decorator below. The decorator stays the single source of truth.

function applyThemeClass(wrapperClass: string) {
  document.documentElement.classList.remove(...CONTEXTS)
  document.documentElement.classList.add(wrapperClass)
  document.body.classList.remove(...CONTEXTS)
  document.body.classList.add(wrapperClass)
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    context: CURRENT_CONTEXT,
  },
  globalTypes: {
    context: {
      name: "Context",
      description: "Theme context applied to the story wrapper",
    },
  },
  decorators: [
    (Story, context) => {
      const wrapperClass = (context.globals.context as string) ?? CURRENT_CONTEXT
      applyThemeClass(wrapperClass)

      return (
        <TooltipProvider>
          <div className={`storybook-theme-wrapper ${wrapperClass}`}>
            <Story />
            <Toaster />
          </div>
        </TooltipProvider>
      )
    },
  ],
}

export default preview
