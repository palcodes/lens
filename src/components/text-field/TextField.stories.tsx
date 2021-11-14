import { chain } from "@react-aria/utils"
import { action } from "@storybook/addon-actions"
import { useState } from "react"
import { TextField } from "./TextField"

export const Default = (props) => <TextField {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/TextField",
  component: TextField,
  argTypes: {
    type: { defaultValue: "text" },
    label: { defaultValue: "Label" },
  },
}

export const WithInitialValue = () => {
  const [value, setValue] = useState("production")

  return (
    <TextField
      label="Environment"
      placeholder="production"
      value={value}
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithPlaceholder = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      label="Environment"
      value={value}
      placeholder="production"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithPrefix = () => {
  const [value, setValue] = useState("lens")

  return (
    <TextField
      label="Handle"
      value={value}
      prefix="cloud.prisma.io/prisma/"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithLeadingIcon = () => {
  return (
    <TextField
      label="Handle"
      leadingIcon="search"
      placeholder="Search for an environment"
      onChange={action("onChange")}
    />
  )
}

export const WithError = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      label="Handle"
      value={value}
      error="This username is already taken"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithAutocompleteOff = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      nativeAutoComplete="off"
      label="Password"
      value={value}
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithAutocompleteEmail = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      nativeAutoComplete="email"
      label="Email"
      value={value}
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithHint = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      label="Handle"
      value={value}
      hint="This should be something you can easily remember"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}

export const WithHintAndError = () => {
  const [value, setValue] = useState("")

  return (
    <TextField
      label="Handle"
      value={value}
      hint="This should be something you can easily remember"
      error="This username is already taken"
      onChange={chain(action("onChange"), setValue)}
    />
  )
}
