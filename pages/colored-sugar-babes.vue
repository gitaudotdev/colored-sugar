<script setup lang="ts">
import { communityEntries } from '~/data/community'

useSeoMeta({
  title: 'Coloured Sugar Babes | Coloured Sugar',
  description:
    'A community-style showcase of Coloured Sugar clients, their looks, and the stories behind each custom piece.'
})
</script>

<template>
  <main class="section">
    <div class="container babes-shell">
      <section class="panel babes-hero">
        <span class="eyebrow">Coloured Sugar Babes</span>
        <h1 class="section-title">A community wall for the women and men who take the pieces into real life.</h1>
        <p class="section-copy">
          This section is the bridge between studio work and social proof. In production, clients can submit their
          photos and styling notes for approval, and the best looks become part of the brand story.
        </p>
        <div class="button-row">
          <NuxtLink to="/book-fitting" class="button button--primary">Start your own look</NuxtLink>
          <NuxtLink to="/lookbook" class="button button--secondary">View studio work</NuxtLink>
        </div>
      </section>

      <section class="babes-grid">
        <article
          v-for="entry in communityEntries"
          :key="entry.id"
          class="panel babe-card"
          :style="{
            '--babe-primary': entry.palette.primary,
            '--babe-secondary': entry.palette.secondary,
            '--babe-accent': entry.palette.accent
          }"
        >
          <div class="babe-card__visual">
            <span>{{ entry.garment }}</span>
            <strong>{{ entry.name }}</strong>
            <small>{{ entry.occasion }}</small>
          </div>
          <div class="babe-card__body">
            <p>{{ entry.caption }}</p>
          </div>
        </article>
      </section>

      <section class="panel babes-note">
        <span class="tag">How to make this real</span>
        <h2>Next production step</h2>
        <p>
          Add an approval queue, image uploads through Vercel Blob or Cloudinary, and an Instagram/WhatsApp submission
          prompt so “Coloured Sugar Babes” becomes a true community content engine.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.babes-shell {
  display: grid;
  gap: 1rem;
}

.babes-hero,
.babes-note {
  padding: 1.5rem;
}

.babes-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.babe-card {
  overflow: hidden;
}

.babe-card__visual {
  min-height: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1.2rem;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.18), transparent 28%),
    linear-gradient(145deg, var(--babe-primary), var(--babe-secondary));
  color: #fffaf2;
}

.babe-card__visual span {
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
}

.babe-card__visual strong {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 0.92;
}

.babe-card__visual small {
  margin-top: 0.5rem;
}

.babe-card__body {
  padding: 1.2rem;
}

.babe-card__body p,
.babes-note p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}

.babes-note h2 {
  margin: 1rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: 2rem;
}

@media (max-width: 960px) {
  .babes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
