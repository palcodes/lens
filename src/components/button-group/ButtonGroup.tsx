import React, { Children } from "react"

export type ButtonGroupProps = {
  children:
    | React.ReactElement
    | [React.ReactElement, React.ReactElement]
    | [React.ReactElement, React.ReactElement, React.ReactElement]
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  const buttons = Children.toArray(children)

  if (buttons.length === 1 || buttons.length === 2) {
    return <section className="flex flex-grow space-x-4">{children}</section>
  } else {
    return (
      <section className="flex flex-grow justify-between">
        <div className="flex space-x-4">
          {buttons[0]}
          {buttons[1]}
        </div>
        {buttons[2]}
      </section>
    )
  }
}
