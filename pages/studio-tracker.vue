<script setup lang="ts">
import { inquiryStatuses, type InquiryRecord, type InquiryStatus, type InquiryStorageMeta } from '~/types/inquiry'

definePageMeta({
  middleware: 'studio-auth'
})

const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

const { data, refresh, pending } = await useAsyncData<{
  inquiries: InquiryRecord[]
  statusSummary: Array<{ status: string; label: string; count: number }>
  storage: InquiryStorageMeta
}>('studio-tracker', () =>
  $fetch('/api/inquiries', {
    headers
  })
)

const { data: session } = await useAsyncData('studio-session-state', () =>
  $fetch<{ auth: { enabled: boolean; authenticated: boolean; username: string } }>('/api/admin/session', {
    headers
  })
)

const stageLabels: Record<InquiryStatus, string> = {
  received: 'Received',
  'consultation-booked': 'Consultation booked',
  'design-approved': 'Design approved',
  'in-production': 'In production',
  'fitting-scheduled': 'Fitting scheduled',
  'ready-for-pickup': 'Ready for pickup',
  delivered: 'Delivered'
}

const activeFilter = ref<'all' | InquiryStatus>('all')
const trackerNote = reactive<Record<string, string>>({})
const isUpdating = ref<string | null>(null)
const isSigningOut = ref(false)

const filteredInquiries = computed(() => {
  const inquiries = data.value?.inquiries || []

  if (activeFilter.value === 'all') {
    return inquiries
  }

  return inquiries.filter((inquiry) => inquiry.status === activeFilter.value)
})

async function updateInquiryStage(inquiryId: string, options: { advance?: boolean; status?: InquiryStatus; note?: string }) {
  isUpdating.value = inquiryId

  try {
    await $fetch(`/api/inquiries/${inquiryId}`, {
      method: 'PATCH',
      body: options
    })

    trackerNote[inquiryId] = ''
    await refresh()
  } finally {
    isUpdating.value = null
  }
}

async function signOut() {
  isSigningOut.value = true

  try {
    await $fetch('/api/admin/logout', {
      method: 'POST'
    })

    await navigateTo('/studio-login')
  } finally {
    isSigningOut.value = false
  }
}
</script>

<template>
  <main class="section">
    <div class="container tracker-shell">
      <section class="panel tracker-intro">
        <div class="tracker-intro__top">
          <span class="eyebrow">Studio tracker</span>
          <button
            v-if="session?.auth.enabled"
            type="button"
            class="button button--ghost tracker-signout"
            :disabled="isSigningOut"
            @click="signOut"
          >
            {{ isSigningOut ? 'Signing out...' : 'Sign out' }}
          </button>
        </div>
        <h1 class="section-title">A demo production board for custom orders, fittings, and delivery readiness.</h1>
        <p class="section-copy">
          This is the internal view: every inquiry can move through consultation, approval, production, fitting, and
          handoff. The studio login now protects access when credentials are configured, and the storage layer is ready
          for a durable provider swap later.
        </p>

        <div class="tracker-meta">
          <span class="tag">
            {{ session?.auth.enabled ? `Protected studio access${session?.auth.username ? ` · ${session.auth.username}` : ''}` : 'Auth inactive' }}
          </span>
          <span class="tag">
            {{ data?.storage.durable ? `Storage: ${data.storage.driver}` : `Storage: ${data?.storage.driver || 'memory demo'}` }}
          </span>
        </div>
        <p class="tracker-storage-note">{{ data?.storage.note }}</p>

        <div class="tracker-summary">
          <button
            class="tracker-filter"
            :class="{ 'tracker-filter--active': activeFilter === 'all' }"
            type="button"
            @click="activeFilter = 'all'"
          >
            <strong>All</strong>
            <span>{{ data?.inquiries.length || 0 }}</span>
          </button>

          <button
            v-for="status in inquiryStatuses"
            :key="status"
            class="tracker-filter"
            :class="{ 'tracker-filter--active': activeFilter === status }"
            type="button"
            @click="activeFilter = status"
          >
            <strong>{{ stageLabels[status] }}</strong>
            <span>{{ data?.statusSummary.find((entry) => entry.status === status)?.count || 0 }}</span>
          </button>
        </div>
      </section>

      <section class="tracker-list">
        <p v-if="pending" class="empty-state">Loading studio tracker...</p>
        <p v-else-if="!filteredInquiries.length" class="empty-state">No inquiries yet. Submit one from the fitting page to populate the tracker.</p>

        <article v-for="inquiry in filteredInquiries" :key="inquiry.id" class="panel tracker-card">
          <div class="tracker-card__top">
            <div>
              <span class="tag">{{ stageLabels[inquiry.status] }}</span>
              <h2>{{ inquiry.fullName }}</h2>
              <p>{{ inquiry.garmentType }} · {{ inquiry.reference }}</p>
            </div>
            <div class="tracker-card__meta">
              <span>{{ inquiry.phone }}</span>
              <span v-if="inquiry.occasionDate">Occasion: {{ inquiry.occasionDate }}</span>
              <span>{{ inquiry.consultationPreference }}</span>
            </div>
          </div>

          <div class="tracker-card__body">
            <div class="tracker-card__brief">
              <h3>Brief</h3>
              <p>{{ inquiry.notes }}</p>
              <ul v-if="inquiry.inspirationLinks.length" class="tracker-links">
                <li v-for="link in inquiry.inspirationLinks" :key="link">
                  <a :href="link" target="_blank" rel="noreferrer">{{ link }}</a>
                </li>
              </ul>
            </div>

            <div class="tracker-card__timeline">
              <h3>Timeline</h3>
              <div class="timeline-list">
                <article v-for="event in inquiry.timeline.slice(0, 4)" :key="event.id" class="timeline-entry">
                  <strong>{{ event.title }}</strong>
                  <p>{{ event.detail }}</p>
                  <small>{{ new Date(event.createdAt).toLocaleString() }}</small>
                </article>
              </div>
            </div>
          </div>

          <div class="tracker-card__actions">
            <textarea
              v-model="trackerNote[inquiry.id]"
              rows="3"
              placeholder="Add a quick studio note for this order"
            />
            <div class="button-row">
              <button
                type="button"
                class="button button--primary"
                :disabled="isUpdating === inquiry.id || inquiry.status === 'delivered'"
                @click="updateInquiryStage(inquiry.id, { advance: true, note: trackerNote[inquiry.id] })"
              >
                {{ inquiry.status === 'delivered' ? 'Delivered' : 'Advance stage' }}
              </button>
              <button
                type="button"
                class="button button--ghost"
                :disabled="isUpdating === inquiry.id"
                @click="updateInquiryStage(inquiry.id, { note: trackerNote[inquiry.id] })"
              >
                Save note
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<style scoped>
.tracker-shell {
  display: grid;
  gap: 1rem;
}

.tracker-intro__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tracker-intro,
.tracker-card {
  padding: 1.5rem;
}

.tracker-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.tracker-storage-note {
  margin: 0.85rem 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.tracker-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.4rem;
}

.tracker-filter {
  padding: 1rem;
  border-radius: 20px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.74);
  text-align: left;
  cursor: pointer;
}

.tracker-filter strong,
.tracker-card h2,
.tracker-card h3 {
  display: block;
  font-family: var(--font-display);
}

.tracker-filter span {
  color: var(--muted);
}

.tracker-filter--active {
  border-color: rgba(28, 169, 179, 0.34);
  box-shadow: 0 0 0 4px rgba(28, 169, 179, 0.08);
}

.tracker-list {
  display: grid;
  gap: 1rem;
}

.tracker-card__top,
.tracker-card__body {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 1rem;
}

.tracker-card__top {
  align-items: start;
}

.tracker-card h2 {
  margin: 1rem 0 0.55rem;
  font-size: 2rem;
  line-height: 0.96;
}

.tracker-card__top p,
.tracker-card__meta span,
.tracker-card__brief p,
.timeline-entry p {
  color: var(--muted);
}

.tracker-card__meta {
  display: grid;
  gap: 0.45rem;
  justify-items: end;
  text-align: right;
  font-size: 0.94rem;
}

.tracker-card__brief,
.tracker-card__timeline {
  padding: 1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(22, 54, 60, 0.08);
}

.tracker-card h3 {
  margin: 0 0 0.7rem;
  font-size: 1.45rem;
}

.tracker-links {
  margin: 0.8rem 0 0;
  padding-left: 1rem;
}

.tracker-links a {
  text-decoration: underline;
}

.timeline-list {
  display: grid;
  gap: 0.7rem;
}

.timeline-entry strong {
  display: block;
}

.timeline-entry p,
.timeline-entry small {
  margin: 0.25rem 0 0;
}

.tracker-card__actions {
  margin-top: 1rem;
}

.tracker-card__actions textarea {
  width: 100%;
  margin-bottom: 0.8rem;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.82);
}

@media (max-width: 960px) {
  .tracker-summary,
  .tracker-card__top,
  .tracker-card__body {
    grid-template-columns: 1fr;
  }

  .tracker-intro__top {
    flex-direction: column;
    align-items: flex-start;
  }

  .tracker-card__meta {
    justify-items: start;
    text-align: left;
  }
}
</style>
