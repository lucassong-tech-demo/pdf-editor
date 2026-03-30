import { useRef, useState, type ChangeEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { EditorWorkspaceShell } from "./EditorWorkspaceShell"

export interface EditorEntryPageProps {
  mode: "upload" | "new"
}

export function EditorEntryPage({ mode }: EditorEntryPageProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const initialPdfFromRoute = (location.state as { initialPdfFile?: File } | null)?.initialPdfFile ?? null
  const [selectedPdf, setSelectedPdf] = useState<File | null>(initialPdfFromRoute)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(initialPdfFromRoute?.name ?? null)

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  const onFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setSelectedPdf(file)
    setSelectedFileName(file.name)
    event.currentTarget.value = ""
  }

  const shell =
    mode === "new" || mode === "upload" ? (
      <EditorWorkspaceShell
        selectedPdf={selectedPdf}
        onUploadClick={openFilePicker}
        onCreateNewClick={() => navigate("/editor/new")}
      />
    ) : null

  return (
    <>
      {shell}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={onFilePicked}
      />
      <span className="sr-only" aria-live="polite">
        {selectedFileName ? `Selected file: ${selectedFileName}` : "No file selected"}
      </span>
    </>
  )
}
