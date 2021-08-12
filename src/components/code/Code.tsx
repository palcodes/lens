import React, { forwardRef, useState, useEffect } from "react"
import cn from "classnames"

import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"

const COPIED_STATUS_TIMEOUT = 3000
const DEFAULT_SECRET_TEXT = "************"

enum CopiedStatus {
  Success = "SUCCESS",
  Failed = "FAILED",
}

interface CommonProps {
  /** Text value to be styled as code like representation */
  value: string
  /** prefix?: string (Optional string to render with a non inline Code block) */
  prefix?: string
  /** Additional classes that will be spread over the icon. Avoid changing the Icon visually. */
  className?: string
}

/**
 * Narrowing conditions, highlighting possible paths of execution
 * isSecret?: Controls if the Code component holds sensitive data that is not to be revealed immediately
 * secretText?: Optional masked value for sensitive data.
 * canReveal?: Stipulates if the user has permission to reveal sensitive data or not
 */
type ConditionalProps =
  | {
      isSecret?: false
      secretText?: never
      canReveal?: never
    }
  | {
      isSecret: true
      secretText?: string
      canReveal?: boolean
    }

export type CodeProps = CommonProps & ConditionalProps

export const Code = forwardRef<HTMLButtonElement, CodeProps>(
  (
    {
      value,
      prefix,
      className,
      isSecret,
      secretText = DEFAULT_SECRET_TEXT,
      canReveal,
    }: CodeProps,
    ButtonRef
  ) => {
    const [isValueVisible, setIsValueVisible] = useState(
      isSecret ? false : true
    )
    const [copied, setCopied] = useState<CopiedStatus | null>(null)
    const canCopyValue = !isSecret || (isSecret && canReveal)

    const toggleVisibility = async (): Promise<void> => {
      setIsValueVisible(!isValueVisible)
    }

    const copyCode = async (): Promise<void> => {
      try {
        await navigator.clipboard.writeText(value)
        setCopied(CopiedStatus.Success)
      } catch (err) {
        setCopied(CopiedStatus.Failed)
      }
    }

    useEffect(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(null)
        }, COPIED_STATUS_TIMEOUT)
      }
    }, [copied])

    return (
      <span
        className={cn(
          "relative flex justify-start items-center w-full px-4",
          "text-sm rounded-lg",
          "bg-gray-900 text-gray-100",
          className
        )}
      >
        {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}
        <span className="relative flex-grow overflow-hidden">
          <span className="flex py-3 max-w-full overflow-x-auto">
            <pre className="font-mono whitespace-nowrap">
              {isValueVisible ? value : secretText}
            </pre>
          </span>
          {/* Faded element to blend overflow for long values */}
          <span className="absolute w-8 h-full right-0 top-0 bg-gradient-to-r from-transparent via-transparent to-gray-900" />
        </span>

        {/* Button to toggle visibility */}
        {isSecret && (
          <div>
            <Button
              variant="quiet"
              onPress={toggleVisibility}
              isDisabled={!canReveal}
            >
              <Icon
                name={isValueVisible ? "eye-off" : "eye"}
                size="sm"
                className={cn({
                  "text-gray-200 hover:text-gray-300": canReveal,
                  "text-gray-500": !canReveal,
                })}
              />
            </Button>
          </div>
        )}

        {/* Button to copy code */}
        <div className="relative justify-end ml-2">
          <Button
            ref={ButtonRef}
            variant="secondary"
            icon={
              copied && copied === CopiedStatus.Success
                ? "check"
                : copied && copied === CopiedStatus.Failed
                ? "x"
                : "copy"
            }
            iconSize="sm"
            onPress={copyCode}
            isDisabled={!canCopyValue}
          />
        </div>
      </span>
    )
  }
)
