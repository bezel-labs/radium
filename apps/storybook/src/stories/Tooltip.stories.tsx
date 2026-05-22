import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon } from "lucide-react"

import { Button } from "@radium/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radium/ui/components/tooltip"

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="ghost" size="icon-sm" aria-label="More info">
            <InfoIcon />
          </Button>
        }
      />
      <TooltipContent>This setting controls dark mode.</TooltipContent>
    </Tooltip>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover for details</Button>} />
      <TooltipContent>
        Tooltips can wrap long text and remain readable. They use a tight
        max-width so they don't stretch across the viewport.
      </TooltipContent>
    </Tooltip>
  ),
}
