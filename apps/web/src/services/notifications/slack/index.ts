import { APP_CONFIGS } from '@/boilerplate.config'
import { getUrl } from '@/helpers/get-url'

const postToWebhook = async (body: any, webhookUrl: string) => {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const sendSlackMessage = async ({
  webhookUrl,
  event,
}: {
  webhookUrl: string
  event: Record<string, any>
}) => {
  try {
    const slackMessage = [
      `**Link: ${event.link.title} (${event.link.url})**`,
      `**Contact:** ${event.contact.email}`,
    ]
      .join('\n')
      .trim()

    await postToWebhook(
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: slackMessage,
            },
            accessory: {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Details',
                emoji: true,
              },
              value: `monitor_url_${getUrl(`/app`)}`,
              url: getUrl(`/app`),
            },
          },
        ],
      },
      webhookUrl,
    )
  } catch (err) {
    console.log(err)
    // Do something
  }
}

export const sendTestSlackMessage = async (webhookUrl: string) => {
  try {
    await postToWebhook(
      {
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `This is a test notification from <${APP_CONFIGS.app.url}|${APP_CONFIGS.app.name}>.\n If you can read this, your Slack webhook is functioning correctly!`,
            },
          },
        ],
      },
      webhookUrl,
    )
    return true
  } catch (err) {
    return false
  }
}
