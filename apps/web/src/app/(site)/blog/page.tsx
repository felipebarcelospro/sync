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
import { BlogPostCard } from './_components/blog-post-card'
import { Separator } from '@design-system/react/components/ui/separator'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return {
    title: dict.site.sections.blog.metadata.title,
    description: `${dict.site.sections.blog.metadata.description} ${APP_CONFIGS.app.name}.`,
  }
}

export default function Page() {
  const postMetadata = getPostMetadata('blog')
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbPreviousButton />
          <BreadcrumbPreviousNav>
            <BreadcrumbPreviousNavItem title={APP_CONFIGS.app.name} href="/" />
            <BreadcrumbPreviousNavItem title="Blog" href="/blog" />
          </BreadcrumbPreviousNav>
        </BreadcrumbContainer>
      </Breadcrumb>

      <section>
        <div className="container max-w-screen-xl py-12">
          <h1 className="text-3xl font-normal mb-12 md:max-w-[40%] leading-snug">
            {dict.site.sections.blog.title} {APP_CONFIGS.app.name}.
          </h1>
          <SubscribeButtons />
        </div>
      </section>

      <Separator />

      <section className="py-16">
        <div className="container max-w-screen-xl">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-16 lg:grid-cols-3">
            {postMetadata.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  )
}
