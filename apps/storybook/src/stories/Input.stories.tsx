import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@radium/ui/components/input"
import { Label } from "@radium/ui/components/label"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: "w-64" },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "you@example.com",
    type: "email",
    className: "w-64",
  },
}

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
    className: "w-64",
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
