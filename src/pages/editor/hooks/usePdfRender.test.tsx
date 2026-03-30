import { render, screen, waitFor } from "@testing-library/react"
import { useRef } from "react"
import { usePdfRender, type PdfModuleBundle } from "./usePdfRender"

interface HarnessProps {
  file: File
  zoom: number
  loadPdfModules: () => Promise<PdfModuleBundle>
}

function HookHarness({ file, zoom, loadPdfModules }: HarnessProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  usePdfRender({
    file,
    zoom,
    canvasRef,
    loadPdfModules,
  })

  return <canvas data-testid="hook-canvas" ref={canvasRef} />
}

describe("usePdfRender", () => {
  const originalDomMatrix = globalThis.DOMMatrix
  const originalCreateObjectURL = URL.createObjectURL
  const originalRevokeObjectURL = URL.revokeObjectURL
  const originalGetContext = HTMLCanvasElement.prototype.getContext

  beforeEach(() => {
    // jsdom environment fallback for hook guard checks.
    ;(globalThis as unknown as { DOMMatrix: unknown }).DOMMatrix = class {}
    URL.createObjectURL = () => "blob:unit-test"
    URL.revokeObjectURL = () => {}
    HTMLCanvasElement.prototype.getContext = ((() => ({})) as unknown) as HTMLCanvasElement["getContext"]
  })

  afterEach(() => {
    ;(globalThis as unknown as { DOMMatrix: typeof DOMMatrix }).DOMMatrix = originalDomMatrix
    URL.createObjectURL = originalCreateObjectURL
    URL.revokeObjectURL = originalRevokeObjectURL
    HTMLCanvasElement.prototype.getContext = originalGetContext
  })

  it("cancels previous render task when zoom changes", async () => {
    const file = new File(["dummy"], "sample.pdf", { type: "application/pdf" })
    const cancelFirstRender = vi.fn()
    const cancelSecondRender = vi.fn()
    const destroyFirstLoadingTask = vi.fn()
    const destroySecondLoadingTask = vi.fn()

    const pending = new Promise(() => {})
    let renderCallCount = 0
    let loadingCallCount = 0

    const loadPdfModules = vi.fn(async () => ({
      GlobalWorkerOptions: { workerSrc: "" },
      workerSrc: "worker-url",
      getDocument: () => {
        loadingCallCount += 1
        const destroy = loadingCallCount === 1 ? destroyFirstLoadingTask : destroySecondLoadingTask

        return {
          destroy,
          promise: Promise.resolve({
            getPage: async () => ({
              getViewport: () => ({ width: 593, height: 744 }),
              render: () => {
                renderCallCount += 1
                return {
                  cancel: renderCallCount === 1 ? cancelFirstRender : cancelSecondRender,
                  promise: pending,
                }
              },
            }),
          }),
        }
      },
    }))

    const { rerender, unmount } = render(
      <HookHarness file={file} zoom={100} loadPdfModules={loadPdfModules} />,
    )

    expect(screen.getByTestId("hook-canvas")).toBeInTheDocument()

    await waitFor(() => {
      expect(renderCallCount).toBe(1)
    })

    rerender(<HookHarness file={file} zoom={110} loadPdfModules={loadPdfModules} />)

    await waitFor(() => {
      expect(cancelFirstRender).toHaveBeenCalledTimes(1)
      expect(destroyFirstLoadingTask).toHaveBeenCalledTimes(1)
      expect(renderCallCount).toBe(2)
    })

    unmount()

    expect(cancelSecondRender).toHaveBeenCalledTimes(1)
    expect(destroySecondLoadingTask).toHaveBeenCalledTimes(1)
  })
})
