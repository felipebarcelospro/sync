import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { GetStartedButton } from './get-started-button'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'

export function EfficiencySection() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <section className="opacity-1 transform perspective-1200 py-16">
      <div className="container max-w-screen-xl grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-normal max-w-[80%] mb-4">
            {dict.site.sections.efficiency.header.title}
          </h3>

          <GetStartedButton />
        </div>
        <div>
          <p className="opacity-80 text-lg">
            {dict.site.sections.efficiency.main.description}
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div>
              <p className="text-primary font-bold">20%</p>
              <p className="opacity-80">
                {dict.site.sections.efficiency.main.details[0]}
              </p>
            </div>
            <div>
              <p className="text-primary font-bold">-82%</p>
              <p className="opacity-80">
                {dict.site.sections.efficiency.main.details[1]}
              </p>
            </div>
            <div>
              <p className="text-primary font-bold">-15%</p>
              <p className="opacity-80">
                {dict.site.sections.efficiency.main.details[2]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
