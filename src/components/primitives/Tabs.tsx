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
        "ui-tab",
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
        "ui-tabs",
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
