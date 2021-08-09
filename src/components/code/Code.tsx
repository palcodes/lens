import React, {
  forwardRef,
  ForwardedRef,
  useRef,
  useState,
  useEffect,
} from "react"
import cn from "classnames"

import { Button } from "../button/Button"

const COPIED_STATUS_TIMEOUT = 3000

enum CopiedStatus {
  Success = "SUCCESS",
  Failed = "FAILED",
}

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
 * ref?: A React ref to attach to the rendered Code block's copy button
 * getSecret?: A function that can be used to dynamcally fetch a value
 */
type ConditionalProps =
  | { isInline?: true; prefix?: never; ref?: never; getSecret?: never }
  | {
      isInline?: false
      prefix?: string
      ref?: ForwardedRef<HTMLButtonElement>
      getSecret?: () => string
    }

export type CodeProps = BaseProps & ConditionalProps

export const Code = forwardRef<HTMLButtonElement, CodeProps>(
  (
    { isInline = false, prefix, getSecret, children, className }: CodeProps,
    forwardedRef
  ) => {
    const _ref = useRef<HTMLButtonElement>(null)
    const ref = forwardedRef || _ref
    const [copied, setCopied] = useState<CopiedStatus | null>(null)
    const [secretValue, setSecretValue] = useState("")
    const isSecretVisible = secretValue === ""

    const handleCodeCopy = async (): Promise<void> => {
      const textToCopy = !getSecret
        ? children
        : isSecretVisible
        ? children
        : secretValue
      try {
        await navigator.clipboard.writeText(textToCopy)
        setCopied(CopiedStatus.Success)
      } catch (err) {
        setCopied(CopiedStatus.Failed)
      }
    }

    const toggleSecretVisibility = (): void => {
      if (getSecret && secretValue === "") {
        setSecretValue(getSecret())
      } else setSecretValue("")
    }

    useEffect(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(null)
        }, COPIED_STATUS_TIMEOUT)
      }
    }, [copied])

    // If no children are provided
    if (!children) {
      throw new Error("The Code component must be wrapped around a string")
    }

    return (
      <span
        className={cn(
          "relative",
          "items-center rounded-lg",
          "text-sm",
          {
            "inline-flex p-1 mx-1": isInline,
            "bg-gray-200 text-gray-800": isInline,
            "flex w-full justify-start px-4": !isInline,
            "bg-gray-900 text-gray-100": !isInline,
          },
          className
        )}
      >
        {prefix && <span className="mr-2 text-gray-500">{prefix}</span>}
        {isInline ? (
          children
        ) : (
          <span className="relative flex-grow overflow-hidden">
            <span className="flex py-3 max-w-full overflow-x-scroll">
              <pre className="font-mono whitespace-nowrap">
                {!getSecret
                  ? children
                  : isSecretVisible
                  ? children
                  : secretValue}
              </pre>
            </span>
            <span className="absolute w-8 h-full right-0 top-0 bg-gradient-to-r from-transparent via-transparent to-gray-900" />
          </span>
        )}

        {!isInline && (
          <div className="relative justify-end ml-2">
            <Button
              ref={ref}
              variant="secondary"
              icon={
                copied && copied === CopiedStatus.Success
                  ? "check"
                  : copied && copied === CopiedStatus.Failed
                  ? "x"
                  : "copy"
              }
              iconSize="sm"
              onPress={handleCodeCopy}
              isDisabled={getSecret && isSecretVisible}
            />
          </div>
        )}
        {getSecret && (
          <span className="absolute right-0 top-0 -translate-y-full text-gray-900">
            <Button variant="quiet" onPress={toggleSecretVisibility}>
              {isSecretVisible ? "show" : "hide"}
            </Button>
          </span>
        )}
      </span>
    )
  }
)
