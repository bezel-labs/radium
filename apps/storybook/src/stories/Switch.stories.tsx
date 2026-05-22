import type { Meta, StoryObj } from "@storybook/react-vite"

import { Switch } from "@radium/ui/components/switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "radio", options: ["sm", "default"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Small: Story = {
  args: { size: "sm" },
}
