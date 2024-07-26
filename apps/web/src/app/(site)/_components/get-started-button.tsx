'use client'

import Link from 'next/link'
import React from 'react'

import { Button } from '@design-system/react/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

export function GetStartedButton() {
  const { dict } = useDictionary()

  return (
    <Button className="rounded-full" asChild>
      <Link href="/auth" className="w-fit">
        {dict.site.sections.cta.ctaButton.label}
        <ArrowRightIcon className="w-4 h-4 ml-4" />
      </Link>
    </Button>
  )
}
