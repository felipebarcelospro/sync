import RSS from 'rss'

import { APP_CONFIGS } from '@/boilerplate.config'
import { getPostMetadata } from '@/helpers/get-post-metadata'
import { getUrl } from '@/helpers/get-url'

export async function GET() {
  const posts = [...getPostMetadata('blog'), ...getPostMetadata('changelog')]

  const feed = new RSS({
    title: APP_CONFIGS.app.name,
    description: APP_CONFIGS.app.description,
    site_url: getUrl(),
    feed_url: getUrl('/feed.xml'),
    copyright: `© ${new Date().getFullYear()} ${APP_CONFIGS.app.name}`,
    language: 'en-US',
    pubDate: new Date(),
  })

  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    feed.item({
      title: post.title,
      guid: getUrl(`${post.type}/${post.slug}`),
      url: getUrl(`${post.type}/${post.slug}`),
      date: post.date,
      description: post.excerpt,
      author: APP_CONFIGS.app.creator.name,
      categories: [post.type],
    })
  })

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  })
}
