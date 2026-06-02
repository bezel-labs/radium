import type { Preview } from "@storybook/react-vite"

import { Toaster } from "@radium/ui/components/sonner"
import { TooltipProvider } from "@radium/ui/components/tooltip"
import { CONTEXTS } from "@radium/ui/styles/contexts"
import { resolveInitialContext } from "radium-context"

import "@radium/ui/globals.css"

import "./preview.css"

const CURRENT_CONTEXT = resolveInitialContext({ contexts: [...CONTEXTS] })

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
