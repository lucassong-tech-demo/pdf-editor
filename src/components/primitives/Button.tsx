import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "../../lib/cn"

type ButtonVariant = "primary" | "secondary" | "ghost"
type ButtonSize = "sm" | "md" | "icon"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-[30px] rounded-[var(--radius-sm)] px-3 text-[13px]",
  md: "h-9 px-5",
  icon: "size-9 px-0",
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "border-transparent bg-[#3d99f5] !text-[hsl(var(--white))] hover:bg-[#2f8be7] active:bg-[#237fd7] focus-visible:shadow-[0_1px_4px_0_hsl(var(--primary)/0.5),0_1px_4px_2px_hsl(var(--primary)/0.08)]",
  secondary: "border-[hsl(var(--grey-300))] bg-[hsl(var(--white))] !text-[#3d99f5] hover:border-[hsl(var(--grey-400))] hover:bg-[hsl(var(--grey-200))] active:border-[hsl(var(--grey-500))] active:bg-[hsl(var(--grey-300))] focus-visible:border-[#3d99f5] focus-visible:bg-[hsl(var(--white))]",
  ghost: "border-transparent bg-transparent text-[hsl(var(--grey-600))] hover:bg-[hsl(var(--grey-200))] active:bg-[hsl(var(--grey-300))]",
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-lg)] border text-[var(--text-body-1)] font-semibold leading-6 whitespace-nowrap transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[hsl(var(--grey-400))] disabled:bg-[hsl(var(--grey-200))] disabled:text-[hsl(var(--grey-500))]",
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </button>
  )
}
