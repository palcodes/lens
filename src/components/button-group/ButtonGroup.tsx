import React, { Children } from "react"
import cn from "classnames"
import { ButtonProps } from "../button/Button"

/**
 * A group of primary, seconday and tertiary buttons.
 *
 * Provide children in this order: Primary, Secondary, Tertiary
 */
export type ButtonGroupProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  children:
    | React.ReactElement
    | [React.ReactElement, React.ReactElement]
    | [React.ReactElement, React.ReactElement, React.ReactElement]
}

export function ButtonGroup({ id, children }: ButtonGroupProps) {
  const buttons = Children.toArray(children) as React.ReactElement[]

  if (buttons.length === 1) {
    return (
      <section
        id={id}
        lens-role="button-group"
        className="flex flex-row-reverse flex-grow space-x-4"
      >
        {React.cloneElement(buttons[0], {
          variant: "primary",
        } as ButtonProps)}
      </section>
    )
  } else if (buttons.length === 2) {
    return (
      <section
        id={id}
        lens-role="button-group"
        className="flex flex-grow justify-between"
      >
        {React.cloneElement(buttons[1], {
          variant: "secondary",
        } as ButtonProps)}
        {React.cloneElement(buttons[0], {
          variant: "primary",
        } as ButtonProps)}
      </section>
    )
  } else {
    return (
      <section
        id={id}
        lens-role="button-group"
        className="flex flex-grow justify-between"
      >
        {React.cloneElement(buttons[2], {
          variant: "link",
        } as ButtonProps)}
        <div className="flex space-x-4">
          {React.cloneElement(buttons[1], {
            variant: "secondary",
          } as ButtonProps)}
          {React.cloneElement(buttons[0], {
            variant: "primary",
          } as ButtonProps)}
        </div>
      </section>
    )
  }
}
