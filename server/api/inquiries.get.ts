import { getInquiryStorageMeta, getInquiryStatusLabel, listInquiries } from '~/server/utils/inquiries'
import { requireStudioSession } from '~/server/utils/studioAuth'
import type { InquiryRecord, InquiryStorageMeta } from '~/types/inquiry'

export default defineEventHandler(async (event): Promise<{
  inquiries: InquiryRecord[]
  statusSummary: Array<{ status: string; label: string; count: number }>
  storage: InquiryStorageMeta
}> => {
  requireStudioSession(event)
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
    })),
    storage: getInquiryStorageMeta()
  }
})
