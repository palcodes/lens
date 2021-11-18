import { action } from "@storybook/addon-actions"
import { ComboBoxOption, ComboBox } from "./ComboBox"
import { Link } from "../link/Link"

type RepositoryId =
  | "prisma"
  | "studio"
  | "cloud"
  | "engines"
  | "examples"
  | "docs"

const dynamicData: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
  {
    key: "docs",
    title: "prisma/docs",
  },
]
const promiseWithDynamicData: Promise<ComboBoxOption<RepositoryId>[]> =
  new Promise((r) => setTimeout(() => r(dynamicData), 5000))

const dynamicDataWebRepos: ComboBoxOption<RepositoryId>[] = [
  {
    key: "studio",
    title: "prisma/studio",
  },
  {
    key: "cloud",
    title: "prisma/cloud",
  },
  {
    key: "docs",
    title: "prisma/docs",
  },
]
const dynamicDataOtherRepos: ComboBoxOption<RepositoryId>[] = [
  {
    key: "prisma",
    title: "prisma/prisma",
  },
  {
    key: "engines",
    title: "prisma/engines",
  },
  {
    key: "examples",
    title: "prisma/examples",
  },
]

export const Default = (props) => (
  <ComboBox.Container {...props}>
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/ComboBox",
  component: ComboBox.Container,
  argTypes: {
    label: { defaultValue: "Repository" },
  },
}

export const WithStaticData = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithDynamicData = () => (
  <ComboBox.Container
    label="Repository"
    options={dynamicData}
    onSelectionChange={action("onSelectionChange")}
  >
    {(option) => (
      <ComboBox.Option key={option.key}>{option.title}</ComboBox.Option>
    )}
  </ComboBox.Container>
)

export const WithSections = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Section title="Web">
      <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
      <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
      <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    </ComboBox.Section>
    <ComboBox.Section title="Other">
      <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
      <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
      <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    </ComboBox.Section>
  </ComboBox.Container>
)

export const WithIconsAndImages = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option
      key="prisma"
      leadingImageSrc="/avatar1.png"
      trailingIcon="lock"
    >
      prisma/prisma
    </ComboBox.Option>
    <ComboBox.Option
      key="studio"
      leadingImageSrc="/avatar2.png"
      trailingIcon="lock"
    >
      prisma/studio
    </ComboBox.Option>
    <ComboBox.Option
      key="cloud"
      leadingImageSrc="/avatar3.png"
      trailingIcon="lock"
    >
      prisma/cloud
    </ComboBox.Option>
    <ComboBox.Option
      key="engines"
      leadingImageSrc="/avatar4.png"
      trailingIcon="lock"
    >
      prisma/engines
    </ComboBox.Option>
    <ComboBox.Option
      key="examples"
      leadingImageSrc="/avatar5.png"
      trailingIcon="lock"
    >
      prisma/examples
    </ComboBox.Option>
    <ComboBox.Option
      key="docs"
      leadingImageSrc="/avatar6.png"
      trailingIcon="lock"
    >
      prisma/docs
    </ComboBox.Option>
    <ComboBox.Option
      key="thisisareallyreallyreallyreallylongrepositoryname"
      leadingImageSrc="/avatar7.png"
      trailingIcon="lock"
    >
      prisma/thisisareallyreallyreallyreallylongrepositoryname
    </ComboBox.Option>
  </ComboBox.Container>
)

export const WithFooter = () => (
  <ComboBox.Container
    label="Repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
    <ComboBox.Option key="lens">prisma/lens</ComboBox.Option>
    <ComboBox.Option key="templates">prisma/templates</ComboBox.Option>
    <ComboBox.Option key="templates-node">
      prisma/templates-node
    </ComboBox.Option>
    <ComboBox.Option key="router">prisma/router</ComboBox.Option>
    <ComboBox.Option key="migrate">prisma/migrate</ComboBox.Option>
    <ComboBox.Option key="client">prisma/client</ComboBox.Option>
    <ComboBox.Option key="deployment">prisma/deployment</ComboBox.Option>
    <ComboBox.Option key="nexus-prisma">prisma/nexus-prisma</ComboBox.Option>

    <ComboBox.Footer onPress={action("onComboBoxFooterPress")}>
      Can't find your repository?
      <Link href="" openInNewTab>
        Configure Prisma on GitHub
      </Link>
    </ComboBox.Footer>
  </ComboBox.Container>
)

export const WithPlaceholder = () => (
  <ComboBox.Container
    label="Repository"
    placeholder="Select a repository"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithAPreSelectedOption = () => (
  <ComboBox.Container
    label="Repository"
    defaultSelectedKey="cloud"
    onSelectionChange={action("onSelectionChange")}
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const Disabled = () => (
  <ComboBox.Container label="Repository" isDisabled>
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithNoOptions = () => (
  <ComboBox.Container label="Repository"></ComboBox.Container>
)

export const WithHint = () => (
  <ComboBox.Container label="Repository" hint="Pick a repository to continue">
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)

export const WithError = () => (
  <ComboBox.Container
    label="Repository"
    error="You do not have access to this repository"
  >
    <ComboBox.Option key="prisma">prisma/prisma</ComboBox.Option>
    <ComboBox.Option key="studio">prisma/studio</ComboBox.Option>
    <ComboBox.Option key="cloud">prisma/cloud</ComboBox.Option>
    <ComboBox.Option key="engines">prisma/engines</ComboBox.Option>
    <ComboBox.Option key="examples">prisma/examples</ComboBox.Option>
    <ComboBox.Option key="docs">prisma/docs</ComboBox.Option>
  </ComboBox.Container>
)
