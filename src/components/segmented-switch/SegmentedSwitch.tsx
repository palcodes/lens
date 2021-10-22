import { useButton } from "@react-aria/button"
import cn from "classnames"
import React, {
  forwardRef,
  Key,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useRef,
} from "react"
import { FocusRing } from "../focus-ring/FocusRing"
import { Icon, IconProps } from "../icon/Icon"

type Context<SegmentKey extends string> = {
  active?: SegmentKey
  onChange: (key: SegmentKey) => void
}
const SwitchContext = createContext(null as any) // `as any` is okay because this value will never actually be used

type ContainerProps<SegmentKey extends string> = PropsWithChildren<{
  /** The initially selected key */
  defaultActive?: SegmentKey
  /** A callback that will be called when the active Segment changes */
  onChange?: (key: SegmentKey) => void
}>

function Container<SegmentKey extends string = string>({
  children,
  defaultActive,
  onChange,
}: ContainerProps<SegmentKey>) {
  const [active, setActive] = useState(defaultActive)

  return (
    <SwitchContext.Provider
      value={{
        active,
        onChange: (k: SegmentKey) => {
          setActive(k)
          onChange?.(k)
        },
      }}
    >
      <div className="flex w-full my-6">{children}</div>
    </SwitchContext.Provider>
  )
}

type SegmentProps<SegmentKey extends string> = {
  /** A unique identifier for this Option. This will also be attached as the HTML id that will be attached to this `Option` */
  id: SegmentKey
  /** The text to render inside this Option */
  title: string
  /** An icon to render with this Option's title */
  icon?: IconProps["name"]
  /** Controls if this Option is not allowed to be selected */
  isDisabled?: boolean
}

function Segment<SegmentKey extends string = string>({
  id,
  title,
  icon,
  isDisabled,
}: SegmentProps<SegmentKey>) {
  const ref = useRef<HTMLButtonElement>(null)
  const { active, onChange } = useContext(SwitchContext)
  const { buttonProps } = useButton({ id, isDisabled }, ref)
  const isActive = active === id

  return (
    <FocusRing within>
      <button
        ref={ref}
        {...buttonProps}
        className={cn(
          "flex items-center space-x-2",
          "border border-gray-400 dark:border-gray-700",
          "bg-white dark:bg-gray-900",
          "text-sm text-gray-900 dark:text-gray-100",
          "first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md",
          {
            "flex-1 p-4": icon,
            "px-6 py-1 justify-center": !icon,
            "font-medium": icon || isActive,
            "ring-1 ring-inset ring-green-600 border-green-600 dark:ring-green-500 dark:border-green-500":
              isActive,
            "cursor-not-allowed opacity-50": isDisabled,
          }
        )}
        onClick={(_) => onChange(id)}
        disabled={isDisabled}
        lens-role="button"
        active={String(isActive)}
      >
        {icon && (
          <div
            className="rounded bg-green-100 flex items-center justify-center"
            style={{ width: "22px", height: "22px" }}
          >
            <Icon name={icon} size="sm" className="text-green-900" />
          </div>
        )}

        <span>{title}</span>
      </button>
    </FocusRing>
  )
}

export const SegmentedSwitch = {
  Container: Container,
  Segment,
}
