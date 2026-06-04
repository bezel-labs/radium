import type { Meta, StoryObj } from "@storybook/react-vite"

import { MarketingPage } from "./MarketingPage"

const meta = {
  title: "Pages/Marketing",
  component: MarketingPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MarketingPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
