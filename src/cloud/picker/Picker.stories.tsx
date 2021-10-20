import { Picker, Section, Item, PickerFooter } from "./index"
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
    <Picker
      name="projectPicker"
      onSelectionChange={onChange}
      defaultSelectedKey="1"
    >
      {ownedProjects && (
        <Section title="Your projects">
          {ownedProjects.map((project) => (
            <Item key={project.id}>{project.title}</Item>
          ))}
        </Section>
      )}
      {collaborations && (
        <Section title="Collaborations">
          {collaborations.map((project) => (
            <Item key={project.id}>{project.title}</Item>
          ))}
        </Section>
      )}

      <PickerFooter>
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
      </PickerFooter>
    </Picker>
  )
}

Default.storyName = "[Controlled]"
export default {
  title: "Cloud/Picker",
  component: Picker,
}
