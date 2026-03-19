import { useMemo, useState } from 'react'
import type { HeroTab } from '../data/marketingData'
import { ToolTabs } from './ToolTabs'
import { UploadPanel } from './UploadPanel'

type HeroSectionProps = {
  tabs: HeroTab[]
}

export function HeroSection({ tabs }: HeroSectionProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[1]?.id ?? tabs[0]?.id ?? '')

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [tabs, activeTabId],
  )

  return (
    <section className="relative pt-8 text-center lg:pt-15">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 px-4 lg:px-5">
        <div className="flex w-full flex-col gap-2">
          <h1 className="text-[2rem] leading-[2.5rem] font-semibold tracking-tight text-[#10131a] lg:text-[3rem] lg:leading-[3.5rem]">
            Edit PDFs easily and quickly
          </h1>
          <p className="text-base leading-7 font-semibold text-[#6a6f79]">Discover all the tools</p>
        </div>

        <div className="flex w-full flex-col items-center gap-5 lg:gap-6">
          <ToolTabs tabs={tabs} activeTabId={activeTabId} onChange={setActiveTabId} />
          {activeTab && (
            <UploadPanel
              title={activeTab.title}
              description={activeTab.description}
              primaryAction={activeTab.primaryAction}
              secondaryAction={activeTab.secondaryAction}
            />
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-1/2 bottom-0 h-32 w-full translate-x-1/2 bg-[linear-gradient(0deg,#fff_0%,#f7f7f7_100%)]"
        aria-hidden="true"
      />
    </section>
  )
}
