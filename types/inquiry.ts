export const inquiryStatuses = [
  'received',
  'consultation-booked',
  'design-approved',
  'in-production',
  'fitting-scheduled',
  'ready-for-pickup',
  'delivered'
] as const

export type InquiryStatus = (typeof inquiryStatuses)[number]

export interface InquiryTimelineEvent {
  id: string
  type: 'submitted' | 'status-changed' | 'note'
  title: string
  detail: string
  createdAt: string
}

export interface InquiryRecord {
  id: string
  reference: string
  fullName: string
  email: string
  phone: string
  occasionDate: string
  garmentType: string
  consultationPreference: string
  budget: string
  location: string
  inspirationLinks: string[]
  notes: string
  whatsappOptIn: boolean
  status: InquiryStatus
  createdAt: string
  updatedAt: string
  timeline: InquiryTimelineEvent[]
}

export interface InquiryPayload {
  fullName: string
  email: string
  phone: string
  occasionDate: string
  garmentType: string
  consultationPreference: string
  budget: string
  location: string
  inspirationLinks: string[]
  notes: string
  whatsappOptIn: boolean
}

export interface CommunityEntry {
  id: string
  name: string
  occasion: string
  garment: string
  caption: string
  palette: {
    primary: string
    secondary: string
    accent: string
  }
}
