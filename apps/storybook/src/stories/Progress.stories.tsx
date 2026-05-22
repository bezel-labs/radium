import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@radium/ui/components/progress"

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: 50, className: "w-64" },
}

export const Empty: Story = {
  args: { value: 0, className: "w-64" },
}

export const Full: Story = {
  args: { value: 100, className: "w-64" },
}

export const Indeterminate: Story = {
  args: { value: null, className: "w-64" },
}

export const WithLabel: Story = {
  render: () => (
    <Progress value={66} className="w-64">
      <ProgressLabel>Uploading</ProgressLabel>
      <ProgressValue />
    </Progress>
  ),
}
