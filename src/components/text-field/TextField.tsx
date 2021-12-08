import { useFocusWithin } from "@react-aria/interactions"
import { useTextField } from "@react-aria/textfield"
import { useId } from "@react-aria/utils"
import cn from "classnames"
import React, { forwardRef, useRef } from "react"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon } from "../icon/Icon"
import { Hint } from "../internal/Hint"
import { Label } from "../label/Label"

export type TextFieldProps = {
  /** A React ref to attach to the rendered Button */
  ref?: React.ForwardedRef<HTMLInputElement>
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this TextField should steal focus when mounted */
  autoFocus?: boolean
  /** An optional hint to show next to the TextField that describes what this TextField expects */
  hint?: string
  /** An optional error to show next to the TextField. If a `validator` is also supplied, the `validator` takes precendence */
  error?: string
  /** Hints at the type of data that might be entered into this TextField */
  inputMode?: "text" | "email" | "tel" | "url" | "numeric" | "decimal"
  /** Controls if this TextField is disabled */
  isDisabled?: boolean
  /** A label that identifies this TextField's purpose */
  label?: string
  /** An icon to render inside the TextField, before the input */
  leadingIcon?: string
  /** Name of the value held by this TextField when placed inside a form */
  name?: string
  /** Controls how this TextField announces itself as autocomplete-able to the browser */
  nativeAutoComplete?: string
  /** Callback fired when the value of this TextField changes */
  onChange?: (value: string) => void
  /** A value to display in the TextField when it is empty */
  placeholder?: string
  /** A fixed value that is appended to the beginning of the TextField */
  prefix?: string
  /** The value of the TextField */
  value?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      id,
      autoFocus = false,
      error,
      hint,
      inputMode,
      isDisabled = false,
      label,
      leadingIcon,
      name,
      nativeAutoComplete,
      onChange,
      placeholder,
      prefix,
      value,
    },
    forwardedRef
  ) => {
    const _inputRef = useRef<HTMLInputElement>(null)
    const inputRef =
      (forwardedRef as React.RefObject<HTMLInputElement>) || _inputRef

    const _hintId = useId(id)
    const hintId = id ? `${id}-hint` : _hintId

    const { labelProps, inputProps } = useTextField(
      {
        id,
        "aria-describedby": error || hint ? hintId : undefined,
        autoFocus,
        autoComplete: nativeAutoComplete,
        inputMode,
        isDisabled,
        isReadOnly: isDisabled,
        label,
        name,
        onChange,
        placeholder,
        value,
        validationState: !!error ? "invalid" : undefined,
      },
      inputRef
    )

    const { focusWithinProps } = useFocusWithin({
      isDisabled,
    })

    return (
      <div className="w-full space-y-3">
        {label && <Label labelProps={labelProps}>{label}</Label>}

        <section>
          <FocusRing autoFocus={autoFocus} within>
            <div
              {...focusWithinProps}
              className={cn(
                "flex flex-grow items-center",
                "rounded border border-gray-400 dark:border-gray-700",
                "text-sm",
                "overflow-hidden",
                {
                  "bg-gray-100 dark:bg-gray-800": isDisabled,
                  "bg-white dark:bg-gray-900": !isDisabled,
                  "cursor-not-allowed": isDisabled,
                  "border-2 border-red-500 dark:border-red-500": !!error,
                }
              )}
            >
              {prefix && (
                <div
                  className={cn(
                    "py-2.5 px-3",
                    "bg-gray-200 dark:bg-gray-700",
                    "text-gray-800 dark:text-gray-400 font-medium",
                    "select-none"
                  )}
                >
                  {prefix}
                </div>
              )}
              {leadingIcon && (
                <Icon
                  name={leadingIcon}
                  size="sm"
                  className="ml-4 text-gray-600"
                />
              )}
              <input
                ref={inputRef}
                lens-role="text-field"
                {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
                className={cn("flex-grow input", "px-3 py-2.5", {
                  disabled: isDisabled,
                })}
              />

              {!!error && (
                <Icon
                  name="alert-circle"
                  className={cn("m-2", "text-red-500 dark:text-red-500")}
                  size="sm"
                />
              )}
            </div>
          </FocusRing>

          <Hint id={hintId} text={hint} error={error} />
        </section>
      </div>
    )
  }
)
