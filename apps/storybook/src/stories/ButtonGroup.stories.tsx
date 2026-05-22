import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChevronDownIcon, CopyIcon } from "lucide-react"

import { Button } from "@radium/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@radium/ui/components/button-group"

const meta = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
}

export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <CopyIcon />
        Copy
      </Button>
      <ButtonGroupSeparator />
      <ButtonGroupText>https://radium.dev</ButtonGroupText>
    </ButtonGroup>
  ),
}

export const Split: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Deploy</Button>
      <Button size="icon">
        <ChevronDownIcon />
      </Button>
    </ButtonGroup>
  ),
}
