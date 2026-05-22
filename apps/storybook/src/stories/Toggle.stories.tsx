import type { Meta, StoryObj } from "@storybook/react-vite"
import { BoldIcon } from "lucide-react"

import { Toggle } from "@radium/ui/components/toggle"

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "radio", options: ["default", "outline"] },
    size: { control: "radio", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
  },
  args: { children: "Toggle" },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Outline: Story = {
  args: { variant: "outline" },
}

export const Small: Story = {
  args: { size: "sm" },
}

export const Large: Story = {
  args: { size: "lg" },
}

export const WithIcon: Story = {
  render: () => (
    <Toggle aria-label="Bold">
      <BoldIcon />
    </Toggle>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}
