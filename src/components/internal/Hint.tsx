import cn from "classnames"
import React from "react"

type HintProps = {
  id: string
  text?: string
  error?: string
}

export function Hint({ id, text, error }: HintProps) {
  if (!text && !error) {
    return null
  }

  return (
    <div
      id={id}
      className={cn("mt-3", "text-sm", {
        "text-red-500 dark:text-red-500": error,
        "text-gray-600 dark:text-gray-400": text,
        "animate-slide-top": error,
      })}
    >
      {error || text}
    </div>
  )
}
