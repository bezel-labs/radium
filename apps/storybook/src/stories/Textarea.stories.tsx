import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@radium/ui/components/label"
import { Textarea } from "@radium/ui/components/textarea"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { className: "w-72" },
}

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Tell us about your project...",
    className: "w-72",
  },
}

export const Disabled: Story = {
  args: { disabled: true, placeholder: "Disabled", className: "w-72" },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here." />
    </div>
  ),
}
