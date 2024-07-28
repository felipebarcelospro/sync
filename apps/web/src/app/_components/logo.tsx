import React from 'react'

import { cn } from '@design-system/react/helpers/cn'
import { APP_CONFIGS } from '@/boilerplate.config'

export function Logo(props: {
  className?: string
  onlyIcon?: boolean
}): React.ReactElement {
  return (
    <img
      src={'/logo.png'}
      alt={APP_CONFIGS.app.name}
      className={cn('h-4 invert dark:invert-0', props.className)}
    />
  )
}
