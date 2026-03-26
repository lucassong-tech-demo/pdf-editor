import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "highlight"
  padding?: "sm" | "md" | "lg"
}

const variantClasses: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "",
  interactive: "transition-colors hover:border-[hsl(var(--grey-400))] hover:bg-[hsl(var(--grey-100))]",
  highlight: "border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary-light))]",
}

const paddingClasses: Record<NonNullable<CardProps["padding"]>, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
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
        "rounded-[var(--radius-lg)] border border-[hsl(var(--grey-300))] bg-[hsl(var(--white))]",
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
      {...props}
    />
  )
}
