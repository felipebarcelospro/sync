import { APP_CONFIGS } from '@/boilerplate.config'
import { getUrl } from '@/helpers/get-url'

const postToWebhook = async (content: string, webhookUrl: string) => {
  await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content.trim(),
      avatar_url: APP_CONFIGS.app.logo,
      username: `${APP_CONFIGS.app.name}`,
    }),
  })
}

export const sendDiscordMessage = async ({
  webhookUrl,
  event,
}: {
  webhookUrl: string
  event: Record<string, any>
}) => {
  try {
    const discordMessage = [
      `**Link: ${event.link.title} (${event.link.url})**`,
      `**Contact:** ${event.contact.email}`,
      `🔗 [View Details](${getUrl(`/app`)})`,
    ]
      .join('\n')
      .trim() // Join parts of the message with newlines and trim the result

    await postToWebhook(discordMessage, webhookUrl)
  } catch (err) {
    // Do something
  }
}

export const sendTestDiscordMessage = async (webhookUrl: string) => {
  if (!webhookUrl) {
    return false
  }
  try {
    await postToWebhook(
      `This is a test notification from ${APP_CONFIGS.app.name}. \nIf you see this, it means that your webhook is working! 🎉`,
      webhookUrl,
    )
    return true
  } catch (err) {
    return false
  }
}
