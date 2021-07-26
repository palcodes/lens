import { Tab } from "./Tab"

export const Default = (props) => (
  <Tab.Container aria-label="Continue locally guide">
    <Tab.Tab key="remote" dataKey="remote" title="Remote Database">
      <>
        <p>
          1. Open your terminal and use the following command to clone the
          project repository.
        </p>
        <p>2. Copy your connection string</p>
      </>
    </Tab.Tab>

    <Tab.Tab key="local" dataKey="local" title="Local Database">
      <>
        <p>
          1. Open your terminal and use the following command to clone the
          project repository.
        </p>
        <p>2. Get the connection string from your local database</p>
      </>
    </Tab.Tab>
  </Tab.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Tabs",
  component: Tab,
  argTypes: {
    label: {
      defaultValue: "Database Provider",
    },
  },
}

export const WithDisabled = () => (
  <Tab.Container aria-label="Continue locally guide">
    <Tab.Tab key="remote" dataKey="remote" title="Remote Database">
      <>
        <p>
          1. Open your terminal and use the following command to clone the
          project repository.
        </p>
        <p>2. Copy your connection string</p>
      </>
    </Tab.Tab>

    <Tab.Tab key="local" dataKey="local" title="Local Database">
      <>
        <p>
          1. Open your terminal and use the following command to clone the
          project repository.
        </p>
        <p>2. Get the connection string from your local database</p>
      </>
    </Tab.Tab>

    <Tab.Tab
      key="distributed"
      dataKey="distributed"
      title="Distributed Database"
      isDisabled
    >
      <p>Coming soon</p>
    </Tab.Tab>
  </Tab.Container>
)
