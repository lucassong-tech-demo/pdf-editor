import { useLayoutEffect, type RefObject } from "react"

interface UseCanvasLayerSyncOptions {
  width: number
  height: number
  layerRefs: Array<RefObject<HTMLCanvasElement | null>>
}

export function useCanvasLayerSync({ width, height, layerRefs }: UseCanvasLayerSyncOptions) {
  useLayoutEffect(() => {
    for (const layerRef of layerRefs) {
      const layer = layerRef.current
      if (!layer) {
        continue
      }

      layer.width = width
      layer.height = height
      layer.style.width = `${width}px`
      layer.style.height = `${height}px`
    }
  }, [height, layerRefs, width])
}
