'use client'

import Link from 'next/link'

import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarLink,
  DashboardSidebarMain,
  DashboardSidebarMenu,
  DashboardSidebarTitle,
  DashboardSidebarToolbar,
  DashboardSidebarToolbarMenu,
  DashboardSidebarToolbarMenuItem,
} from '@design-system/react/components/shared/dashboard/sidebar'
import { ArrowLeft, Briefcase, Brush, User, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function TeamSettingsSidebar() {
  const pathname = usePathname()
  const { dict } = useDictionary()

  const isActive = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path)
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarToolbar>
        <DashboardSidebarToolbarMenu>
          <Link href="/app">
            <DashboardSidebarToolbarMenuItem>
              <ArrowLeft className="w-4 h-4" />
            </DashboardSidebarToolbarMenuItem>
          </Link>
        </DashboardSidebarToolbarMenu>
      </DashboardSidebarToolbar>

      <DashboardSidebarMenu>
        <DashboardSidebarHeader>
          <DashboardSidebarTitle>
            {dict.dashboard.settings.sidebar.name}
          </DashboardSidebarTitle>
        </DashboardSidebarHeader>
        <DashboardSidebarMain>
          <Link href="/app/settings">
            <DashboardSidebarLink
              isActive={isActive('/app/settings', true)}
              icon={<User />}
            >
              {dict.dashboard.settings.sidebar.profile}
            </DashboardSidebarLink>
          </Link>

          <Link href="/app/settings/theme">
            <DashboardSidebarLink
              isActive={isActive('/app/settings/theme', true)}
              icon={<Brush />}
            >
              {dict.dashboard.settings.sidebar.theme}
            </DashboardSidebarLink>
          </Link>

          <Link href="/app/settings/team">
            <DashboardSidebarLink
              isActive={isActive('/app/settings/team', true)}
              icon={<Briefcase />}
            >
              {dict.dashboard.settings.sidebar.team}
            </DashboardSidebarLink>
          </Link>

          <Link href="/app/settings/members">
            <DashboardSidebarLink
              isActive={isActive('/app/settings/members', true)}
              icon={<Users />}
            >
              {dict.dashboard.settings.sidebar.members}
            </DashboardSidebarLink>
          </Link>
        </DashboardSidebarMain>
      </DashboardSidebarMenu>
    </DashboardSidebar>
  )
}
