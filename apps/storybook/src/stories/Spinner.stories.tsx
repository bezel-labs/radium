import type { Meta, StoryObj } from "@storybook/react-vite"

import { Spinner } from "@radium/ui/components/spinner"

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Large: Story = {
  args: { className: "size-8" },
}
