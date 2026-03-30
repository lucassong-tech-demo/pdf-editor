interface EditorBottomZoomBarProps {
  currentPage: number
  totalPages: number
  zoom: number
  zoomDisabled?: boolean
  onZoomOut: () => void
  onZoomIn: () => void
}

export function EditorBottomZoomBar({
  currentPage,
  totalPages,
  zoom,
  zoomDisabled = false,
  onZoomOut,
  onZoomIn,
}: EditorBottomZoomBarProps) {
  return (
    <div data-testid="editor-zoom-bar" className="fixed bottom-4 left-6 z-10 flex gap-3">
      <button
        className="bg-grey-200 flex items-center justify-center gap-2 rounded-lg p-1 transition-[background] hover:bg-[hsl(var(--grey-300))]"
        type="button"
        aria-label="Page counter"
      >
        <p className="text-body3 text-grey-500 min-w-[56px] px-1 text-center font-semibold">{currentPage} of {totalPages}</p>
      </button>

      <div className="bg-grey-200 flex items-center justify-center gap-2 rounded-lg p-1">
        <button
          data-slot="button"
          className="bg-grey-200 hover:bg-grey-300 focus-visible:bg-primary-light focus-visible:text-primary size-6 inline-flex items-center justify-center rounded-lg disabled:pointer-events-none disabled:text-[hsl(var(--grey-400))]"
          type="button"
          aria-label="Zoom out"
          onClick={onZoomOut}
          disabled={zoomDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.3335 8H12.6668" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="text-body3 text-grey-500 min-w-[40px] text-center font-bold">{zoom}%</p>
        <button
          data-slot="button"
          className="bg-grey-200 hover:bg-grey-300 focus-visible:bg-primary-light focus-visible:text-primary size-6 inline-flex items-center justify-center rounded-lg disabled:pointer-events-none disabled:text-[hsl(var(--grey-400))]"
          type="button"
          aria-label="Zoom in"
          onClick={onZoomIn}
          disabled={zoomDisabled}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.00004 3.33301V12.6663M3.33337 7.99967H12.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="bg-grey-200 flex items-center justify-center gap-1 rounded-lg p-1">
        <button
          data-slot="button"
          className="bg-grey-200 hover:bg-grey-300 focus-visible:bg-primary-light focus-visible:text-primary text-grey-500 size-6 inline-flex items-center justify-center rounded-lg disabled:text-[hsl(var(--grey-400))]"
          type="button"
          aria-label="Undo"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2.66663 4.66667H9.33329C11.5424 4.66667 13.3333 6.45753 13.3333 8.66667C13.3333 10.8758 11.5424 12.6667 9.33329 12.6667H2.66663M2.66663 4.66667L5.33329 2M2.66663 4.66667L5.33329 7.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          data-slot="button"
          className="bg-grey-200 hover:bg-grey-300 focus-visible:bg-primary-light focus-visible:text-primary text-grey-500 size-6 inline-flex items-center justify-center rounded-lg disabled:text-[hsl(var(--grey-400))]"
          type="button"
          aria-label="Redo"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.3333 4.66667H6.66663C4.45749 4.66667 2.66663 6.45753 2.66663 8.66667C2.66663 10.8758 4.45749 12.6667 6.66663 12.6667H13.3333M13.3333 4.66667L10.6666 2M13.3333 4.66667L10.6666 7.33333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
