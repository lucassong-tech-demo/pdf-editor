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
    <footer className={cn("mkt-footer", className)}>
      <Container>
        <div className="mkt-footer__row">
          <img src={logoDark} alt={brand} className="mkt-footer__brand-logo" />

          <nav className="mkt-footer__links">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="mkt-footer__link">
                {link.label}
              </a>
            ))}
          </nav>

          <p className="mkt-footer__note">All processing stays in your browser.</p>
        </div>
      </Container>
    </footer>
  )
}
