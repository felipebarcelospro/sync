'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@design-system/react/components/ui/sheet'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@design-system/react/components/ui/alert'
import { HelpCircleIcon } from 'lucide-react'
import { PropsWithChildren, useRef } from 'react'
import { Integration } from '@/services/integrations/types'
import { isObjectFullFilled } from '@/helpers/is-object-full-filled'
import { DefaultIntegrationForm } from './_components/default-form'
import { cn } from '@design-system/react/helpers/cn'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

type IntegrationCardDialogProps = PropsWithChildren<{
  integration: Integration
  defaultValue?: Record<string, string>
}>

export function IntegrationCardDialog({
  integration,
  defaultValue,
  children,
}: IntegrationCardDialogProps) {
  const dialog = useRef<HTMLDivElement>(null)
  const isIntegrated = isObjectFullFilled(defaultValue)

  const { dict } = useDictionary()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={dialog}>{children}</div>
      </SheetTrigger>
      <SheetContent
        className={cn(
          'overflow-y-auto pb-0 grid grid-rows-[auto_auto_1fr] h-full',
          integration.customClass,
        )}
      >
        <SheetHeader>
          <SheetTitle>
            {isIntegrated &&
              dict.dashboard.plugins.notifications.dialog.title[0]}
            {!isIntegrated &&
              dict.dashboard.plugins.notifications.dialog.title[1]}
          </SheetTitle>
        </SheetHeader>

        <div className="pt-4 flex-1">
          <Image
            src={integration.icon}
            width={32}
            height={32}
            alt="Icon"
            className="rounded-md mb-4 w-12 h-12"
            objectFit="cover"
          />

          <div className="space-y-1">
            <h3 className="font-bold">{integration.name}</h3>
            <p className="text-muted-foreground">{integration.description}</p>
          </div>

          {integration.help && (
            <Alert className="mb-4 mt-4">
              <HelpCircleIcon className="h-4 w-4" />
              <AlertTitle className="font-bold text-sm">
                {dict.dashboard.plugins.notifications.dialog.help.title}
              </AlertTitle>
              <AlertDescription className="flex items-center space-x-4 text-sm">
                {dict.dashboard.plugins.notifications.dialog.help.description}
                <Link
                  href={integration.help}
                  target="_blank"
                  className="font-bold text-primary ml-1"
                >
                  {dict.dashboard.plugins.notifications.dialog.help.external}
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {!integration.customForm && (
          <DefaultIntegrationForm
            integration={integration}
            defaultValue={defaultValue}
            onClose={() => dialog.current?.click()}
          />
        )}

        {integration.customForm && integration.customForm}
      </SheetContent>
    </Sheet>
  )
}
