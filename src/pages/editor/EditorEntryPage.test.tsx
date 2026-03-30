import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { EditorEntryPage } from "./EditorEntryPage"

describe("EditorEntryPage", () => {
  it("renders shared upload panel copy in upload mode", () => {
    render(
      <MemoryRouter>
        <EditorEntryPage mode="upload" />
      </MemoryRouter>,
    )

    expect(screen.getAllByText(/edit pdfs privately\s*on your device/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/drag and drop a pdf or image\. everything stays on your device, processed locally in your browser\./i).length).toBeGreaterThan(0)
  })

  it("renders shared upload panel copy in new mode", () => {
    render(
      <MemoryRouter>
        <EditorEntryPage mode="new" />
      </MemoryRouter>,
    )

    expect(screen.getAllByText(/edit pdfs privately\s*on your device/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/drag and drop a pdf or image\. everything stays on your device, processed locally in your browser\./i).length).toBeGreaterThan(0)
    expect(screen.getByRole("button", { name: /upload pdf/i })).toBeInTheDocument()
  })

  it("initializes selected pdf from landing route state", () => {
    const pickedFile = new File(["dummy"], "picked.pdf", { type: "application/pdf" })

    render(
      <MemoryRouter initialEntries={[{ pathname: "/editor", state: { initialPdfFile: pickedFile } }]}>
        <EditorEntryPage mode="upload" />
      </MemoryRouter>,
    )

    expect(screen.getByTestId("editor-thumbnail-panel")).toBeInTheDocument()
    expect(screen.getByTestId("editor-pdf-canvas")).toBeInTheDocument()
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
  })
})
