import type { Meta, StoryObj } from "@storybook/react-vite"

import { Slider } from "@radium/ui/components/slider"

const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { defaultValue: 50, className: "w-64" },
}

export const Range: Story = {
  args: { defaultValue: [25, 75], className: "w-64" },
}

export const Disabled: Story = {
  args: { defaultValue: 30, disabled: true, className: "w-64" },
}
