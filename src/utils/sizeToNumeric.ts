export type Size = "xxs" | "xs" | "sm" | "md" | "lg" | "xl"

export function sizeToNumeric(size: Size): number {
  switch (size) {
    case "xxs":
      return 9
    case "xs":
      return 12
    case "sm":
      return 16
    case "md":
      return 24
    case "lg":
      return 32
    case "xl":
      return 64
  }
}
