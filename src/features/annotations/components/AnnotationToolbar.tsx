import { Panel } from '../../../shared/ui/Panel'

const tools = ['Highlight', 'Freehand']

export function AnnotationToolbar() {
  return (
    <Panel title="Annotations" description="Basic V1 highlight and freehand tools placeholder.">
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <span
            key={tool}
            className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600"
          >
            {tool}
          </span>
        ))}
      </div>
    </Panel>
  )
}
