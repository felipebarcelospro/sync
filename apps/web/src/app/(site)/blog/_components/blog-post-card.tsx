import { APP_CONFIGS } from '@/boilerplate.config'
import { PostMetadata } from '@/helpers/get-post-metadata'
import Link from 'next/link'

type BlogPostCardProps = {
  post: PostMetadata
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <li>
      <Link href={`/blog/${post.slug}`} className="flex flex-col">
        <img
          className="rounded-md border border-border mb-8"
          src={post.cover}
          alt={post.title}
        />

        <div className="">
          <h2 className="font-bold font-styling font-display line-clamp-5 leading-normal text-xl text-slate-12 mb-2">
            {post.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">{post.subtitle}</p>
          <div className="flex items-center gap-1.5 md:gap-2 lg:mt-3">
            <img
              src={APP_CONFIGS.app.creator.image}
              alt={APP_CONFIGS.app.creator.name}
              className="rounded-full h-9 w-9"
            />
            <div className="flex flex-col">
              <p className="text-sm font-bold">
                {APP_CONFIGS.app.creator.name}
              </p>
              <p className="text-sm opacity-60">
                <time dateTime="2023-11-22">{post.date}</time>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}
