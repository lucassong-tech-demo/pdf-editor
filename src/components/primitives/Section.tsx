import type { HTMLAttributes } from "react"
import { cn } from "../../lib/cn"

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: "white" | "soft"
  spacing?: "md" | "lg"
}

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  white: "ui-section--white",
  soft: "ui-section--soft",
}

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  md: "ui-section--md",
  lg: "ui-section--lg",
}

export function Section({ tone = "white", spacing = "md", className, ...props }: SectionProps) {
  return <section className={cn("ui-section", toneClasses[tone], spacingClasses[spacing], className)} {...props} />
}
