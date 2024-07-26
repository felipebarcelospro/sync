import { getDictionary } from '../internationalization/helpers/get-dictionary'
import { getLocaleFromRequest } from '../internationalization/helpers/get-locale-from-request'
import { IntegrationGroup } from './types'

export const getIntegrations = () => {
  const locale = getLocaleFromRequest()
  const dict = getDictionary(locale)

  return [
    {
      key: 'notifications',
      name: dict.dashboard.plugins.notifications.name,
      description: dict.dashboard.plugins.notifications.description,
      integrations: [
        {
          key: 'discord',
          name: 'Discord',
          description:
            dict.dashboard.plugins.notifications.integrations.discord
              .description,
          icon: '/assets/icons/discord.svg',
          field: [
            {
              id: 'url',
              type: 'url',
              label: 'Discord Webhook URL',
              placeholder: '',
              help: dict.dashboard.plugins.notifications.integrations.discord
                .field.help,
            },
          ],
        },
        {
          key: 'slack',
          name: 'Slack',
          description:
            dict.dashboard.plugins.notifications.integrations.slack.description,
          icon: '/assets/icons/slack.svg',
          field: [
            {
              id: 'url',
              type: 'url',
              label: 'Webhook URL',
              placeholder: '',
              help: dict.dashboard.plugins.notifications.integrations.slack
                .field.help,
            },
          ],
        },
        {
          key: 'webhook',
          name: 'Webhook',
          description:
            dict.dashboard.plugins.notifications.integrations.webhook
              .description,
          icon: '/assets/icons/webhook.png',
          field: [
            {
              id: 'url',
              type: 'url',
              label: 'Webhook Endpoint URL',
              placeholder: '',
              help: dict.dashboard.plugins.notifications.integrations.webhook
                .field.help,
            },
          ],
        },
      ],
    },
  ] as IntegrationGroup[]
}
