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
            <strong>Best Shopify fit</strong>
            <p>Ready-to-order pieces can move directly to checkout, while custom commissions stay inquiry-led until details are approved.</p>
          </div>
        </div>
      </section>

      <section class="panel booking-form">
        <span class="tag">Inquiry form</span>
        <h2>Private fitting request</h2>
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
            <textarea rows="5" placeholder="Style notes, fabric preference, links to inspiration, or the kind of look you want to create" />
          </label>
          <button type="button" class="button button--primary">Connect consultation flow</button>
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

@media (max-width: 960px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
