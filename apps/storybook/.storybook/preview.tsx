import type { Preview } from "@storybook/react-vite"

import { Toaster } from "@radium/ui/components/sonner"
import { TooltipProvider } from "@radium/ui/components/tooltip"
import { CONTEXTS } from "@radium/ui/constants/contexts"

import "@radium/ui/globals.css"

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
  globalTypes: {
    context: {
      name: "Context",
      description: "Theme context applied to the story wrapper",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: CONTEXTS.map((value) => ({ value, title: value })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const wrapperClass = (context.globals.context as string) ?? "default"
      return (
        <TooltipProvider>
          <div className={wrapperClass}>
            <Story />
            <Toaster />
          </div>
        </TooltipProvider>
      )
    },
  ],
}

export default preview
