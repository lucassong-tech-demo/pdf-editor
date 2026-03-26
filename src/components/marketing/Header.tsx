import { Button } from "../primitives/Button"
import { Container } from "../primitives/Container"
import { cn } from "../../lib/cn"
import logoDark from "../../assets/pdfbot-logo-dark.svg"

export interface HeaderLink {
  label: string
  href: string
}

export interface HeaderProps {
  brand?: string
  links?: HeaderLink[]
  onLogin?: () => void
  onSignUp?: () => void
  className?: string
}

export function Header({
  brand = "PDF Editor",
  links = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  onLogin,
  onSignUp,
  className,
}: HeaderProps) {
  return (
    <header className={cn("mkt-header", className)}>
      <Container>
        <div className="mkt-header__shell">
          <a href="#" className="mkt-header__brand">
            <img src={logoDark} alt={brand} className="mkt-header__brand-logo" />
          </a>

          <nav className="mkt-header__nav">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="mkt-header__link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mkt-header__actions">
            <Button variant="secondary" size="md" onClick={onLogin} className="mkt-header__login-btn">
              Login
            </Button>
            <Button size="md" onClick={onSignUp} className="mkt-header__signup-btn">
              Sign up
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="mkt-header__mobile-btn"
            aria-label="Open menu"
          >
            Menu
          </Button>
        </div>
      </Container>
    </header>
  )
}
