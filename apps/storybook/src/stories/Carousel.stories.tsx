import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@radium/ui/components/carousel"

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <Carousel className="w-80">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem key={i}>
            <div className="flex aspect-square items-center justify-center rounded-lg border text-4xl font-medium">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const MultipleSlides: Story = {
  render: () => (
    <Carousel className="w-96" opts={{ slidesToScroll: 1 }}>
      <CarouselContent className="-ml-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <CarouselItem key={i} className="basis-1/3 pl-2">
            <div className="flex aspect-square items-center justify-center rounded-lg border text-2xl font-medium">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
