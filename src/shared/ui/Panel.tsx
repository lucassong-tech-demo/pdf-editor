import type { ReactNode } from 'react'

type PanelProps = {
  title: string
  description: string
  children?: ReactNode
}

export function Panel({ title, description, children }: PanelProps) {
  return (
    <section className="min-h-0 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </section>
  )
}
