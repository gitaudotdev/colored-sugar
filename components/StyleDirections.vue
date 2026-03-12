<script setup lang="ts">
const directions = [
  {
    name: 'Print Stories',
    to: '/collections/print-stories',
    tone: 'teal',
    note: 'Ankara, batik, kitenge',
    copy: 'The feed shows strong print-led dresses, kimono cuts, and custom shapes that feel vibrant without losing polish.'
  },
  {
    name: 'Occasionwear',
    to: '/collections/occasionwear',
    tone: 'gold',
    note: 'Blazers, mini dresses, structure',
    copy: 'There is a clear appetite for sharp waists, statement shoulders, and pieces that photograph like occasionwear.'
  },
  {
    name: 'Kimonos and Drape',
    to: '/collections/kimonos-and-drape',
    tone: 'lilac',
    note: 'Waterfalls, satin, fluid gowns',
    copy: 'Some of the strongest moments are softer and more fluid: sheer overlays, movement, and elevated evening silhouettes.'
  },
  {
    name: 'Menswear Edit',
    to: '/collections/menswear-edit',
    tone: 'charcoal',
    note: 'Graphic shirts and coordinated looks',
    copy: 'The brand already carries enough range to support a considered menswear edit instead of treating men’s pieces as an afterthought.'
  }
] as const
</script>

<template>
  <section class="section section--dark scene">
    <div class="container">
      <span class="eyebrow eyebrow--light">Studio edits</span>
      <div class="style-head">
        <h2 class="section-title style-head__title">A wardrobe world built from print, structure, softness, and range.</h2>
        <p class="section-copy style-head__copy">
          Coloured Sugar moves across standout prints, structured event dressing, softer draped pieces, and confident
          menswear. These edits give clients a clear feel for the studio’s range before they even book.
        </p>
      </div>

      <div class="style-grid">
        <NuxtLink
          v-for="direction in directions"
          :key="direction.name"
          :to="direction.to"
          :class="['style-card', `style-card--${direction.tone}`]"
        >
          <span class="tag style-card__tag">{{ direction.note }}</span>
          <h3>{{ direction.name }}</h3>
          <p>{{ direction.copy }}</p>
          <span class="style-card__link">Open collection</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.eyebrow--light {
  color: rgba(255, 250, 242, 0.8);
}

.style-head {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 1.2rem;
  align-items: end;
  margin: 0.9rem 0 1.7rem;
}

.style-head__title {
  color: #fffaf2;
}

.style-head__copy {
  color: rgba(255, 250, 242, 0.74);
}

.style-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.style-card {
  display: flex;
  flex-direction: column;
  min-height: 18rem;
  padding: 1.35rem;
  border-radius: 26px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.style-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.18);
}

.style-card h3 {
  margin: 1rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 0.94;
}

.style-card p {
  margin: 0;
  color: rgba(255, 250, 242, 0.78);
  line-height: 1.7;
}

.style-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: auto;
  padding-top: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: rgba(255, 250, 242, 0.9);
}

.style-card__link::after {
  content: "→";
  font-size: 1rem;
}

.style-card--teal {
  background:
    linear-gradient(180deg, rgba(20, 152, 164, 0.95), rgba(16, 82, 90, 0.96)),
    var(--accent);
}

.style-card--gold {
  background:
    linear-gradient(180deg, rgba(241, 177, 55, 0.96), rgba(165, 108, 9, 0.96)),
    var(--gold);
}

.style-card--lilac {
  background:
    linear-gradient(180deg, rgba(147, 112, 192, 0.95), rgba(78, 54, 104, 0.98)),
    var(--lilac);
}

.style-card--charcoal {
  background:
    linear-gradient(180deg, rgba(35, 32, 41, 0.98), rgba(17, 16, 20, 0.98)),
    var(--charcoal);
}

@media (max-width: 960px) {
  .style-head,
  .style-grid {
    grid-template-columns: 1fr;
  }
}
</style>
