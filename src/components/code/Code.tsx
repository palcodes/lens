import React, { forwardRef, useState, useEffect } from "react"
import cn from "classnames"
import { Button } from "../button/Button"

export type CodeProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Text value to be styled as code like representation */
  value: string
  /** Optional string to render before the `value`. Useful as a way to supply a PROMPT. */
  prefix?: string
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
} & (
  | {
      /** Controls if the Code component holds sensitive data that is not to be revealed immediately */
      isSecret: true
      /** Optional masked value for sensitive data. */
      secretText?: string
      /** Controls if the masked text can be revealed */
      canReveal?: boolean
    }
  | {
      isSecret?: false
      secretText?: never
      canReveal?: never
    }
)

export const Code = forwardRef<HTMLButtonElement, CodeProps>(
  (
    {
      id,
      value,
      prefix,
      className,
      isSecret,
      secretText = "************",
      canReveal,
    }: CodeProps,
    ButtonRef
  ) => {
    const [isValueVisible, setIsValueVisible] = useState(
      isSecret ? false : true
    )
    const [copied, setCopied] = useState<"success" | "failed" | null>(null)
    const canCopyValue = !isSecret || (isSecret && canReveal)

    const toggleVisibility = async (): Promise<void> => {
      setIsValueVisible(!isValueVisible)
    }

    const copyCode = async (): Promise<void> => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied("success")
      } catch (err) {
        setCopied("failed")
      }
    }

    useEffect(() => {
      if (copied) setTimeout(() => setCopied(null), 3000)
    }, [copied])

    return (
      <span
        id={id}
        className={cn(
          "relative flex justify-start items-center w-full px-4 space-x-2",
          "text-sm rounded-lg",
          "bg-gray-900 text-gray-100",
          className
        )}
      >
        {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}

        <div className="relative flex-grow overflow-hidden">
          <pre
            className={cn(
              "py-3 max-w-full overflow-x-auto",
              "font-mono whitespace-nowrap"
            )}
          >
            {isValueVisible ? value : secretText}
          </pre>

          {/* Faded element to blend overflow for long values */}
          <span className="absolute w-8 h-full right-0 top-0 bg-gradient-to-r from-transparent via-transparent to-gray-900" />
        </div>

        {isSecret && (
          <Button
            type="button"
            variant="quiet"
            onPress={toggleVisibility}
            isDisabled={!canReveal}
            icon={isValueVisible ? "eye-off" : "eye"}
            iconSize="sm"
          />
        )}

        <Button
          type="button"
          ref={ButtonRef}
          variant="quiet"
          icon={
            copied && copied === "success"
              ? "check"
              : copied && copied === "failed"
              ? "x"
              : "copy"
          }
          iconSize="sm"
          onPress={copyCode}
          isDisabled={!canCopyValue}
        />
      </span>
    )
  }
)
