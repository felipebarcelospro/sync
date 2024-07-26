import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { Badge } from '@design-system/react/components/ui/badge'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getFeatures } from '../_data/features'

export function MorePossibilitiesSection() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)
  const features = getFeatures()

  return (
    <section className="opacity-1 transform perspective-1200 py-16 bg-card/30">
      <div className="container max-w-screen-xl">
        <header className="mb-24">
          <Badge variant="outline" className="mb-6">
            {dict.site.sections.morePossibilities.header.badge}
          </Badge>

          <h3 className="text-3xl font-normal md:max-w-[30%] mb-6">
            {dict.site.sections.morePossibilities.header.title}
          </h3>
        </header>
        <main className="grid md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div key={item.title}>
              <item.Icon className="w-5 h-5 mb-4 text-primary" />

              <h4 className="mb-2 font-bold text-primary">{item.title}</h4>
              <p className="opacity-80 mb-4">{item.description}</p>
            </div>
          ))}
        </main>
      </div>
    </section>
  )
}
