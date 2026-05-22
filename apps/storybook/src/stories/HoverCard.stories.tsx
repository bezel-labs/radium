import type { Meta, StoryObj } from "@storybook/react-vite"
import { CalendarIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@radium/ui/components/avatar"
import { Button } from "@radium/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radium/ui/components/hover-card"

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger render={<Button variant="link">@radium</Button>} />
      <HoverCardContent>
        <div className="flex justify-between gap-3">
          <Avatar size="lg">
            <AvatarImage
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&q=80"
              alt="Radium"
            />
            <AvatarFallback>RX</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-medium">@radium</h4>
            <p className="text-sm text-muted-foreground">
              Headless components built on Base UI.
            </p>
            <div className="flex items-center gap-1 pt-2 text-xs text-muted-foreground">
              <CalendarIcon className="size-3" />
              Joined December 2025
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
