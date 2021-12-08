import { Meta, Story } from "@storybook/react"
import React from "react"
import { LensProvider } from "../provider/LensWebProvider"
import { WebsiteFooter } from "./WebsiteFooter"

const dummyNL: React.FC = () => <></>

export default {
  title: "Website/Footer",
  component: WebsiteFooter,
} as Meta

const Template: Story<{ newsletterComponent: any }> = (args) => (
  // Explicitly wrap in LensProvider to make sure the correct styles are loaded. This is temporary.
  <LensProvider>
    <WebsiteFooter {...args} />
  </LensProvider>
)

export const Default = Template.bind({})
Default.args = {
  newsletterComponent: dummyNL,
}
