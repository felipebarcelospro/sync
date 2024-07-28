import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderActions,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@design-system/react/components/shared/dashboard/page'
import { notFound } from 'next/navigation'
import {
  Avatar,
  AvatarFallback,
} from '@design-system/react/components/ui/avatar'
import { getInitialsFromName } from '@design-system/react/helpers/get-initials-from-name'
import {
  Card,
  CardContent,
  CardHeader,
} from '@design-system/react/components/ui/card'
import { Metadata } from 'next'
import { Button } from '@design-system/react/components/ui/button'
import { PencilIcon } from 'lucide-react'
import { getCustomerByIdAction } from '../actions'

type PageProps = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Visualizando colaborador',
}

export default async function Page({ params }: PageProps) {
  const customerMembership = await getCustomerByIdAction({
    customerId: params.id,
  })

  if (!customerMembership) return notFound()

  return (
    <DashboardPage>
      <DashboardPageHeader className="border-0">
        <DashboardPageHeaderTitle>
          Customer -&gt; {customerMembership.user.name}
        </DashboardPageHeaderTitle>
        <DashboardPageHeaderActions>
          <Button variant="link">
            <PencilIcon className="w-4 h-4 mr-3" />
            Editar colaborador
          </Button>
        </DashboardPageHeaderActions>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="container max-w-screen-xl space-y-12">
          <Card>
            <CardHeader className="flex flex-row items-center space-x-4 space-y-0">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-2xl bg-primary text-white">
                  {getInitialsFromName(customerMembership.user.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="font-bold">{customerMembership.user.name}</h1>
                <p>{customerMembership.user.email}</p>
              </div>
            </CardHeader>
            <CardContent className="flex items-center space-x-8">
              <div>
                <header className="flex items-center space-x-4">
                  <h2 className="font-bold">Departamento</h2>
                </header>
                <main>
                  <p>test</p>
                </main>
              </div>

              <div>
                <header className="flex items-center space-x-4">
                  <h2 className="font-bold">Departamento</h2>
                </header>
                <main>
                  <p>test</p>
                </main>
              </div>

              <div>
                <header className="flex items-center space-x-4">
                  <h2 className="font-bold">Visto pela ultima vez</h2>
                </header>
                <main>
                  <p className="text-muted-foreground">test</p>
                </main>
              </div>

              <div>
                <header className="flex items-center space-x-4">
                  <h2 className="font-bold">Softwares ativos</h2>
                </header>
                <main>
                  <p className="text-muted-foreground">test</p>
                </main>
              </div>
            </CardContent>
          </Card>
          <div>
            <h1>Hello World</h1>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
