import { Panel } from '../../../shared/ui/Panel'
import type { ThumbnailItem } from '../../../state/editorStore'

type ThumbnailsSidebarProps = {
  thumbnails: ThumbnailItem[]
  selectedPage: number
  onSelectPage: (pageNumber: number) => void
  isLoading: boolean
}

export function ThumbnailsSidebar({
  thumbnails,
  selectedPage,
  onSelectPage,
  isLoading,
}: ThumbnailsSidebarProps) {
  return (
    <Panel
      title="Thumbnails"
      description="Sidebar will show page previews and drag-and-drop reorder in V1."
    >
      {isLoading && <p className="text-sm text-slate-500">Rendering thumbnails...</p>}

      {!isLoading && thumbnails.length === 0 && (
        <p className="text-sm text-slate-500">Upload a PDF to generate page thumbnails.</p>
      )}

      {thumbnails.length > 0 && (
        <ul className="grid max-h-[calc(100vh-210px)] gap-3 overflow-auto pr-1">
          {thumbnails.map((thumbnail) => {
            const isSelected = selectedPage === thumbnail.pageNumber

            return (
              <li key={thumbnail.pageNumber}>
                <button
                  type="button"
                  onClick={() => onSelectPage(thumbnail.pageNumber)}
                  className={`w-full rounded-md border bg-slate-50 p-2 text-left transition ${
                    isSelected
                      ? 'border-slate-900 ring-1 ring-slate-900'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={thumbnail.dataUrl}
                    alt={`Thumbnail page ${thumbnail.pageNumber}`}
                    className="w-full rounded-sm border border-slate-200"
                  />
                  <span className="mt-1 block text-xs text-slate-600">Page {thumbnail.pageNumber}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </Panel>
  )
}
