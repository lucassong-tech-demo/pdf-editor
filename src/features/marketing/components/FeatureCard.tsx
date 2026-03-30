import type { FeatureCardData } from '../data/marketingData'

type FeatureCardProps = {
  card: FeatureCardData
}

export function FeatureCard({ card }: FeatureCardProps) {
  return (
    <article className="group flex min-h-[200px] flex-col gap-5 overflow-hidden rounded-lg border border-[#e3e5e8] bg-white p-4 text-left transition-colors duration-300 hover:border-[#d7dbe1] lg:min-h-[300px] lg:justify-between lg:gap-10 lg:hover:border-transparent">
      <div className="flex size-13 items-center justify-center rounded-full bg-[#edf3ff] text-3xl text-[#2b67ff] transition duration-300 lg:origin-top-left lg:group-hover:scale-110">
        <span aria-hidden="true">{card.icon}</span>
      </div>

      <div className="flex flex-col items-start gap-2 transition duration-300 lg:flex-1 lg:gap-3 lg:translate-y-[42px] lg:group-hover:translate-y-0">
        <div className="flex w-full items-center justify-between gap-5 text-[#2b67ff] lg:text-[#10131a] lg:group-hover:text-[#2b67ff]">
          <h4 className="text-base leading-7 font-semibold">{card.title}</h4>
          <span className="text-lg lg:hidden" aria-hidden="true">
            ›
          </span>
        </div>
        <p className="text-xs leading-5 text-[#2b67ff] lg:text-sm lg:leading-6 lg:text-[#595f6a] lg:group-hover:text-[#2b67ff]">
          {card.description}
        </p>
        <button
          type="button"
          className="mt-1 hidden h-10 min-w-29 rounded-lg border border-[#d8dce2] px-6 text-sm font-semibold text-[#2b67ff] opacity-0 transition duration-300 hover:bg-[#f0f3f8] lg:inline-flex lg:items-center lg:justify-center lg:group-hover:opacity-100"
        >
          Start
        </button>
      </div>
    </article>
  )
}
