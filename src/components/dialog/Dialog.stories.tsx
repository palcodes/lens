import { action } from "@storybook/addon-actions"
import { chain } from "@react-aria/utils"
import { Dialog } from "./Dialog"
import { Button } from "../button/Button"
import { Avatar } from "../avatar/Avatar"
import { Select } from "../select/Select"
import { ButtonGroup } from "../button-group/ButtonGroup"
import { TextField } from "../text-field/TextField"

export const Default = (props) => (
  <Dialog.Container {...props}>
    <Button>Dialog Trigger</Button>
    {(close) => (
      <Dialog.Body>
        <div className="flex justify-between">
          <Avatar
            url="/avatar3.png"
            label="Lens User"
            name="Lens User"
            email="lens@prisma.io"
          />
          <Select.Container
            label=""
            defaultSelectedKey="developer"
            onSelectionChange={action("onSelectionChange")}
          >
            <Select.Option key="viewer">Viewer</Select.Option>
            <Select.Option key="collaborator">Collaborator</Select.Option>
            <Select.Option key="developer">Developer</Select.Option>
            <Select.Option key="admin">Admin</Select.Option>
          </Select.Container>
        </div>
      </Dialog.Body>
    )}
  </Dialog.Container>
)
Default.storyName = "[Controlled]"
export default {
  title: "Lens/Dialog",
  component: Dialog,
  argTypes: {
    title: {
      defaultValue: "Edit Membership",
    },
    subtitle: {
      defaultValue: "Edit user's membership in current project",
    },
    icon: {
      defaultValue: "user",
    },
  },
}

export const WithFooter = () => (
  <Dialog.Container
    title="Edit Membership"
    subtitle="Edit user's membership in current project"
    icon="user"
  >
    <Button>Dialog Trigger</Button>
    {(close) => (
      <Dialog.Body>
        <div className="flex justify-between">
          <Avatar
            url="/avatar7.png"
            label="Lens User"
            name="Lens User"
            email="lens@prisma.io"
          />
          <Select.Container
            autoFocus
            label=""
            defaultSelectedKey="developer"
            onSelectionChange={action("onSelectionChange")}
          >
            <Select.Option key="viewer">Viewer</Select.Option>
            <Select.Option key="collaborator">Collaborator</Select.Option>
            <Select.Option key="developer">Developer</Select.Option>
            <Select.Option key="admin">Admin</Select.Option>
          </Select.Container>
        </div>

        <Dialog.Footer>
          <ButtonGroup>
            <Button variant="primary" onPress={chain(close, action("onPress"))}>
              Save
            </Button>
            <Button variant="link" onPress={chain(close, action("onPress"))}>
              Cancel
            </Button>
            <Button variant="link" onPress={chain(close, action("onPress"))}>
              Remove from project
            </Button>
          </ButtonGroup>
        </Dialog.Footer>
      </Dialog.Body>
    )}
  </Dialog.Container>
)

export const WithLongTitle = () => (
  <Dialog.Container
    title='You’re revoking "Your first API Key, created by the Prisma Data Platform"'
    subtitle="Any app using this connection string will stop working."
    icon="trash"
  >
    <Button>Dialog Trigger</Button>
    {(close) => (
      <Dialog.Body>
        <div className="flex justify-between">
          <TextField
            label="Confirm deletion"
            hint='Type the word "delete" to confirm deletion'
            onChange={action("onTextFieldChange")}
          />
        </div>

        <Dialog.Footer>
          <ButtonGroup>
            <Button isDisabled={false} onPress={async () => {}}>
              Delete
            </Button>
            <Button isDisabled={false} onPress={() => {}}>
              Cancel
            </Button>
          </ButtonGroup>
        </Dialog.Footer>
      </Dialog.Body>
    )}
  </Dialog.Container>
)
