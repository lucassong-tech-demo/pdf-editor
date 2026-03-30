import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EditorWorkspaceShell } from "./EditorWorkspaceShell"

describe("EditorWorkspaceShell", () => {
  it("renders no-pdf entry with tablist and upload panel", () => {
    render(
      <EditorWorkspaceShell />,
    )

    expect(screen.getByTestId("editor-top-header")).toBeInTheDocument()
    expect(screen.getByTestId("editor-floating-toolbar")).toBeInTheDocument()
    expect(screen.getByTestId("editor-canvas-stage")).toBeInTheDocument()
    expect(screen.getByTestId("editor-zoom-bar")).toBeInTheDocument()
    expect(screen.getByRole("tablist")).toBeInTheDocument()
    expect(screen.queryByTestId("editor-thumbnail-panel")).not.toBeInTheDocument()
    expect(screen.queryByTestId("editor-inspector-panel")).not.toBeInTheDocument()
    expect(screen.queryByRole("button", { name: /toggle inspector/i })).not.toBeInTheDocument()
    expect(screen.getByText("1 of 1")).toBeInTheDocument()
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  it("shows export and upload/create CTAs", () => {
    render(
      <EditorWorkspaceShell />,
    )

    const header = screen.getByTestId("editor-top-header")
    expect(within(header).getByRole("button", { name: /^export$/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /upload pdf/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create new document/i })).toBeInTheDocument()
  })

  it("opens Open menu dropdown with all menu items disabled", async () => {
    const user = userEvent.setup()
    render(<EditorWorkspaceShell />)

    const openMenuTrigger = screen.getByRole("button", { name: /open menu/i })
    await user.click(openMenuTrigger)

    const menu = screen.getByRole("menu")
    expect(menu).toBeInTheDocument()

    const items = within(menu).getAllByRole("menuitem")
    expect(items.length).toBeGreaterThan(0)
    for (const item of items) {
      expect(item).toHaveAttribute("aria-disabled", "true")
    }
  })

  it("switches tab selected state without changing entry actions", async () => {
    const user = userEvent.setup()

    render(
      <EditorWorkspaceShell />,
    )

    const convertTab = screen.getByRole("tab", { name: /convert/i })
    await user.click(convertTab)

    expect(convertTab).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("button", { name: /upload pdf/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /create new document/i })).toBeInTheDocument()
  })

  it("updates toolbar selected state", async () => {
    const user = userEvent.setup()

    render(
      <EditorWorkspaceShell />,
    )

    const toolbar = screen.getByTestId("editor-floating-toolbar")
    const annotate = within(toolbar).getByRole("button", { name: /annotate/i })

    await user.click(annotate)
    expect(annotate).toHaveAttribute("aria-pressed", "true")
  })

  it("updates selected thumbnail", async () => {
    const user = userEvent.setup()
    const selectedPdf = new File(["dummy"], "sample.pdf", { type: "application/pdf" })

    render(
      <EditorWorkspaceShell
        selectedPdf={selectedPdf}
      />,
    )

    const pageThree = screen.getByRole("button", { name: /^page 3$/i })
    await user.click(pageThree)
    expect(pageThree).toHaveAttribute("aria-pressed", "true")
  })

  it("shows uploaded editor stage with thumbnail and first-page canvas", () => {
    const selectedPdf = new File(["dummy"], "sample.pdf", { type: "application/pdf" })

    render(
      <EditorWorkspaceShell
        selectedPdf={selectedPdf}
      />,
    )

    expect(screen.getByTestId("editor-thumbnail-panel")).toBeInTheDocument()
    expect(screen.getByTestId("editor-pdf-canvas")).toBeInTheDocument()
    expect(screen.getByTestId("editor-inspector-panel")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /toggle inspector/i })).toBeInTheDocument()
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument()
  })

  it("shows company logo in the right-bottom corner", () => {
    render(
      <EditorWorkspaceShell />,
    )

    const utilityCluster = screen.getByTestId("editor-utility-cluster")
    expect(screen.getByRole("img", { name: /company logo/i })).toBeInTheDocument()
    expect(utilityCluster).toBeInTheDocument()
  })

  it("uses reference-like toolbar hint classes and starts hidden", () => {
    render(<EditorWorkspaceShell />)

    const hint = screen.getByText(/upload a file or create a new one to enable all the tools/i)
    expect(hint.tagName.toLowerCase()).toBe("div")
    expect(hint).toHaveClass("text-wrap")
    expect(hint).toHaveClass("text-grey-500")
    expect(hint).toHaveClass("text-body2")
    expect(hint).toHaveClass("max-w-[606px]")
    expect(hint).toHaveClass("absolute")
    expect(hint).toHaveClass("-bottom-[20px]")
    expect(hint).toHaveClass("left-0")
    expect(hint).toHaveClass("w-full")
    expect(hint).toHaveClass("opacity-0")
    expect(hint).not.toHaveClass("group-hover:opacity-100")
  })

  it("renders svg-based toolbar icons and split-tool controls", () => {
    render(<EditorWorkspaceShell />)

    const toolbar = screen.getByTestId("editor-floating-toolbar")

    expect(within(toolbar).getByLabelText(/tool options/i)).toBeInTheDocument()
    expect(within(toolbar).getByLabelText(/more tools/i)).toBeInTheDocument()
    expect(within(toolbar).getByLabelText(/insert image file/i)).toBeInTheDocument()
    expect(within(toolbar).queryByText("🔒")).not.toBeInTheDocument()
    expect(within(toolbar).queryByText("↖")).not.toBeInTheDocument()

    const overlay = toolbar.querySelector("div.opacity-30")
    expect(overlay).not.toBeNull()
  })

  it("disables zoom controls when no pdf is uploaded", () => {
    render(<EditorWorkspaceShell />)

    expect(screen.getByRole("button", { name: /zoom out/i })).toBeDisabled()
    expect(screen.getByRole("button", { name: /zoom in/i })).toBeDisabled()
  })

  it("updates zoom and respects boundaries after pdf upload", async () => {
    const user = userEvent.setup()
    const selectedPdf = new File(["dummy"], "sample.pdf", { type: "application/pdf" })

    render(
      <EditorWorkspaceShell selectedPdf={selectedPdf} />,
    )

    const zoomOut = screen.getByRole("button", { name: /zoom out/i })
    const zoomIn = screen.getByRole("button", { name: /zoom in/i })

    expect(screen.getByText("100%")).toBeInTheDocument()

    for (let index = 0; index < 10; index += 1) {
      await user.click(zoomOut)
    }

    expect(screen.getByText("50%")).toBeInTheDocument()

    for (let index = 0; index < 30; index += 1) {
      await user.click(zoomIn)
    }

    expect(screen.getByText("200%")).toBeInTheDocument()
  })
})
