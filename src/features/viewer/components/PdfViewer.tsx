import { useEffect, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { renderPageToDataUrl } from '../../../lib/pdf/render'
import { Panel } from '../../../shared/ui/Panel'

type PdfViewerProps = {
  pdfDocument: PDFDocumentProxy | null
  selectedPage: number
  isLoading: boolean
}

export function PdfViewer({ pdfDocument, selectedPage, isLoading }: PdfViewerProps) {
  const [currentPagePreview, setCurrentPagePreview] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function renderSelectedPage() {
      if (!pdfDocument || selectedPage < 1) {
        setCurrentPagePreview(null)
        return
      }

      try {
        const dataUrl = await renderPageToDataUrl(pdfDocument, selectedPage, 1.25)
        if (!cancelled) {
          setCurrentPagePreview(dataUrl)
        }
      } catch {
        if (!cancelled) {
          setCurrentPagePreview(null)
        }
      }
    }

    void renderSelectedPage()

    return () => {
      cancelled = true
    }
  }, [pdfDocument, selectedPage])

  return (
    <Panel title="Viewer" description="Selected PDF page is rendered in the main canvas area.">
      {isLoading && (
        <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Rendering document...
        </div>
      )}

      {!isLoading && !currentPagePreview && (
        <div className="grid min-h-80 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-center text-sm text-slate-500">
          Upload a PDF to preview a page.
        </div>
      )}

      {!isLoading && currentPagePreview && (
        <div className="grid min-h-80 place-items-center overflow-auto rounded-lg bg-slate-50 p-3">
          <img
            src={currentPagePreview}
            alt={`Main viewer page ${selectedPage}`}
            className="max-w-full rounded border border-slate-300 shadow"
          />
        </div>
      )}
    </Panel>
  )
}
