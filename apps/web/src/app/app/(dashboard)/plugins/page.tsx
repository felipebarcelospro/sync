import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@design-system/react/components/shared/dashboard/page'
import { Metadata } from 'next'
import { AppSectionFeed } from './_components/app-section-feed'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getIntegrations } from '@/services/integrations/default'

export const revalidate = 0
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return {
    title: dict.dashboard.plugins.metadata.title,
  }
}

export default function Page() {
  const integrations = getIntegrations()
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return (
    <DashboardPage>
      <DashboardPageHeader className="border-0">
        <DashboardPageHeaderTitle>
          {dict.dashboard.plugins.title}
        </DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="md:container md:max-w-screen-lg space-y-8">
          {integrations.map((group) => (
            <AppSectionFeed
              key={group.key}
              title={group.name}
              subtitle={group.description}
              data={group.integrations}
            />
          ))}
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
