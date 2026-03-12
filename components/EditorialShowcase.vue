<script setup lang="ts">
import type { LookbookItem } from '~/types/shopify'

const props = defineProps<{
  items: LookbookItem[]
}>()

const featuredItem = computed(() => props.items[0] || null)
const supportingItems = computed(() => props.items.slice(1, 4))
</script>

<template>
  <div v-if="featuredItem" class="editorial-grid">
    <article class="editorial-feature">
      <div class="editorial-feature__image">
        <img :src="featuredItem.image" :alt="featuredItem.imageAlt" loading="lazy" />
      </div>
      <div class="editorial-feature__content">
        <span class="tag">{{ featuredItem.fabric }}</span>
        <h3>{{ featuredItem.title }}</h3>
        <p>{{ featuredItem.description }}</p>
        <div class="editorial-feature__meta">
          <strong>{{ featuredItem.price }}</strong>
          <span>Made or tailored on request</span>
        </div>
      </div>
    </article>

    <div class="editorial-stack">
      <article v-for="item in supportingItems" :key="item.id" class="editorial-card">
        <div class="editorial-card__image">
          <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
        </div>
        <div class="editorial-card__content">
          <span class="tag">{{ item.fabric }}</span>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </article>
    </div>
  </div>

  <div v-else class="empty-state">
    Signature pieces will appear here once products with imagery are available from Shopify.
  </div>
</template>

<style scoped>
.editorial-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1rem;
  align-items: stretch;
}

.editorial-feature,
.editorial-card {
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid var(--border);
  background:
    linear-gradient(180deg, rgba(255, 251, 245, 0.96), rgba(243, 248, 247, 0.88)),
    var(--surface);
  box-shadow: var(--shadow);
}

.editorial-feature {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  min-height: 34rem;
}

.editorial-feature__image,
.editorial-card__image {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(21, 24, 30, 0.18), rgba(255, 251, 245, 0.22));
}

.editorial-feature__image img,
.editorial-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.editorial-feature__content,
.editorial-card__content {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
}

.editorial-feature__content h3,
.editorial-card__content h4 {
  margin: 1rem 0 0.75rem;
  font-family: var(--font-display);
  line-height: 0.96;
}

.editorial-feature__content h3 {
  font-size: clamp(2.1rem, 4vw, 3rem);
}

.editorial-card__content h4 {
  font-size: 1.65rem;
}

.editorial-feature__content p,
.editorial-card__content p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.editorial-feature__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.85rem;
}

.editorial-feature__meta strong {
  color: var(--ink);
}

.editorial-stack {
  display: grid;
  gap: 1rem;
}

.editorial-card {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  min-height: 10.7rem;
}

@media (max-width: 960px) {
  .editorial-grid,
  .editorial-feature,
  .editorial-card {
    grid-template-columns: 1fr;
  }

  .editorial-feature {
    min-height: auto;
  }
}
</style>
