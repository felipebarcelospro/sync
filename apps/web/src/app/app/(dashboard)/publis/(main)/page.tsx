import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderActions,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@design-system/react/components/shared/dashboard/page'
import { Button } from '@design-system/react/components/ui/button'
import { PlusSquareIcon } from 'lucide-react'

export default function Page() {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Minhas Publis</DashboardPageHeaderTitle>
        <DashboardPageHeaderActions>
          <Button>
            <PlusSquareIcon className="w-4 h-4 mr-3" />
            Adicionar Plubi
          </Button>
        </DashboardPageHeaderActions>
      </DashboardPageHeader>
      <DashboardPageMain>
        <h1>Minhas Publis</h1>
      </DashboardPageMain>
    </DashboardPage>
  )
}
