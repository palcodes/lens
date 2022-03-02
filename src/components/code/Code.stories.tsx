import { Code, CodeProps } from "./Code"

export const Default = ({
  value,
  prefix,
  isSecret,
  secretText,
  canReveal,
}: CodeProps) => {
  if (!isSecret) {
    return (
      <div style={{ width: "580px" }}>
        <Code prefix={prefix} value={value} />
      </div>
    )
  } else {
    return (
      <div style={{ width: "580px" }}>
        <Code
          prefix={prefix}
          value={value}
          isSecret={true}
          secretText={secretText}
          canReveal={canReveal}
        />
      </div>
    )
  }
}

Default.storyName = "[Controlled]"
export default {
  title: "Lens/Code",
  component: Code,
  argTypes: {
    prefix: {
      control: {
        type: "text",
      },
      defaultValue: "$",
    },
    value: {
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
    isSecret: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
    secretText: {
      control: {
        type: "text",
      },
      defaultValue: "secret******",
    },
    canReveal: {
      control: {
        type: "boolean",
      },
      defaultValue: false,
    },
  },
}

export const Standard = () => <Code value="git clone" />

export const WithPrefix = () => <Code prefix="$" value="git clone" />

export const WithLongValue = () => (
  <div style={{ width: "580px" }}>
    <Code
      prefix="$"
      value={`postgresql://host1:123,host2:456/somedb?target_session_attrs=any&application_name=myapp`}
    />
  </div>
)

export const SecretWithReveal = () => (
  <Code prefix="$" value="secret git clone" isSecret canReveal />
)

export const SecretWithoutReveal = () => (
  <Code prefix="$" value="secret git clone" isSecret />
)

export const StandardWithinForm = () => {
  const handleSubmit = () => {
    console.log("I was submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Code prefix="$" value="secret git clone" isSecret canReveal />
    </form>
  )
}
