import { InlineCode } from "./InlineCode"

export const Default = ({ value }) => {
  return <InlineCode value={value} />
}

Default.storyName = "[Controlled]"
export default {
  title: "Lens/InlineCode",
  component: InlineCode,
  argTypes: {
    value: {
      control: {
        type: "text",
      },
      defaultValue: ".env",
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export const Standard = () => {
  return (
    <p>
      Create a <InlineCode value=".env" /> file.
    </p>
  )
}
