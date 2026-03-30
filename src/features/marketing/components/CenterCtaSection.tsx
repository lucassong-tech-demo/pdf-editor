export function CenterCtaSection() {
  return (
    <section className="relative bg-white pb-24">
      <div className="mx-auto max-w-[1240px] px-4 text-center lg:px-5">
        <button
          type="button"
          className="relative z-10 h-10 rounded-lg bg-[#2b67ff] px-6 text-sm font-semibold text-white transition hover:bg-[#2458d8]"
        >
          Edit PDF
        </button>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-1 mx-auto h-[140px] w-full max-w-[700px] rounded-full bg-[#2b67ff] opacity-35 blur-[82px] lg:h-[240px]"
        aria-hidden="true"
      />
    </section>
  )
}
