import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "highlight"
  padding?: "sm" | "md" | "lg"
}

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "ui-card--default",
  interactive: "ui-card--interactive",
  highlight: "ui-card--highlight",
}

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  sm: "ui-card--pad-sm",
  md: "ui-card--pad-md",
  lg: "ui-card--pad-lg",
}

export function Card({
  variant = "default",
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "ui-card",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  )
}
