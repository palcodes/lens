import React from "react"
import cn from "classnames"

import { Button } from "../button/Button"
import { useToasts } from "../toast/useToasts"

interface BaseProps {
  /** Text to be styled as code like representation */
  children: string
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
}

/**
 * Discriminated Union to accomodate the following conditional prop logic
 * isInline?: boolean (Optional flag to render inline Code styles)
 * prefix?: string (Optional string to render with a non inline Code block)
 */
type ConditionalProps =
  | { isInline?: true; prefix?: never }
  | { isInline?: false; prefix?: string }

export type CodeProps = BaseProps & ConditionalProps

export const Code = ({
  isInline = false,
  prefix,
  children,
  className,
}: CodeProps) => {
  const toasts = useToasts()

  const handleCodeCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(children)
      toasts.add({
        title: `Copied!`,
        variant: "positive",
      })
    } catch (err) {
      toasts.add({
        title: `Command could not be copied`,
        variant: "negative",
      })
    }
  }

  // If no children are provided
  if (!children) {
    throw new Error("The Code component must be wrapped around a string")
  }

  return (
    <span
      className={cn(
        "items-center rounded-lg",
        "font-mono text-sm",
        {
          "inline-flex p-1 mx-1": isInline,
          "bg-gray-200 text-gray-800": isInline,
          "flex w-full justify-start py-3 px-4": !isInline,
          "bg-gray-900 text-gray-100": !isInline,
        },
        className
      )}
    >
      {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}
      {children}
      {!isInline && (
        <div className="relative flex-grow flex justify-end ml-2">
          <Button
            variant="secondary"
            icon="copy"
            iconSize="sm"
            onPress={handleCodeCopy}
          />
        </div>
      )}
    </span>
  )
}
