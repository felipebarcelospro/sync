import Link from 'next/link'

import { parseUnitPrice } from '@/helpers/parse-unit-price'
import { Badge } from '@design-system/react/components/ui/badge'
import { Button } from '@design-system/react/components/ui/button'
import { Separator } from '@design-system/react/components/ui/separator'
import { Skeleton } from '@design-system/react/components/ui/skeleton'
import { CheckSquare2Icon, XSquareIcon } from 'lucide-react'
import { Suspense } from 'react'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { cn } from '@design-system/react/helpers/cn'
import { getPlansAction } from '@/app/app/(dashboard)/actions'

export function PricingSection() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <section className="py-16 relative">
      <div className="container max-w-screen-xl">
        <div className="">
          <Badge variant="secondary" className="mb-6">
            {dict.site.sections.pricing.header.badge}
          </Badge>

          <h3 className="text-3xl font-normal max-w-[80%] mb-4">
            {dict.site.sections.pricing.header.title[0]}
            <br /> {dict.site.sections.pricing.header.title[1]}
          </h3>

          <p className="text-muted-foreground text-lg md:max-w-[40%] mb-8">
            {dict.site.sections.pricing.header.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Suspense
            fallback={
              <>
                <Skeleton className="h-[596px] rounded-md" />
                <Skeleton className="h-[596px] rounded-md" />
                <Skeleton className="h-[596px] rounded-md" />
              </>
            }
          >
            <PricingSectionCards />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

async function PricingSectionCards() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  const plans = await getPlansAction()

  return (
    <>
      {plans.map((plan) => {
        const price = plan.prices.find((plan) => plan.interval === 'month')

        return (
          <div
            key={plan.id}
            className="p-8 bg-background shadow-sm rounded-lg border border-border"
          >
            <h3 className="text-xm font-semibold">{plan.name}</h3>
            <p className="mb-8 text-muted-foreground line-clamp-2">
              {plan.description}
            </p>

            <p className="text-4xl font-bold mb-4">
              {parseUnitPrice(price.price)} / mo
            </p>

            <Separator className="my-8" />

            <ul className="mb-12 space-y-4">
              {plan.features.map((metadata) => {
                const enabled =
                  Number(metadata.value) || metadata.value === 'true'

                return (
                  <li key={metadata.id} className="flex items-center">
                    {enabled ? (
                      <CheckSquare2Icon className="mr-2" />
                    ) : (
                      <XSquareIcon className="mr-2 opacity-40" />
                    )}

                    <span
                      className={cn([
                        !enabled && 'line-through text-muted-foreground',
                      ])}
                    >
                      {metadata.label}
                    </span>
                  </li>
                )
              })}
            </ul>

            <Link href="/auth">
              <Button className="w-full rounded-md">
                {dict.site.sections.pricing.main.submit.label}
              </Button>
            </Link>
          </div>
        )
      })}
    </>
  )
}
