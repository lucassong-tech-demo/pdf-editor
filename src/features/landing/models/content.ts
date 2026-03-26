export interface LandingTabItem {
  id: string
  label: string
}

export interface LandingFeatureItem {
  id: string
  title: string
  description: string
  actionLabel: string
}

export interface LandingFaqItem {
  id: string
  question: string
  answer: string
}

export interface LandingStepItem {
  id: string
  step: number
  title: string
  description: string
}

export interface LandingContentModel {
  heroTitle: string
  heroSubtitle: string
  uploadPanelTitle: string
  uploadPanelDescription: string
  primaryCta: string
  secondaryCta: string
  stepsTitle: string
  featuresTitle: string
  faqTitle: string
}
