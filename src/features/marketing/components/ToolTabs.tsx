import type { HeroTab } from '../data/marketingData'

type ToolTabsProps = {
  tabs: HeroTab[]
  activeTabId: string
  onChange: (tabId: string) => void
}

export function ToolTabs({ tabs, activeTabId, onChange }: ToolTabsProps) {
  return (
    <div className="inline-flex h-12 items-center gap-1 rounded-md border border-[#e3e5e8] bg-white p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`rounded-sm px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-[#edf3ff] text-[#2461fd]'
                : 'text-[#10131a] hover:bg-[#edf3ff] hover:text-[#2461fd]'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
