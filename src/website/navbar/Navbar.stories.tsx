import { Navbar } from "./Navbar"

export const Default = () => {
  return <Navbar />
}

Default.storyName = "[Controlled]"
export default {
  title: "Website/Navbar",
  component: Navbar,
}

export const Standard = () => <Navbar />
