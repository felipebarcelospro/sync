import { PostMetadata } from '@/helpers/get-post-metadata'
import Link from 'next/link'

type BlogPostCardProps = {
  post: PostMetadata
}

export function ChangelogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/changelog/${post.slug}`}>
      <li className="relative flex w-full flex-col sm:flex-row">
        <div className="flex w-full pb-4 sm:w-[200px] sm:pb-0">
          <p className="sans text-sm leading-[1.6] text-slate-11 font-normal">
            <time className="sticky top-24" dateTime="2023-11-22">
              {post.date}
            </time>
          </p>
        </div>
        <div className="relative hidden sm:flex sm:w-[150px]">
          <div className="sticky left-0 top-[102px] mt-1.5 h-1.5 w-1.5 rounded-full bg-border"></div>
          <div className="absolute left-0.5 top-0.5 h-full w-0.5 bg-border"></div>
        </div>
        <div className="w-full pb-16">
          <a href="/blog/test">
            <div className="space-y-8">
              <img
                alt={post.title}
                loading="lazy"
                width="821"
                height="432"
                decoding="async"
                data-nimg="1"
                className="col-span-2 w-full rounded-md border border-slate-6 object-cover lg:rounded-md"
                src={post.cover}
                style={{ color: 'transparent' }}
              />
              <div className="flex flex-col">
                <h2 className="md:max-w-[40rem] !leading-snug mb-2 text-xl font-bold">
                  {post.title}
                </h2>
                <article className="lg:prose-lg dark:prose-invert prose prose-gray max-w-none transition-all prose-headings:relative prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold">
                  {post.subtitle}
                </article>
              </div>
            </div>
          </a>
        </div>
      </li>
    </Link>
  )
}
