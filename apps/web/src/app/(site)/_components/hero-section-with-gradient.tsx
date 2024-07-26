import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { GetStartedButton } from './get-started-button'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'

export function HeroSectionWithGradient() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)
  return (
    <div className="relative pt-20 md:pt-20 text-center">
      <div className="relative z-10">
        <div className="px-6 mb-12">
          <div className="mx-auto md:max-w-[55rem] font-normal text-center text-4xl md:text-6xl md:leading-[4.2rem]">
            <h1>{dict.site.sections.hero.title}</h1>
          </div>
          <p className="mt-4 max-w-[30rem] mx-auto md:max-w-xl text-muted-foreground md:leading-normal text-xl">
            {dict.site.sections.hero.subtitle}
          </p>
          <div className="flex flex-col items-center space-y-2 mt-12">
            <GetStartedButton />
            <span className="text-muted-foreground">
              {dict.site.sections.hero.description}
            </span>
          </div>
        </div>
        <div className="mt-8 sm:mt-0 px-6">
          <div className="rounded-md md:rounded-md-none container max-w-screen-xl p-2 bg-black/5 dark:bg-secondary/90">
            <img
              alt="Guides"
              width={1367}
              height={859}
              decoding="async"
              data-nimg={1}
              sizes="100vw"
              src="/screenshot.png"
              className="hidden dark:block"
              style={{ color: 'transparent', width: '100%', height: 'auto' }}
            />

            <img
              alt="Guides"
              width={1367}
              height={859}
              decoding="async"
              data-nimg={1}
              sizes="100vw"
              src="/screenshot-light.png"
              className="block dark:hidden"
              style={{ color: 'transparent', width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
