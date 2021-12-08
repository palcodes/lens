import { useButton } from "@react-aria/button"
import { PressResponder } from "@react-aria/interactions"
import {
  useMenu,
  useMenuItem,
  useMenuSection,
  useMenuTrigger,
} from "@react-aria/menu"
import {
  DismissButton,
  OverlayContainer,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays"
import { mergeProps } from "@react-aria/utils"
import {
  Item as ReactAriaItem,
  Section as ReactAriaSection,
} from "@react-stately/collections"
import { MenuTriggerState, useMenuTriggerState } from "@react-stately/menu"
import { TreeState, useTreeState } from "@react-stately/tree"
import {
  CollectionChildren,
  ItemProps as ReactAriaItemProps,
  Node,
  SectionProps as ReactAriaSectionProps,
} from "@react-types/shared"
import cn from "classnames"
import React, { Children, createContext, Key, useContext, useRef } from "react"

type MenuContext = {
  triggerRef: React.RefObject<HTMLElement>
  menuProps: React.HTMLAttributes<HTMLUListElement>
  close: MenuTriggerState["close"]
}
// @ts-expect-error: We cannot provide a valid initial value, but TSC does not understand that it is okay
const MenuContext = createContext<MenuContext>(null)

/** Value for a single Option inside this Menu */
export type MenuOption<OptionKey extends Key = string> = {
  /** A string that uniquely identifies this option */
  key: OptionKey
  /** The main text to display within this option */
  title: string
  /** Sub-options for this option */
  children?: MenuOption<OptionKey>[]
}

export type MenuContainerProps = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** The menu's trigger and its body, in order */
  children: [React.ReactElement, React.ReactElement]
  /** Controls if this Menu will be open by default */
  defaultOpen?: boolean
  /** Controls if this Menu is disabled */
  isDisabled?: boolean
}

/**
 * A Menu is an overlay that allows you select a single option, then disappears
 */
function MenuContainer({
  id,
  children,
  defaultOpen,
  isDisabled,
}: MenuContainerProps) {
  if (!Array.isArray(children) || children.length !== 2) {
    throw new Error("Menu.Container must have exactly two children")
  }

  const [trigger, content] = Children.toArray(children)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const state = useMenuTriggerState({
    defaultOpen,
    closeOnSelect: true,
    shouldFlip: true,
  })
  const { buttonProps, isPressed } = useButton({ isDisabled }, triggerRef)
  const { menuProps, menuTriggerProps } = useMenuTrigger(
    { ...buttonProps, type: "menu" },
    state,
    triggerRef
  )

  return (
    <section className="flex relative">
      <PressResponder
        ref={triggerRef}
        {...menuTriggerProps}
        isPressed={isPressed}
      >
        {trigger}
      </PressResponder>

      <MenuContext.Provider
        value={{ triggerRef, menuProps, close: state.close }}
      >
        {state.isOpen && content}
      </MenuContext.Provider>
    </section>
  )
}

export type MenuBodyProps<OptionKey extends Key = string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Children to render */
  children: CollectionChildren<MenuOption<OptionKey>>
  /** A string describing what this Menu represents */
  title: string
  /** Options for a user to anchor the menu  */
  anchor?: "left" | "right"
  /** Callback invoked when the Menu's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * Container for all Menu Sections and Options
 */
function MenuBody<OptionKey extends Key = string>({
  id,
  children,
  title,
  anchor,
  onSelectionChange,
}: MenuBodyProps<OptionKey>) {
  const context = useContext(MenuContext)

  const ref = useRef<HTMLUListElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const state = useTreeState({
    children,
    selectionMode: "none",
  })
  const { menuProps } = useMenu(
    {
      id,
      children,
      "aria-label": title,
    },
    state,
    ref
  )
  const { overlayProps } = useOverlay(
    { isDismissable: true, shouldCloseOnBlur: true, onClose: context.close },
    overlayRef
  )
  const { overlayProps: positionProps, placement } = useOverlayPosition({
    overlayRef,
    targetRef: context.triggerRef,
    offset: 8,
    containerPadding: 0,
    onClose: context.close,
    shouldFlip: true,
  })
  // Figure out trigger dimensions so we can size the overlay
  const triggerDimensions = context.triggerRef.current?.getBoundingClientRect()
  // Useful for anchoring calculations
  const overlayDimensions = overlayRef.current?.getBoundingClientRect()

  /** Override the overlay positioning if an anchor is provided
   * default to center alignment
   */
  let leftPositioning = null
  if (triggerDimensions && overlayDimensions) {
    leftPositioning =
      anchor === "left"
        ? triggerDimensions?.x
        : anchor === "right"
        ? triggerDimensions?.x -
          (overlayDimensions?.width - triggerDimensions?.width)
        : triggerDimensions?.x -
          (overlayDimensions?.width - triggerDimensions?.width) / 2
  }

  const menuBodyStyles = {
    ...positionProps.style,
    minWidth: triggerDimensions?.width,
  }

  if (leftPositioning) {
    menuBodyStyles["left"] = leftPositioning
  }

  return (
    <OverlayContainer>
      <div
        lens-role="menu-body"
        ref={overlayRef}
        {...mergeProps(positionProps, overlayProps)}
        style={menuBodyStyles}
      >
        <DismissButton onDismiss={context.close} />
        <ul
          ref={ref}
          {...mergeProps(context.menuProps, menuProps)}
          className={cn(
            "p-2 min-w-min overflow-auto",
            "rounded-md shadow-md border border-gray-300 dark:border-gray-700",
            "bg-white dark:bg-gray-900 text-sm text-gray-800 dark:text-gray-100",
            {
              "animate-slide-bottom": placement === "top",
              "animate-slide-top": placement === "bottom",
            }
          )}
          style={{ maxHeight: "inherit" }}
        >
          {[...state.collection].map((option) => {
            if (option.type === "section") {
              return (
                <MenuSection
                  key={option.key}
                  title={option.rendered as string}
                  state={state}
                  section={option}
                  onAction={onSelectionChange}
                />
              )
            } else if (option.type === "item") {
              return (
                <MenuOption
                  key={option.key}
                  option={option}
                  state={state}
                  onAction={onSelectionChange}
                />
              )
            } else {
              return null
            }
          })}
        </ul>
        <DismissButton onDismiss={context.close} />
      </div>
    </OverlayContainer>
  )
}

type MenuSectionProps<OptionKey extends Key = string> = {
  /** Title for this Section */
  title: string
  /** A group of similar options, only visual */
  section: Node<MenuOption<OptionKey>>
  /** The global Menu state */
  state: TreeState<any>
  /** Callback invoked when an option inside this Section is selected */
  onAction?: (key: OptionKey) => void
}

/**
 * A divided section of the Menu that may contain other options within
 */
function MenuSection<SectionKey extends Key = string>({
  title,
  section,
  state,
  onAction,
}: MenuSectionProps<SectionKey>) {
  const {
    groupProps,
    headingProps,
    itemProps: optionProps,
  } = useMenuSection({
    heading: title,
    "aria-label": title,
  })

  return (
    <section lens-role="menu-section" {...groupProps} className={cn("p-2")}>
      <div
        {...headingProps}
        className={cn(
          "mb-2",
          "text-xs uppercase text-gray-500 dark:text-gray-400",
          "select-none"
        )}
      >
        {title}
      </div>
      <li {...optionProps}>
        <ul>
          {[...section.childNodes].map((i) => (
            <MenuOption
              key={i.key}
              option={i}
              state={state}
              onAction={onAction}
            />
          ))}
        </ul>
      </li>
    </section>
  )
}

type MenuOptionProps<OptionKey extends Key = string> = {
  /** The option to render */
  option: Node<MenuOption<OptionKey>>
  /** The global Menu state */
  state: TreeState<any>
  /** Callback invoked when this option is selected */
  onAction?: (key: OptionKey) => void
}

/** A single Menu Option */
function MenuOption<OptionKey extends Key = string>({
  option,
  state,
  onAction,
}: MenuOptionProps<OptionKey>) {
  const context = useContext(MenuContext)
  const ref = useRef<HTMLLIElement>(null)

  const isFocused = state.selectionManager.focusedKey === option.key
  const { menuItemProps: menuOptionProps } = useMenuItem(
    {
      key: option.key,
      onAction: onAction as (k: Key) => void,
      closeOnSelect: true,
      onClose: context.close,
    },
    state,
    ref
  )

  return (
    <li
      lens-role="menu-option"
      ref={ref}
      {...menuOptionProps}
      className={cn(
        "rounded-md px-2 py-1",
        "cursor-pointer",
        {
          "bg-gray-100 dark:bg-gray-800": isFocused,
        },
        "hover:bg-gray-100"
      )}
    >
      {option.rendered || option.value.title}
    </li>
  )
}

export const Menu = {
  Container: MenuContainer,
  Section: ReactAriaSection as <SectionKey extends Key = string>(
    props: ReactAriaSectionProps<SectionKey>
  ) => JSX.Element,
  Option: ReactAriaItem as <OptionKey extends Key = string>(
    props: ReactAriaItemProps<OptionKey>
  ) => JSX.Element,
  Body: MenuBody,
}
