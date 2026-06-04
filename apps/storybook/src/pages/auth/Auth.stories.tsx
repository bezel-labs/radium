import type { Meta, StoryObj } from "@storybook/react-vite"

import { AuthPage } from "./AuthPage"

const meta = {
  title: "Pages/Auth",
  component: AuthPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AuthPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
