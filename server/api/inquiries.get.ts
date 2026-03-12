import { listInquiries, getInquiryStatusLabel } from '~/server/utils/inquiries'
import type { InquiryRecord } from '~/types/inquiry'

export default defineEventHandler(async (): Promise<{
  inquiries: InquiryRecord[]
  statusSummary: Array<{ status: string; label: string; count: number }>
}> => {
  const inquiries = await listInquiries()

  const counts = new Map<string, number>()

  for (const inquiry of inquiries) {
    counts.set(inquiry.status, (counts.get(inquiry.status) || 0) + 1)
  }

  return {
    inquiries,
    statusSummary: Array.from(counts.entries()).map(([status, count]) => ({
      status,
      label: getInquiryStatusLabel(status as InquiryRecord['status']),
      count
    }))
  }
})
