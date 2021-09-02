import { Navbar } from "./Navbar"

export const Default = () => {
  return <Navbar />
}

Default.storyName = "[Default]"
export default {
  title: "Website/Navbar",
  component: Navbar,
}

export const MobileWidth = () => {
  return (
    <div style={{ width: "320px" }}>
      <Navbar />
    </div>
  )
}

export const DesktopWidth = () => {
  return (
    <div style={{ width: "1200px" }}>
      <Navbar />
    </div>
  )
}
