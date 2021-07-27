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
import { mergeProps } from "@react-aria/utils"
import {
  OverlayTriggerState,
  useOverlayTriggerState,
} from "@react-stately/overlays"
import { TitleGroup } from "../../typography/title-group/TitleGroup"
import { Button } from "../button/Button"

interface DialogState {
  title: string
  subtitle: string
  icon: string
  isEmbedded?: boolean
  dimensions?: DOMRect
  shouldCloseOnBlur?: boolean
  close: OverlayTriggerState["close"]
}

const defaultFn = (): void | Promise<void> => {
  console.warn(`Context not ready!`)
}

const initialDialogState: DialogState = {
  title: "",
  subtitle: "",
  icon: "user",
  close: defaultFn,
}

const DialogContext = createContext(initialDialogState)

/* The Dialog's Container */
interface BaseDialogContainerProps {
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
}

type EmbeddedDialogContainerProps =
  | { isEmbedded?: true; dimensions: DOMRect }
  | { isEmbedded?: false; dimensions?: never }

type DialogContainerProps = BaseDialogContainerProps &
  EmbeddedDialogContainerProps

function DialogContainer({
  children,
  title,
  subtitle,
  icon,
  defaultOpen,
  shouldCloseOnBlur = true,
  isEmbedded = false,
  dimensions,
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

  const value = {
    title,
    subtitle,
    icon,
    shouldCloseOnBlur,
    isEmbedded,
    dimensions,
    close: state.close,
  }

  return (
    <DialogContext.Provider value={value}>
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
  const {
    title,
    subtitle,
    icon,
    shouldCloseOnBlur,
    isEmbedded,
    dimensions,
    close,
  } = useContext(DialogContext)

  const ref = useRef<HTMLDivElement>(null)
  const { overlayProps } = useOverlay(
    {
      isDismissable: true,
      shouldCloseOnBlur: shouldCloseOnBlur,
      onClose: close,
    },
    ref
  )

  !isEmbedded && usePreventScroll()
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
          "flex justify-center items-center",
          "bg-black-fade-50",
          { "fixed inset-0 z-30": !isEmbedded },
          { absolute: isEmbedded }
        )}
        style={{
          left: isEmbedded ? dimensions?.left : 0,
          top: isEmbedded ? dimensions?.top : 0,
          width: isEmbedded ? dimensions?.width : "100%",
          height: isEmbedded ? dimensions?.height : "100%",
        }}
      >
        <FocusScope contain autoFocus restoreFocus>
          <DismissButton onDismiss={close} />
          <div
            ref={ref}
            {...mergeProps(overlayProps, modalProps, dialogProps)}
            className={cn(
              "overflow-hidden",
              { "h-full w-full": isEmbedded },
              { "bg-white dark:bg-gray-900": isEmbedded },
              { "bg-gray-100 dark:bg-gray-800": !isEmbedded },
              { "rounded-md shadow-md": !isEmbedded },
              { "animate-dialog-enter": !isEmbedded }
            )}
            style={!isEmbedded ? { width: "580px" } : {}}
          >
            <div
              className={cn({
                "flex items-center justify-between px-6": isEmbedded,
              })}
            >
              <TitleGroup
                title={title}
                subtitle={subtitle}
                icon={icon}
                titleProps={titleProps}
                className={cn("py-4", "bg-white dark:bg-gray-900", {
                  "px-6 border-b border-gray-300 dark:border-gray-600":
                    !isEmbedded,
                })}
              />
              {isEmbedded && (
                <Button
                  variant="quiet"
                  icon="x"
                  iconSize="md"
                  onPress={close}
                />
              )}
            </div>

            <section
              lens-role="dialog-body"
              className={cn("px-6 py-4", {
                "border-b border-gray-300 dark:border-gray-600": !isEmbedded,
              })}
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
    <div lens-role="dialog-footer" className="px-3 py-2">
      {children}
    </div>
  )
}

export const Dialog = {
  Container: DialogContainer,
  Body: DialogBody,
  Footer: DialogFooter,
}
