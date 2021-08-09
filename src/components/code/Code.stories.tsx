import { Code, CodeProps } from "./Code"
import { useRef, useEffect } from "react"

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

export const WithLongText = () => {
  return (
    <Code prefix="$">
      git clone git@github.com:prisma/lens.git && yarn install && yarn run
      build:package1 && yarn run build:package2 && yarn run build:package3 &&
      yarn run build:package4
    </Code>
  )
}

export const WithMaskedText = () => {
  function getConnectionString(): string {
    return `postgresql://host1:123,host2:456/somedb?target_session_attrs=any&application_name=myapp`
  }

  return (
    <div style={{ width: "580px" }}>
      <Code prefix="$" getSecret={getConnectionString}>
        ************
      </Code>
    </div>
  )
}
