import { Container } from "../primitives/Container"
import { cn } from "../../lib/cn"
import logoDark from "../../assets/pdfbot-logo-dark.svg"

export interface FooterLink {
  label: string
  href: string
}

export interface FooterProps {
  brand?: string
  links?: FooterLink[]
  className?: string
}

export function Footer({
  brand = "PDF Editor",
  links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  className,
}: FooterProps) {
  return (
    <footer className={cn("bg-[hsl(var(--black))] py-10", className)}>
      <Container>
        <div className="flex flex-col gap-4 text-[var(--text-body-1)] text-[hsl(var(--grey-300))] md:flex-row md:items-center md:justify-between">
          <img src={logoDark} alt={brand} className="block h-5 w-auto object-contain" />

          <nav className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[hsl(var(--white))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--primary)/0.25)] focus-visible:outline-offset-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-[hsl(var(--grey-400))]">All processing stays in your browser.</p>
        </div>
      </Container>
    </footer>
  )
}
