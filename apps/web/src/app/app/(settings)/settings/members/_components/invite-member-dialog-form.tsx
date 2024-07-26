'use client'

import { useActionForm } from '@/services/actions/lib/client'
import { Button } from '@design-system/react/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogMain,
  DialogTitle,
  DialogTrigger,
} from '@design-system/react/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@design-system/react/components/ui/form'
import { Input } from '@design-system/react/components/ui/input'
import { useToast } from '@design-system/react/components/ui/use-toast'
import { PropsWithChildren, useRef } from 'react'
import { inviteMemberActionSchema } from '../schemas'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import { inviteMemberAction } from '../actions'

export function InviteMemberDialogForm(props: PropsWithChildren) {
  const dialog = useRef<HTMLDivElement>(null)

  const { toast } = useToast()
  const { dict } = useDictionary()

  const form = useActionForm({
    schema: inviteMemberActionSchema,
    action: inviteMemberAction,
    onSubmitError: (error) => {
      console.log(error)

      toast({
        title: dict.dashboard.settings.members.form.toasts.failed.title,
        description:
          dict.dashboard.settings.members.form.toasts.failed.description,
      })
    },
    onSubmitSuccess: (data) => {
      toast({
        title: dict.dashboard.settings.members.form.toasts.success.title,
        description: `${dict.dashboard.settings.members.form.toasts.success.description} ${data.email}.`,
      })

      dialog.current?.click()
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div ref={dialog}>{props.children}</div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <Form {...form}>
          <DialogHeader>
            <DialogTitle>
              {dict.dashboard.settings.members.form.title}
            </DialogTitle>
            <DialogDescription>
              {dict.dashboard.settings.members.form.description}
            </DialogDescription>
          </DialogHeader>

          <DialogMain>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {dict.dashboard.settings.members.form.fields.email.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        dict.dashboard.settings.members.form.fields.email
                          .placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {
                      dict.dashboard.settings.members.form.fields.email
                        .description
                    }
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </DialogMain>

          <DialogFooter>
            <Button type="submit">
              {dict.dashboard.settings.members.form.fields.submit.label}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
