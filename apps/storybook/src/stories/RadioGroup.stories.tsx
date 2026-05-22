import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@radium/ui/components/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@radium/ui/components/radio-group"

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="w-64">
      <Label className="gap-2">
        <RadioGroupItem value="default" />
        Default
      </Label>
      <Label className="gap-2">
        <RadioGroupItem value="comfortable" />
        Comfortable
      </Label>
      <Label className="gap-2">
        <RadioGroupItem value="compact" />
        Compact
      </Label>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="b" disabled className="w-64">
      <Label className="gap-2">
        <RadioGroupItem value="a" />
        Option A
      </Label>
      <Label className="gap-2">
        <RadioGroupItem value="b" />
        Option B
      </Label>
    </RadioGroup>
  ),
}
