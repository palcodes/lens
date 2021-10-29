import React, { FC } from "react"

type PickerFooterProps = {
  children: React.ReactNode
}

export const PickerFooter: FC<PickerFooterProps> = ({
  children,
}: PickerFooterProps) => {
  return <div className="p-1 border-t border-gray-300">{children}</div>
}
