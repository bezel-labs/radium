import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@radium/ui/components/field"
import { Input } from "@radium/ui/components/input"

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Vertical: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="radiumdev" />
      <FieldDescription>Letters, numbers, and dashes only.</FieldDescription>
    </Field>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-96">
      <FieldLabel htmlFor="email-h">Email</FieldLabel>
      <Input id="email-h" type="email" placeholder="you@example.com" />
    </Field>
  ),
}

export const WithError: Story = {
  render: () => (
    <Field className="w-72" data-invalid>
      <FieldLabel htmlFor="email-e">Email</FieldLabel>
      <Input id="email-e" type="email" aria-invalid defaultValue="not-an-email" />
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  ),
}

export const Group: Story = {
  render: () => (
    <FieldGroup className="w-72">
      <Field>
        <FieldLabel htmlFor="first">First name</FieldLabel>
        <Input id="first" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last">Last name</FieldLabel>
        <Input id="last" />
        <FieldContent>
          <FieldDescription>As it appears on your ID.</FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
}
