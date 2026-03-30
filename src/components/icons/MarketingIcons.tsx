import type { SVGProps } from "react"

function BaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props} />
  )
}

export function PdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h5" />
      <path d="M9 17h6" />
    </BaseIcon>
  )
}

export function StepOpenIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M3 7h18v10H3z" />
      <path d="M8 7l2-3h4l2 3" />
      <path d="M12 11v4" />
      <path d="M10.5 13.5 12 15l1.5-1.5" />
    </BaseIcon>
  )
}

export function StepEditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20h4l11-11-4-4L4 16z" />
      <path d="m13 6 4 4" />
    </BaseIcon>
  )
}

export function StepDownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4v10" />
      <path d="m8.5 10.5 3.5 3.5 3.5-3.5" />
      <path d="M4 18h16" />
    </BaseIcon>
  )
}

export function FeatureEditIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M4 19h4l11-11-4-4L4 15z" />
      <path d="m13 5 4 4" />
    </BaseIcon>
  )
}

export function FeaturePagesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="4" width="10" height="14" rx="1.5" />
      <rect x="9" y="6" width="10" height="14" rx="1.5" />
    </BaseIcon>
  )
}

export function FeatureSplitIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M12 4v16" />
      <path d="M6 8h4M6 16h4M14 8h4M14 16h4" />
    </BaseIcon>
  )
}

export function FeatureRotateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="M6 12a6 6 0 1 0 2-4.5" />
      <path d="M3 6v4h4" />
    </BaseIcon>
  )
}

export function FeatureAnnotateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <BaseIcon {...props}>
      <path d="m5 18 4-1 9-9-3-3-9 9z" />
      <path d="M4 20h16" />
    </BaseIcon>
  )
}
