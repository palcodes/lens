import { action } from "@storybook/addon-actions"
import { Select } from "./Select"
import { Link } from "../link/Link"
import { Form } from "../form/Form"

export const Default = (props) => (
  <Select.Container {...props}>
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Select",
  component: Select,
  argTypes: {
    label: {
      defaultValue: "Database Provider",
    },
  },
}

export const WithStaticData = () => (
  <Select.Container
    label="Database Provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithSectionsAndStaticData = () => (
  <Select.Container
    label="Database Provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Section title="Free">
      <Select.Option key="railway">Railway</Select.Option>
      <Select.Option key="heroku">Heroku Free</Select.Option>
    </Select.Section>
    <Select.Section title="Paid">
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
      <Select.Option key="aws">Amazon Web Services</Select.Option>
    </Select.Section>
  </Select.Container>
)

export const WithIcons = () => (
  <Select.Container
    label="Role"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="admin" leadingIcon="user">
      Admin
    </Select.Option>
    <Select.Option key="developer" leadingIcon="user-check">
      Developer
    </Select.Option>
    <Select.Option key="collaborator" leadingIcon="users">
      Collaborator
    </Select.Option>
    <Select.Option key="viewer" leadingIcon="user">
      Viewer
    </Select.Option>
  </Select.Container>
)

export const WithTrailingIcons = () => (
  <Select.Container
    label="Role"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="prisma" trailingIcon="lock">
      prisma/prisma
    </Select.Option>
    <Select.Option key="studio" trailingIcon="lock">
      prisma/studio
    </Select.Option>
    <Select.Option key="cloud" trailingIcon="lock">
      prisma/cloud
    </Select.Option>
    <Select.Option key="engines" trailingIcon="lock">
      prisma/engines
    </Select.Option>
  </Select.Container>
)

export const WithTrailingIconsMultiline = () => (
  <Select.Container
    label="Role"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="prisma" trailingIcon="lock">
      prisma/thisisareallyreallyreallyreallylongrepositoryname
    </Select.Option>
    <Select.Option key="studio" trailingIcon="lock">
      studio/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname
    </Select.Option>
    <Select.Option key="cloud" trailingIcon="lock">
      cloud/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname-withhyphens
    </Select.Option>
    <Select.Option key="engines" trailingIcon="lock">
      engines/thisisareallylongrepositoryname
    </Select.Option>
    <Select.Option key="examples" trailingIcon="lock">
      examples/thisisareallyreallyreallyreallyreallyreallyreallylongrepositoryname
    </Select.Option>
    <Select.Option key="docs" trailingIcon="lock">
      docs/thisisareallylongrepositoryname
    </Select.Option>
  </Select.Container>
)

export const WithDescriptions = () => (
  <div className="w-96">
    <Form>
      <Select.Container
        label="Role"
        onSelectionChange={action("onSelectionChange")}
      >
        <Select.Option
          key="admin"
          description="Read and write access for the entire platform"
        >
          Admin
        </Select.Option>
        <Select.Option
          key="developer"
          description="Read and write access to the database and read-only access for project settings and schema"
        >
          Developer
        </Select.Option>
        <Select.Option
          key="collaborator"
          description="Read and write access to the database and read-only access for project settings"
        >
          Collaborator
        </Select.Option>
        <Select.Option
          key="viewer"
          description="Read-only access for the entire platform"
        >
          Viewer
        </Select.Option>
      </Select.Container>
    </Form>
  </div>
)

export const WithIconAndDescriptions = () => (
  <div className="w-96">
    <Form>
      <Select.Container
        label="Role"
        onSelectionChange={action("onSelectionChange")}
      >
        <Select.Option
          key="admin"
          leadingIcon="user"
          description="Read and write access for the entire platform"
        >
          Admin
        </Select.Option>
        <Select.Option
          key="developer"
          leadingIcon="user-check"
          description="Read and write access to the database and read-only access for project settings and schema"
        >
          Developer
        </Select.Option>
        <Select.Option
          key="collaborator"
          leadingIcon="users"
          description="Read and write access to the database and read-only access for project settings"
        >
          Collaborator
        </Select.Option>
        <Select.Option
          key="viewer"
          leadingIcon="user"
          description="Read-only access for the entire platform"
        >
          Viewer
        </Select.Option>
      </Select.Container>
    </Form>
  </div>
)

export const WithFooter = () => (
  <Select.Container
    label="Database Provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
    <Select.Footer onPress={action("onSelectFooterPress")}>
      Can't find a supported provider?{" "}
      <Link href="" openInNewTab>
        Request one
      </Link>
    </Select.Footer>
  </Select.Container>
)

export const WithPlaceholder = () => (
  <Select.Container
    label="Database Provider"
    placeholder="Select a provider"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithPreSelectedOption = () => (
  <Select.Container
    label="Database Provider"
    defaultSelectedKey="heroku"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithIconsInOptions = () => (
  <Select.Container
    label="Database Provider"
    defaultSelectedKey="heroku"
    onSelectionChange={action("onSelectionChange")}
  >
    <Select.Option key="planetscale" leadingIcon="planetscale">
      PlanetScale
    </Select.Option>
    <Select.Option key="heroku" leadingIcon="heroku">
      Heroku PostgreSQL
    </Select.Option>
    <Select.Option key="railway" leadingIcon="railway">
      Railway
    </Select.Option>
  </Select.Container>
)

export const Disabled = () => (
  <Select.Container label="Database Provider" isDisabled>
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithHint = () => (
  <Select.Container
    label="Database Provider"
    hint="Your database will be provisioned by one of these providers"
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithError = () => (
  <Select.Container
    label="Database Provider"
    errorText="Database provisioning is currently not supported"
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithHintAndError = () => (
  <Select.Container
    label="Database Provider"
    hint="Your database will be provisioned by one of these providers"
    errorText="Database provisioning is currently not supported"
  >
    <Select.Option key="planetscale">PlanetScale</Select.Option>
    <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
    <Select.Option key="railway">Railway</Select.Option>
  </Select.Container>
)

export const WithValidator = () => (
  <div className="flex flex-col">
    <span className="text-sm mb-4">
      In this story, selecting Planetscale is considered invalid
    </span>
    <Select.Container
      label="Database Provider"
      validator={(selectedKey) =>
        selectedKey === "planetscale"
          ? "Planetscale is not supported"
          : undefined
      }
    >
      <Select.Option key="planetscale">PlanetScale</Select.Option>
      <Select.Option key="heroku">Heroku PostgreSQL</Select.Option>
      <Select.Option key="railway">Railway</Select.Option>
    </Select.Container>
  </div>
)
