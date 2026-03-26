import type { LandingFaqItem } from "../models/content"

export const landingFaqItems: LandingFaqItem[] = [
  {
    id: "local-processing",
    question: "Are my files uploaded to a server?",
    answer: "No. V1 editing flow is browser-first and processes files locally on your device.",
  },
  {
    id: "supported-actions",
    question: "What can I do in V1?",
    answer:
      "You can reorder, delete, extract, split, merge, rotate, annotate, and export PDFs in the browser.",
  },
  {
    id: "speed",
    question: "Is processing fast for normal files?",
    answer: "Yes. The UI is designed for fast local workflows with direct file access and no upload queue.",
  },
]
