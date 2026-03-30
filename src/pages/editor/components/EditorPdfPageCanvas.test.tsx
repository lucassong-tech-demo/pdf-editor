import { render, screen } from "@testing-library/react"
import { EditorPdfPageCanvas } from "./EditorPdfPageCanvas"

vi.mock("../hooks/usePdfRender", () => ({
  usePdfRender: () => ({
    error: null,
    isRendering: false,
    canvasSize: { width: 593, height: 744 },
  }),
}))

describe("EditorPdfPageCanvas", () => {
  it("renders reference-like layered canvas stage", () => {
    const file = new File(["dummy"], "sample.pdf", { type: "application/pdf" })
    const { container } = render(<EditorPdfPageCanvas file={file} zoom={100} />)

    expect(container.querySelector(".editor-content")).toBeInTheDocument()
    expect(container.querySelector(".tiled-canvas")).toBeInTheDocument()
    expect(screen.getByTestId("editor-pdf-canvas")).toBeInTheDocument()

    expect(container.querySelector("#ol-sel")).toBeInTheDocument()
    expect(container.querySelector("#ol-guides")).toBeInTheDocument()
    expect(container.querySelector("#search-highlights")).toBeInTheDocument()
    expect(container.querySelector("#ol-ho")).toBeInTheDocument()
    expect(container.querySelector("#ol-cursor")).toBeInTheDocument()
  })

  it("keeps overlay layer dimensions synced with the main canvas size", () => {
    const file = new File(["dummy"], "sample.pdf", { type: "application/pdf" })
    const { container } = render(<EditorPdfPageCanvas file={file} zoom={100} />)

    const syncedLayers = ["#ol-sel", "#ol-guides", "#search-highlights", "#ol-cursor"]
    for (const selector of syncedLayers) {
      const layer = container.querySelector(selector)
      expect(layer).toHaveAttribute("width", "593")
      expect(layer).toHaveAttribute("height", "744")
      expect(layer).toHaveStyle({ width: "593px", height: "744px" })
    }
  })
})
