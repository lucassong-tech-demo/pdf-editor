import type { InspectorSection } from "../config/editor-shell-mock"

interface EditorInspectorPanelProps {
  sections: InspectorSection[]
  activeSection: string
  mobileOpen: boolean
  onSectionChange: (sectionId: string) => void
}

export function EditorInspectorPanel({
  sections,
  activeSection,
  mobileOpen,
  onSectionChange,
}: EditorInspectorPanelProps) {
  return (
    <aside
      data-testid="editor-inspector-panel"
      data-mobile-open={mobileOpen ? "true" : "false"}
      className={`${mobileOpen ? "fixed inset-x-4 bottom-20 z-20 block max-h-[52vh] overflow-auto" : "hidden"} border-grey-300 bg-white shadow-200 right-6 z-10 rounded-lg border p-3 xl:fixed xl:top-[126px] xl:block xl:max-h-[calc(100dvh-180px)] xl:w-[220px] xl:overflow-auto`}
    >
      <p className="text-body2 text-grey-500 mb-3 font-semibold">Panel tools</p>

      <div className="bg-grey-100 mb-3 grid grid-cols-3 gap-1 rounded-md p-1">
        {sections.map((section) => {
          const isActive = section.id === activeSection

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`rounded px-2 py-1 text-[11px] font-semibold transition-colors ${
                isActive
                  ? "bg-white text-[hsl(var(--primary))]"
                  : "text-[hsl(var(--grey-500))] hover:text-[hsl(var(--grey-600))]"
              }`}
            >
              {section.label}
            </button>
          )
        })}
      </div>

      {sections
        .filter((section) => section.id === activeSection)
        .map((section) => (
          <div key={section.id} className="grid gap-2">
            {section.actions.map((action) => (
              <button
                key={action}
                type="button"
                className="border-grey-300 hover:bg-grey-100 hover:border-grey-400 w-full rounded-md border px-3 py-2 text-left text-[13px] font-semibold"
              >
                {action}
              </button>
            ))}
          </div>
        ))}
    </aside>
  )
}
