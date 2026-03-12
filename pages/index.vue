<script setup lang="ts">
const { data: lookbook } = await useLookbook()
const previewLooks = computed(() => lookbook.value?.slice(0, 4) || [])
</script>

<template>
  <main class="page">
    <HeroShowcase />
    <ProcessStrip />

    <section class="section scene">
      <div class="container">
        <span class="eyebrow">Signature looks</span>
        <div class="process-head">
          <h2 class="section-title">Signature pieces should feel like an editorial spread, not a crowded product wall.</h2>
          <p class="section-copy">
            This is where clients meet the tone of the brand: strong print, dramatic proportion, soft movement, and
            silhouette-led pieces that feel ready for a fitting, a celebration, or a statement entrance.
          </p>
        </div>
        <EditorialShowcase :items="previewLooks" />
      </div>
    </section>

    <StyleDirections />

    <CommunitySpotlight />

    <section class="section scene">
      <div class="container studio-grid">
        <article class="panel studio-panel studio-panel--dark">
          <span class="eyebrow eyebrow--light">What the studio offers</span>
          <h2 class="section-title studio-panel__title">A fashion studio for custom dressing, memorable events, and expressive personal style.</h2>
          <p class="studio-copy">
            Whether the client wants a statement birthday look, an event piece, a dramatic kimono, or a sharp menswear
            outfit, the studio can move across moods while keeping the finishing polished and intentional.
          </p>
          <div class="studio-tags">
            <span>Custom occasionwear</span>
            <span>Birthday looks</span>
            <span>Statement kimonos</span>
            <span>Menswear details</span>
            <span>Made-to-measure edits</span>
          </div>
        </article>

        <article class="panel studio-panel">
          <span class="eyebrow">Studio edits</span>
          <h2 class="section-title">Explore the house through clear style categories.</h2>
          <ul class="action-list">
            <li>Print-led dresses and coordinated looks with strong colour and graphic detail</li>
            <li>Structured pieces for birthdays, formal dinners, and standout occasion dressing</li>
            <li>Fluid kimonos, overlays, and softer silhouettes with movement and ease</li>
            <li>Menswear edits with clean lines, bold detailing, and easy styling potential</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="section scene">
      <div class="container cards">
        <article class="panel action-panel">
          <span class="eyebrow">For custom orders</span>
          <h2 class="section-title">Book first, refine the brief, then move into the right piece.</h2>
          <p class="section-copy">
            Most custom garments begin with a fitting request so the silhouette, timing, and fabric direction are all
            clear before production starts.
          </p>
          <div class="button-row action-panel__actions">
            <NuxtLink to="/book-fitting" class="button button--secondary">Book a fitting</NuxtLink>
            <NuxtLink to="/collections" class="button button--ghost">Browse all collections</NuxtLink>
          </div>
        </article>

        <article class="panel dark-panel">
          <span class="tag">Ready to wear</span>
          <h2>Selected pieces can still be available to buy directly when the style is already defined.</h2>
          <p>
            Signature kimonos, menswear details, and selected event pieces can sit alongside custom commissions so the
            site serves both appointment-led and ready-to-order clients.
          </p>
        </article>

        <article class="panel action-panel">
          <span class="eyebrow">Inside the studio</span>
          <h2 class="section-title">Expect a process that is personal, collaborative, and detail-driven.</h2>
          <p class="section-copy">
            Clients are not pushed through a generic checkout flow. They are guided through conversation, fittings, and
            final adjustments so the piece lands exactly as intended.
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.process-head {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 1rem;
  align-items: end;
  margin: 0.9rem 0 1.5rem;
}

.action-panel,
.dark-panel,
.studio-panel {
  padding: 1.5rem;
}

.action-panel {
  min-height: 100%;
}

.action-panel__actions {
  margin-top: 1.25rem;
}

.studio-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1rem;
}

.studio-panel--dark {
  color: #fffdf7;
  background:
    radial-gradient(circle at top right, rgba(207, 91, 134, 0.24), transparent 28%),
    linear-gradient(150deg, rgba(20, 20, 26, 0.98), rgba(11, 38, 44, 0.98));
}

.eyebrow--light {
  color: rgba(255, 253, 247, 0.78);
}

.studio-panel__title {
  color: #fffdf7;
}

.studio-copy {
  margin: 0;
  color: rgba(255, 253, 247, 0.78);
  line-height: 1.75;
}

.studio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.3rem;
}

.studio-tags span {
  padding: 0.55rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 253, 247, 0.86);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
}

.dark-panel {
  color: #fffdf7;
  background:
    linear-gradient(150deg, rgba(18, 87, 96, 0.98), rgba(16, 124, 136, 0.94)),
    var(--surface-strong);
}

.dark-panel h2 {
  margin: 1rem 0 0.9rem;
  font-family: var(--font-display);
  font-size: 2.3rem;
  line-height: 0.96;
}

.dark-panel p {
  margin: 0;
  color: rgba(255, 253, 247, 0.8);
  line-height: 1.7;
}

.action-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--muted);
  line-height: 1.8;
}

.action-list li::marker {
  color: var(--gold-deep);
}

@media (max-width: 960px) {
  .process-head,
  .studio-grid {
    grid-template-columns: 1fr;
  }
}
</style>
