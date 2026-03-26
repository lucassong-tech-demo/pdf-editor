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
    <div className="editor-page">
      <header className="editor-header">
        <Container className="editor-header__row">
          <p className="editor-header__title">
            <img src={logo} alt="PDFbot" className="editor-header__logo" />
          </p>
          <Button variant="secondary" size="sm" onClick={onGoHome}>
            Back to landing
          </Button>
        </Container>
      </header>

      <main className="editor-main">
        <Container size="narrow">
          <div className="editor-panel">
            <h1 className="editor-panel__title">{title}</h1>
            <p className="editor-panel__subtitle">{subtitle}</p>
            <div className="editor-panel__content">{children}</div>
          </div>
        </Container>
      </main>
    </div>
  )
}
