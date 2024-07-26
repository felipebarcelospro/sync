import React from 'react'

import { cn } from '@design-system/react/helpers/cn'
import { APP_CONFIGS } from '@/boilerplate.config'

export function Logo(props: {
  className?: string
  onlyIcon?: boolean
}): React.ReactElement {
  if (props.onlyIcon) {
    return (
      <>
        <img
          src={APP_CONFIGS.app.brand.logos.icon.dark}
          alt={APP_CONFIGS.app.name}
          className={cn('h-12 dark:hidden', props.className)}
        />
        <img
          src={APP_CONFIGS.app.brand.logos.icon.light}
          alt={APP_CONFIGS.app.name}
          className={cn('h-12 hidden dark:block', props.className)}
        />
      </>
    )
  }

  return (
    <>
      <img
        src={APP_CONFIGS.app.brand.logos.full.dark}
        alt={APP_CONFIGS.app.name}
        className={cn('h-12 dark:hidden', props.className)}
      />
      <img
        src={APP_CONFIGS.app.brand.logos.full.light}
        alt={APP_CONFIGS.app.name}
        className={cn('h-12 hidden dark:block', props.className)}
      />
    </>
  )
}
