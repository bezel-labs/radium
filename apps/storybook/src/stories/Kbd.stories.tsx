import type { Meta, StoryObj } from "@storybook/react-vite"

import { Kbd, KbdGroup } from "@radium/ui/components/kbd"

const meta = {
  title: "Components/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: "K" },
}

export const Combination: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <span className="text-muted-foreground">+</span>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}
