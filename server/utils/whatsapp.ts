import type { InquiryRecord } from '~/types/inquiry'

type AutomationEvent = 'inquiry_created' | 'status_updated'

function buildMessage(event: AutomationEvent, inquiry: InquiryRecord) {
  if (event === 'inquiry_created') {
    return [
      `New Coloured Sugar inquiry: ${inquiry.reference}`,
      `${inquiry.fullName} requested ${inquiry.garmentType}.`,
      inquiry.occasionDate ? `Occasion date: ${inquiry.occasionDate}` : 'Occasion date: not provided',
      `Consultation preference: ${inquiry.consultationPreference}`,
      `Phone: ${inquiry.phone}`,
      inquiry.notes
    ].join('\n')
  }

  return [
    `Order tracker update: ${inquiry.reference}`,
    `${inquiry.fullName} is now at stage: ${inquiry.status}.`,
    inquiry.occasionDate ? `Occasion date: ${inquiry.occasionDate}` : 'Occasion date: not provided'
  ].join('\n')
}

export async function sendWhatsAppAutomation(event: AutomationEvent, inquiry: InquiryRecord) {
  const config = useRuntimeConfig()
  const message = buildMessage(event, inquiry)

  if (config.whatsappWebhookUrl) {
    try {
      await $fetch(config.whatsappWebhookUrl, {
        method: 'POST',
        body: {
          event,
          inquiry,
          message
        }
      })
    } catch {
      return
    }

    return
  }

  if (!config.whatsappAccessToken || !config.whatsappPhoneNumberId) {
    return
  }

  const targetNumber = config.whatsappNotificationRecipient || (inquiry.whatsappOptIn ? inquiry.phone : '')

  if (!targetNumber) {
    return
  }

  try {
    await $fetch(`${config.whatsappGraphApiBase}/${config.whatsappPhoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.whatsappAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: {
        messaging_product: 'whatsapp',
        to: targetNumber,
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      }
    })
  } catch {
    return
  }
}
