import React, { forwardRef, MouseEventHandler, useRef } from "react"
import cn from "classnames"
import { useButton } from "@react-aria/button"
import { useHover } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { Loader } from "../loader/Loader"
import { PressEvent } from "@react-types/shared"

export type ButtonProps = React.PropsWithChildren<{
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLButtonElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this button should steal focus when mounted */
  autoFocus?: boolean
  /** Controls if this button is disabled */
  isDisabled?: boolean
  /** Controls if the button will grow to fill its parent */
  fillParent?: boolean
  /** Icon element will be placed before the children. */
  icon?: string
  /** Icon element size. */
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl"
  /** Controls if the button shows Loader */
  isLoading?: boolean
  /** Callback invoked when this button is pressed */
  onPress?: (e: PressEvent) => void
  /**
   * @deprecated Use `onPress` instead.
   *
   * The only reason this exists is so that this Button can be used inside `next/link`s (https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag says `onClick` must be a supported prop)
   * `next/link` overrides the `onClick` handler of its child to do client-side navigation (https://github.com/vercel/next.js/blob/5e185fc5da227801d3f12724be3577f4a719aa69/packages/next/client/link.tsx#L284)
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
  /**
   * Controls what kind of button this is.
   *
   * _primary_:
   * _secondary_:
   * _positive_:
   * _negative_:
   * _quiet_: Useful when only the functionality of a button is needed, without affecting styles of the content
   */
  variant?: "primary" | "secondary" | "positive" | "negative" | "quiet" | "link"
}>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      id,
      autoFocus = false,
      variant = "primary",
      isDisabled: _isDisabled = false,
      fillParent = false,
      isLoading = false,
      icon,
      iconSize = "sm",
      children,
      onPress,
      onClick,
    }: ButtonProps,
    forwardedRef
  ) => {
    const _ref = useRef<HTMLButtonElement>(null)
    const ref = forwardedRef || _ref

    const isDisabled = _isDisabled || isLoading
    const { buttonProps, isPressed } = useButton(
      {
        id,
        isDisabled,
        children,
        autoFocus,
        type: "submit",
        onPress,
      },
      ref as React.RefObject<HTMLButtonElement>
    )
    const { hoverProps, isHovered } = useHover({ isDisabled })

    if (variant === "positive") variant = "primary"

    return (
      <FocusRing autoFocus={autoFocus}>
        <button
          id={id}
          lens-role="button"
          ref={ref}
          {...mergeProps(hoverProps, buttonProps)}
          /**
           * This is technically wrong, you shouldn't override the `onClick` added by `useButton`.
           * In order for this button to work correctly with `next/link`, this is needed. This will override `useButton`'s `onClick`
           * Details:
           *   - https://github.com/adobe/react-spectrum/issues/2525
           *   - https://github.com/prisma/lens/pull/344
           */
          onClick={onClick}
          className={cn(
            "flex justify-center items-center px-3 py-1.5",
            "rounded-md",
            "text-sm whitespace-nowrap",
            {
              "cursor-not-allowed": isDisabled,
              "flex-grow": fillParent,
            },
            {
              "font-medium": variant === "primary",
              "bg-green-500 text-white":
                variant === "primary" &&
                !isDisabled &&
                !isHovered &&
                !isPressed,
              "bg-green-600 text-white": variant === "primary" && isHovered,
              "bg-green-700 text-white": variant === "primary" && isPressed,
              "bg-green-300 text-green-100":
                variant === "primary" && isDisabled,
            },
            {
              "font-medium": variant === "secondary",
              "bg-gray-200 text-gray-800":
                variant === "secondary" &&
                !isDisabled &&
                !isHovered &&
                !isPressed,
              "bg-gray-300": variant === "secondary" && isHovered,
              "bg-gray-400": variant === "secondary" && isPressed,
              "bg-gray-200 text-gray-500":
                variant === "secondary" && isDisabled,
            },
            {
              "font-medium": variant === "negative",
              "bg-red-600 text-white":
                variant === "negative" &&
                !isDisabled &&
                !isHovered &&
                !isPressed,
              "bg-red-700 text-white": variant === "negative" && isHovered,
              "bg-red-800 text-white": variant === "negative" && isPressed,
              "bg-red-300 text-red-100": variant === "negative" && isDisabled,
            },
            {
              underline: variant === "link",
              "text-gray-600 dark:text-gray-400":
                variant === "link" && !isDisabled && !isHovered && !isPressed,
              "text-gray-700 dark:text-gray-500":
                variant === "link" && isHovered,
              "text-gray-800 dark:text-gray-600":
                variant === "link" && isPressed,
              "text-gray-400 dark:text-gray-600":
                variant === "link" && isDisabled,
            }
          )}
        >
          {icon && !isLoading && (
            <Icon
              name={icon}
              size={iconSize}
              className={cn({
                "mr-1": !!children, // only add a margin if there are children
              })}
            />
          )}
          {isLoading && (
            <Loader
              size={iconSize}
              className={cn({
                "mr-2": !!children, // only add a margin if there are children
                "bg-green-300 text-white": variant === "primary",
                "bg-gray-200 text-gray-800": variant === "secondary",
                "bg-red-300 text-white": variant === "negative",
              })}
            />
          )}

          {children}
        </button>
      </FocusRing>
    )
  }
)
