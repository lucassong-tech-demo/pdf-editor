import type { ReactNode } from "react"
import { Button } from "../primitives/Button"
import { cn } from "../../lib/cn"

export interface UploadPanelProps {
  title: string
  description: ReactNode
  primaryLabel?: string
  secondaryLabel?: string
  onUploadPdf?: () => void
  onCreateDocument?: () => void
  visual?: ReactNode
  className?: string
}

export function UploadPanel({
  title,
  description,
  primaryLabel = "Upload PDF",
  secondaryLabel = "Create new document",
  onUploadPdf,
  onCreateDocument,
  visual,
  className,
}: UploadPanelProps) {
  return (
    <div
      className={cn(
        "group relative mx-auto w-full max-w-[628px] rounded-[28px] bg-[hsl(var(--grey-200))] p-2 transition-[background-color,box-shadow] hover:bg-[hsl(var(--primary-light))] hover:shadow-[0_1px_4px_0_hsl(var(--primary-light)/0.5),0_1px_8px_2px_hsl(var(--primary)/0.16)] focus-within:bg-[hsl(var(--primary-light))] focus-within:shadow-[0_1px_4px_0_hsl(var(--primary-light)/0.5),0_1px_8px_2px_hsl(var(--primary)/0.16)] focus-within:outline-2 focus-within:outline-[hsl(var(--primary)/0.25)] md:p-3",
        className,
      )}
    >
      <div className="flex min-h-[328px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[hsl(var(--grey-300))] bg-[hsl(var(--white))] px-6 py-8 text-center md:min-h-[340px]">
        <div className="mb-4 flex items-center justify-center text-[hsl(var(--black))]">
          {visual ?? (
            <span className="inline-flex flex-col items-center gap-1 text-xs font-normal tracking-[0.04em] uppercase">
              PDF
            </span>
          )}
        </div>

        {title ? <p className="text-body1 lg:text-subtitle1 font-semibold max-sm:whitespace-pre-line">{title}</p> : null}
        <p className="text-body3 lg:text-body1 text-grey-500 mb-4 md:mb-6">
          {description}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onUploadPdf}>{primaryLabel}</Button>
          <span className="text-[var(--text-body-1)] text-[hsl(var(--grey-500))]">or</span>
          <Button variant="secondary" onClick={onCreateDocument}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
