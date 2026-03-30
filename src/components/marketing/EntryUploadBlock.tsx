import { useMemo, useState, type ReactNode } from "react"
import { Tabs, type TabItem } from "../primitives/Tabs"
import { UploadPanel } from "./UploadPanel"
import { landingTabs } from "../../features/landing/config"
import uploadIcon from "../../assets/upload-icon.svg"

const DEFAULT_PANEL_TITLE = "Edit PDFs privately\non your device"
const DEFAULT_PANEL_DESCRIPTION =
  "Drag and drop a PDF or image. Everything stays on your device, processed locally in your browser."

interface EntryUploadBlockProps {
  title?: string
  description?: string
  primaryLabel?: string
  secondaryLabel?: string
  onUploadPdf?: () => void
  onCreateDocument?: () => void
  visual?: ReactNode
}

export function EntryUploadBlock({
  title = DEFAULT_PANEL_TITLE,
  description = DEFAULT_PANEL_DESCRIPTION,
  primaryLabel = "Upload PDF",
  secondaryLabel = "Create new document",
  onUploadPdf,
  onCreateDocument,
  visual = <img src={uploadIcon} alt="" className="block size-[92px] object-contain" />,
}: EntryUploadBlockProps) {
  const [activeTab, setActiveTab] = useState(landingTabs[0]?.id ?? "edit")

  const tabs: TabItem[] = useMemo(
    () => landingTabs.map((item) => ({ id: item.id, label: item.label })),
    [],
  )

  return (
    <div>
      <div className="flex justify-center">
        <Tabs items={tabs} value={activeTab} onChange={setActiveTab} />
      </div>

      <div className="mt-5">
        <UploadPanel
          title={title}
          description={description}
          primaryLabel={primaryLabel}
          secondaryLabel={secondaryLabel}
          onUploadPdf={onUploadPdf}
          onCreateDocument={onCreateDocument}
          visual={visual}
        />
      </div>
    </div>
  )
}
