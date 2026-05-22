import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radium/ui/components/navigation-menu"

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <div className="grid gap-2 p-3">
              <NavigationMenuLink href="#">
                <span className="font-medium">Introduction</span>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <span className="font-medium">Installation</span>
              </NavigationMenuLink>
              <NavigationMenuLink href="#">
                <span className="font-medium">Typography</span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent className="w-72">
            <div className="grid gap-2 p-3">
              <NavigationMenuLink href="#">Button</NavigationMenuLink>
              <NavigationMenuLink href="#">Card</NavigationMenuLink>
              <NavigationMenuLink href="#">Dialog</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Docs</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
