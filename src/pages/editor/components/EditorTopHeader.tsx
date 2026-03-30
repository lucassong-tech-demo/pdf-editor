import { useEffect, useRef, useState } from "react"

const openMenuItems = [
  { label: "Create new", shortcut: "⌘+alt+N" },
  { label: "Open", shortcut: "⌘+O" },
  { label: "Save", shortcut: "⌘+S" },
  { label: "Export", shortcut: "⌘+E" },
  { label: "Split" },
  { label: "Compress" },
  { label: "My PDFs" },
  { label: "Log in" },
]

export function EditorTopHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!menuOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
      }
    }

    window.addEventListener("pointerdown", handlePointerDown)
    window.addEventListener("keydown", handleEscape)
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
      window.removeEventListener("keydown", handleEscape)
    }
  }, [menuOpen])

  return (
    <header
      data-testid="editor-top-header"
      className="fixed top-0 z-10 flex min-h-[52px] w-full items-center justify-between px-5 py-6 pb-2 md:px-6"
    >
      <div ref={menuRootRef} className="relative">
        <button
          type="button"
          data-slot="dropdown-menu-trigger"
          aria-label="Open menu"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          data-state={menuOpen ? "open" : "closed"}
          className="relative inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-[hsl(var(--grey-300))] text-[hsl(var(--primary))] transition-colors hover:border-[hsl(var(--grey-400))] hover:bg-[hsl(var(--grey-200))]"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {menuOpen ? (
          <div
            role="menu"
            aria-orientation="vertical"
            data-slot="dropdown-menu-content"
            className="border-grey-300 shadow-200 absolute left-0 top-[calc(100%+8px)] z-50 min-w-[200px] overflow-x-hidden overflow-y-auto rounded-lg border bg-white p-2"
          >
            {openMenuItems.map((item, index) => (
              <div key={item.label}>
                {(item.label === "Split" || item.label === "My PDFs" || item.label === "Log in") && index !== 0 ? (
                  <div role="separator" aria-orientation="horizontal" data-slot="dropdown-menu-separator" className="bg-grey-300 my-2 h-px" />
                ) : null}
                <div
                  role="menuitem"
                  aria-disabled="true"
                  data-disabled=""
                  data-slot="dropdown-menu-item"
                  data-variant="default"
                  className="focus:bg-grey-100 text-body1 outline-hidden relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 transition-colors data-[disabled]:pointer-events-none data-[disabled]:text-grey-400"
                >
                  <span>{item.label}</span>
                  {item.shortcut ? (
                    <span data-slot="dropdown-menu-shortcut" className="text-grey-400 text-body1 ml-auto">
                      {item.shortcut}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <button
          data-slot="button"
          className="relative inline-flex h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-r-none rounded-l-lg border border-r-0 border-[hsl(var(--primary-dark))] bg-[hsl(var(--primary))] pl-4 pr-6 text-[var(--text-body-1)] font-semibold text-white transition-colors disabled:pointer-events-none disabled:border-[hsl(var(--grey-300))] disabled:bg-[hsl(var(--grey-200))] disabled:text-[hsl(var(--grey-400))]"
          type="button"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M15.5 15.5H0.5M13 7.16667L8 12.1667M8 12.1667L3 7.16667M8 12.1667V0.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Export
        </button>
        <button
          data-slot="dropdown-menu-trigger"
          aria-label="Export options"
          className="relative inline-flex size-10 shrink-0 items-center justify-center whitespace-nowrap rounded-l-none rounded-r-lg bg-[hsl(var(--primary))] text-white transition-colors disabled:pointer-events-none disabled:bg-[hsl(var(--grey-200))] disabled:text-[hsl(var(--grey-400))]"
          type="button"
          disabled
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-6">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </header>
  )
}
