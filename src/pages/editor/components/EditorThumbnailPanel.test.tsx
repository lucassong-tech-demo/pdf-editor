import { render, screen } from "@testing-library/react"
import { EditorThumbnailPanel } from "./EditorThumbnailPanel"

describe("EditorThumbnailPanel", () => {
  it("renders page preview image when previewSrc is present", () => {
    render(
      <EditorThumbnailPanel
        pages={[
          {
            id: "page-1",
            label: "Page 1",
            previewSrc: "data:image/png;base64,iVBORw0KGgo=",
          },
        ]}
        selectedPage="page-1"
        onSelectPage={() => {}}
      />,
    )

    expect(screen.getByRole("img", { name: /page 1 preview/i })).toBeInTheDocument()
  })
})
