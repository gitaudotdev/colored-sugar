<script setup lang="ts">
import { communityEntries } from '~/data/community'

const featuredEntries = computed(() => communityEntries.slice(0, 4))
</script>

<template>
  <section class="section scene section--dark">
    <div class="container community-shell">
      <div class="community-copy">
        <span class="eyebrow eyebrow--light">Coloured Sugar Babes</span>
        <h2 class="section-title community-copy__title">Seen on birthdays, wedding weekends, portrait sessions, and the kind of events people post twice.</h2>
        <p class="section-copy community-copy__body">
          Instagram may be where clients first discover the brand, but this is where the social proof becomes a sales
          engine: real looks, clear styling direction, and a stronger prompt to book the next custom piece.
        </p>

        <div class="community-proof">
          <article>
            <strong>Styled for real moments</strong>
            <p>Birthday dinners, guest dressing, bridal weekends, brunch looks, and menswear edits all sit under one house style.</p>
          </article>
          <article>
            <strong>Built to convert</strong>
            <p>Every social-proof card points back to a fitting request or a wardrobe brief instead of ending at passive inspiration.</p>
          </article>
          <article>
            <strong>Ready for UGC later</strong>
            <p>The page already has the right structure for approved client submissions, WhatsApp shares, and post-event recaps.</p>
          </article>
        </div>

        <div class="button-row community-actions">
          <NuxtLink to="/colored-sugar-babes" class="button button--primary">Meet the Babes</NuxtLink>
          <NuxtLink to="/build-a-look" class="button button--secondary">Build a weekend wardrobe</NuxtLink>
          <NuxtLink to="/book-fitting" class="button button--ghost">Book a fitting</NuxtLink>
        </div>
      </div>

      <div class="community-grid">
        <article
          v-for="entry in featuredEntries"
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
    </div>
  </section>
</template>

<style scoped>
.eyebrow--light {
  color: rgba(255, 250, 242, 0.82);
}

.community-shell {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1rem;
}

.community-copy {
  align-self: center;
}

.community-copy__title {
  color: #fffaf2;
}

.community-copy__body {
  color: rgba(255, 250, 242, 0.8);
}

.community-proof {
  display: grid;
  gap: 0.9rem;
  margin-top: 1.3rem;
}

.community-proof article {
  padding: 1rem 1.1rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.community-proof strong {
  display: block;
  margin-bottom: 0.3rem;
  font-family: var(--font-display);
  font-size: 1.45rem;
  color: #fffaf2;
}

.community-proof p {
  margin: 0;
  color: rgba(255, 250, 242, 0.78);
  line-height: 1.7;
}

.community-actions {
  margin-top: 1.25rem;
}

.community-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
  min-height: 14rem;
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
  font-size: clamp(2rem, 4vw, 2.6rem);
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
  line-height: 1.7;
}

@media (max-width: 960px) {
  .community-shell,
  .community-grid {
    grid-template-columns: 1fr;
  }
}
</style>
