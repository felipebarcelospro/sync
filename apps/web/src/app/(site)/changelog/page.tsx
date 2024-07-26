import { APP_CONFIGS } from '@/boilerplate.config'
import { getPostMetadata } from '@/helpers/get-post-metadata'
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbPreviousButton,
  BreadcrumbPreviousNav,
  BreadcrumbPreviousNavItem,
} from '../_components/breadcrumb'
import { CTASection } from '../_components/cta-section'
import { SubscribeButtons } from '../_components/subscribe-to-updates'
import { ChangelogPostCard } from './_components/changelog-post-card'
import { Separator } from '@design-system/react/components/ui/separator'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return {
    title: dict.site.sections.changelog.metadata.title,
    description: `${dict.site.sections.changelog.metadata.description} ${APP_CONFIGS.app.name}.`,
  }
}

export default function Page() {
  const postMetadata = getPostMetadata('changelog')
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbPreviousButton />
          <BreadcrumbPreviousNav>
            <BreadcrumbPreviousNavItem title={APP_CONFIGS.app.name} href="/" />
            <BreadcrumbPreviousNavItem title="Changelog" href="/changelog" />
          </BreadcrumbPreviousNav>
        </BreadcrumbContainer>
      </Breadcrumb>

      <section>
        <div className="container max-w-screen-xl py-12">
          <h1 className="text-3xl font-normal mb-12 md:max-w-[40%] leading-snug">
            {dict.site.sections.changelog.title}
            {''}
            {APP_CONFIGS.app.name}.
          </h1>
          <SubscribeButtons />
        </div>
      </section>

      <Separator />

      <section className="py-16">
        <div className="container max-w-screen-xl">
          <ul className="flex flex-col">
            {postMetadata.map((post) => (
              <ChangelogPostCard key={post.slug} post={post} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  )
}
