import { action } from "@storybook/addon-actions"
import { SegmentedSwitch } from "./SegmentedSwitch"

export const Default = (props) => (
  <SegmentedSwitch.Container {...props}>
    <SegmentedSwitch.Segment id="json" title="JSON" />
    <SegmentedSwitch.Segment id="table" title="Table" />
    <SegmentedSwitch.Segment id="metrics" title="Metrics" />
  </SegmentedSwitch.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/SegmentedSwitch",
  component: SegmentedSwitch.Container,
  argTypes: {},
}

export const WithoutIcons = () => (
  <SegmentedSwitch.Container onChange={action("onChange")}>
    <SegmentedSwitch.Segment id="json" title="JSON" />
    <SegmentedSwitch.Segment id="table" title="Table" />
    <SegmentedSwitch.Segment id="metrics" title="Metrics" />
  </SegmentedSwitch.Container>
)

export const WithIcons = () => (
  <SegmentedSwitch.Container onChange={action("onChange")}>
    <SegmentedSwitch.Segment
      id="create"
      icon="plus-square"
      title="Provision a new database"
    />
    <SegmentedSwitch.Segment
      id="import"
      icon="download"
      title="Use my own database"
    />
  </SegmentedSwitch.Container>
)
