import { EntryUploadBlock } from "../../../components/marketing"
import { EditorPdfPageCanvas } from "./EditorPdfPageCanvas"

interface EditorCanvasStageProps {
  selectedPdf: File | null
  zoom: number
  onUploadClick?: () => void
  onCreateNewClick?: () => void
}

export function EditorCanvasStage({
  selectedPdf,
  zoom,
  onUploadClick,
  onCreateNewClick,
}: EditorCanvasStageProps) {
  return (
    <section data-testid="editor-canvas-stage" className="relative mx-auto w-full max-w-[860px]">
      {selectedPdf ? (
        <EditorPdfPageCanvas file={selectedPdf} zoom={zoom} />
      ) : (
        <EntryUploadBlock
          onUploadPdf={onUploadClick}
          onCreateDocument={onCreateNewClick}
        />
      )}
    </section>
  )
}
