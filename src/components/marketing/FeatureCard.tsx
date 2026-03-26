import type { ReactNode } from "react"
import { Card } from "../primitives/Card"
import { cn } from "../../lib/cn"

export interface FeatureCardProps {
  title: string
  description: string
  icon?: ReactNode
  actionLabel?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  actionLabel = "Start",
  className,
}: FeatureCardProps) {
  return (
    <Card
      variant="interactive"
      padding="md"
      className={cn("group flex min-h-[220px] flex-col justify-between gap-6", className)}
    >
      <div className="flex size-[52px] items-center justify-center rounded-full bg-[hsl(var(--primary-light))] text-[hsl(var(--primary))]">
        {icon ?? <span>PDF</span>}
      </div>

      <div>
        <h3 className="m-0 text-[var(--text-subtitle-3)] font-semibold">{title}</h3>
        <p className="mt-2 text-[var(--text-body-1)] leading-[1.7] text-[hsl(var(--grey-600))]">{description}</p>
      </div>

      <span className="pointer-events-none inline-flex w-fit translate-y-1 rounded-[var(--radius-lg)] border border-[hsl(var(--grey-300))] px-4 py-2 text-[var(--text-body-1)] font-semibold !text-[#3d99f5] opacity-0 transition-[border-color,background-color,opacity,transform] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100 hover:border-[hsl(var(--grey-400))] hover:bg-[hsl(var(--grey-200))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--primary)/0.25)] focus-visible:outline-offset-1">
        {actionLabel}
      </span>
    </Card>
  )
}
