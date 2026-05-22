import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRightIcon, SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@radium/ui/components/input-group"

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithLeadingIcon: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search components..." />
    </InputGroup>
  ),
}

export const WithTrailingButton: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupInput placeholder="Email address" type="email" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton size="icon-xs" aria-label="Submit">
          <ArrowRightIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}

export const WithPrefix: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
}

export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-72">
      <InputGroupTextarea placeholder="Leave a comment..." />
      <InputGroupAddon align="block-end">
        <InputGroupText>Markdown supported</InputGroupText>
        <InputGroupButton size="xs" className="ml-auto">
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
}
