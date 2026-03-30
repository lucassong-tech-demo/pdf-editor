import { useRef, type ChangeEvent, type ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import {
  FeatureCard,
  EntryUploadBlock,
  Footer,
  Header,
  StepCard,
} from "../../components/marketing"
import { Card, Container, Section } from "../../components/primitives"
import {
  landingContent,
  landingFaqItems,
  landingFeatureCards,
  landingSteps,
} from "../../features/landing/config"
import {
  FeatureAnnotateIcon,
  FeatureEditIcon,
  FeaturePagesIcon,
  FeatureRotateIcon,
  FeatureSplitIcon,
} from "../../components/icons/MarketingIcons"
import uploadIcon from "../../assets/upload-icon.svg"
import editPdfIcon from "../../assets/edit-pdf-icon.svg"
import docDownloadIcon from "../../assets/doc-download-icon.svg"

const stepVisualById: Record<string, ReactElement> = {
  open: <img src={uploadIcon} alt="" className="block size-[78px] object-contain" />,
  edit: <img src={editPdfIcon} alt="" className="block size-[78px] object-contain" />,
  download: <img src={docDownloadIcon} alt="" className="block size-[78px] object-contain" />,
}

const featureIconById: Record<string, ReactElement> = {
  edit: <FeatureEditIcon width={24} height={24} />,
  "remove-pages": <FeaturePagesIcon width={24} height={24} />,
  merge: <FeaturePagesIcon width={24} height={24} />,
  split: <FeatureSplitIcon width={24} height={24} />,
  rotate: <FeatureRotateIcon width={24} height={24} />,
  annotate: <FeatureAnnotateIcon width={24} height={24} />,
}

export function LandingPage() {
  const navigate = useNavigate()
  const pickerRef = useRef<HTMLInputElement | null>(null)

  const openLocalFilePicker = () => {
    pickerRef.current?.click()
  }

  const handleLandingFilePicked = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    navigate("/editor", {
      state: { initialPdfFile: file },
    })
    event.currentTarget.value = ""
  }

  const createNewDocument = () => {
    navigate("/editor/new")
  }

  return (
    <div className="app-page-surface">
      <input
        ref={pickerRef}
        type="file"
        accept="application/pdf,.pdf"
        className="sr-only"
        aria-label="Select PDF file"
        onChange={handleLandingFilePicked}
      />
      <Header />
      <div className="h-12 lg:h-[68px]" aria-hidden="true" />

      <main>
        <Section spacing="lg" className="relative overflow-hidden pb-10 lg:pb-20">
          <Container size="narrow" className="text-center">
            <div>
              <h1 className="m-0 text-[32px] leading-[44px] font-normal tracking-[-1px] lg:text-[40px] lg:leading-[56px]">
                {landingContent.heroTitle}
              </h1>
              <p className="mt-2 text-[var(--text-subtitle-3)] leading-7 font-semibold text-[hsl(var(--grey-500))]">
                {landingContent.heroSubtitle}
              </p>
            </div>

            <div className="mt-6">
              <EntryUploadBlock
                primaryLabel={landingContent.primaryCta}
                secondaryLabel={landingContent.secondaryCta}
                onUploadPdf={openLocalFilePicker}
                onCreateDocument={createNewDocument}
              />
            </div>

          </Container>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[hsl(var(--grey-100))] to-transparent"
          />
        </Section>

        <Section tone="white" spacing="lg" id="how-it-works">
          <Container>
            <div>
              <h2 className="m-0 text-center text-[clamp(28px,4vw,var(--text-heading-2))] leading-[1.15] font-normal tracking-[-0.02em] text-[hsl(var(--primary))]">
                {landingContent.stepsTitle}
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
                {landingSteps.map((step) => (
                  <StepCard
                    key={step.id}
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    visual={stepVisualById[step.id]}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="lg" id="features">
          <Container>
            <div>
              <h2 className="m-0 text-[clamp(28px,4vw,var(--text-heading-2))] leading-[1.15] font-normal tracking-[-0.02em] text-[hsl(var(--black))]">
                {landingContent.featuresTitle}
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {landingFeatureCards.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    title={feature.title}
                    description={feature.description}
                    actionLabel={feature.actionLabel}
                    icon={featureIconById[feature.id]}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="white" spacing="md" id="faq">
          <Container size="narrow">
            <div>
              <h2 className="m-0 text-center text-[clamp(28px,4vw,var(--text-heading-2))] leading-[1.15] font-normal tracking-[-0.02em]">
                {landingContent.faqTitle}
              </h2>

              <div className="mt-6 grid gap-3">
                {landingFaqItems.map((faq) => (
                  <Card
                    key={faq.id}
                    padding="md"
                    className="rounded-[var(--radius-xl)] transition-colors hover:border-[hsl(var(--grey-400))] hover:bg-[hsl(var(--grey-100))]"
                  >
                    <h3 className="m-0 text-[var(--text-subtitle-3)] font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-[var(--text-body-1)] leading-[1.7] text-[hsl(var(--grey-600))]">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  )
}
