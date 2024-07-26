import { APP_CONFIGS } from '@/boilerplate.config'
import { getPostContent, getPostMetadata } from '@/helpers/get-post-metadata'
import { getUrl } from '@/helpers/get-url'
import { Metadata } from 'next'
import {
  Breadcrumb,
  BreadcrumbContainer,
  BreadcrumbPreviousButton,
  BreadcrumbPreviousNav,
  BreadcrumbPreviousNavItem,
} from '../../_components/breadcrumb'
import { CTASection } from '../../_components/cta-section'
import { PostWrapper } from '../../_components/post-wrapper'

type PageProps = {
  params: { slug: string }
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata('blog')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = params.slug
  const post = getPostContent(slug, 'blog')

  return {
    title: post.title,
    description: post.subtitle,
    openGraph: {
      images: [getUrl(post.cover)],
    },
  }
}

export default function Page({ params }: PageProps) {
  const slug = params.slug

  const post = getPostContent(slug, 'blog')
  const related = getPostMetadata('blog')

  return (
    <>
      <Breadcrumb>
        <BreadcrumbContainer>
          <BreadcrumbPreviousButton />
          <BreadcrumbPreviousNav>
            <BreadcrumbPreviousNavItem title={APP_CONFIGS.app.name} href="/" />
            <BreadcrumbPreviousNavItem title="Blog" href="/blog" />
            <BreadcrumbPreviousNavItem title={post.title} href={post.slug} />
          </BreadcrumbPreviousNav>
        </BreadcrumbContainer>
      </Breadcrumb>
      <PostWrapper post={post} related={related} />
      <CTASection />
    </>
  )
}
