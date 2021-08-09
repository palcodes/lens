import React, { forwardRef, useRef } from "react"
import cn from "classnames"
import { useButton } from "@react-aria/button"
import { useHover } from "@react-aria/interactions"
import { mergeProps } from "@react-aria/utils"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { Loader } from "../loader/Loader"

export type ButtonProps = React.PropsWithChildren<{
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLButtonElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls what kind of button this is */
  variant?: "primary" | "negative" | "secondary" | "quiet" | "link"
  /** Controls if this button should steal focus when mounted */
  autoFocus?: boolean
  /** Controls if this button is disabled */
  isDisabled?: boolean
  /** Controls if the button will grow to fill its parent */
  fillParent?: boolean
  /** Icon element will be placed before the children. */
  icon?: string
  /** Controls if the button shows Loader */
  isLoading?: boolean
  /** Icon element size. */
  iconSize?: "xs" | "sm" | "md" | "lg" | "xl"
  /** Callback invoked when this button is pressed */
  onPress?: () => void
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
    }: ButtonProps,
    forwardedRef
  ) => {
    const _ref = useRef<HTMLButtonElement>(null)
    const ref = forwardedRef || _ref

    const isDisabled = _isDisabled || isLoading
    const { buttonProps, isPressed } = useButton(
      { id, isDisabled, children, autoFocus, onPress, type: "submit" },
      ref as React.RefObject<HTMLButtonElement>
    )
    const { hoverProps, isHovered } = useHover({ isDisabled })

    return (
      <FocusRing autoFocus={autoFocus}>
        <button
          id={id}
          lens-role="button"
          ref={ref}
          {...mergeProps(hoverProps, buttonProps)}
          className={cn(
            "flex justify-center items-center px-3 py-1.5",
            "rounded-md",
            "text-sm whitespace-nowrap",
            {
              "cursor-not-allowed": isDisabled,
              "flex-grow": fillParent,
            },
            {
              "font-semibold": variant === "primary",
              "bg-gray-700 text-white":
                variant === "primary" &&
                !isDisabled &&
                !isHovered &&
                !isPressed,
              "bg-gray-800 text-white": variant === "primary" && isHovered,
              "bg-gray-900 text-white": variant === "primary" && isPressed,
              "bg-gray-200 text-gray-500": variant === "primary" && isDisabled,
            },
            {
              "font-semibold": variant === "negative",
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
              "font-semibold": variant === "secondary",
              "bg-gray-200 text-gray-800":
                variant === "secondary" &&
                !isDisabled &&
                !isHovered &&
                !isPressed,
              "bg-gray-300": variant === "secondary" && isHovered,
              "bg-gray-400": variant === "secondary" && isPressed,
              "text-gray-500": variant === "secondary" && isDisabled,
            },
            {
              "text-gray-800 dark:text-gray-100":
                variant === "quiet" && !isDisabled && !isHovered && !isPressed,
              "text-gray-500": variant === "quiet" && isPressed,
              "text-gray-400 dark:text-gray-500":
                variant === "quiet" && isDisabled,
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
                "mr-1": !!children, // only add a margin if there are children
              })}
            />
          )}

          {children}
        </button>
      </FocusRing>
    )
  }
)
