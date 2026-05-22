import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@radium/ui/components/tabs"

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Manage your account settings and preferences.
      </TabsContent>
      <TabsContent value="password">
        Change your password and security options.
      </TabsContent>
      <TabsContent value="billing">View invoices and payment methods.</TabsContent>
    </Tabs>
  ),
}

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Project overview goes here.</TabsContent>
      <TabsContent value="activity">Recent activity goes here.</TabsContent>
      <TabsContent value="settings">Settings go here.</TabsContent>
    </Tabs>
  ),
}
