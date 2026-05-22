import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@radium/ui/components/input"
import { Label } from "@radium/ui/components/label"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
