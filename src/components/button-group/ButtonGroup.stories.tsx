import { action } from "@storybook/addon-actions"
import { Button } from "../button/Button"
import { ButtonGroup } from "./ButtonGroup"

export default {
  title: "Lens/ButtonGroup",
  component: ButtonGroup,
}

export const WithPrimaryButton = () => (
  <ButtonGroup>
    <Button onPress={action("onPress")}>Save</Button>
  </ButtonGroup>
)

export const WithPrimaryAndSecondaryButtons = () => (
  <ButtonGroup>
    <Button onPress={action("onPress")}>Save</Button>
    <Button onPress={action("onPress")}>Cancel</Button>
  </ButtonGroup>
)

export const WithPrimarySecondaryAndTertiaryButtons = () => (
  <ButtonGroup>
    <Button onPress={action("onPress")}>Save</Button>
    <Button onPress={action("onPress")}>Cancel</Button>
    <Button onPress={action("onPress")}>Remove from project</Button>
  </ButtonGroup>
)
