<script setup lang="ts">
const { data: lookbook } = await useLookbook()
const previewLooks = computed(() => lookbook.value?.slice(0, 3) || [])
</script>

<template>
  <main>
    <HeroShowcase />
    <ProcessStrip />

    <section class="section">
      <div class="container">
        <span class="eyebrow">Signature looks</span>
        <div class="process-head">
          <h2 class="section-title">Start with brand storytelling, then let Shopify handle commerce underneath.</h2>
          <p class="section-copy">
            This starter uses a server endpoint for lookbook data, so you can connect real products later without
            rewriting the page architecture.
          </p>
        </div>
        <LookbookGrid :items="previewLooks" />
      </div>
    </section>

    <section class="section">
      <div class="container cards">
        <article class="panel action-panel">
          <span class="eyebrow">What to connect next</span>
          <h2 class="section-title">Shopify pieces to wire in after the design pass.</h2>
          <ul class="action-list">
            <li>Products for consultation deposits, ready-to-buy garments, and gift cards</li>
            <li>Metaobjects or metafields for fabrics, fit notes, care, and production timelines</li>
            <li>Cart and checkout routes once the storefront token is available</li>
          </ul>
        </article>

        <article class="panel dark-panel">
          <span class="tag">Recommended model</span>
          <h2>Consultation-led ecommerce</h2>
          <p>
            Treat most couture garments as narrative-driven pages with a fitting CTA, and reserve direct checkout for
            deposits, selected ready-made pieces, or curated capsule drops.
          </p>
        </article>

        <article class="panel action-panel">
          <span class="eyebrow">Nuxt advantage</span>
          <h2 class="section-title">You keep full control of the luxury frontend.</h2>
          <p class="section-copy">
            Nuxt handles the premium visual layer while Shopify still owns products, carts, checkout, discounts, and
            order management.
          </p>
          <NuxtLink to="/cart" class="button button--secondary">See the cart plan</NuxtLink>
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
.dark-panel {
  padding: 1.5rem;
}

.action-panel {
  min-height: 100%;
}

.dark-panel {
  color: #fff5eb;
  background:
    linear-gradient(150deg, rgba(36, 24, 19, 0.97), rgba(96, 56, 31, 0.94)),
    #241813;
}

.dark-panel h2 {
  margin: 1rem 0 0.9rem;
  font-family: var(--font-display);
  font-size: 2.3rem;
  line-height: 0.96;
}

.dark-panel p {
  margin: 0;
  color: rgba(255, 245, 235, 0.76);
  line-height: 1.7;
}

.action-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: var(--muted);
  line-height: 1.8;
}

@media (max-width: 960px) {
  .process-head {
    grid-template-columns: 1fr;
  }
}
</style>
