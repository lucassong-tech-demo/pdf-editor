import type { ReactNode } from "react"
import { Button } from "../primitives/Button"
import { cn } from "../../lib/cn"

export interface UploadPanelProps {
  title: string
  description: string
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
        "upload-panel",
        className,
      )}
    >
      <div className="upload-panel__inner">
        <div className="upload-panel__visual">
          {visual ?? <span>PDF</span>}
        </div>

        <h3 className="upload-panel__title">{title}</h3>
        <p className="upload-panel__desc">{description}</p>

        <div className="upload-panel__actions">
          <Button onClick={onUploadPdf}>{primaryLabel}</Button>
          <span className="upload-panel__or">or</span>
          <Button variant="secondary" onClick={onCreateDocument}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
