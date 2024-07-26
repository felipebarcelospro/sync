'use client'

import Link from 'next/link'

import { Logo } from '@/app/_components/logo'
import { Button } from '@design-system/react/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@design-system/react/components/ui/drawer'
import { cn } from '@design-system/react/helpers/cn'
import { ArrowRightIcon } from 'lucide-react'
import { APP_CONFIGS } from '@/boilerplate.config'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

export function Header() {
  const { dict } = useDictionary()

  return (
    <header className="border-b border-border bg-secondary/30 sticky top-0 z-20 backdrop-blur-sm">
      <div className="container max-w-screen-xl flex items-center justify-between md:grid md:grid-cols-3 py-2 text-xs">
        <div>
          <Link
            href="/"
            className="hover:opacity-60 flex items-center space-x-4"
          >
            <Logo onlyIcon className="h-9 w-9" />
            <span className="text-md font-semibold">
              {APP_CONFIGS.app.name}
            </span>
          </Link>
        </div>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger className="text-4xl">☰</DrawerTrigger>
            <DrawerContent>
              <DrawerFooter className="space-y-2">
                <Link
                  href="/"
                  className="text-lg font-medium border-b border-border py-4 w-full flex"
                >
                  {dict.site.layout.header.nav.start}
                </Link>
                <Link
                  href="/pricing"
                  className="text-lg font-medium border-b border-border py-4 w-full flex"
                >
                  {dict.site.layout.header.nav.pricing}
                </Link>

                <Link
                  href="/auth"
                  className="text-lg font-medium border-b border-border py-4 w-full flex"
                >
                  {dict.site.layout.header.nav.button.label}
                </Link>
                <Link
                  href="/auth"
                  className="text-lg font-medium py-4 w-full flex"
                >
                  {dict.site.layout.header.nav.ctaButton.label}
                </Link>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>

        <nav
          className="!space-x-8 hidden md:flex items-center justify-center opacity-80 ml-8"
          id="mobile-menu"
        >
          <Link href="/" className="font-semibold hover:brightness-125">
            {dict.site.layout.header.nav.start}
          </Link>
          <Link
            href="/#features"
            className="font-semibold hover:brightness-125"
          >
            {dict.site.layout.header.nav.features}
          </Link>
          <Link href="/pricing" className="font-semibold hover:brightness-125">
            {dict.site.layout.header.nav.pricing}
          </Link>
          <Link href="/blog" className="font-semibold hover:brightness-125">
            {dict.site.layout.header.nav.blog}
          </Link>
          <Link
            href="/changelog"
            className="font-semibold hover:brightness-125"
          >
            {dict.site.layout.header.nav.changelog}
          </Link>
        </nav>

        <div className={cn(['md:flex hidden justify-end'])}>
          <Link href="/auth">
            <Button variant="link" className="text-xs">
              {dict.site.layout.header.nav.button.label}
              <ArrowRightIcon className="w-3 h-3 ml-3" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
