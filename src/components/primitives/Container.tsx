import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide"
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "ui-container--default",
  narrow: "ui-container--narrow",
  wide: "ui-container--wide",
}

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("ui-container", sizeClasses[size], className)} {...props} />
}
