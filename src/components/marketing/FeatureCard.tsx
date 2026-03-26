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
      className={cn("feature-card", className)}
    >
      <div className="feature-card__icon">
        {icon ?? <span>PDF</span>}
      </div>

      <div>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__desc">{description}</p>
      </div>

      <span className="feature-card__action">
        {actionLabel}
      </span>
    </Card>
  )
}
