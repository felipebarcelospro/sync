import React from 'react'
import Link from 'next/link'

import {
  GettingStartedCard,
  GettingStartedCardHeader,
  GettingStartedCardTitle,
  GettingStartedFooterButton,
  GettingStartedFooterMessage,
  GettingStartedProgressBar,
  GettingStartedStep,
  GettingStartedStepArrow,
  GettingStartedStepContent,
  GettingStartedStepDescription,
  GettingStartedStepIcon,
  GettingStartedStepTitle,
} from '@design-system/react/components/shared/dashboard/getting-started'
import {
  CardContent,
  CardFooter,
} from '@design-system/react/components/ui/card'
import { Check, CreditCardIcon, UsersIcon, Wand2Icon } from 'lucide-react'
import { APP_CONFIGS } from '@/boilerplate.config'
import { getLocaleFromRequest } from '@/services/internationalization/helpers/get-locale-from-request'
import { getDictionary } from '@/services/internationalization/helpers/get-dictionary'
import { getApplicationSession } from '@/services/session/get-application-session'

const getData = async () => {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  const session = await getApplicationSession()

  return {
    steps: [
      {
        icon: <UsersIcon />,
        title: dict.dashboard.onboarding.sections.main.steps.first.title,
        description:
          dict.dashboard.onboarding.sections.main.steps.first.description,
        finished: !!session.user.image,
        href: '/app/settings',
      },
      {
        icon: <UsersIcon />,
        title: dict.dashboard.onboarding.sections.main.steps.second.title,
        description:
          dict.dashboard.onboarding.sections.main.steps.second.description,
        finished: true, // TODO: Query
        href: '/app/settings/members',
      },
      {
        icon: <CreditCardIcon />,
        title: dict.dashboard.onboarding.sections.main.steps.third.title,
        description:
          dict.dashboard.onboarding.sections.main.steps.third.description,
        finished: session.tenant.subscription.currentPlan.name !== 'Free',
        href: '/app/settings/billing',
      },
    ],
  }
}

export async function GetStartedSection() {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  const { steps } = await getData()

  const completedSteps = steps.filter((step) => step.finished).length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <section className="space-y-12">
      <header className="flex flex-col text-center items-center justify-between">
        {progressPercentage < 100 && (
          <>
            <div className="flex items-center justify-center bg-primary/10 h-12 w-12 rounded-full mb-8">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-primary opacity-75"></span>
              <Wand2Icon className="h-6 w-6" />
            </div>

            <h3 className="font-bold">
              {dict.dashboard.onboarding.sections.header.incomplete.title}
            </h3>
            <p className="max-w-[30rem] text-muted-foreground">
              {dict.dashboard.onboarding.sections.header.incomplete.subtitle[0]}{' '}
              {APP_CONFIGS.app.name}.{' '}
              {dict.dashboard.onboarding.sections.header.incomplete.subtitle[1]}
            </p>
          </>
        )}

        {progressPercentage === 100 && (
          <>
            <div className="flex items-center justify-center bg-emerald-500/30 h-12 w-12 rounded-full mb-8">
              <Check className="h-6 w-6" />
            </div>

            <h3 className="font-bold">
              {dict.dashboard.onboarding.sections.header.complete.title}
            </h3>
            <p className="max-w-[30rem] text-muted-foreground">
              {dict.dashboard.onboarding.sections.header.complete.subtitle}{' '}
              {APP_CONFIGS.app.name}.
            </p>
          </>
        )}
      </header>
      <main>
        <GettingStartedCard>
          <GettingStartedCardHeader>
            <GettingStartedCardTitle>
              {dict.dashboard.onboarding.sections.main.title}
            </GettingStartedCardTitle>
            <GettingStartedProgressBar
              value={progressPercentage}
              className="h-2"
            />
          </GettingStartedCardHeader>
          <CardContent className="space-y-4">
            {steps.map((step) => (
              <Link key={step.description} href={step.href} className="block">
                <GettingStartedStep finished={step.finished} key={step.title}>
                  <GettingStartedStepIcon>
                    {React.cloneElement(step.icon, {
                      className: 'w-3 h-3',
                    })}
                  </GettingStartedStepIcon>
                  <GettingStartedStepContent>
                    <GettingStartedStepTitle>
                      {step.title}
                    </GettingStartedStepTitle>
                    <GettingStartedStepDescription>
                      {step.description}
                    </GettingStartedStepDescription>
                  </GettingStartedStepContent>
                  <GettingStartedStepArrow />
                </GettingStartedStep>
              </Link>
            ))}
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-black/5 border-t border-border px-6 pt-2 pb-2">
            <GettingStartedFooterMessage>
              {dict.dashboard.onboarding.sections.footer.message}
            </GettingStartedFooterMessage>
            <Link href={APP_CONFIGS.app.links.docs}>
              <GettingStartedFooterButton>
                {dict.dashboard.onboarding.sections.footer.external}
              </GettingStartedFooterButton>
            </Link>
          </CardFooter>
        </GettingStartedCard>
      </main>
    </section>
  )
}
