import * as React from "react"

import { DismissButton, useOverlay } from "@react-aria/overlays"
import { FocusScope } from "@react-aria/focus"

interface PopoverProps {
  popoverRef?: React.RefObject<HTMLDivElement>
  children: React.ReactNode
  isOpen?: boolean
  onClose: () => void
}

export function Popover(props: PopoverProps) {
  let ref = React.useRef<HTMLDivElement>(null)
  let { popoverRef = ref, isOpen, onClose, children } = props

  let { overlayProps } = useOverlay(
    {
      isOpen,
      onClose,
      shouldCloseOnBlur: true,
      isDismissable: false,
    },
    popoverRef
  )

  return (
    <FocusScope restoreFocus>
      <div
        {...overlayProps}
        ref={popoverRef}
        /*
          I have removed "w-full" to allow the list box width to be more than the selected item
          It still has a max width for restriction
        */
        className="absolute top-full shadow-lg border border-gray-300 bg-white rounded-md mt-2"
        style={{ zIndex: 999, maxWidth: "220px" }}
      >
        {children}
        <DismissButton onDismiss={onClose} />
      </div>
    </FocusScope>
  )
}
