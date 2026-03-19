export type NavLink = {
  label: string
  href: string
}

export type HeroTab = {
  id: string
  label: string
  title: string
  description: string
  primaryAction: string
  secondaryAction: string
}

export type HowItWorksStep = {
  step: string
  title: string
  description: string
  icon: string
}

export type FeatureCardData = {
  title: string
  description: string
  icon: string
}

export type FeatureGroup = {
  title: string
  cards: FeatureCardData[]
}

export const topNavLinks: NavLink[] = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Prices', href: '#' },
  { label: 'FAQs', href: '#' },
]

export const heroTabs: HeroTab[] = [
  {
    id: 'archive',
    label: 'Archive PDF',
    title: 'Edit and organize PDF files privately',
    description:
      'Edit text, reorder pages, and prepare documents right in your browser with local processing.',
    primaryAction: 'Upload PDF',
    secondaryAction: 'Create new document',
  },
  {
    id: 'convert',
    label: 'Convert',
    title: 'Convert PDF files and Office documents',
    description:
      'Convert DOCX, XLSX, PPTX, and images to PDF, or export PDF into Word, Excel, and PowerPoint.',
    primaryAction: 'Upload to convert',
    secondaryAction: 'Create new document',
  },
]

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: '1',
    title: '/ Open your PDF',
    description: 'Select a file from your device to get started.',
    icon: '📂',
  },
  {
    step: '2',
    title: '/ Edit your document',
    description: 'Work directly in your browser while keeping files private on your device.',
    icon: '✏️',
  },
  {
    step: '3',
    title: '/ Download your file',
    description: 'Get your updated file in seconds, ready to use.',
    icon: '⬇️',
  },
]

export const featureGroups: FeatureGroup[] = [
  {
    title: 'Edit and complete',
    cards: [
      {
        title: 'Edit',
        description: 'Edit text, images, and other elements with full control over the layout.',
        icon: '✍️',
      },
      {
        title: 'Sign',
        description: 'Add signatures to contracts and forms before sharing or storing.',
        icon: '🖊️',
      },
      {
        title: 'Remove pages',
        description: 'Delete specific pages and keep only the content you need.',
        icon: '🗑️',
      },
    ],
  },
  {
    title: 'Convert from PDF',
    cards: [
      {
        title: 'PDF to Excel',
        description: 'Turn documents into editable spreadsheets for table and data workflows.',
        icon: '📊',
      },
      {
        title: 'PDF to PowerPoint',
        description: 'Convert PDFs into slide decks to reuse content across presentations.',
        icon: '📽️',
      },
      {
        title: 'PDF to Word',
        description: 'Export to editable Word format for quick text revisions.',
        icon: '📝',
      },
    ],
  },
  {
    title: 'Convert to PDF',
    cards: [
      {
        title: 'Word to PDF',
        description: 'Convert DOC and DOCX files into polished PDF documents.',
        icon: '📄',
      },
      {
        title: 'Excel to PDF',
        description: 'Preserve spreadsheet formatting while sharing as PDF.',
        icon: '📈',
      },
      {
        title: 'Image to PDF',
        description: 'Combine JPG, PNG, and other images into one PDF file.',
        icon: '🖼️',
      },
    ],
  },
]
