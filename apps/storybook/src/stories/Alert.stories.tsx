import type { Meta, StoryObj } from "@storybook/react-vite"
import { InfoIcon, OctagonXIcon } from "lucide-react"

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@radium/ui/components/alert"
import { Button } from "@radium/ui/components/button"

const meta = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "radio", options: ["default", "destructive"] },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-96">
      <InfoIcon />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <OctagonXIcon />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>
        Your session has expired. Please sign in again to continue.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <InfoIcon />
      <AlertTitle>New update available</AlertTitle>
      <AlertDescription>
        Version 1.2 includes new components and bug fixes.
      </AlertDescription>
      <AlertAction>
        <Button size="xs" variant="outline">
          Update
        </Button>
      </AlertAction>
    </Alert>
  ),
}
