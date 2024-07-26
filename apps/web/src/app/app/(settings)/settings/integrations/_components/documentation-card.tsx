import Link from 'next/link'

import { APP_CONFIGS } from '@/boilerplate.config'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { Button } from '@design-system/react/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@design-system/react/components/ui/card'
import { Separator } from '@design-system/react/components/ui/separator'
import { ArrowRightIcon } from 'lucide-react'

export function DocumentationCard() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-md">
          {dict.dashboard.settings.integrations.form.fields.documentation.label}
        </CardTitle>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <p className="text-muted-foreground">
          {
            dict.dashboard.settings.integrations.form.fields.documentation
              .description[0]
          }
          {` `}
          <strong>{APP_CONFIGS.app.name}</strong>.{` `}
          {
            dict.dashboard.settings.integrations.form.fields.documentation
              .description[1]
          }
        </p>
      </CardContent>
      <CardFooter className="space-x-4 w-full">
        <Button variant="link" asChild>
          <Link href={APP_CONFIGS.app.links.docs}>
            {
              dict.dashboard.settings.integrations.form.fields.documentation
                .external
            }
            <ArrowRightIcon className="w-4 h-4 ml-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
