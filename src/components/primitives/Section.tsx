import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "white" | "soft"
  spacing?: "md" | "lg"
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "bg-[hsl(var(--grey-100))]",
  soft: "bg-[hsl(var(--grey-100))]",
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  md: "py-12 md:py-16",
  lg: "py-16 pb-24 md:py-20 md:pb-28",
}

export function Section({ tone = "white", spacing = "md", className, ...props }: SectionProps) {
  return <section className={cn(toneClasses[tone], spacingClasses[spacing], className)} {...props} />
}
