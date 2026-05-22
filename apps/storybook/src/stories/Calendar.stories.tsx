import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import { Calendar } from "@radium/ui/components/calendar"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border"
      />
    )
  },
}
