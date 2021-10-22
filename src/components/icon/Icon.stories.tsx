import { Icon } from "./Icon"

export const Default = (props) => <Icon {...props} />
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Icon",
  component: Icon,
  argTypes: {
    name: {
      defaultValue: "database",
    },
  },
}

export const Sizes = () => (
  <div className="flex items-center space-x-4 text-gray-400 dark:text-gray-300">
    <Icon name="database" size="xs" />
    <Icon name="database" size="sm" />
    <Icon name="database" size="md" />
    <Icon name="database" size="lg" />
    <Icon name="database" size="xl" />
  </div>
)

export const CustomIcons = () => {
  return (
    <div className="flex flex-wrap items-center text-gray-400 dark:text-gray-300 max-w-[120px]">
      <Icon name="prisma" className="m-2" />
      <Icon name="chevron-down" className="m-2" />
      <Icon name="triangle-down" className="m-2" />
      <Icon name="i" className="m-2" />
      <Icon name="heroku" className="m-2" />
      <Icon name="github-light" className="m-2" />
      <Icon name="github-dark" className="m-2" />
      <Icon name="aws" className="m-2" />
      <Icon name="railway" className="m-2" />
      <Icon name="planetscale" className="m-2" />
      <Icon name="nextjs" className="m-2" />
      <Icon name="hsplit" className="m-2" />
      <Icon name="vsplit" className="m-2" />
    </div>
  )
}
