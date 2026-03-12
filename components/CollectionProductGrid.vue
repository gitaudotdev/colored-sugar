<script setup lang="ts">
import type { CollectionPalette } from '~/types/collections'
import type { ShopifyCollectionProduct } from '~/types/shopify'

const props = defineProps<{
  products: ShopifyCollectionProduct[]
  palette: CollectionPalette
}>()

const gridStyle = computed(() => ({
  '--product-primary': props.palette.primary,
  '--product-secondary': props.palette.secondary,
  '--product-accent': props.palette.accent,
  '--product-surface': props.palette.surface,
  '--product-ink': props.palette.ink
}))
</script>

<template>
  <div class="product-grid" :style="gridStyle">
    <article v-for="product in products" :key="product.id" class="product-card">
      <div class="product-card__media">
        <img v-if="product.image" :src="product.image" :alt="product.imageAlt" loading="lazy" />

        <div v-else class="product-card__placeholder">
          <div class="product-card__placeholder-grid" />
          <span class="product-card__placeholder-badge">
            {{ product.source === 'shopify' ? 'Shopify preview' : 'Studio preview' }}
          </span>
          <strong>{{ product.fabric }}</strong>
          <small>{{ product.title }}</small>
        </div>
      </div>

      <div class="product-card__body">
        <span class="tag">{{ product.fabric }}</span>
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>

        <div class="product-card__meta">
          <strong>{{ product.price }}</strong>
          <span>{{ product.availability }}</span>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.product-card {
  overflow: hidden;
  min-width: 0;
  border-radius: 28px;
  border: 1px solid var(--border);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(242, 247, 246, 0.9)),
    var(--surface);
  box-shadow: var(--shadow);
}

.product-card__media {
  position: relative;
  min-height: 18rem;
  overflow: hidden;
  background:
    linear-gradient(145deg, var(--product-primary), var(--product-secondary));
}

.product-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__placeholder {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  min-height: 18rem;
  padding: 1.2rem;
  color: var(--product-ink);
  isolation: isolate;
}

.product-card__placeholder-grid {
  position: absolute;
  inset: 1rem;
  z-index: -1;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.8), transparent 88%);
}

.product-card__placeholder-badge {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.68rem;
}

.product-card__placeholder strong {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.92;
}

.product-card__placeholder small {
  margin-top: 0.55rem;
  max-width: 13rem;
  font-size: 0.92rem;
  line-height: 1.5;
}

.product-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem;
}

.product-card__body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.9rem;
  line-height: 0.96;
}

.product-card__body p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.product-card__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.7rem;
  margin-top: auto;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
}

.product-card__meta strong {
  color: var(--ink);
}

.product-card__meta span {
  color: var(--muted);
  font-size: 0.88rem;
}

@media (max-width: 1080px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
