import { Picker } from "./Picker"
import { Icon } from "../../components/icon/Icon"

const ownedProjects = [
  { id: "1", title: "My Project" },
  { id: "2", title: "Aqua Iron Pomeranian" },
  { id: "3", title: "Blue Copper Fox Terrier" },
]
const collaborations = [
  { id: "4", title: "Yellow Platinum Mimosa" },
  { id: "5", title: "White Bronze Daffodil" },
]

export const Default = (props) => {
  const onChange = (val) => {
    console.log(val)
  }

  return (
    <Picker.Container
      name="projectPicker"
      onSelectionChange={onChange}
      defaultSelectedKey="1"
    >
      {ownedProjects && (
        <Picker.Section title="Your projects">
          {ownedProjects.map((project) => (
            <Picker.Item key={project.id}>{project.title}</Picker.Item>
          ))}
        </Picker.Section>
      )}
      {collaborations && (
        <Picker.Section title="Collaborations">
          {collaborations.map((project) => (
            <Picker.Item key={project.id}>{project.title}</Picker.Item>
          ))}
        </Picker.Section>
      )}

      <Picker.Footer>
        <div className="text-gray-800">
          <div className="flex mb-3">
            <Icon name="folder" size="sm" className="mr-2" />
            <a href="https://prisma.io" target="_blank" className="text-sm">
              View all projects
            </a>
          </div>
          <div className="flex">
            <Icon name="plus-circle" size="sm" className="mr-2" />
            <a href="https://prisma.io" target="_blank" className="text-sm">
              Create new project
            </a>
          </div>
        </div>
      </Picker.Footer>
    </Picker.Container>
  )
}

Default.storyName = "[Controlled]"
export default {
  title: "Cloud/Picker",
  component: Picker,
}