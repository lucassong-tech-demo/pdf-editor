import type { ReactNode } from "react"
import { Card } from "../primitives/Card"
import { cn } from "../../lib/cn"

export interface StepCardProps {
  step: number
  title: string
  description: string
  visual?: ReactNode
  className?: string
}

export function StepCard({ step, title, description, visual, className }: StepCardProps) {
  return (
    <div className={cn("step-card", className)}>
      <div className="step-card__visual">
        <span className="step-card__badge">
          {step}.
        </span>
        <div className="step-card__slot">{visual ?? <span>Step {step}</span>}</div>
      </div>

      <Card variant="default" padding="sm" className="step-card__body">
        <h3 className="step-card__title">/ {title}</h3>
        <p className="step-card__desc">{description}</p>
      </Card>
    </div>
  )
}
