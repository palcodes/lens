import cn from "classnames"
import React from "react"

export type TitleProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Content of the Title */
  children: string
  /** Additional classes that will be forwarded to the Title. Avoid classes that change the Title's visuals. */
  className?: string
  /** Additionl props that will be spread over the title */
  titleProps?: React.HTMLAttributes<HTMLElement>
}

export function Title({ id, children, className, titleProps }: TitleProps) {
  return (
    <h1
      id={id}
      lens-role="title"
      className={cn(
        "font-inter font-semibold",
        "text-gray-900 text-2xl",
        className
      )}
      {...titleProps}
    >
      {children}
    </h1>
  )
}
