import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card } from "../../components/primitives"
import { EditorWorkspaceShell } from "./EditorWorkspaceShell"

export interface EditorEntryPageProps {
  mode: "upload" | "new"
}

export function EditorEntryPage({ mode }: EditorEntryPageProps) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const autoOpenedRef = useRef(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  const onFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setSelectedFileName(file.name)
  }

  useEffect(() => {
    if (mode !== "upload" || autoOpenedRef.current) {
      return
    }

    autoOpenedRef.current = true
    inputRef.current?.click()
  }, [mode])

  if (mode === "new") {
    return (
      <EditorWorkspaceShell
        title="New document workspace"
        subtitle="Empty workspace shell is ready. Editing tools will be added in next milestones."
        onGoHome={() => navigate("/")}
      >
        <Card variant="highlight" padding="md">
          <p className="editor-entry__note">
            You entered the editor with an empty document. This is the V1 entry shell only.
          </p>
        </Card>
      </EditorWorkspaceShell>
    )
  }

  return (
    <EditorWorkspaceShell
      title="Upload PDF to enter workspace"
      subtitle="Choose a local PDF file to start the V1 editor flow."
      onGoHome={() => navigate("/")}
    >
      <div className="editor-entry">
        <div className="editor-entry__actions">
          <Button onClick={openFilePicker}>Choose PDF</Button>
          <Button variant="secondary" onClick={() => navigate("/editor/new")}>
            Create new document
          </Button>
        </div>

        <Card padding="md">
          <p className="editor-entry__note">
            {selectedFileName
              ? `Selected file: ${selectedFileName}`
              : "No file selected yet. The full editor UI will be added next."}
          </p>
        </Card>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        onChange={onFilePicked}
      />
    </EditorWorkspaceShell>
  )
}
