<template>
  <section class="section">
    <div class="container">
      <span class="eyebrow">The atelier flow</span>
      <div class="process-head">
        <h2 class="section-title">Built for a tailoring business where the conversation matters.</h2>
        <p class="section-copy">
          The content and Shopify model should mirror the real-world process: inspire, qualify, consult, fit, and
          then collect payment or deposit through Shopify.
        </p>
      </div>

      <div class="pillars">
        <article class="card process-card">
          <span class="tag">01</span>
          <h3>Lookbook</h3>
          <p>Showcase Ankara, bridal, occasion wear, and executive pieces with premium photography and style notes.</p>
        </article>
        <article class="card process-card">
          <span class="tag">02</span>
          <h3>Consultation</h3>
          <p>Route serious clients into a fitting request or paid consultation before any final garment specification.</p>
        </article>
        <article class="card process-card">
          <span class="tag">03</span>
          <h3>Checkout</h3>
          <p>Use Shopify for deposits, ready-made pieces, gift cards, and final invoice-style purchase flows.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-head {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 1rem;
  align-items: end;
  margin: 0.9rem 0 1.5rem;
}

.process-card {
  padding: 1.5rem;
}

.process-card h3 {
  margin: 1rem 0 0.75rem;
  font-family: var(--font-display);
  font-size: 1.7rem;
}

.process-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

@media (max-width: 960px) {
  .process-head {
    grid-template-columns: 1fr;
  }
}
</style>
