import { Card } from "../card/Card"
import { Separator } from "./Separator"

export const Default = (props) => (
  <div className="flex h-10 w-10">
    <div>Leading</div>
    <Separator {...props} />
    <div>Trailing</div>
  </div>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Separator",
  component: Separator,
  argTypes: {
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "inline-radio",
      },
      defaultValue: "horizontal",
    },
  },
}

export const Horizontal = () => (
  <Card className="flex flex-col justify-center">
    <div className="text-gray-600 dark:text-gray-500">Top</div>
    <Separator />
    <div className="text-gray-600 dark:text-gray-500">Bottom</div>
  </Card>
)

export const Vertical = () => (
  <Card>
    <div className="flex justify-center">
      <div className="text-gray-600 dark:text-gray-500 mx-2">Left</div>
      <Separator orientation="vertical" />
      <div className="text-gray-600 dark:text-gray-500 mx-2">Right</div>
    </div>
  </Card>
)
