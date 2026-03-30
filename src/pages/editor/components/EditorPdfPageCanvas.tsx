import { useEffect, useRef, useState } from "react"

interface EditorPdfPageCanvasProps {
  file: File
  zoom: number
}

export function EditorPdfPageCanvas({ file, zoom }: EditorPdfPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRendering, setIsRendering] = useState(true)

  useEffect(() => {
    let cancelled = false
    const objectUrl = URL.createObjectURL(file)

    const renderFirstPage = async () => {
      try {
        setIsRendering(true)
        setError(null)

        if (typeof window === "undefined" || typeof DOMMatrix === "undefined") {
          setIsRendering(false)
          return
        }

        const [{ GlobalWorkerOptions, getDocument }, workerModule] = await Promise.all([
          import("pdfjs-dist/legacy/build/pdf.mjs"),
          import("pdfjs-dist/legacy/build/pdf.worker.mjs?url"),
        ])

        GlobalWorkerOptions.workerSrc = workerModule.default

        const loadingTask = getDocument(objectUrl)
        const pdf = await loadingTask.promise
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

        await firstPage.render({
          canvas,
          canvasContext: context,
          viewport,
        }).promise

        if (!cancelled) {
          setIsRendering(false)
        }
      } catch {
        if (!cancelled) {
          setError("Unable to render PDF preview.")
          setIsRendering(false)
        }
      }
    }

    void renderFirstPage()

    return () => {
      cancelled = true
      URL.revokeObjectURL(objectUrl)
    }
  }, [file, zoom])

  return (
    <div className="mx-auto grid max-w-[860px] place-items-center rounded-[20px] border border-[hsl(var(--grey-300))] bg-white px-4 py-6 shadow-[0_16px_40px_hsl(var(--black)/0.06)]">
      <canvas data-testid="editor-pdf-canvas" ref={canvasRef} className="h-auto max-w-full rounded-[10px] border border-[hsl(var(--grey-300))]" />
      {isRendering ? (
        <p className="mt-3 text-[var(--text-body-2)] text-[hsl(var(--grey-500))]">Rendering first page...</p>
      ) : null}
      {error ? <p className="mt-2 text-[var(--text-body-2)] text-red-600">{error}</p> : null}
    </div>
  )
}
