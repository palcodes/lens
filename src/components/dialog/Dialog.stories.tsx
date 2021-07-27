import { action } from "@storybook/addon-actions"
import { chain } from "@react-aria/utils"
import { Dialog } from "./Dialog"
import { Button } from "../button/Button"
import { Avatar } from "../avatar/Avatar"
import { Select } from "../select/Select"
import { ButtonGroup } from "../button-group/ButtonGroup"
import { useRef, useState, useEffect } from "react"

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

export const Embedded = () => {
  const [dimensions, setDimensions] = useState<DOMRect>()
  const containerRef = useRef<HTMLDivElement>(null)

  function debounce(func, timeout = 175) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  function handleWindowResize() {
    if (containerRef.current) {
      debounce(setDimensions(containerRef.current.getBoundingClientRect()))
    }
  }

  useEffect(() => {
    if (containerRef.current) {
      setDimensions(containerRef.current.getBoundingClientRect())
      window.addEventListener("resize", handleWindowResize)
    }
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  }, [])

  return (
    <div>
      <h1 className="p-4">Section Heading</h1>
      <section className="p-4">
        <div
          ref={containerRef}
          className="flex items-center justify-center bg-gray-400"
          style={{
            width: 800,
            height: 600,
          }}
        >
          <Dialog.Container
            title="Clone project"
            subtitle="This guide will help you get started with your project locally"
            icon="cloud"
            isEmbedded
            dimensions={dimensions}
          >
            <Button>Continue Locally</Button>
            {(close) => (
              <Dialog.Body>
                <div className="flex justify-between">
                  <p>Dialog Body Content</p>
                </div>
              </Dialog.Body>
            )}
          </Dialog.Container>
        </div>
      </section>
    </div>
  )
}
