import { Panel } from '../../../shared/ui/Panel'

const operations = ['Reorder pages', 'Delete pages', 'Extract', 'Split', 'Merge', 'Rotate']

export function PageOperationsPanel() {
  return (
    <Panel title="Page Operations" description="V1 page-level actions wired in later milestones.">
      <ul className="grid gap-2">
        {operations.map((operation) => (
          <li
            key={operation}
            className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-600"
          >
            {operation}
          </li>
        ))}
      </ul>
    </Panel>
  )
}
