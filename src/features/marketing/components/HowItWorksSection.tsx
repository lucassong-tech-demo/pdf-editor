import type { HowItWorksStep } from '../data/marketingData'

type HowItWorksSectionProps = {
  steps: HowItWorksStep[]
}

export function HowItWorksSection({ steps }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-13 px-4 pt-20 pb-26 lg:px-5 lg:pt-17 lg:pb-32">
        <h2 className="text-center text-[2rem] leading-[2.5rem] font-semibold tracking-tight text-[#2b67ff] lg:text-[3rem] lg:leading-[3.5rem]">
          How PDF Editor works
        </h2>

        <div className="grid w-full gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <article key={step.step} className="flex flex-col gap-7 lg:min-h-[280px]">
              <div className="relative flex min-h-45 items-center justify-center rounded-2xl bg-[#edf3ff]">
                <span className="absolute top-0 left-0 grid size-7 place-items-center bg-[#2b67ff] text-sm font-semibold text-white">
                  {step.step}.
                </span>
                <span className="text-6xl" aria-hidden="true">
                  {step.icon}
                </span>
              </div>

              <div className="flex flex-col gap-3 text-left">
                <h3 className="text-xl leading-8 font-semibold text-[#2b67ff]">{step.title}</h3>
                <p className="text-sm leading-6 text-[#2b67ff]">{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
