import { useActionForm } from '@/services/actions/lib/client'
import { updateIntegrationActionSchema } from '../schemas'
import { updateIntegrationAction } from '../actions'
import { Integration } from '@/services/integrations/types'
import { PropsWithChildren } from 'react'
import { toast } from '@design-system/react/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { getUrl } from '@/helpers/get-url'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSection,
} from '@design-system/react/components/ui/form'
import { Input } from '@design-system/react/components/ui/input'
import { ArrowRight, Copy } from 'lucide-react'
import { SheetFooter } from '@design-system/react/components/ui/sheet'
import { Button, ButtonIcon } from '@design-system/react/components/ui/button'
import { useApplication } from '@/app/app/_hooks/application.hook'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

type DefaultIntegrationFormProps = PropsWithChildren<{
  integration: Integration
  defaultValue?: Record<string, string>
  onClose: () => void
}>

export function DefaultIntegrationForm({
  integration,
  defaultValue,
  onClose,
}: DefaultIntegrationFormProps) {
  const router = useRouter()
  const app = useApplication()
  const { dict } = useDictionary()

  const form = useActionForm({
    schema: updateIntegrationActionSchema,
    action: updateIntegrationAction,
    defaultValues: {
      key: integration.key,
      data: defaultValue,
    },
    onSubmitError: (error) => {
      console.log(error)

      toast({
        title:
          dict.dashboard.plugins.notifications.form.submit.toasts.failed.title,
      })
    },
    onSubmitSuccess: () => {
      toast({
        title:
          dict.dashboard.plugins.notifications.form.submit.toasts.success.title,
      })

      router.refresh()
      onClose()
    },
  })

  const webhook = getUrl(
    `/api/webhook/${
      app.session.tenant.id
    }?providerType=${integration.key.toLocaleUpperCase()}`,
  )

  return (
    <Form {...form} className="flex flex-col justify-between h-auto">
      <FormSection>
        {integration.field.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={`data.${item.id}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>
                  <Input
                    type={item.type ?? 'text'}
                    placeholder={item.placeholder}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>{item.help}</FormDescription>
              </FormItem>
            )}
          />
        ))}
      </FormSection>

      {integration.webhook && (
        <div className="bg-black/5 dark:bg-white/5 !rounded-md mt-6 !border border-border">
          <header className="px-6 py-4 flex items-center justify-between border-b dark:border-white/5">
            <span className="text-sm opacity-60">Webhook</span>

            <Button
              type="button"
              variant="link"
              className="rounded-full"
              size="sm"
              onClick={async () => {
                await navigator.clipboard.writeText(webhook)

                toast({
                  title:
                    dict.dashboard.plugins.notifications.form.clickToCopyButton
                      .toast.title,
                  description: `${webhook} ${dict.dashboard.plugins.notifications.form.clickToCopyButton.toast.description}`,
                })
              }}
            >
              {
                dict.dashboard.plugins.notifications.form.clickToCopyButton
                  .label
              }
              <Copy className="w-4 h-4 ml-3" />
            </Button>
          </header>
          <main className="p-6">
            <span className="line-clamp-1">{webhook}</span>
          </main>
        </div>
      )}

      <SheetFooter className="md:justify-start mt-auto sticky bottom-0 bg-background top-0 py-6 border-t border-border">
        <Button type="submit" variant="outline" className="!mt-0">
          {defaultValue &&
            dict.dashboard.plugins.notifications.form.submit.label[0]}
          {!defaultValue &&
            dict.dashboard.plugins.notifications.form.submit.label[1]}

          <ButtonIcon
            className="w-4 h-4 ml-3"
            icon={ArrowRight}
            isLoading={form.actionState.isSubmitting}
          />
        </Button>
      </SheetFooter>
    </Form>
  )
}
