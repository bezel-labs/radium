import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@radium/ui/components/native-select"

const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "radio", options: ["sm", "default"] },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <NativeSelect {...args} defaultValue="next">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="remix">Remix</NativeSelectOption>
      <NativeSelectOption value="astro">Astro</NativeSelectOption>
    </NativeSelect>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <NativeSelect defaultValue="next">
      <NativeSelectOptGroup label="React">
        <NativeSelectOption value="next">Next.js</NativeSelectOption>
        <NativeSelectOption value="remix">Remix</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Other">
        <NativeSelectOption value="astro">Astro</NativeSelectOption>
        <NativeSelectOption value="svelte">SvelteKit</NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  ),
}

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <NativeSelect {...args} defaultValue="next">
      <NativeSelectOption value="next">Next.js</NativeSelectOption>
      <NativeSelectOption value="remix">Remix</NativeSelectOption>
    </NativeSelect>
  ),
}
