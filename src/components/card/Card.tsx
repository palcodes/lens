import React from "react"
import cn from "classnames"
import { Icon } from "../icon/Icon"
import { Title } from "../title/Title"
import { Button, ButtonProps } from "../button/Button"

export type CardProps = React.PropsWithChildren<{
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** If provided, fixes the Card's width */
  width?: number | string
  /** If provided, fixes the Card's width */
  height?: number | string
  /** Additional classes that will be attached to the Card. This is provided for layouting purposes. Avoid using classes that modify the card visually. */
  className?: string
}>

export function Card({ id, children, width, height, className }: CardProps) {
  return (
    <div
      id={id}
      lens-role="card"
      className={cn(
        "px-6 py-4",
        "rounded-lg shadow-md overflow-hidden",
        "bg-white dark:bg-gray-800",
        "transition-all",
        className
      )}
      style={{ width, height }}
    >
      {children}
    </div>
  )
}
