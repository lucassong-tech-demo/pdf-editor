import type { LandingContentModel, LandingStepItem } from "../models/content"

export const landingContent: LandingContentModel = {
  heroTitle: "Online PDF Document Editor",
  heroSubtitle: "Private browser-first workflow for PDF editing.",
  uploadPanelTitle: "Edit PDFs directly in your browser",
  uploadPanelDescription:
    "No external upload required for V1 editing flow. Open a file and start working in seconds.",
  primaryCta: "Upload PDF",
  secondaryCta: "Create new document",
  stepsTitle: "How PDF Editor works",
  featuresTitle: "Work with PDFs",
  faqTitle: "FAQ",
}

export const landingSteps: LandingStepItem[] = [
  {
    id: "open",
    step: 1,
    title: "Open your PDF",
    description: "Select a file from your device to begin.",
  },
  {
    id: "edit",
    step: 2,
    title: "Edit your document",
    description: "Reorder pages, annotate, and adjust structure with client-side processing.",
  },
  {
    id: "download",
    step: 3,
    title: "Download your file",
    description: "Export your updated PDF in seconds.",
  },
]
