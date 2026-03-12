import { getNextInquiryStatus, getInquiryById, updateInquiry } from '~/server/utils/inquiries'
import { requireStudioSession } from '~/server/utils/studioAuth'
import { sendWhatsAppAutomation } from '~/server/utils/whatsapp'
import type { InquiryRecord, InquiryStatus } from '~/types/inquiry'

export default defineEventHandler(async (event): Promise<{ inquiry: InquiryRecord }> => {
  requireStudioSession(event)
  const id = getRouterParam(event, 'id')
  const body = await readBody<{ status?: InquiryStatus; advance?: boolean; note?: string }>(event)

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Inquiry id is required.'
    })
  }

  const currentInquiry = await getInquiryById(id)

  if (!currentInquiry) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Inquiry not found.'
    })
  }

  const status = body.advance ? getNextInquiryStatus(currentInquiry.status) : body.status
  const inquiry = await updateInquiry(id, {
    status,
    note: body.note
  })

  if (!inquiry) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Inquiry not found.'
    })
  }

  if (status && status !== currentInquiry.status) {
    await sendWhatsAppAutomation('status_updated', inquiry)
  }

  return { inquiry }
})
