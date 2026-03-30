import { useMemo, useRef } from "react"
import { useCanvasLayerSync } from "../hooks/useCanvasLayerSync"

interface EditorCanvasOverlaysProps {
  canvasSize: {
    width: number
    height: number
  }
}

export function EditorCanvasOverlays({ canvasSize }: EditorCanvasOverlaysProps) {
  const selectionLayerRef = useRef<HTMLCanvasElement | null>(null)
  const guidesLayerRef = useRef<HTMLCanvasElement | null>(null)
  const searchLayerRef = useRef<HTMLCanvasElement | null>(null)
  const cursorLayerRef = useRef<HTMLCanvasElement | null>(null)

  const syncedLayers = useMemo(
    () => [selectionLayerRef, guidesLayerRef, searchLayerRef, cursorLayerRef],
    [],
  )

  useCanvasLayerSync({
    width: canvasSize.width,
    height: canvasSize.height,
    layerRefs: syncedLayers,
  })

  return (
    <>
      <canvas
        id="ol-sel"
        ref={selectionLayerRef}
        style={{ position: "absolute", left: -35, top: -35, pointerEvents: "none", display: "block" }}
      />
      <canvas
        id="ol-guides"
        ref={guidesLayerRef}
        style={{ position: "fixed", left: -35, top: -35, pointerEvents: "none", display: "block" }}
      />
      <canvas
        id="search-highlights"
        ref={searchLayerRef}
        style={{ position: "absolute", left: -35, top: -35, pointerEvents: "none", display: "block" }}
      />
      <canvas
        id="ol-ho"
        width={Math.max(170, Math.floor(canvasSize.width * 0.7))}
        height={31}
        style={{
          position: "absolute",
          left: Math.max(0, Math.floor(canvasSize.width * 0.26)),
          top: Math.max(0, Math.floor(canvasSize.height * 0.56)),
          pointerEvents: "none",
          display: "block",
        }}
      />
      <canvas
        id="ol-cursor"
        ref={cursorLayerRef}
        style={{ position: "absolute", left: -35, top: -35, pointerEvents: "none", display: "block" }}
      />
    </>
  )
}
