'use client'

import Image from 'next/image'

import { Button } from '@design-system/react/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
} from '@design-system/react/components/ui/card'
import { IntegrationCardDialog } from './_components/dialog'
import { isObjectFullFilled } from '@/helpers/is-object-full-filled'
import { Integration } from '@/services/integrations/types'
import { useApplication } from '@/app/app/_hooks/application.hook'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import { cn } from '@design-system/react/helpers/cn'

type AppSectionProps = {
  title: string
  subtitle: string
  data: Integration[]
}

export function AppSectionFeed(props: AppSectionProps) {
  const application = useApplication()

  if (props.data.length === 0) return <></>

  return (
    <section className="space-y-4">
      <header>
        <h2 className="font-bold">{props.title}</h2>
        <p className="opacity-60">{props.subtitle}</p>
      </header>
      <main className="grid md:grid-cols-3 gap-4">
        {props.data.map((app) => (
          <AppSectionFeedCard
            key={app.name}
            app={app}
            defaultValue={
              application.session.tenant.settings.integrations?.[app.key!] ?? {}
            }
          />
        ))}
      </main>
    </section>
  )
}

type AppSectionFeedCardProps = {
  app: Integration
  defaultValue: Record<string, string>
}

export function AppSectionFeedCard({
  app,
  defaultValue,
}: AppSectionFeedCardProps) {
  const isIntegrated = isObjectFullFilled(defaultValue)
  const { dict } = useDictionary()

  return (
    <Card
      className={cn(
        'grid grid-rows-[3fr_auto] bg-card',
        app.commingSoon && '!opacity-60 pointer-events-none',
      )}
    >
      <CardContent className="flex flex-col justify-between space-y-4 p-8">
        <Image
          src={app.icon}
          width={32}
          height={32}
          alt="Icon"
          className="rounded-md w-12 h-12"
          objectFit="cover"
        />

        <div>
          <h3 className="font-bold">{app.name}</h3>
          <p className="text-muted-foreground">{app.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <IntegrationCardDialog integration={app} defaultValue={defaultValue}>
          {!!isIntegrated && (
            <Button size="sm" variant="outline">
              <div className="h-2 w-2 mr-3  bg-green-500 rounded-full !opacity-100" />
              {dict.dashboard.plugins.status.installed}
            </Button>
          )}

          {!isIntegrated && (
            <Button size="sm" variant="outline">
              {dict.dashboard.plugins.status.install}
            </Button>
          )}
        </IntegrationCardDialog>
      </CardFooter>
    </Card>
  )
}
