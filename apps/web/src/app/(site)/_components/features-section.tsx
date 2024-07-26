import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { Badge } from '@design-system/react/components/ui/badge'
import { Mail, Link2 } from 'lucide-react'

export function FeaturesSection() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <section className="py-16 shadow">
      <div className="container max-w-screen-xl">
        <header className="mb-12">
          <Badge variant="secondary" className="mb-6">
            {dict.site.sections.features.header.badge}
          </Badge>

          <h3 className="text-3xl font-normal md:max-w-[30%] mb-4">
            {dict.site.sections.features.header.title}
          </h3>

          <p className="opacity-80 text-lg max-w-[70%]">
            {dict.site.sections.features.header.description}
          </p>
        </header>

        <main className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-background shadow-sm rounded-lg border border-border">
            <Mail className="w-8 h-8 text-primary mb-4" />

            <h4 className="mb-2 font-bold">
              {dict.site.sections.features.main.features.first.title}
            </h4>

            <p className="opacity-80 mb-4">
              {dict.site.sections.features.main.features.first.description}
            </p>
          </div>

          <div className="p-8 bg-background shadow-sm rounded-lg border border-border">
            <Link2 className="w-8 h-8 text-primary mb-4" />

            <h4 className="mb-2 font-bold">
              {dict.site.sections.features.main.features.second.title}
            </h4>

            <p className="opacity-80 mb-4">
              {dict.site.sections.features.main.features.second.description}
            </p>
          </div>

          <div className="p-8 bg-background shadow-sm rounded-lg border border-border">
            <Link2 className="w-8 h-8 text-primary mb-4" />

            <h4 className="mb-2 font-bold">
              {dict.site.sections.features.main.features.third.title}
            </h4>

            <p className="opacity-80 mb-4">
              {dict.site.sections.features.main.features.third.description}
            </p>
          </div>
        </main>
      </div>
    </section>
  )
}
