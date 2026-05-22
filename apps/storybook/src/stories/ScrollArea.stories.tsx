import type { Meta, StoryObj } from "@storybook/react-vite"

import { ScrollArea } from "@radium/ui/components/scroll-area"
import { Separator } from "@radium/ui/components/separator"

const meta = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ScrollArea>

export default meta
type Story = StoryObj<typeof meta>

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.${a.length - i}.0`
)

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-60 w-48 rounded-lg border">
      <div className="p-3">
        <h4 className="mb-3 text-sm font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-80 rounded-lg border whitespace-nowrap">
      <div className="flex gap-2 p-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex size-24 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
