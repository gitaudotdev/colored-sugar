<script setup lang="ts">
import { communityEntries } from '~/data/community'
</script>

<template>
  <section class="section scene section--dark">
    <div class="container">
      <div class="community-head">
        <div>
          <span class="eyebrow eyebrow--light">Coloured Sugar Babes</span>
          <h2 class="section-title community-head__title">A future-facing UGC section for the clients, their looks, and the moments they created in them.</h2>
        </div>
        <p class="section-copy community-head__copy">
          For the demo, this works as a curated community wall. Later, it becomes an approval-based submission flow
          for client photos, WhatsApp shares, and styled event recaps.
        </p>
      </div>

      <div class="community-grid">
        <article
          v-for="entry in communityEntries.slice(0, 3)"
          :key="entry.id"
          class="community-card"
          :style="{
            '--community-primary': entry.palette.primary,
            '--community-secondary': entry.palette.secondary,
            '--community-accent': entry.palette.accent
          }"
        >
          <div class="community-card__visual">
            <span>{{ entry.garment }}</span>
            <strong>{{ entry.name }}</strong>
            <small>{{ entry.occasion }}</small>
          </div>
          <div class="community-card__body">
            <p>{{ entry.caption }}</p>
          </div>
        </article>
      </div>

      <div class="community-actions">
        <NuxtLink to="/colored-sugar-babes" class="button button--primary">Open the community wall</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eyebrow--light {
  color: rgba(255, 250, 242, 0.82);
}

.community-head {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 1.2rem;
  align-items: end;
  margin-bottom: 1.5rem;
}

.community-head__title {
  color: #fffaf2;
}

.community-head__copy {
  color: rgba(255, 250, 242, 0.78);
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.community-card {
  overflow: hidden;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
}

.community-card__visual {
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1.2rem;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.2), transparent 28%),
    linear-gradient(145deg, var(--community-primary), var(--community-secondary));
  color: #fffaf2;
}

.community-card__visual span {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
  opacity: 0.8;
}

.community-card__visual strong {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.92;
}

.community-card__visual small {
  margin-top: 0.5rem;
  color: rgba(255, 250, 242, 0.84);
}

.community-card__body {
  padding: 1.2rem;
}

.community-card__body p {
  margin: 0;
  color: rgba(255, 250, 242, 0.82);
  line-height: 1.75;
}

.community-actions {
  margin-top: 1.4rem;
}

@media (max-width: 960px) {
  .community-head,
  .community-grid {
    grid-template-columns: 1fr;
  }
}
</style>
