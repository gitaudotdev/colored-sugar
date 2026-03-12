<script setup lang="ts">
import type { LookbookItem } from '~/types/shopify'

defineProps<{
  items: LookbookItem[]
}>()
</script>

<template>
  <div v-if="items.length" class="lookbook-grid">
    <article v-for="item in items" :key="item.id" class="lookbook-card card">
      <div class="lookbook-card__media">
        <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
      </div>
      <div class="lookbook-card__body">
        <span class="tag">{{ item.fabric }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <div class="lookbook-card__meta">
          <strong>{{ item.price }}</strong>
          <span>{{ item.handle }}</span>
        </div>
      </div>
    </article>
  </div>

  <div v-else class="empty-state">
    Add Shopify credentials to load products here. Until then, the project can still be styled and reviewed locally.
  </div>
</template>

<style scoped>
.lookbook-card {
  overflow: hidden;
}

.lookbook-card__media {
  aspect-ratio: 0.85;
  background: linear-gradient(180deg, rgba(234, 215, 188, 0.6), rgba(248, 241, 229, 0.98));
}

.lookbook-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lookbook-card__body {
  padding: 1.2rem;
}

.lookbook-card__body h3 {
  margin: 0.9rem 0 0.65rem;
  font-family: var(--font-display);
  font-size: 1.8rem;
  line-height: 0.98;
}

.lookbook-card__body p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

.lookbook-card__meta {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: 1rem;
  padding-top: 0.9rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.84rem;
}

.lookbook-card__meta strong {
  color: var(--ink);
}
</style>
