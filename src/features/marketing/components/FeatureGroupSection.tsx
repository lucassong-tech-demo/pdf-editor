import type { FeatureGroup } from '../data/marketingData'
import { FeatureCard } from './FeatureCard'

type FeatureGroupSectionProps = {
  groups: FeatureGroup[]
}

export function FeatureGroupSection({ groups }: FeatureGroupSectionProps) {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-17 px-4 pt-[105px] pb-25 lg:px-5 lg:pt-40 lg:pb-40">
        <h2 className="text-left text-[2rem] leading-[2.5rem] font-semibold tracking-tight text-[#10131a] lg:text-[3rem] lg:leading-[3.5rem]">
          Work with PDFs
        </h2>

        <div className="flex flex-col gap-10 lg:gap-20">
          {groups.map((group) => (
            <section key={group.title} className="flex flex-col gap-5 lg:gap-7">
              <h3 className="text-2xl leading-9 font-semibold text-[#10131a]">{group.title}</h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {group.cards.map((card) => (
                  <FeatureCard key={card.title} card={card} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
