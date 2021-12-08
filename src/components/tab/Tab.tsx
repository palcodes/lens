import { useTab, useTabList, useTabPanel } from "@react-aria/tabs"
import { Item as ReactAriaItem } from "@react-stately/collections"
import { TabListState, useTabListState } from "@react-stately/tabs"
import { CollectionChildren, Node } from "@react-types/shared"
import cn from "classnames"
import React, { useRef } from "react"
import { FocusRing } from "../focus-ring/FocusRing"

type Tab<Key extends string> = {
  key: Key
  title: string
  isDisabled?: boolean
  children: React.ReactElement
}

type TabContainerProps<TabKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** A string describing what this TabContainer represents. Required for accesibility. */
  label: string
  /** A list of Tabs (with their content) to render inside this Tab.Container */
  children: CollectionChildren<Tab<TabKey>>
  /** Key of the Tab that is active when this TabContainer is first rendered */
  defaultSelectedKey?: TabKey
  /** Key of the currently active Tab */
  selectedKey?: TabKey
  /** Callback invoked when the active Tab changes */
  onSelectionChange?: (key: TabKey) => void
}
function TabContainer<TabKey extends string>({
  id,
  label,
  children,
  defaultSelectedKey,
  selectedKey,
  onSelectionChange,
}: TabContainerProps<TabKey>) {
  const ref = useRef<HTMLDivElement>(null)

  // Building the `tabs` array using `React.Children.forEach` instead of `React.Children.toArray` makes it so React doesn't change keys
  const tabs: React.ReactElement<Tab<TabKey>>[] = []
  React.Children.forEach(children, (c) => tabs.push(c as React.ReactElement))

  const disabledKeys = tabs.filter((t) => t.props.isDisabled).map((t) => t.key!) // `!` is fine because it is required in `Tab` type

  const state = useTabListState({
    children,
    disabledKeys,
    defaultSelectedKey,
    selectedKey,
    onSelectionChange: onSelectionChange as (k: React.Key) => void,
  })
  const { tabListProps } = useTabList(
    {
      "aria-label": label,
      children,
      orientation: "horizontal",
    },
    state,
    ref
  )

  // If no tab items are provided
  if (state.collection.size < 1) {
    throw new Error("A Tab.Container must receive one or more Tab.Tab(s)")
  }

  return (
    <div id={id} className="w-full">
      <div
        {...tabListProps}
        ref={ref}
        className={cn(
          "flex",
          "border-b",
          "border-gray-400 dark:border-gray-700"
        )}
      >
        {[...state.collection].map((tab) => (
          <TabItem key={tab.key} tab={tab} state={state} />
        ))}
      </div>

      <TabContent key={state.selectedItem?.key} state={state} />
    </div>
  )
}

type TabItemProps<TabKey extends string> = {
  tab: Node<Tab<TabKey>>
  state: TabListState<Tab<TabKey>>
}
function TabItem<TabKey extends string>({ tab, state }: TabItemProps<TabKey>) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabProps } = useTab({ key: tab.key }, state, ref)
  const isSelected = state.selectedKey === tab.key
  const isDisabled = tab.props.isDisabled

  return (
    <FocusRing>
      <div
        {...tabProps}
        ref={ref}
        lens-role="tab"
        className={cn("relative py-2 mr-6 text-sm", {
          "opacity-50 cursor-not-allowed": isDisabled,
          "cursor-pointer": !isDisabled,
          "text-gray-800 dark:text-gray-300": isSelected,
          "text-gray-600 dark:text-gray-500": !isSelected,
        })}
      >
        {tab.rendered}

        {/* The bar under the selected tab */}
        {!isDisabled && (
          <span
            className={cn(
              "absolute flex left-0 w-full",
              "bg-gray-700 dark:bg-gray-400",
              {
                "opacity-100": isSelected,
                "opacity-0": !isSelected,
              }
            )}
            style={{
              height: "1px",
              bottom: "-1px",
            }}
          />
        )}
      </div>
    </FocusRing>
  )
}

type TabContentProps<TabKey extends string> = {
  state: TabListState<Tab<TabKey>>
}
function TabContent<TabKey extends string>({ state }: TabContentProps<TabKey>) {
  const ref = useRef<HTMLDivElement>(null)
  const { tabPanelProps } = useTabPanel({}, state, ref)

  return (
    <div
      {...tabPanelProps}
      ref={ref}
      className="text-sm text-gray-900 dark:text-gray-300"
    >
      {state.selectedItem?.props.children}
    </div>
  )
}

export const Tab = {
  Container: TabContainer,
  Tab: ReactAriaItem as <Key extends string>(
    props: Tab<Key>
  ) => React.ReactElement,
}
