import {
  inquiryStatuses,
  type InquiryPayload,
  type InquiryRecord,
  type InquiryStatus,
  type InquiryTimelineEvent
} from '~/types/inquiry'

const INQUIRIES_KEY = 'inquiries:v1'

function getStorage() {
  return useStorage('studio')
}

export function getInquiryStorageMeta() {
  return import.meta.dev
    ? {
        driver: 'filesystem',
        durable: true,
        note: 'Local development persists tracker data to .data/studio.'
      }
    : {
        driver: 'memory',
        durable: false,
        note: 'Production is still using Nitro memory until a durable provider is mounted.'
      }
}

function createReference() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `CS-${stamp}-${suffix}`
}

function createTimelineEvent(
  type: InquiryTimelineEvent['type'],
  title: string,
  detail: string
): InquiryTimelineEvent {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    detail,
    createdAt: new Date().toISOString()
  }
}

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeLinks(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => normalizeText(entry))
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean)
  }

  return []
}

function normalizePhone(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  if (trimmed.startsWith('+')) {
    return `+${trimmed.slice(1).replace(/\D/g, '')}`
  }

  const digits = trimmed.replace(/\D/g, '')

  if (digits.startsWith('0')) {
    return `+254${digits.slice(1)}`
  }

  if (digits.startsWith('254')) {
    return `+${digits}`
  }

  return `+${digits}`
}

export function validateInquiryPayload(body: Record<string, unknown>) {
  const payload: InquiryPayload = {
    fullName: normalizeText(body.fullName),
    email: normalizeText(body.email),
    phone: normalizePhone(normalizeText(body.phone)),
    occasionDate: normalizeText(body.occasionDate),
    garmentType: normalizeText(body.garmentType),
    consultationPreference: normalizeText(body.consultationPreference),
    budget: normalizeText(body.budget),
    location: normalizeText(body.location),
    inspirationLinks: normalizeLinks(body.inspirationLinks),
    notes: normalizeText(body.notes),
    whatsappOptIn: Boolean(body.whatsappOptIn)
  }

  const errors: string[] = []

  if (!payload.fullName) {
    errors.push('Full name is required.')
  }

  if (!payload.phone) {
    errors.push('Phone number is required.')
  }

  if (!payload.garmentType) {
    errors.push('Garment type is required.')
  }

  if (!payload.notes) {
    errors.push('Style notes are required.')
  }

  return { payload, errors }
}

export async function listInquiries() {
  const storage = getStorage()
  const inquiries = (await storage.getItem<InquiryRecord[]>(INQUIRIES_KEY)) || []

  return inquiries.sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}

async function saveInquiries(inquiries: InquiryRecord[]) {
  await getStorage().setItem(INQUIRIES_KEY, inquiries)
}

export async function createInquiry(payload: InquiryPayload) {
  const now = new Date().toISOString()
  const inquiry: InquiryRecord = {
    id: crypto.randomUUID(),
    reference: createReference(),
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    occasionDate: payload.occasionDate,
    garmentType: payload.garmentType,
    consultationPreference: payload.consultationPreference || 'WhatsApp follow-up',
    budget: payload.budget,
    location: payload.location,
    inspirationLinks: payload.inspirationLinks,
    notes: payload.notes,
    whatsappOptIn: payload.whatsappOptIn,
    status: 'received',
    createdAt: now,
    updatedAt: now,
    timeline: [
      createTimelineEvent(
        'submitted',
        'Inquiry received',
        `${payload.fullName} submitted a ${payload.garmentType || 'custom'} request through the website.`
      )
    ]
  }

  const inquiries = await listInquiries()
  await saveInquiries([inquiry, ...inquiries])

  return inquiry
}

export async function getInquiryById(id: string) {
  const inquiries = await listInquiries()
  return inquiries.find((inquiry) => inquiry.id === id) || null
}

export function getNextInquiryStatus(status: InquiryStatus) {
  const currentIndex = inquiryStatuses.indexOf(status)
  return inquiryStatuses[Math.min(currentIndex + 1, inquiryStatuses.length - 1)]
}

export async function updateInquiry(
  id: string,
  updates: Partial<Pick<InquiryRecord, 'status'>> & { note?: string }
) {
  const inquiries = await listInquiries()
  const inquiryIndex = inquiries.findIndex((entry) => entry.id === id)

  if (inquiryIndex === -1) {
    return null
  }

  const currentInquiry = inquiries[inquiryIndex]
  const nextStatus =
    updates.status && inquiryStatuses.includes(updates.status)
      ? updates.status
      : currentInquiry.status

  const nextTimeline = [...currentInquiry.timeline]

  if (updates.status && updates.status !== currentInquiry.status) {
    nextTimeline.unshift(
      createTimelineEvent(
        'status-changed',
        `Stage moved to ${updates.status}`,
        `The studio tracker moved this order from ${currentInquiry.status} to ${updates.status}.`
      )
    )
  }

  if (updates.note) {
    nextTimeline.unshift(createTimelineEvent('note', 'Studio note', updates.note))
  }

  const updatedInquiry: InquiryRecord = {
    ...currentInquiry,
    status: nextStatus,
    updatedAt: new Date().toISOString(),
    timeline: nextTimeline
  }

  inquiries[inquiryIndex] = updatedInquiry
  await saveInquiries(inquiries)

  return updatedInquiry
}

export function getInquiryStatusLabel(status: InquiryStatus) {
  return {
    received: 'Received',
    'consultation-booked': 'Consultation booked',
    'design-approved': 'Design approved',
    'in-production': 'In production',
    'fitting-scheduled': 'Fitting scheduled',
    'ready-for-pickup': 'Ready for pickup',
    delivered: 'Delivered'
  }[status]
}
