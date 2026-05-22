import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@radium/ui/components/combobox"

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt",
  "Remix",
  "Astro",
  "SolidStart",
]

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput
        placeholder="Pick a framework..."
        className="w-64"
        showClear
      />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
