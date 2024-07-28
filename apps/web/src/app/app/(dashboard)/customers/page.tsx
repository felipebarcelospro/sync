import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderActions,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@design-system/react/components/shared/dashboard/page'
import { CustomersDataTable } from './_components/data-table'
import { Metadata } from 'next'
import { Button } from '@design-system/react/components/ui/button'
import { UserPlus2Icon } from 'lucide-react'
import { listCustomersAction } from './actions'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default async function Page() {
  const customers = await listCustomersAction()

  return (
    <DashboardPage className="bg-muted/20">
      <DashboardPageHeader className="bg-secondary">
        <DashboardPageHeaderTitle>Colaboradores</DashboardPageHeaderTitle>
        <DashboardPageHeaderActions>
          <Button>
            <UserPlus2Icon className="w-4 h-4 mr-2" />
            Convidar colaborador
          </Button>
        </DashboardPageHeaderActions>
      </DashboardPageHeader>
      <DashboardPageMain className="p-0 md:pb-0">
        <CustomersDataTable data={customers} />
      </DashboardPageMain>
    </DashboardPage>
  )
}
