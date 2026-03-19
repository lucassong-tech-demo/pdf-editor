type UploadPanelProps = {
  title: string
  description: string
  primaryAction: string
  secondaryAction: string
}

export function UploadPanel({
  title,
  description,
  primaryAction,
  secondaryAction,
}: UploadPanelProps) {
  return (
    <div className="group relative mx-auto w-full max-w-[628px] cursor-pointer p-2 md:p-3" role="presentation">
      <div className="absolute inset-0 rounded-[28px] bg-[#e8edf5] shadow-[0_8px_24px_rgba(33,86,220,0.09)] transition group-hover:bg-[#e9f1ff]" />

      <div className="relative z-10 flex min-h-[328px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#d8dce2] bg-white px-6 pt-5 pb-8 text-center md:min-h-[340px] lg:pt-6 lg:pb-9">
        <div className="grid size-[120px] place-items-center rounded-full bg-[#edf3ff] text-5xl">📄</div>
        <p className="mt-4 text-base font-semibold text-[#1f2633] lg:text-[1.04rem]">{title}</p>
        <p className="mt-2 max-w-[500px] text-sm font-semibold leading-6 text-[#6a6f79]">{description}</p>

        <div className="mt-6 flex flex-col items-center gap-2 md:flex-row md:gap-3">
          <button
            type="button"
            className="h-10 rounded-lg bg-[#2b67ff] px-6 text-sm font-semibold text-white transition hover:bg-[#2458d8]"
          >
            {primaryAction}
          </button>
          <span className="text-sm text-[#6a6f79]">or</span>
          <button
            type="button"
            className="h-10 rounded-lg border border-[#d8dce2] bg-white px-6 text-sm font-semibold text-[#2b67ff] transition hover:bg-[#f0f3f8]"
          >
            {secondaryAction}
          </button>
        </div>
      </div>
    </div>
  )
}
