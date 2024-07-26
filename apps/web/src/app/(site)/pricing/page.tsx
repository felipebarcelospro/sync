import { Separator } from '@design-system/react/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbPreviousButton,
  BreadcrumbPreviousNav,
  BreadcrumbPreviousNavItem,
} from '../_components/breadcrumb'
import { CTASection } from '../_components/cta-section'
import { FAQSection } from '../_components/faq-section'
import { PricingSection } from '../_components/pricing-section'
import { APP_CONFIGS } from '@/boilerplate.config'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return {
    title: dict.site.sections.pricing.metadata.title,
    description: dict.site.sections.pricing.metadata.description,
  }
}

export default function Page() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbPreviousButton />
          <BreadcrumbPreviousNav>
            <BreadcrumbPreviousNavItem title={APP_CONFIGS.app.name} href="/" />
            <BreadcrumbPreviousNavItem title="Pricing" href="/pricing" />
          </BreadcrumbPreviousNav>
        </BreadcrumbContainer>
      </Breadcrumb>

      <PricingSection />
      <Separator />
      <FAQSection />
      <CTASection />
    </>
  )
}
