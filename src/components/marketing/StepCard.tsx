import type { ReactNode } from "react"
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
    <div className={cn("flex flex-col gap-7", className)}>
      <div className="relative rounded-[var(--radius-2xl)] bg-[hsl(var(--primary-light))] p-4">
        <span className="absolute top-0 left-0 flex size-7 items-center justify-center bg-[hsl(var(--primary))] text-base font-semibold text-[hsl(var(--white))]">
          {step}.
        </span>
        <div className="flex min-h-[120px] items-center justify-center text-[hsl(var(--primary))]">
          {visual ?? <span>Step {step}</span>}
        </div>
      </div>

      <div className="p-0">
        <h3 className="m-0 text-[var(--text-subtitle-3)] leading-[1.3] font-semibold !text-[#3d99f5]">
          / {title}
        </h3>
        <p className="mt-2 text-[var(--text-body-1)] leading-[1.7] !text-[#3d99f5]">{description}</p>
      </div>
    </div>
  )
}
