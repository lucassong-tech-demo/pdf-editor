import type { ReactNode } from "react"
import { Button, Container } from "../../components/primitives"
import logo from "../../assets/pdfbot-logo.svg"

interface EditorWorkspaceShellProps {
  title: string
  subtitle: string
  children: ReactNode
  onGoHome?: () => void
}

export function EditorWorkspaceShell({
  title,
  subtitle,
  children,
  onGoHome,
}: EditorWorkspaceShellProps) {
  return (
    <div className="app-page-surface">
      <header className="border-b border-[hsl(var(--grey-300))] bg-[hsl(var(--white))] py-4">
        <Container className="flex items-center justify-between gap-4">
          <p className="inline-flex items-center text-[var(--text-subtitle-3)] font-semibold">
            <img src={logo} alt="PDFbot" className="block h-5 w-auto" />
          </p>
          <Button variant="secondary" size="sm" onClick={onGoHome}>
            Back to landing
          </Button>
        </Container>
      </header>

      <main className="py-10 lg:py-14">
        <Container size="narrow">
          <div className="rounded-[var(--radius-xl)] border border-[hsl(var(--grey-300))] bg-[hsl(var(--white))] p-6 lg:p-8">
            <h1 className="m-0 text-[clamp(28px,4vw,var(--text-heading-2))] leading-[1.15] tracking-[-0.02em] font-bold">
              {title}
            </h1>
            <p className="mt-2 text-[var(--text-body-1)] text-[hsl(var(--grey-600))]">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </Container>
      </main>
    </div>
  )
}
