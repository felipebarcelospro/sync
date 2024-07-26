import { Separator } from '@design-system/react/components/ui/separator'
import { CTASection } from './_components/cta-section'
import { FAQSection } from './_components/faq-section'
import { FeaturesSection } from './_components/features-section'
import { HeroSectionWithGradient } from './_components/hero-section-with-gradient'
import { MorePossibilitiesSection } from './_components/more-possibilities-section'
import { PricingSection } from './_components/pricing-section'
import { EfficiencySection } from './_components/efficiency-section'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return {
    title: dict.site.title,
    description: dict.site.description,
  }
}

export default function Page() {
  return (
    <>
      <HeroSectionWithGradient />
      <FeaturesSection />
      <Separator />
      <Separator />
      <MorePossibilitiesSection />
      <Separator />
      <PricingSection />
      <Separator />
      <EfficiencySection />
      <Separator />
      <FAQSection />
      <CTASection />
    </>
  )
}
