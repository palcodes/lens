import React, { forwardRef, useRef, useState, Key } from "react"
import cn from "classnames"
import { useSelect, HiddenSelect } from "@react-aria/select"
import { useSelectState } from "@react-stately/select"
import {
  Item as ReactAriaItem,
  Section as ReactAriaSection,
} from "@react-stately/collections"
import { CollectionChildren } from "@react-types/shared"
import { useButton } from "@react-aria/button"
import { chain, useId, mergeProps } from "@react-aria/utils"
import { useFocus } from "@react-aria/interactions"

import { useCollectionComponents } from "../../hooks/useCollectionComponents"
import {
  ListBoxOption,
  ListBoxFooter,
  ListBoxOverlay,
} from "../internal/ListBox"
import { Label } from "../label/Label"
import { Icon } from "../icon/Icon"
import { FocusRing } from "../focus-ring/FocusRing"
import { Hint } from "../internal/Hint"

export type SelectOption<OptionKey extends Key = string> =
  ListBoxOption<OptionKey>

export type SelectContainerProps<OptionKey extends Key> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** Controls if this Select should steal focus when first rendered */
  autoFocus?: boolean
  /** A list of Options to render inside this Select */
  children:
    | CollectionChildren<SelectOption<OptionKey>>
    | [CollectionChildren<SelectOption<OptionKey>>, React.ReactElement]
  /** Controls if this Select will be open by default */
  defaultOpen?: boolean
  /** Key of the Option that is selected when this Select is first rendered */
  defaultSelectedKey?: OptionKey
  /** An optional hint to show next to the Select that describes what this Select expects */
  hint?: string
  /** An optional error to show next to the Select. If a `validator` is also supplied, the `validator` takes precendence */
  error?: string
  /** Controls if this Select is disabled */
  isDisabled?: boolean
  /** A string describing what this Select represents */
  label: string
  /** Name of the value held by this Select when placed inside a form */
  name?: string
  /** A value to display in the Select when it is empty */
  placeholder?: string
  /** The current selection */
  selectedKey?: OptionKey
  /** Callback invoked when the Select's selection changes */
  onSelectionChange?: (key: OptionKey) => void
}

/**
 * A Select displays a list of options that you may choose one from. Its value can only ever be one of these options.
 */
function SelectContainer<OptionKey extends Key = string>({
  id,
  autoFocus = false,
  children,
  defaultOpen = false,
  defaultSelectedKey,
  error,
  hint,
  isDisabled = false,
  label,
  name,
  placeholder = "Select an option",
  selectedKey,
  onSelectionChange,
}: SelectContainerProps<OptionKey>) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { body, footer } = useCollectionComponents({
    children,
    footerType: ListBoxFooter,
  })

  const _hintId = useId()
  const hintId = id ? `${id}-hint` : _hintId

  const state = useSelectState({
    autoFocus,
    children: body,
    defaultOpen,
    defaultSelectedKey,
    isDisabled,
    label,
    selectedKey,
    onSelectionChange: onSelectionChange as (k: Key) => void,
  })

  const { labelProps, menuProps, triggerProps, valueProps } = useSelect(
    {
      id,
      "aria-describedby": hintId,
      autoFocus,
      children: body,
      defaultOpen,
      defaultSelectedKey,
      isDisabled,
      label,
      placeholder,
      selectedKey,
      onSelectionChange: onSelectionChange as (k: React.Key) => void,
    },
    state,
    buttonRef
  )

  const { buttonProps } = useButton({ ...triggerProps, isDisabled }, buttonRef)

  return (
    <div className="w-full">
      <Label labelProps={labelProps}>{label}</Label>
      <section className="w-full relative mt-3">
        <FocusRing autoFocus={autoFocus} within>
          <button
            ref={buttonRef}
            {...buttonProps}
            className={cn(
              "inline-flex w-full items-center",
              "rounded border border-gray-400 dark:border-gray-700",
              "px-3 py-2.5",
              "text-sm",
              {
                "text-gray-400 dark:text-gray-400": isDisabled,
                "bg-gray-100 dark:bg-gray-800": isDisabled,
                "bg-white dark:bg-gray-900": !isDisabled,
                "cursor-not-allowed": isDisabled,
              }
            )}
          >
            <div
              {...valueProps}
              lens-role="selected-option"
              className={cn("flex flex-grow items-center space-x-2", "mr-4", {
                "text-gray-400 dark:text-gray-300": !state.selectedItem,
                "text-gray-800 dark:text-gray-100": state.selectedItem,
              })}
            >
              {state.selectedItem && state.selectedItem.props.leadingIcon && (
                <Icon name={state.selectedItem.props.leadingIcon} size="sm" />
              )}
              {state.selectedItem &&
                state.selectedItem.props.leadingImageSrc && (
                  <img
                    src={state.selectedItem.props.leadingImageSrc}
                    className="rounded-full w-6"
                  />
                )}
              <span>
                {state.selectedItem ? state.selectedItem.rendered : placeholder}
              </span>
            </div>
            <Icon
              name="triangle-down"
              size="xxs"
              className="text-gray-500 dark:text-gray-500"
            />
          </button>
        </FocusRing>

        <Hint id={hintId} text={hint} error={error} />

        {state.isOpen && (
          <ListBoxOverlay
            id={id}
            label={label}
            state={state}
            listBoxProps={menuProps}
            containerRef={buttonRef}
            footer={footer}
          />
        )}
      </section>

      {/* A HiddenSelect is used to render a hidden native <select>, which enables browser form autofill support */}
      <HiddenSelect
        state={state}
        triggerRef={buttonRef}
        label={label}
        isDisabled={isDisabled}
        name={name}
      />
    </div>
  )
}

export const Select = {
  Container: SelectContainer,
  Section: ReactAriaSection,
  Option: ReactAriaItem as <Key extends string>(props: {
    key: Key
    children: string
    leadingIcon?: string
    trailingIcon?: string
    leadingImageSrc?: string
    description?: string
  }) => JSX.Element,
  Footer: ListBoxFooter,
}
