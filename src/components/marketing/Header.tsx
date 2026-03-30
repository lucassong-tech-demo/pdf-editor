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
    <header className={cn("fixed top-0 left-0 z-20 w-full bg-transparent lg:pt-4", className)}>
      <Container>
        <div className="flex h-12 items-center justify-between rounded-[var(--radius-xl)] bg-[hsl(var(--black))] px-4 text-[hsl(var(--white))] lg:h-[52px] lg:px-5">
          <a href="#" className="inline-flex items-center">
            <img src={logoDark} alt={brand} className="block h-10 w-auto object-contain" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center rounded-[var(--radius-sm)] px-3 py-2 text-[var(--text-body-1)] font-semibold transition-colors hover:bg-[hsl(var(--white)/0.1)] focus-visible:outline-2 focus-visible:outline-[hsl(var(--primary)/0.25)] focus-visible:outline-offset-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="secondary"
              size="md"
              onClick={onLogin}
              className="border-[hsl(var(--white))] bg-transparent text-[hsl(var(--white))] hover:border-[hsl(var(--white))] hover:bg-[hsl(var(--white)/0.05)] focus-visible:border-[hsl(var(--white))] focus-visible:bg-[hsl(var(--white)/0.2)] active:border-[hsl(var(--white))] active:bg-[hsl(var(--white)/0.2)]"
            >
              Login
            </Button>
            <Button
              size="md"
              onClick={onSignUp}
              className="border-transparent bg-[#3d99f5] text-[hsl(var(--white))] hover:bg-[#2f8be7] active:bg-[#237fd7]"
            >
              Sign up
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-[hsl(var(--white))] hover:bg-[hsl(var(--white)/0.1)] lg:hidden"
            aria-label="Open menu"
          >
            Menu
          </Button>
        </div>
      </Container>
    </header>
  )
}
