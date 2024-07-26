export const sendWebhook = async ({
  webhookUrl,
  event,
}: {
  webhookUrl: string
  event: Record<string, any>
}) => {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'link.subscribe',
        data: event,
      }),
    })
  } catch (err) {
    // Do something
  }
}
