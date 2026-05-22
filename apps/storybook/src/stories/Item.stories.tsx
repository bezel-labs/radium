import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileTextIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@radium/ui/components/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@radium/ui/components/item"

const meta = {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item className="w-96" variant="outline">
      <ItemContent>
        <ItemTitle>Untitled file</ItemTitle>
        <ItemDescription>Last edited just now</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="ghost">
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const WithMedia: Story = {
  render: () => (
    <Item className="w-96" variant="outline">
      <ItemMedia variant="icon">
        <FileTextIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>readme.md</ItemTitle>
        <ItemDescription>12 KB · Markdown document</ItemDescription>
      </ItemContent>
    </Item>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>readme.md</ItemTitle>
          <ItemDescription>12 KB</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemMedia variant="icon">
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>package.json</ItemTitle>
          <ItemDescription>4 KB</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
