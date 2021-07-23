import { Code, CodeProps } from "./Code"

export const Default = ({ isInline, prefix, children }: CodeProps) => {
  if (isInline) {
    return <Code isInline={true}>{children}</Code>
  }
  return (
    <Code isInline={false} prefix={prefix}>
      {children}
    </Code>
  )
}

Default.storyName = "[Controlled]"
export default {
  title: "Lens/Code",
  component: Code,
  argTypes: {
    isInline: {
      defaultValue: false,
    },
    prefix: {
      control: {
        type: "text",
      },
      defaultValue: "$",
    },
    children: {
      control: {
        type: "text",
      },
      defaultValue: "git clone",
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
}

export const Standard = () => <Code prefix="$">git clone</Code>

export const Inline = () => (
  <p>
    Create a <Code isInline>.env</Code> file with the following
  </p>
)
