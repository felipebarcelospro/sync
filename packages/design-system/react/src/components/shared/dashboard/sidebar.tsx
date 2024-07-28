'use client'

import React from 'react'

import type { ReactNode } from 'react'

import Image from 'next/image'
import { cn } from '../../../helpers/cn'
import { Button, ButtonProps } from '../../ui/button'

// DashboardSidebar component
export function DashboardSidebar({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <aside className={cn("hidden max-w-full md:grid grid-cols-[auto_1fr]", className)}>
      {children}
    </aside>
  )
}

export function DashboardSidebarToolbar({ children }: { children: ReactNode }) {
  return (
    <div className="w-20 relative bg-secondary/20 z-10 border-r page-transition border-border flex flex-col items-center justify-between py-4 animate-fade-up animate-delay-75 animate-once animate-ease-in-out">
      {children}
    </div>
  )
}

export function DashboardSidebarToolbarHeader({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) {
  return (
    <div className={cn("flex flex-col justify-center h-10 mb-9", className)}>{children}</div>
  )
}

export function DashboardSidebarMenu({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn("w-72 border-r z-0 pl-4 page-transition border-border py-4 pr-4 flex flex-col justify-between animate-fade-up animate-delay-150 animate-once animate-ease-in-out", className)}>
      {children}
    </div>
  )
}

export function DashboardSidebarToolbarMenu({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col items-center space-y-2 flex-1", className)}>
      {children}
    </div>
  )
}

export function DashboardSidebarToolbarMenuItem({
  src,
  variant,
  children,
  isActive,
  className
}: {
  src?: string
  variant?: ButtonProps['variant']
  isActive?: boolean
  children: ReactNode
  className?: string
} & ButtonProps) {
  return (
    <Button
      size="icon"
      variant={variant ?? 'outline'}
      className={cn([
        'overflow-hidden rounded-full',
        isActive && 'bg-secondary',
        src && '!p-0',
        className
      ])}
    >
      {src ? (
        <Image
          alt="Logo"
          className="rounded-md w-full h-full"
          src={src}
          width={32}
          height={32}
        />
      ) : (
        children
      )}
    </Button>
  )
}

export function DashboardSidebarToolbarActions({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) {
  return (
    <aside className={cn("flex flex-col items-center space-y-2", className)}>{children}</aside>
  )
}

export function DashboardSidebarToolbarActionsItem({
  icon,
  className
}: {
  icon: React.ReactElement
  className?: string
}) {
  return (
    <Button size="icon" variant="ghost">
      {React.cloneElement(icon, {
        className: cn(`w-5 h-5`, className),
      })}
    </Button>
  )
}

// DashboardSidebarHeader component
export function DashboardSidebarHeader({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <header className={cn("px-4 mb-5 flex items-center justify-between h-10", className)}>
      {children}
    </header>
  )
}

export function DashboardSidebarTitle({ children, className }: { children: ReactNode, className?: string }) {
  return <strong className={cn("text-md", className)}>{children}</strong>
}

export function DashboardSidebarHeaderMenu({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) {
  return <div className={cn("flex items-center space-x-2", className)}>{children}</div>
}

// DashboardSidebarMain component
export function DashboardSidebarMain({ children, className }: { children: ReactNode, className?: string }) {
  return <main className={cn("mb-5 flex-1", className)}>{children}</main>
}

// DashboardSidebarLink component
export function DashboardSidebarLink({
  children,
  icon,
  isActive,
  className
}: {
  children: React.ReactNode
  icon: React.ReactElement
  isActive?: boolean
  className?: string
}) {
  return (
    <Button
      className={cn([`w-full justify-start mb-2`, isActive && 'bg-secondary', className])}
      variant="ghost"
    >
      {React.cloneElement(icon, {
        className: `w-4 h-4 mr-2`,
      })}

      {children}
    </Button>
  )
}

// DashboardSidebarFooter component
export function DashboardSidebarFooter({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <footer className={cn("", className)}>
      <section>{children}</section>
    </footer>
  )
}
