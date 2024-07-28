'use client'

import Link from 'next/link'

import { FeedbackModal } from '@/app/app/(dashboard)/_components/feedback-modal'
import { Logo } from '@/app/_components/logo'
import { useApplication } from '@/app/app/_hooks/application.hook'
import {
  DashboardSidebar,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
  DashboardSidebarLink,
  DashboardSidebarMain,
  DashboardSidebarMenu,
  DashboardSidebarTitle,
  DashboardSidebarToolbar,
  DashboardSidebarToolbarMenu,
  DashboardSidebarToolbarMenuItem,
} from '@design-system/react/components/shared/dashboard/sidebar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@design-system/react/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@design-system/react/components/ui/hover-card'
import {
  BookHeartIcon,
  BookIcon,
  CircleDashed,
  HelpCircleIcon,
  LayoutDashboardIcon,
  MessageCircle,
  PlugIcon,
  Plus,
  Settings2,
  Users2Icon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import { UserNav } from './user-nav'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import { APP_CONFIGS } from '@/boilerplate.config'
import { getInitialsFromName } from '@design-system/react/helpers/get-initials-from-name'

export function MainSidebar() {
  const app = useApplication()
  const pathname = usePathname()

  const { dict } = useDictionary()

  const isActive = (path: string, exact = false) => {
    return exact ? pathname === path : pathname.startsWith(path)
  }

  return (
    <DashboardSidebar>
      <DashboardSidebarToolbar>
        <DashboardSidebarToolbarMenu>
          {app.session.user.memberships?.map((userTenant) => (
            <HoverCard key={userTenant.tenant.id}>
              <HoverCardTrigger asChild>
                <a href={`/app/select-account/${userTenant.tenant.id}`}>
                  <DashboardSidebarToolbarMenuItem
                    src={userTenant.tenant.logo}
                    isActive={app.session.tenant.id === userTenant.tenant.id}
                  >
                    {getInitialsFromName(
                      userTenant.tenant.name,
                    ).toLocaleUpperCase()}
                  </DashboardSidebarToolbarMenuItem>
                </a>
              </HoverCardTrigger>
              <HoverCardContent align="end" sideOffset={26} side="right">
                <div className="space-x-4 flex items-center">
                  <Avatar>
                    <AvatarImage src={userTenant.tenant.logo} />
                    <AvatarFallback>
                      {getInitialsFromName(userTenant.tenant.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <strong className="text-sm">
                      {userTenant.tenant.name}
                    </strong>
                    <small className="text-sm opacity-60">
                      {dict.dashboard.sidebar.avatar.card.detail}
                    </small>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}

          <Link href="/app/get-started/create-team">
            <DashboardSidebarToolbarMenuItem variant="outline">
              <Plus className="w-4 h-4" />
            </DashboardSidebarToolbarMenuItem>
          </Link>
        </DashboardSidebarToolbarMenu>
      </DashboardSidebarToolbar>

      <DashboardSidebarMenu>
        <DashboardSidebarHeader className="">
          <DashboardSidebarTitle>
            <Logo />
          </DashboardSidebarTitle>
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="space-y-4">
          <section>
            <header className="ml-4 text-xs uppercase text-muted-foreground font-bold opacity-40 mb-2">
              {dict.dashboard.sidebar.sections.dashboard.title}
            </header>
            <main>
              <Link href="/app/onboarding">
                <DashboardSidebarLink
                  isActive={isActive('/app/onboarding', true)}
                  icon={<CircleDashed />}
                >
                  {dict.dashboard.sidebar.sections.dashboard.items.onboarding}
                </DashboardSidebarLink>
              </Link>
              <Link href="/app">
                <DashboardSidebarLink
                  isActive={isActive('/app', true)}
                  icon={<LayoutDashboardIcon />}
                >
                  {dict.dashboard.sidebar.sections.dashboard.items.home}
                </DashboardSidebarLink>
              </Link>
              <Link href="/app/publis">
                <DashboardSidebarLink
                  isActive={isActive('/app/publis', true)}
                  icon={<BookIcon />}
                >
                  Minhas Publis
                </DashboardSidebarLink>
              </Link>
              <Link href="/app/customers">
                <DashboardSidebarLink
                  isActive={isActive('/app/customers', true)}
                  icon={<Users2Icon />}
                >
                  Meus Clientes
                </DashboardSidebarLink>
              </Link>
              <Link href="/app/plugins">
                <DashboardSidebarLink
                  isActive={isActive('/app/plugins', false)}
                  icon={<PlugIcon />}
                >
                  {dict.dashboard.sidebar.sections.dashboard.items.plugins}
                </DashboardSidebarLink>
              </Link>
              <Link href="/app/settings">
                <DashboardSidebarLink
                  isActive={isActive('/app/settings', true)}
                  icon={<Settings2 />}
                >
                  {dict.dashboard.sidebar.sections.dashboard.items.settings}
                </DashboardSidebarLink>
              </Link>
            </main>
          </section>

          <section>
            <header className="ml-4 text-xs uppercase text-muted-foreground font-bold opacity-40 mb-2">
              {dict.dashboard.sidebar.sections.help.title}
            </header>
            <main>
              <Link href={APP_CONFIGS.app.links.support} target="_blank">
                <DashboardSidebarLink icon={<HelpCircleIcon />}>
                  {dict.dashboard.sidebar.sections.help.items.helpCenter}
                </DashboardSidebarLink>
              </Link>
              <Link href="/blog" target="_blank">
                <DashboardSidebarLink icon={<BookHeartIcon />}>
                  {dict.dashboard.sidebar.sections.help.items.blog}
                </DashboardSidebarLink>
              </Link>
              <FeedbackModal>
                <DashboardSidebarLink icon={<MessageCircle />}>
                  {dict.dashboard.sidebar.sections.main.items.feedback}
                </DashboardSidebarLink>
              </FeedbackModal>
            </main>
          </section>
        </DashboardSidebarMain>
        <DashboardSidebarFooter>
          <section className="border-t border-border pt-5 -mx-4 px-2">
            <UserNav />
          </section>
        </DashboardSidebarFooter>
      </DashboardSidebarMenu>
    </DashboardSidebar>
  )
}
