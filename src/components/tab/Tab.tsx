import React, { useRef } from "react"
import cn from "classnames"

import { useTabList, useTab, useTabPanel } from "@react-aria/tabs"
import { useTabListState, TabListState } from "@react-stately/tabs"
import { Item as ReactAriaItem } from "@react-stately/collections"
import { CollectionChildren, Node } from "@react-types/shared"

type Tab<Key extends string> = {
  key: Key
  title: string
  dataKey: string
  isDisabled?: boolean
  children: React.ReactElement
}

type TabContainerProps<TabKey extends string> = {
  /** An HTML ID attribute that will be attached to the the rendered component. Useful for targeting it from tests */
  id?: string
  /** A list of Tabs (with their content) to render inside this Tab.Container */
  children: CollectionChildren<Tab<TabKey>>
}
function TabContainer<TabKey extends string>({
  id,
  children,
}: TabContainerProps<TabKey>) {
  const ref = useRef<HTMLDivElement>(null)

  const disabledKeys = React.Children.toArray(children)
    .filter((child) => {
      return child.props.isDisabled
    })
    .map((child) => {
      return child.props.dataKey
    })

  const state = useTabListState({ children, disabledKeys: disabledKeys })
  const { tabListProps } = useTabList(
    { children, disabledKeys: [] },
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
          "flex mb-8",
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
    <div
      {...tabProps}
      ref={ref}
      lens-role="tab"
      className={cn("relative py-2 mr-4 text-sm", {
        "opacity-50 cursor-not-allowed": isDisabled,
        "cursor-pointer": !isDisabled,
        "text-gray-800 dark:text-gray-600": isSelected,
        "text-gray-600 dark:text-gray-800": !isSelected,
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
      className="text-sm text-gray-900 dark:text-gray-600"
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
