import { useMemo, useState, type ReactElement } from "react"
import { useNavigate } from "react-router-dom"
import {
  FeatureCard,
  Footer,
  Header,
  StepCard,
  UploadPanel,
} from "../../components/marketing"
import {
  Card,
  Container,
  Section,
  Tabs,
  type TabItem,
} from "../../components/primitives"
import {
  landingContent,
  landingFaqItems,
  landingFeatureCards,
  landingSteps,
  landingTabs,
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
  open: <img src={uploadIcon} alt="" className="mkt-step-icon" />,
  edit: <img src={editPdfIcon} alt="" className="mkt-step-icon" />,
  download: <img src={docDownloadIcon} alt="" className="mkt-step-icon" />,
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
  const [activeTab, setActiveTab] = useState(landingTabs[0]?.id ?? "edit")
  const navigate = useNavigate()

  const tabs: TabItem[] = useMemo(
    () => landingTabs.map((item) => ({ id: item.id, label: item.label })),
    [],
  )

  const openLocalFilePicker = () => {
    navigate("/editor")
  }

  const createNewDocument = () => {
    navigate("/editor/new")
  }

  return (
    <div className="mkt-page">
      <Header />
      <div className="mkt-header-spacer" aria-hidden="true" />

      <main>
        <Section spacing="lg" className="mkt-hero">
          <Container size="narrow" className="mkt-hero__center">
            <div>
              <h1 className="mkt-hero__headline">
                {landingContent.heroTitle}
              </h1>
              <p className="mkt-hero__subtitle">
                {landingContent.heroSubtitle}
              </p>
            </div>

            <div className="mkt-hero__tabs">
              <Tabs items={tabs} value={activeTab} onChange={setActiveTab} />
            </div>

            <div className="mkt-hero__panel">
              <UploadPanel
                title={landingContent.uploadPanelTitle}
                description={landingContent.uploadPanelDescription}
                primaryLabel={landingContent.primaryCta}
                secondaryLabel={landingContent.secondaryCta}
                onUploadPdf={openLocalFilePicker}
                onCreateDocument={createNewDocument}
                visual={<img src={uploadIcon} alt="" className="upload-panel__image" />}
              />
            </div>

          </Container>

          <div aria-hidden="true" className="mkt-hero__fade" />
        </Section>

        <Section tone="white" spacing="lg" id="how-it-works">
          <Container>
            <div className="mkt-steps">
              <h2 className="mkt-steps__title">
                {landingContent.stepsTitle}
              </h2>

              <div className="mkt-steps__grid">
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
            <div className="mkt-features">
              <h2 className="mkt-features__title">
                {landingContent.featuresTitle}
              </h2>

              <div className="mkt-features__grid">
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
            <div className="mkt-faq">
              <h2 className="mkt-faq__title">
                {landingContent.faqTitle}
              </h2>

              <div className="mkt-faq__list">
                {landingFaqItems.map((faq) => (
                  <Card key={faq.id} padding="md" className="mkt-faq__item">
                    <h3 className="mkt-faq__question">{faq.question}</h3>
                    <p className="mkt-faq__answer">{faq.answer}</p>
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
