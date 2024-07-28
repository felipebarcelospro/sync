import {
  StatCard,
  StatCardHeader,
  StatCardMain,
  StatCardTitle,
  StatCardValue,
} from '@design-system/react/components/shared/dashboard/stat-card'
import { CheckIcon } from 'lucide-react'

export function ActiveUsersStatCard({ value }: { value: number }) {
  return (
    <StatCard>
      <StatCardHeader className="flex flex-row items-center justify-between">
        <StatCardTitle>Colaboradores Ativos</StatCardTitle>
        <CheckIcon className="w-4 h-4 ml-auto" />
      </StatCardHeader>
      <StatCardMain>
        <StatCardValue>{value}</StatCardValue>
      </StatCardMain>
    </StatCard>
  )
}
