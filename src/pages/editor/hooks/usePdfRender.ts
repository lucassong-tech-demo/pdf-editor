import { useEffect, useState, type RefObject } from "react"

interface PdfLoadingTask {
  promise: Promise<unknown>
  destroy?: () => void
}

export interface PdfModuleBundle {
  GlobalWorkerOptions: { workerSrc: string }
  getDocument: (source?: string | URL | Uint8Array | ArrayBuffer | Record<string, unknown>) => PdfLoadingTask
  workerSrc: string
}

interface UsePdfRenderOptions {
  file: File
  zoom: number
  canvasRef: RefObject<HTMLCanvasElement | null>
  loadPdfModules?: () => Promise<PdfModuleBundle>
}

interface UsePdfRenderResult {
  isRendering: boolean
  error: string | null
  canvasSize: { width: number; height: number }
}

async function defaultLoadPdfModules(): Promise<PdfModuleBundle> {
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

export function usePdfRender({
  file,
  zoom,
  canvasRef,
  loadPdfModules = defaultLoadPdfModules,
}: UsePdfRenderOptions): UsePdfRenderResult {
  const [error, setError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(true)
  const [canvasSize, setCanvasSize] = useState({ width: 170, height: 220 })

  useEffect(() => {
    let cancelled = false
    const objectUrl = URL.createObjectURL(file)
    let renderTask: { promise: Promise<unknown>; cancel?: () => void } | null = null
    let loadingTask: PdfLoadingTask | null = null

    const renderFirstPage = async () => {
      try {
        setIsRendering(true)
        setError(null)

        if (typeof window === "undefined" || typeof DOMMatrix === "undefined") {
          setIsRendering(false)
          return
        }

        const { GlobalWorkerOptions, getDocument, workerSrc } = await loadPdfModules()
        GlobalWorkerOptions.workerSrc = workerSrc

        loadingTask = getDocument(objectUrl)
        const pdf = (await loadingTask.promise) as {
          getPage: (pageNumber: number) => Promise<{
            getViewport: (options: { scale: number }) => { width: number; height: number }
            render: (options: {
              canvas: HTMLCanvasElement
              canvasContext: CanvasRenderingContext2D
              viewport: { width: number; height: number }
            }) => { promise: Promise<unknown>; cancel?: () => void }
          }>
        }
        const firstPage = await pdf.getPage(1)
        const scale = Math.max(0.7, Math.min(2, zoom / 100))
        const viewport = firstPage.getViewport({ scale })
        const canvas = canvasRef.current

        if (!canvas || cancelled) {
          return
        }

        const context = canvas.getContext("2d")
        if (!context) {
          setIsRendering(false)
          return
        }

        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        setCanvasSize({ width: canvas.width, height: canvas.height })

        renderTask = firstPage.render({
          canvas,
          canvasContext: context,
          viewport,
        })

        await renderTask.promise

        if (!cancelled) {
          setIsRendering(false)
        }
      } catch (renderError) {
        const isCancelledError =
          renderError instanceof Error &&
          (renderError.name === "RenderingCancelledException" || renderError.name === "AbortError")

        if (!cancelled && !isCancelledError) {
          setError("Unable to render PDF preview.")
          setIsRendering(false)
        }
      }
    }

    void renderFirstPage()

    return () => {
      cancelled = true
      renderTask?.cancel?.()
      loadingTask?.destroy?.()
      URL.revokeObjectURL(objectUrl)
    }
  }, [canvasRef, file, loadPdfModules, zoom])

  return {
    isRendering,
    error,
    canvasSize,
  }
}
