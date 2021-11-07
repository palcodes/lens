import React from "react"
import cn from "classnames"
import { useSeparator } from "@react-aria/separator"

export type SeparatorProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** This Separator's orientation */
  orientation?: "vertical" | "horizontal"
  /** Additional classes that will be spread over the Separator. Avoid changing the Separator visually. */
  className?: string
}

export function Separator({
  id,
  orientation = "horizontal",
  className,
}: SeparatorProps) {
  const { separatorProps } = useSeparator({
    id,
    orientation,
  })

  return (
    <div
      lens-role="separator"
      {...separatorProps}
      className={cn(
        "border-gray-300 dark:border-gray-700",
        {
          "border-b": orientation === "horizontal",
          "border-r": orientation === "vertical",
        },
        className
      )}
    />
  )
}
