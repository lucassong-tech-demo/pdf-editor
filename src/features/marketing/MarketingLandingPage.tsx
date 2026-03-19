import { CenterCtaSection } from './components/CenterCtaSection'
import { FeatureGroupSection } from './components/FeatureGroupSection'
import { FooterPlaceholder } from './components/FooterPlaceholder'
import { HeroSection } from './components/HeroSection'
import { HowItWorksSection } from './components/HowItWorksSection'
import { MarketingHeader } from './components/MarketingHeader'
import { featureGroups, heroTabs, howItWorksSteps, topNavLinks } from './data/marketingData'

export function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#10131a]">
      <MarketingHeader links={topNavLinks} />
      <div className="h-12 lg:h-[68px]" />

      <main>
        <HeroSection tabs={heroTabs} />
        <HowItWorksSection steps={howItWorksSteps} />
        <CenterCtaSection />
        <FeatureGroupSection groups={featureGroups} />
      </main>

      <FooterPlaceholder />
    </div>
  )
}
