import { createInquiry, validateInquiryPayload } from '~/server/utils/inquiries'
import { sendWhatsAppAutomation } from '~/server/utils/whatsapp'
import type { InquiryRecord } from '~/types/inquiry'

export default defineEventHandler(async (event): Promise<{ inquiry: InquiryRecord }> => {
  const body = await readBody<Record<string, unknown>>(event)
  const { payload, errors } = validateInquiryPayload(body)

  if (errors.length) {
    throw createError({
      statusCode: 422,
      statusMessage: errors.join(' ')
    })
  }

  const inquiry = await createInquiry(payload)
  await sendWhatsAppAutomation('inquiry_created', inquiry)

  return { inquiry }
})
