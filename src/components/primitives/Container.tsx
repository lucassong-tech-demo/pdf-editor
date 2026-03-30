import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide"
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-[1024px]",
  narrow: "max-w-[980px]",
  wide: "max-w-[1320px]",
}

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 md:px-6 lg:px-8", sizeClasses[size], className)} {...props} />
}
