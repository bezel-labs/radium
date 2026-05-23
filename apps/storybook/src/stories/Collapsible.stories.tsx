import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@radium/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radium/ui/components/collapsible"

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
        <span className="text-sm font-medium">@radium starred 3 repos</span>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon-sm" aria-label="Toggle">
              <ChevronsUpDownIcon />
            </Button>
          }
        />
      </div>
      <CollapsibleContent className="space-y-1.5">
        <div className="rounded-lg border px-3 py-2 text-sm">
          @radium/storybook
        </div>
        <div className="rounded-lg border px-3 py-2 text-sm">@radium/ui</div>
        <div className="rounded-lg border px-3 py-2 text-sm">@radium/dashboard</div>
      </CollapsibleContent>
    </Collapsible>
  ),
}
