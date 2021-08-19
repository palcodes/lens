import { Link } from "./Link"
import { Icon } from "../icon/Icon"

export const Default = (props) => <Link {...props}>Link</Link>
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Link",
  component: Link,
  argTypes: {
    href: {
      defaultValue: "/?path=/story/lens-link--default",
    },
  },
}

export const OpenInNewTab = () => (
  <Link href="/?path=/story/lens-link--open-in-new-tab" openInNewTab>
    Link
  </Link>
)

export const Disabled = () => (
  <Link href="/?path=/story/lens-link--disabled" isDisabled>
    Link
  </Link>
)
export const Inline = () => (
  <p>
    This is a line of text with a
    <Link href="/?path=/story/lens-link--inline">link</Link>
    within it
  </p>
)

export const WithRichChildren = () => {
  return (
    <Link href="/?path=/story/lens-link--open-in-new-tab" openInNewTab>
      <Icon name="github-dark" />
      <p>prisma/cloud</p>
    </Link>
  )
}
