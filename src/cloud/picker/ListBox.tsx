import React, { useRef, RefObject, useState } from "react"
import type { AriaListBoxOptions } from "@react-aria/listbox"
import type { ListState } from "@react-stately/list"
import type { Node } from "@react-types/shared"
import cn from "classnames"
import { useListBox, useListBoxSection, useOption } from "@react-aria/listbox"

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>
  state: ListState<unknown>
  footer?: React.ReactElement
}

interface SectionProps {
  section: Node<unknown>
  state: ListState<unknown>
}

interface OptionProps {
  item: Node<unknown>
  state: ListState<unknown>
}

export function ListBox(props: ListBoxProps) {
  let ref = useRef<HTMLUListElement>(null)
  let { listBoxRef = ref, state } = props
  let { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <div>
      <ul
        {...listBoxProps}
        ref={listBoxRef}
        className="max-h-96 overflow-auto outline-none"
      >
        {[...state.collection].map((item) =>
          item.type === "section" ? (
            <ListBoxSection key={item.key} section={item} state={state} />
          ) : (
            <Option key={item.key} item={item} state={state} />
          )
        )}
        {props.footer && <li>{props.footer}</li>}
      </ul>
    </div>
  )
}

function ListBoxSection({ section, state }: SectionProps) {
  let { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"],
  })

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span
            {...headingProps}
            className="text-xs uppercase text-gray-500 mx-3"
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  )
}

function Option({ item, state }: OptionProps) {
  let ref = useRef<HTMLLIElement>(null)
  let { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  )

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn(
        "m-1 rounded-md py-2 px-2 text-sm text-gray-800 outline-none cursor-pointer flex items-center justify-between",
        {
          "font-semibold": isSelected,
          "bg-gray-100": isFocused || isSelected,
          "text-gray-400": isDisabled,
        }
      )}
    >
      <span className="overflow-ellipsis max-w-full whitespace-nowrap overflow-hidden cursor-pointer">
        {item.rendered}
      </span>
    </li>
  )
}
