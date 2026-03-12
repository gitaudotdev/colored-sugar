<script setup lang="ts">
const route = useRoute()

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  occasionDate: '',
  garmentType: 'Occasion wear',
  consultationPreference: 'WhatsApp follow-up',
  budget: '',
  location: 'Nairobi',
  inspirationLinks: '',
  notes: '',
  whatsappOptIn: true
})

const prefilledBrief = typeof route.query.brief === 'string' ? route.query.brief : ''
const prefilledGarmentType = typeof route.query.garmentType === 'string' ? route.query.garmentType : ''

if (prefilledBrief) {
  form.notes = prefilledBrief
}

if (prefilledGarmentType) {
  form.garmentType = prefilledGarmentType
}

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const inquiryReference = ref('')

async function submitInquiry() {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await $fetch<{ inquiry: { reference: string } }>('/api/inquiries', {
      method: 'POST',
      body: {
        ...form,
        inspirationLinks: form.inspirationLinks
      }
    })

    inquiryReference.value = response.inquiry.reference
    successMessage.value = 'Inquiry received. The studio can now move this into consultation and production tracking.'

    form.fullName = ''
    form.email = ''
    form.phone = ''
    form.occasionDate = ''
    form.garmentType = 'Occasion wear'
    form.consultationPreference = 'WhatsApp follow-up'
    form.budget = ''
    form.location = 'Nairobi'
    form.inspirationLinks = ''
    form.notes = ''
    form.whatsappOptIn = true
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'The inquiry could not be submitted right now. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="section">
    <div class="container contact-grid">
      <section class="panel booking-copy">
        <span class="eyebrow">Consultation-first flow</span>
        <h1 class="section-title">Begin with the fitting, the fabric conversation, and the occasion brief.</h1>
        <p class="section-copy">
          Coloured Sugar commissions begin with a private consultation so the garment, timing, fit, and styling
          direction are all clear before work begins.
        </p>
        <div class="booking-points">
          <div>
            <strong>What to capture</strong>
            <p>Share the event date, garment category, inspiration, fabric direction, and whether measurements are already available.</p>
          </div>
          <div>
            <strong>Ideal next step</strong>
            <p>Once the brief is reviewed, the next step is a fitting appointment or a consultation deposit, depending on the piece.</p>
          </div>
          <div>
            <strong>Production tracker</strong>
            <p>Every inquiry can now move into a demo tracker that follows consultation, approvals, production, fitting, and delivery.</p>
          </div>
        </div>

        <div class="booking-actions">
          <NuxtLink to="/build-a-look" class="button button--secondary">Build a weekend wardrobe</NuxtLink>
          <NuxtLink to="/studio-tracker" class="button button--ghost">Open studio tracker</NuxtLink>
        </div>
      </section>

      <section class="panel booking-form">
        <span class="tag">Inquiry form</span>
        <h2>Private fitting request</h2>

        <form class="form-grid" @submit.prevent="submitInquiry">
          <label>
            Full name
            <input v-model="form.fullName" type="text" placeholder="Client name" />
          </label>

          <label>
            Email
            <input v-model="form.email" type="email" placeholder="you@example.com" />
          </label>

          <label>
            Phone / WhatsApp
            <input v-model="form.phone" type="tel" placeholder="+254..." />
          </label>

          <label>
            Occasion date
            <input v-model="form.occasionDate" type="date" />
          </label>

          <label>
            Garment type
            <select v-model="form.garmentType">
              <option>Bridal</option>
              <option>Occasion wear</option>
              <option>Executive wear</option>
              <option>Kimono / soft drape</option>
              <option>Menswear</option>
              <option>Alteration / remake</option>
            </select>
          </label>

          <label>
            Consultation preference
            <select v-model="form.consultationPreference">
              <option>WhatsApp follow-up</option>
              <option>In-studio fitting</option>
              <option>Phone call first</option>
            </select>
          </label>

          <label>
            Budget range
            <input v-model="form.budget" type="text" placeholder="For example: KES 20,000 - 35,000" />
          </label>

          <label>
            Location
            <input v-model="form.location" type="text" placeholder="Nairobi" />
          </label>

          <label>
            Inspiration links
            <textarea
              v-model="form.inspirationLinks"
              rows="3"
              placeholder="Paste Instagram, Pinterest, or photo links on separate lines"
            />
          </label>

          <label>
            Notes
            <textarea rows="5" v-model="form.notes" placeholder="Style notes, fabric preference, links to inspiration, or the kind of look you want to create" />
          </label>

          <label class="form-check">
            <input v-model="form.whatsappOptIn" type="checkbox" />
            <span>I’m happy to receive WhatsApp updates about this inquiry.</span>
          </label>

          <p v-if="errorMessage" class="form-message form-message--error">{{ errorMessage }}</p>
          <div v-if="successMessage" class="form-success">
            <strong>{{ successMessage }}</strong>
            <span>Reference: {{ inquiryReference }}</span>
          </div>

          <button type="submit" class="button button--primary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Send fitting request' }}
          </button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.contact-grid {
  grid-template-columns: 1fr 0.92fr;
}

.booking-copy,
.booking-form {
  padding: 1.5rem;
}

.booking-copy {
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(236, 248, 247, 0.9)),
    white;
}

.booking-form {
  background:
    linear-gradient(180deg, rgba(255, 251, 242, 0.96), rgba(250, 244, 224, 0.92)),
    white;
}

.booking-points {
  display: grid;
  gap: 1rem;
  margin-top: 1.4rem;
}

.booking-actions {
  margin-top: 1.4rem;
}

.booking-points strong {
  display: block;
  margin-bottom: 0.3rem;
  font-family: var(--font-display);
  font-size: 1.4rem;
}

.booking-points p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.booking-form h2 {
  margin: 1rem 0 1.2rem;
  font-family: var(--font-display);
  font-size: 2rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid label {
  display: grid;
  gap: 0.45rem;
  color: var(--muted);
}

.form-grid input,
.form-grid select,
.form-grid textarea {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
}

.form-grid input:focus,
.form-grid select:focus,
.form-grid textarea:focus {
  outline: none;
  border-color: rgba(28, 169, 179, 0.46);
  box-shadow: 0 0 0 4px rgba(28, 169, 179, 0.12);
}

.form-check {
  grid-template-columns: auto 1fr;
  align-items: start;
}

.form-message {
  margin: 0;
  font-size: 0.94rem;
}

.form-message--error {
  color: #9f3047;
}

.form-success {
  display: grid;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 16px;
  background: rgba(28, 169, 179, 0.09);
  border: 1px solid rgba(28, 169, 179, 0.16);
}

.form-success strong {
  color: var(--ink);
}

.form-success span {
  color: var(--muted);
}

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
