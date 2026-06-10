import type { Preview } from "@storybook/react-vite"

import { Toaster } from "@radium/ui/components/sonner"
import { TooltipProvider } from "@radium/ui/components/tooltip"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { FONTS } from "@radium/ui/styles/fonts"
import { listenForContextMessages, resolveInitialContext } from "radium-context"
import { loadFonts } from "radium-fonts"
import { addons } from "storybook/preview-api"
import { UPDATE_GLOBALS } from "storybook/internal/core-events"

import "@radium/ui/globals.css"

import "./preview.css"

loadFonts([...FONTS])

const CURRENT_CONTEXT = resolveInitialContext({ contexts: [...CONTEXTS] })

// Let a host (e.g. the Gundam editor embedding this Storybook in an iframe) drive the
// active context live. We update Storybook's `context` global rather than the <html> class
// so the decorator below stays the single source of truth and isn't clobbered on re-render.
listenForContextMessages({
  contexts: [...CONTEXTS],
  onSet: (context) => addons.getChannel().emit(UPDATE_GLOBALS, { globals: { context } }),
})

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
      toolbar: {
        icon: "paintbrush",
        items: CONTEXTS.map((value) => ({ value, title: value })),
        dynamicTitle: true,
      },
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
