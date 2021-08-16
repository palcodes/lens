import React from "react"
import "@fontsource/inter"
import "@fontsource/barlow"
import "@fontsource/jetbrains-mono"

type Props = React.PropsWithChildren<{}>

export function LensProvider({ children }: Props) {
  return <>{children}</>
}
