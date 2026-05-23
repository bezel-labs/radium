import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@radium/ui/components/resizable"

const panelClassName =
  "flex h-full items-center justify-center bg-muted/35 text-sm font-medium text-foreground"

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-80 w-[min(72rem,90vw)] rounded-lg border"
    >
      <ResizablePanel defaultSize="50%">
        <div className={panelClassName}>One</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <div className={panelClassName}>Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="vertical"
      className="h-[32rem] w-[min(72rem,90vw)] rounded-lg border"
    >
      <ResizablePanel defaultSize="50%">
        <div className={panelClassName}>Top</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <div className={panelClassName}>Bottom</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-80 w-[min(72rem,90vw)] rounded-lg border"
    >
      <ResizablePanel defaultSize="30%">
        <div className={panelClassName}>Sidebar</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <div className={panelClassName}>Content</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
