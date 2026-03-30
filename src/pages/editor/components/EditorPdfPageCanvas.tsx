import { useRef } from "react"
import { EditorCanvasOverlays } from "./EditorCanvasOverlays"
import { usePdfRender } from "../hooks/usePdfRender"

interface EditorPdfPageCanvasProps {
  file: File
  zoom: number
}

export function EditorPdfPageCanvas({ file, zoom }: EditorPdfPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { error, isRendering, canvasSize } = usePdfRender({
    file,
    zoom,
    canvasRef,
  })

  return (
    <div className="editor-content mx-auto flex justify-center max-md:pb-[52px]" style={{ width: "calc(100% - 20px)" }}>
      <div className="relative size-fit">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 bg-[hsl(var(--grey-200))]"
        />
        <div className="relative">
          <div style={{ position: "absolute", left: 0, top: 0, pointerEvents: "auto", zIndex: 0, display: "none" }} />
          <div
            className="relative mx-auto size-fit overflow-hidden bg-white shadow-[0_0_0_1px_hsl(var(--black)/0.03),0_0_6px_hsl(var(--black)/0.06)] max-md:overflow-hidden"
            data-state="closed"
            data-slot="context-menu-trigger"
          >
            <div
              className="tiled-canvas relative select-none"
              tabIndex={0}
              style={{ touchAction: "none", width: canvasSize.width, height: canvasSize.height }}
            >
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <canvas
                  data-testid="editor-pdf-canvas"
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    left: "0%",
                    top: "0%",
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>

            <EditorCanvasOverlays canvasSize={canvasSize} />
          </div>
        </div>
      </div>

      {isRendering ? <p className="sr-only">Rendering first page...</p> : null}
      {error ? <p className="sr-only">{error}</p> : null}
    </div>
  )
}
