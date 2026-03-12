<template>
  <main class="section">
    <div class="container contact-grid">
      <section class="panel booking-copy">
        <span class="eyebrow">Consultation-first flow</span>
        <h1 class="section-title">Book the conversation before the garment.</h1>
        <p class="section-copy">
          For this type of tailoring business, the highest-converting CTA is usually a fitting request or paid
          consultation, not an instant add-to-cart button.
        </p>
        <div class="booking-points">
          <div>
            <strong>Ideal next step</strong>
            <p>Connect this page to a booking tool, a custom form endpoint, or a Shopify product used as a deposit.</p>
          </div>
          <div>
            <strong>Data to capture</strong>
            <p>Event date, garment type, measurements status, fabric preference, and budget range.</p>
          </div>
          <div>
            <strong>Best Shopify fit</strong>
            <p>Create a consultation product or deposit product and send qualified leads into checkout only after review.</p>
          </div>
        </div>
      </section>

      <section class="panel booking-form">
        <span class="tag">Starter form</span>
        <h2>Fitting request</h2>
        <form class="form-grid">
          <label>
            Full name
            <input type="text" placeholder="Client name" />
          </label>
          <label>
            Occasion date
            <input type="date" />
          </label>
          <label>
            Garment type
            <select>
              <option>Bridal</option>
              <option>Occasion wear</option>
              <option>Executive wear</option>
              <option>Ready-made alteration</option>
            </select>
          </label>
          <label>
            Notes
            <textarea rows="5" placeholder="Style notes, fabric preference, or links to inspiration" />
          </label>
          <button type="button" class="button button--primary">Connect booking flow</button>
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

.booking-points {
  display: grid;
  gap: 1rem;
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
  background: rgba(255, 255, 255, 0.6);
  color: var(--ink);
}

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
