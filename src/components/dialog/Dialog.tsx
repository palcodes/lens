import React, { Children, createContext, useContext, useRef } from "react"
import cn from "classnames"
import { useDialog } from "@react-aria/dialog"
import { FocusScope } from "@react-aria/focus"
import { PressResponder } from "@react-aria/interactions"
import {
  DismissButton,
  OverlayContainer,
  useModal,
  useOverlay,
  usePreventScroll,
} from "@react-aria/overlays"
import { chain, mergeProps } from "@react-aria/utils"
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from "@react-stately/overlays"
import { Icon } from "../icon/Icon"
import { Title } from "../title/Title"
import { Subtitle } from "../subtitle/Subtitle"

interface DialogContext {
  title: string
  subtitle: string
  icon: string
  shouldCloseOnBlur?: boolean
  close: OverlayTriggerState["close"]
}

const DialogContext = createContext<DialogContext>(null as any) // `as any is fine because the Context Provider will correctly initialize it

/* The Dialog's Container */
type DialogContainerProps = {
  /** The dialog's trigger and its body, in order */
  children: [React.ReactElement, (close: () => void) => React.ReactElement]
  /** Title of the dialog */
  title: string
  /** A short description about what this dialog accomplishes. */
  subtitle: string
  /** A decorative icon */
  icon: string
  /** Controls if this dialog is open by default (when mounted) */
  defaultOpen?: boolean
  /** Controls if this dialog should close when it goes out of focus */
  shouldCloseOnBlur?: boolean
  /** Callback invoked when this Dialog is closed */
  onClose?: () => void
}

function DialogContainer({
  children,
  title,
  subtitle,
  icon,
  defaultOpen,
  shouldCloseOnBlur = true,
  onClose,
}: DialogContainerProps) {
  if (!Array.isArray(children)) {
    throw new Error("A Dialog.Container must receive an array of children")
  }
  if (children.length < 2 || children.length > 3) {
    throw new Error(
      "A Dialog.Container must have exactly two or three children"
    )
  }

  const [trigger, content] = children
  const state = useOverlayTriggerState({
    defaultOpen,
  })

  return (
    <DialogContext.Provider
      value={{
        title,
        subtitle,
        icon,
        shouldCloseOnBlur,
        close: chain(state.close, onClose),
      }}
    >
      <PressResponder isPressed={state.isOpen} onPress={state.toggle}>
        {trigger}
      </PressResponder>

      {state.isOpen && content(state.close)}
    </DialogContext.Provider>
  )
}

/** The Dialog's Body that will be visible when opened */
export type DialogBodyProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The Dialog's body and footer, in order */
  children: React.ReactElement | [React.ReactElement, React.ReactElement]
}

function DialogBody({ id, children }: DialogBodyProps) {
  const [body, footer] = Children.toArray(children)
  const { title, subtitle, icon, shouldCloseOnBlur, close } =
    useContext(DialogContext)

  const ref = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: shouldCloseOnBlur,
      onClose: close,
    },
    ref
  )

  usePreventScroll()
  const { modalProps } = useModal()
  const { dialogProps, titleProps } = useDialog(
    {
      id,
      role: "dialog",
    },
    ref
  )

  return (
    <OverlayContainer>
      <div
        lens-role="dialog-body"
        className={cn(
          "fixed inset-0 z-30",
          "flex justify-center items-center",
          "bg-black-fade-50"
        )}
      >
        <FocusScope contain autoFocus restoreFocus>
          <DismissButton onDismiss={close} />
          <div
            ref={ref}
            {...mergeProps(overlayProps, modalProps, dialogProps)}
            className={cn(
              "overflow-hidden",
              "bg-gray-100 dark:bg-gray-800",
              "rounded-md shadow-md",
              "animate-dialog-enter"
            )}
            style={{ width: 580 }}
          >
            <section
              lens-role="title-group"
              className={cn(
                "flex items-center",
                "py-4 px-6",
                "bg-white dark:bg-gray-900",
                "border-b border-gray-300 dark:border-gray-600"
              )}
            >
              <Icon
                name={icon}
                size="lg"
                className="text-gray-400 dark:text-gray-300"
              />
              <div className="flex-column ml-6">
                <div className="font-barlow font-light text-xl text-gray-800 dark:text-gray-100">
                  {title}
                </div>
                <div className="font-light text-sm text-gray-600">
                  {subtitle}
                </div>
              </div>
            </section>

            <section
              lens-role="dialog-body"
              className={cn(
                "px-6 py-4",
                "border-b border-gray-300 dark:border-gray-600"
              )}
            >
              {body}
            </section>

            {footer}
          </div>
          <DismissButton onDismiss={close} />
        </FocusScope>
      </div>
    </OverlayContainer>
  )
}

export type DialogFooterProps = {
  /** Content of the footer, ideally a Button or a ButtonGroup. */
  children: React.ReactElement
}

function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div lens-role="dialog-footer" className="px-6 py-4">
      {children}
    </div>
  )
}

export const Dialog = {
  Container: DialogContainer,
  Body: DialogBody,
  Footer: DialogFooter,
}
