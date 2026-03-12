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
        <span class="lookbook-card__badge">{{ item.fabric }}</span>
      </div>
      <div class="lookbook-card__body">
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
  position: relative;
}

.lookbook-card__media {
  position: relative;
  aspect-ratio: 0.85;
  background: linear-gradient(180deg, rgba(22, 54, 60, 0.22), rgba(248, 241, 229, 0.98));
}

.lookbook-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lookbook-card__badge {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(23, 22, 28, 0.78);
  color: #fffaf2;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.7rem;
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
