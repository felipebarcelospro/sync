'use client'

import { useActionForm } from '@/services/actions/lib/client'
import { Button, ButtonIcon } from '@design-system/react/components/ui/button'
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
import { ComboBox } from '@design-system/react/components/ui/combobox'
import { useToast } from '@design-system/react/components/ui/use-toast'
import { PropsWithChildren, useEffect, useRef } from 'react'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import { upsertCollaboratorAction } from '../actions'
import { upsertCollaboratorSchema } from '../schemas'
import { UserPlus2Icon } from 'lucide-react'
import { Department } from '@app/modules/src/domain/entities/Department'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@design-system/react/components/ui/sheet'
import { Collaborator } from '@app/modules/src/domain/entities/Collaborator'

export function UpsertCollaboratorDialogForm({
  children,
  collaborator,
  departments,
}: PropsWithChildren<{
  collaborator?: Collaborator
  departments: Department[]
}>) {
  const dialog = useRef<HTMLDivElement>(null)

  const { toast } = useToast()
  const { dict } = useDictionary()

  const form = useActionForm({
    schema: upsertCollaboratorSchema,
    action: upsertCollaboratorAction,
    defaultValues: {
      id: collaborator?.id,
      name: collaborator?.name,
      email: collaborator?.email,
      departmentId: collaborator?.departments[0]?.id,
    },
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

  const handleFormReset = (isOpen: boolean) => {
    if (isOpen) return
    form.setValue('name', collaborator?.name)
    form.setValue('email', collaborator?.email)
    form.setValue('departmentId', collaborator?.departments[0]?.id)
  }

  useEffect(() => {
    form.setValue('name', collaborator?.name)
    form.setValue('email', collaborator?.email)
    form.setValue('departmentId', collaborator?.departments[0]?.id)
  }, [collaborator])

  return (
    <Sheet onOpenChange={handleFormReset}>
      <SheetTrigger asChild>
        <div ref={dialog}>{children}</div>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[525px]">
        <Form className="grid grid-rows-[auto_1fr_auto] h-full gap-8" {...form}>
          <SheetHeader>
            <SheetTitle>
              {dict.dashboard.settings.members.form.title}
            </SheetTitle>
            <SheetDescription>
              {dict.dashboard.settings.members.form.description}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4">
            <FormSection>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Email do usuário que você deseja convidar para o time.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento (Opcional)</FormLabel>
                    <FormControl>
                      <ComboBox
                        {...field}
                        placeholder="Departamento"
                        options={departments.map((department) => ({
                          label: department.name,
                          value: department.id,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>
          </div>

          <SheetFooter className="sm:justify-start border-t border-border">
            <Button type="submit">
              <ButtonIcon
                className="w-4 h-4 mr-2"
                isLoading={form.actionState.isSubmitting}
                icon={UserPlus2Icon}
              />
              {dict.dashboard.settings.members.form.fields.submit.label}
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
