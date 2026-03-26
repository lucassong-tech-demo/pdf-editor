import type { ButtonHTMLAttributes, KeyboardEvent } from "react"
import { cn } from "../../lib/cn"

export interface TabItem {
  id: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  value: string
  onChange: (id: string) => void
  className?: string
}

function TabButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer rounded-[var(--radius-sm)] border-0 bg-[hsl(var(--white))] px-4 py-2 text-[var(--text-body-1)] font-semibold text-[hsl(var(--black))] transition-colors hover:bg-[hsl(var(--primary-light))] hover:text-[hsl(var(--primary))] aria-selected:bg-[hsl(var(--primary-light))] aria-selected:text-[hsl(var(--primary))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--primary)/0.25)] focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:text-[hsl(var(--grey-500))]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  const currentIndex = items.findIndex((item) => item.id === value)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return
    }

    event.preventDefault()
    const direction = event.key === "ArrowRight" ? 1 : -1
    let nextIndex = currentIndex

    for (let step = 0; step < items.length; step += 1) {
      nextIndex = (nextIndex + direction + items.length) % items.length
      if (!items[nextIndex]?.disabled) {
        onChange(items[nextIndex].id)
        return
      }
    }
  }

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "inline-flex h-12 items-center gap-1 rounded-[var(--radius-md)] border border-[hsl(var(--grey-300))] bg-[hsl(var(--white))] p-1",
        className,
      )}
      onKeyDown={handleKeyDown}
    >
      {items.map((item) => (
        <TabButton
          key={item.id}
          role="tab"
          aria-selected={item.id === value}
          disabled={item.disabled}
          onClick={() => onChange(item.id)}
        >
          {item.label}
        </TabButton>
      ))}
    </div>
  )
}
