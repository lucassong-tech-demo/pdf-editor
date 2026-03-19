import type { NavLink } from '../data/marketingData'
import pdfUpdateLogo from '../../../assets/pdfupdate-logo.svg'

type MarketingHeaderProps = {
  links: NavLink[]
}

export function MarketingHeader({ links }: MarketingHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 px-0 lg:pt-4">
      <div className="mx-auto max-w-[1240px] px-0 lg:px-5">
        <div className="flex h-12 items-center justify-between rounded-none bg-neutral-950 px-4 text-white lg:h-[52px] lg:rounded-xl lg:px-5">
          <a className="flex items-center gap-2" href="#" aria-label="PDF Editor home">
            <img src={pdfUpdateLogo} alt="PDFupdate logo" className="h-7 w-auto" />
            <span className="text-sm font-semibold tracking-tight lg:text-base">PDFupdate</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Top navigation">
            {links.map((link) => (
              <a
                key={link.label}
                className="rounded-sm px-3 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button className="h-10 rounded-lg border border-white/70 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
              Log in
            </button>
            <button className="h-10 rounded-lg bg-[#2b67ff] px-6 text-sm font-semibold text-white transition hover:bg-[#2458d8]">
              Sign up
            </button>
          </div>

          <button
            className="inline-flex size-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 6h18M3 12h12M3 18h18" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
