import type { Meta, StoryObj } from "@storybook/react-vite"

import { AspectRatio } from "@radium/ui/components/aspect-ratio"

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Widescreen: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio
        ratio={16 / 9}
        className="overflow-hidden rounded-lg bg-muted"
      >
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=1200&q=80"
          alt="Landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio
        ratio={1}
        className="overflow-hidden rounded-lg bg-muted"
      >
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&q=80"
          alt="Landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}
