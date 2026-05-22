import type { Meta, StoryObj } from "@storybook/react-vite"

import { Checkbox } from "@radium/ui/components/checkbox"
import { Label } from "@radium/ui/components/label"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Indeterminate: Story = {
  args: { defaultChecked: "indeterminate" },
}

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
}

export const WithLabel: Story = {
  render: () => (
    <Label>
      <Checkbox defaultChecked />I agree to the terms and conditions
    </Label>
  ),
}
