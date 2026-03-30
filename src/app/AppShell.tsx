import { useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'
import { AnnotationToolbar } from '../features/annotations/components/AnnotationToolbar'
import { PageOperationsPanel } from '../features/page-operations/components/PageOperationsPanel'
import { ThumbnailsSidebar } from '../features/thumbnails/components/ThumbnailsSidebar'
import { PdfViewer } from '../features/viewer/components/PdfViewer'
import { loadPdfDocument, renderPageToDataUrl } from '../lib/pdf/render'
import { useEditorStore } from '../state/editorStore'

export function AppShell() {
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null)
  const {
    fileName,
    pageCount,
    selectedPage,
    thumbnails,
    isLoading,
    errorMessage,
    setDocumentMeta,
    setThumbnails,
    selectPage,
    setIsLoading,
    setErrorMessage,
    resetDocument,
  } = useEditorStore()

  async function handleUpload(file: File | null) {
    if (!file) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const loadedPdfDocument = await loadPdfDocument(file)

      setDocumentMeta({
        fileName: file.name,
        pageCount: loadedPdfDocument.numPages,
      })
      setPdfDocument(loadedPdfDocument)

      const renderedThumbnails = await Promise.all(
        Array.from({ length: loadedPdfDocument.numPages }, async (_, index) => ({
          pageNumber: index + 1,
          dataUrl: await renderPageToDataUrl(loadedPdfDocument, index + 1, 0.24),
        })),
      )

      setThumbnails(renderedThumbnails)
    } catch {
      resetDocument()
      setPdfDocument(null)
      setErrorMessage('Unable to read this PDF file.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr]">
      <header className="flex flex-wrap items-center gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <h1 className="text-lg font-semibold">PDF Editor V1 Workspace</h1>
        <label className="inline-flex cursor-pointer items-center rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
          Upload PDF
          <input
            className="sr-only"
            type="file"
            accept="application/pdf"
            aria-label="Upload PDF"
            onChange={(event) => {
              void handleUpload(event.target.files?.[0] ?? null)
              event.target.value = ''
            }}
          />
        </label>

        <div className="text-sm text-slate-500">
          {fileName ? `${fileName} - ${pageCount} pages` : 'No PDF loaded'}
        </div>
      </header>

      {errorMessage && (
        <p className="border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{errorMessage}</p>
      )}

      <main className="grid min-h-0 grid-cols-1 gap-3 p-3 lg:grid-cols-[260px_1fr_300px]">
        <ThumbnailsSidebar
          thumbnails={thumbnails}
          selectedPage={selectedPage}
          onSelectPage={selectPage}
          isLoading={isLoading}
        />

        <section className="min-h-0 rounded-xl border border-slate-200 bg-white">
          <PdfViewer pdfDocument={pdfDocument} selectedPage={selectedPage} isLoading={isLoading} />
        </section>

        <aside className="grid min-h-0 grid-rows-2 gap-3">
          <PageOperationsPanel />
          <AnnotationToolbar />
        </aside>
      </main>
    </div>
  )
}
