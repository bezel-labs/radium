import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@radium/ui/components/button"
import { Input } from "@radium/ui/components/input"
import { Label } from "@radium/ui/components/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@radium/ui/components/sheet"

const meta = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof Sheet>

export default meta
type Story = StoryObj<typeof meta>

function SheetExample({ side }: { side: "top" | "right" | "bottom" | "left" }) {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline">Open {side}</Button>} />
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 px-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Radium" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="@radium" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export const Right: Story = { render: () => <SheetExample side="right" /> }
export const Left: Story = { render: () => <SheetExample side="left" /> }
export const Top: Story = { render: () => <SheetExample side="top" /> }
export const Bottom: Story = { render: () => <SheetExample side="bottom" /> }
