import type { EditorThumbnailItem } from "../config/editor-shell-mock"

interface EditorThumbnailPanelProps {
  pages: EditorThumbnailItem[]
  selectedPage: string
  onSelectPage: (pageId: string) => void
}

export function EditorThumbnailPanel({ pages, selectedPage, onSelectPage }: EditorThumbnailPanelProps) {
  return (
    <aside
      data-testid="editor-thumbnail-panel"
      className="fixed left-0 z-10 hidden pb-6 pl-6 pt-5 xl:block"
      style={{ top: 72, height: "calc(100dvh - 126px)" }}
    >
      <button
        data-slot="dropdown-menu-trigger"
        className="relative mb-5 inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[hsl(var(--grey-200))] px-3 pr-2 text-[var(--text-body-1)] font-normal transition-colors hover:bg-[hsl(var(--grey-300))]"
        type="button"
      >
        Document
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="relative h-[calc(100%-60px)] overflow-y-auto pr-3 xl:pr-5">
        <div className="grid content-start gap-4">
          {pages.map((page, index) => {
            const isSelected = page.id === selectedPage

            return (
              <div key={page.id} className="group relative" data-page-index={index}>
                <button
                  data-slot="dropdown-menu-trigger"
                  className="absolute right-1 top-1 inline-flex size-8 items-center justify-center rounded-lg bg-[hsl(var(--grey-200))] opacity-0 transition-all group-hover:opacity-100"
                  type="button"
                  aria-label={`${page.label} menu`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label={page.label}
                  aria-pressed={isSelected}
                  onClick={() => onSelectPage(page.id)}
                  className="w-[120px]"
                >
                  <div
                    className={`rounded-xs mb-1 cursor-pointer border bg-white transition-colors ${
                      isSelected
                        ? "border-[hsl(var(--primary))]"
                        : "border-[hsl(var(--grey-400))] group-hover:border-[hsl(var(--grey-500))]"
                    }`}
                    style={{ aspectRatio: "0.772727 / 1" }}
                  >
                    {page.previewSrc ? (
                      <img
                        src={page.previewSrc}
                        alt={`${page.label} preview`}
                        className="rounded-xs h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p
                    className={`text-[var(--text-body-2)] font-semibold transition-colors ${
                      isSelected
                        ? "text-[hsl(var(--primary))]"
                        : "text-[hsl(var(--grey-400))] group-hover:text-[hsl(var(--grey-600))]"
                    }`}
                  >
                    {index + 1}
                  </p>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
