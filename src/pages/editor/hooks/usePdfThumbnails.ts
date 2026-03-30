import { useEffect, useState } from "react"
import { editorThumbnails, type EditorThumbnailItem } from "../config/editor-shell-mock"

interface PdfLoadingTask {
  promise: Promise<unknown>
  destroy?: () => void
}

interface PdfModuleBundle {
  GlobalWorkerOptions: { workerSrc: string }
  getDocument: (source?: string | URL | Uint8Array | ArrayBuffer | Record<string, unknown>) => PdfLoadingTask
  workerSrc: string
}

async function loadPdfModules(): Promise<PdfModuleBundle> {
  const [{ GlobalWorkerOptions, getDocument }, workerModule] = await Promise.all([
    import("pdfjs-dist/legacy/build/pdf.mjs"),
    import("pdfjs-dist/legacy/build/pdf.worker.mjs?url"),
  ])

  return {
    GlobalWorkerOptions,
    getDocument,
    workerSrc: workerModule.default,
  }
}

function fallbackThumbnails(): EditorThumbnailItem[] {
  return editorThumbnails.map((thumbnail) => ({ ...thumbnail }))
}

export function usePdfThumbnails(file: File | null) {
  const [thumbnails, setThumbnails] = useState<EditorThumbnailItem[]>(() => fallbackThumbnails())

  useEffect(() => {
    if (!file) {
      setThumbnails(fallbackThumbnails())
      return
    }

    let cancelled = false
    const objectUrl = URL.createObjectURL(file)
    let loadingTask: PdfLoadingTask | null = null
    let renderTask: { promise: Promise<unknown>; cancel?: () => void } | null = null

    const createThumbnails = async () => {
      try {
        if (typeof window === "undefined" || typeof DOMMatrix === "undefined") {
          return
        }

        const { GlobalWorkerOptions, getDocument, workerSrc } = await loadPdfModules()
        GlobalWorkerOptions.workerSrc = workerSrc

        loadingTask = getDocument(objectUrl)
        const pdf = (await loadingTask.promise) as {
          numPages: number
          getPage: (pageNumber: number) => Promise<{
            getViewport: (options: { scale: number }) => { width: number; height: number }
            render: (options: {
              canvas: HTMLCanvasElement
              canvasContext: CanvasRenderingContext2D
              viewport: { width: number; height: number }
            }) => { promise: Promise<unknown>; cancel?: () => void }
          }>
        }

        const rendered: EditorThumbnailItem[] = []

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) {
            return
          }

          const page = await pdf.getPage(pageNumber)
          const baseViewport = page.getViewport({ scale: 1 })
          const scale = 120 / baseViewport.width
          const viewport = page.getViewport({ scale })
          const canvas = document.createElement("canvas")
          const context = canvas.getContext("2d")

          if (!context) {
            continue
          }

          canvas.width = Math.max(1, Math.floor(viewport.width))
          canvas.height = Math.max(1, Math.floor(viewport.height))

          renderTask = page.render({
            canvas,
            canvasContext: context,
            viewport,
          })

          await renderTask.promise

          rendered.push({
            id: `page-${pageNumber}`,
            label: `Page ${pageNumber}`,
            previewSrc: canvas.toDataURL("image/png"),
          })
        }

        if (!cancelled && rendered.length > 0) {
          setThumbnails(rendered)
        }
      } catch {
        if (!cancelled) {
          setThumbnails(fallbackThumbnails())
        }
      }
    }

    void createThumbnails()

    return () => {
      cancelled = true
      renderTask?.cancel?.()
      loadingTask?.destroy?.()
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return thumbnails
}
