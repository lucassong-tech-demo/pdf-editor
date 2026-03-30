export type EditorToolId =
  | "secure"
  | "pointer"
  | "text"
  | "image"
  | "draw"
  | "annotate"
  | "shape"
  | "comment"

export interface EditorToolbarTool {
  id: EditorToolId
  label: string
  icon: string
  group: "secure" | "edit" | "insert" | "review"
  mobilePrimary?: boolean
}

export interface EditorThumbnailItem {
  id: string
  label: string
  previewSrc?: string
}

export interface InspectorSection {
  id: string
  label: string
  actions: string[]
}

export const editorToolbarTools: EditorToolbarTool[] = [
  { id: "secure", label: "Protect", icon: "🔒", group: "secure", mobilePrimary: true },
  { id: "pointer", label: "Pointer", icon: "↖", group: "edit", mobilePrimary: true },
  { id: "text", label: "Text", icon: "T", group: "edit", mobilePrimary: true },
  { id: "image", label: "Image", icon: "▧", group: "insert" },
  { id: "draw", label: "Annotate", icon: "✎", group: "insert" },
  { id: "shape", label: "Shape", icon: "◧", group: "insert" },
  { id: "comment", label: "Comment", icon: "⋯", group: "review" },
]

export const editorThumbnails: EditorThumbnailItem[] = Array.from({ length: 8 }, (_, index) => ({
  id: `page-${index + 1}`,
  label: `Page ${index + 1}`,
}))

export const inspectorSections: InspectorSection[] = [
  {
    id: "pages",
    label: "Pages",
    actions: ["Split PDF", "Merge PDF", "Rotate page", "Delete page"],
  },
  {
    id: "annotate",
    label: "Annotate",
    actions: ["Highlight text", "Freehand draw", "Color palette"],
  },
  {
    id: "export",
    label: "Export",
    actions: ["Prepare export", "Flatten annotations", "Download"],
  },
]
