'use client'

import { parseUnitPrice } from '@/helpers/parse-unit-price'
import { ExternalLink, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { APP_CONFIGS } from '@/boilerplate.config'
import { Button, ButtonIcon } from '@design-system/react/components/ui/button'
import { Card, CardContent } from '@design-system/react/components/ui/card'
import { Progress } from '@design-system/react/components/ui/progress'
import { Switch } from '@design-system/react/components/ui/switch'
import { cn } from '@design-system/react/helpers/cn'
import { formatNumber } from '@/helpers/format-number'
import { useBilling } from '@/app/app/_hooks/billing.hook'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'

export function BillingForm() {
  const {
    createAccountManagerForTenant,
    createCheckoutForPlan,
    plans,
    period,
    isSubmittingCheckout,
    isSubmittingManager,
    setPeriod,
    subscription,
  } = useBilling()
  const { dict } = useDictionary()

  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const quotas = subscription.features.filter((item) => item.quota)

  function handleCreateCheckout(paymentProviderId: string) {
    setSelectedPlanId(paymentProviderId)
    createCheckoutForPlan(paymentProviderId)
  }

  function isLoadingCheckout(paymentProviderId: string) {
    return isSubmittingCheckout && paymentProviderId === selectedPlanId
  }

  return (
    <>
      <div className="space-y-6 border-t border-none">
        {quotas.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="block text-sm font-medium" htmlFor="logs">
                {APP_CONFIGS.providers.billing.meta[item.id].name}
              </label>
              <span>
                {formatNumber(item.quota.usage)} /{' '}
                {formatNumber(item.quota.total)}
              </span>
            </div>
            <Progress className="w-full h-3" value={item.quota.usageRate} />
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold mb-2">
            {dict.dashboard.settings.billing.form.fields.currentPlan.label}
          </h3>
          <Button
            variant="link"
            onClick={createAccountManagerForTenant}
            disabled={isSubmittingManager}
          >
            <ButtonIcon
              className="w-3 h-3 mr-2"
              icon={ExternalLink}
              isLoading={isSubmittingManager}
            />
            {dict.dashboard.settings.billing.form.fields.external.label}
          </Button>
        </div>
        <Card className="border-2 bg-primary-500/20 border-primary-500/30">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start text-sm">
              <div>
                <p className="font-semibold">{subscription.currentPlan.name}</p>
                <div className="flex items-center">
                  {subscription.currentPlan.features.map((feature) => (
                    <p
                      key={feature.id}
                      className={cn([
                        'text-muted-foreground mr-4',
                        !Number(feature.value) && 'hidden',
                      ])}
                    >
                      {
                        dict.dashboard.settings.billing.form.fields.currentPlan
                          .upTo
                      }{' '}
                      {feature.label}
                    </p>
                  ))}
                </div>
              </div>
              <p className="font-semibold">
                {parseUnitPrice(subscription.currentPlan.price)} /
                {subscription.currentPlan.paymentInterval === 'month'
                  ? dict.dashboard.settings.billing.form.fields.currentPlan
                      .paymentInterval.month
                  : dict.dashboard.settings.billing.form.fields.currentPlan
                      .paymentInterval.annual}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <header>
          <h3 className="font-semibold">
            {dict.dashboard.settings.billing.form.fields.changePlan.label}
          </h3>
          <p className="flex items-center justify-between text-sm mb-4 text-muted-foreground">
            {
              dict.dashboard.settings.billing.form.fields.changePlan.description
                .annual
            }
            <Switch
              id="yearly-billing"
              onCheckedChange={(event) => {
                setPeriod(event ? 'year' : 'month')
              }}
            />
          </p>
        </header>

        <main className="space-y-4">
          {plans
            .sort(
              (a, b) =>
                a.prices.find((pr) => pr.interval === period).price -
                b.prices.find((pr) => pr.interval === period).price,
            )
            .map((plan) => {
              const { paymentProviderId, price } = plan.prices.find(
                (price) => price.interval === period,
              )

              return (
                <Card
                  key={plan.id}
                  onClick={() => handleCreateCheckout(paymentProviderId)}
                  className={cn([
                    'border border-border !border-t !rounded-md hover:bg-secondary transition-all cursor-pointer relative',
                    plan.id === subscription.currentPlan.id && 'hidden',
                  ])}
                >
                  {isLoadingCheckout(paymentProviderId) && (
                    <div className="absolute flex w-full h-full justify-center items-center animate-fade-up">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  )}

                  <CardContent
                    className={cn(
                      'pt-6 transition-all',
                      isLoadingCheckout(paymentProviderId) && 'blur-sm',
                    )}
                  >
                    <div className="flex justify-between items-start text-sm">
                      <div>
                        <p className="font-semibold">{plan.name}</p>

                        <div className="flex items-center">
                          {plan.features.map((feature) => (
                            <p
                              key={feature.id}
                              className={cn([
                                'text-muted-foreground mr-4',
                                !Number(feature.value) && 'hidden',
                              ])}
                            >
                              {
                                dict.dashboard.settings.billing.form.fields
                                  .newPlan.upTo
                              }{' '}
                              {feature.label}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-semibold">
                          {parseUnitPrice(price)} /
                          {period === 'year'
                            ? dict.dashboard.settings.billing.form.fields
                                .newPlan.paymentInterval.annual
                            : dict.dashboard.settings.billing.form.fields
                                .newPlan.paymentInterval.month}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </main>
      </div>
    </>
  )
}
