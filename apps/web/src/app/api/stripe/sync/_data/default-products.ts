import { PaymentProviderCreatePlanDTO } from '@app/modules/src/interfaces/providers/payment'

export const defaultProducts: PaymentProviderCreatePlanDTO[] = [
  {
    name: 'Free',
    description:
      'This is our Free plan, ideal for small businesses or startups that are just starting out and need basic support and essential integrations.',
    prices: [
      {
        recurring: {
          interval: 'month',
        },
        currency: 'usd',
        unit_amount: 0,
      },
      {
        recurring: {
          interval: 'year',
        },
        currency: 'usd',
        unit_amount: 0,
      },
    ],
    metadata: {
      EMAIL_SUPPORT: 'true',
      PRIORITY_SUPPORT: 'false',
      INTEGRATIONS: 'true',
      TEAM_MEMBERS: '2',
    },
  },
  {
    name: 'Indie',
    description:
      'Indie is perfect for businesses that need more resources, including priority support and capacity for more team members.',
    prices: [
      {
        recurring: {
          interval: 'month',
        },
        currency: 'usd',
        unit_amount: 2900,
      },
      {
        recurring: {
          interval: 'year',
        },
        currency: 'usd',
        unit_amount: 29000,
      },
    ],
    metadata: {
      EMAIL_SUPPORT: 'true',
      PRIORITY_SUPPORT: 'true',
      INTEGRATIONS: 'true',
      TEAM_MEMBERS: '4',
    },
  },
  {
    name: 'Startup',
    description:
      'Designed for large organizations, Statup offers comprehensive support, advanced integrations, and support for a larger team.',
    prices: [
      {
        recurring: {
          interval: 'month',
        },
        currency: 'usd',
        unit_amount: 4900,
      },
      {
        recurring: {
          interval: 'year',
        },
        currency: 'usd',
        unit_amount: 49000,
      },
    ],
    metadata: {
      EMAIL_SUPPORT: 'true',
      PRIORITY_SUPPORT: 'true',
      INTEGRATIONS: 'true',
      TEAM_MEMBERS: '6',
    },
  },
]
