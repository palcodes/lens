import React from "react"
import cn from "classnames"

interface InlineCodeProps {
  /** Text to be styled as code like representation */
  value: string
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
}

export const InlineCode = ({ value, className }: InlineCodeProps) => {
  return (
    <span
      className={cn(
        "relative inline-flex items-center",
        "p-1 mx-1 rounded-lg",
        "text-sm",
        "bg-gray-200 text-gray-800",
        className
      )}
    >
      {value}
    </span>
  )
}
