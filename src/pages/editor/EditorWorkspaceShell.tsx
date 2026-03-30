import { useState } from "react"
import {
  EditorBottomZoomBar,
  EditorBottomRightUtilities,
  EditorCanvasStage,
  EditorFloatingToolbar,
  EditorInspectorPanel,
  EditorThumbnailPanel,
  EditorTopHeader,
} from "./components"
import {
  editorThumbnails,
  editorToolbarTools,
  inspectorSections,
  type EditorToolId,
} from "./config/editor-shell-mock"

interface EditorWorkspaceShellProps {
  selectedPdf?: File | null
  onUploadClick?: () => void
  onCreateNewClick?: () => void
}

const ZOOM_MIN = 50
const ZOOM_MAX = 200
const ZOOM_STEP = 10

export function EditorWorkspaceShell({
  selectedPdf = null,
  onUploadClick,
  onCreateNewClick,
}: EditorWorkspaceShellProps) {
  const [activeTool, setActiveTool] = useState<EditorToolId>(editorToolbarTools[0]?.id ?? "secure")
  const [selectedPage, setSelectedPage] = useState(editorThumbnails[0]?.id ?? "page-1")
  const [activeSection, setActiveSection] = useState(inspectorSections[0]?.id ?? "pages")
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const hasPdf = Boolean(selectedPdf)
  const selectedPageIndex = editorThumbnails.findIndex((page) => page.id === selectedPage)
  const currentPage = hasPdf ? Math.max(1, selectedPageIndex + 1) : 1
  const totalPages = hasPdf ? editorThumbnails.length : 1

  const zoomOut = () => {
    if (!hasPdf) {
      return
    }
    setZoom((value) => Math.max(ZOOM_MIN, value - ZOOM_STEP))
  }

  const zoomIn = () => {
    if (!hasPdf) {
      return
    }
    setZoom((value) => Math.min(ZOOM_MAX, value + ZOOM_STEP))
  }

  return (
    <div className="app-page-surface flex min-h-dvh w-max min-w-full flex-col">
      <div className="h-[52px] md:h-[72px]" aria-hidden="true" />
      <EditorTopHeader />
      <EditorFloatingToolbar activeTool={activeTool} onToolChange={setActiveTool} />

      <main className={`pb-6 ${hasPdf ? "pt-24 md:px-[180px] xl:px-[220px]" : "pt-20 md:px-6"}`}>
        {hasPdf ? (
          <EditorThumbnailPanel pages={editorThumbnails} selectedPage={selectedPage} onSelectPage={setSelectedPage} />
        ) : null}


        <section className="mx-auto px-4 xl:px-0">
          {hasPdf ? (
            <div className="mb-4 flex justify-end xl:hidden">
              <button
                type="button"
                className="border-grey-300 bg-white text-grey-500 hover:bg-grey-100 rounded-lg border px-3 py-1 text-[var(--text-body-2)] font-semibold"
                onClick={() => setMobileInspectorOpen((value) => !value)}
                aria-expanded={mobileInspectorOpen}
                aria-label="Toggle inspector"
              >
                {mobileInspectorOpen ? "Hide tools" : "Show tools"}
              </button>
            </div>
          ) : null}

          <EditorCanvasStage
            selectedPdf={selectedPdf}
            zoom={zoom}
            onUploadClick={onUploadClick}
            onCreateNewClick={onCreateNewClick}
          />
        </section>

        {hasPdf ? (
          <EditorInspectorPanel
            sections={inspectorSections}
            activeSection={activeSection}
            mobileOpen={mobileInspectorOpen}
            onSectionChange={setActiveSection}
          />
        ) : null}
      </main>

      <EditorBottomZoomBar
        currentPage={currentPage}
        totalPages={totalPages}
        zoom={zoom}
        zoomDisabled={!hasPdf}
        onZoomOut={zoomOut}
        onZoomIn={zoomIn}
      />

      <EditorBottomRightUtilities />
    </div>
  )
}
