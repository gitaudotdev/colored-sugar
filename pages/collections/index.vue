<script setup lang="ts">
import { collections } from '~/data/collections'

useSeoMeta({
  title: 'Collections | Coloured Sugar',
  description:
    'Explore Coloured Sugar collections across print-led fashion, occasionwear, draped pieces, and menswear by Nicole Muchai.'
})
</script>

<template>
  <main class="page">
    <section class="section scene collections-hero">
      <div class="container collections-hero__grid">
        <div class="collections-hero__copy">
          <span class="eyebrow">Collections</span>
          <h1 class="display">Four distinct style worlds, each shaped for a different kind of entrance.</h1>
          <p class="lede">
            These collections give clients a clearer way into the studio. Some arrive wanting print and colour. Others
            need clean occasionwear, softer drape, or a sharper menswear direction. Each page shows the mood before the
            fitting conversation begins.
          </p>
          <div class="button-row">
            <NuxtLink to="/book-fitting" class="button button--primary">Book a fitting</NuxtLink>
            <NuxtLink to="/lookbook" class="button button--secondary">View the lookbook</NuxtLink>
          </div>
        </div>

        <article class="panel collections-hero__panel">
          <span class="tag">Studio format</span>
          <h2>Choose a style direction first. Refine the silhouette, fabric, and timing next.</h2>
          <p>
            The collection pages are not rigid templates. They are starting points that help a client say, “this is the
            mood,” before the custom work begins.
          </p>
          <div class="collections-hero__stats">
            <div v-for="collection in collections" :key="collection.slug">
              <strong>{{ collection.name }}</strong>
              <span>{{ collection.kicker }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="section scene">
      <div class="container">
        <div class="collections-head">
          <span class="eyebrow">Studio edits</span>
          <div>
            <h2 class="section-title">Open a collection and step into the right visual language.</h2>
            <p class="section-copy">
              Each collection is designed like a mini editorial world, so clients can feel the tone of the work before
              deciding what to commission.
            </p>
          </div>
        </div>

        <div class="collections-grid">
          <NuxtLink
            v-for="collection in collections"
            :key="collection.slug"
            :to="`/collections/${collection.slug}`"
            class="collection-card"
          >
            <CollectionImageFrame
              :eyebrow="collection.frames[0].eyebrow"
              :title="collection.frames[0].title"
              :caption="collection.frames[0].caption"
              :shape="collection.frames[0].shape"
              :palette="collection.palette"
            />

            <div class="collection-card__body">
              <span class="tag">{{ collection.kicker }}</span>
              <h3>{{ collection.name }}</h3>
              <p>{{ collection.tagline }}</p>

              <div class="collection-card__highlights">
                <span v-for="highlight in collection.highlights" :key="highlight.label">
                  <strong>{{ highlight.label }}:</strong> {{ highlight.value }}
                </span>
              </div>

              <span class="collection-card__link">Open collection</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.collections-hero {
  padding-top: 4rem;
}

.collections-hero__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1.2rem;
  align-items: stretch;
}

.collections-hero__copy {
  padding: 2rem 0;
}

.collections-hero__copy .lede {
  max-width: 40rem;
  margin: 1.4rem 0 0;
}

.collections-hero__panel {
  padding: 1.5rem;
}

.collections-hero__panel h2 {
  margin: 1rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 0.96;
}

.collections-hero__panel p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.collections-hero__stats {
  display: grid;
  gap: 0.8rem;
  margin-top: 1.4rem;
}

.collections-hero__stats div {
  padding: 1rem;
  border-radius: 18px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.7);
}

.collections-hero__stats strong,
.collection-card__body h3 {
  display: block;
  font-family: var(--font-display);
}

.collections-hero__stats span {
  color: var(--muted);
  font-size: 0.92rem;
}

.collections-head {
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  gap: 1.2rem;
  align-items: end;
  margin-bottom: 1.5rem;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.collection-card {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 1rem;
  min-width: 0;
  padding: 1rem;
  border-radius: 32px;
  border: 1px solid var(--border);
  background:
    linear-gradient(180deg, rgba(255, 252, 246, 0.96), rgba(242, 247, 246, 0.88)),
    var(--surface);
  box-shadow: var(--shadow);
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.collection-card:hover {
  transform: translateY(-4px);
  border-color: rgba(22, 54, 60, 0.18);
  box-shadow: 0 30px 70px rgba(17, 74, 82, 0.14);
}

.collection-card__body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.collection-card__body h3 {
  margin: 1rem 0 0.8rem;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 0.94;
}

.collection-card__body p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.collection-card__highlights {
  display: grid;
  gap: 0.55rem;
  margin-top: 1.1rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.collection-card__highlights strong {
  color: var(--ink);
}

.collection-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.35rem;
  color: var(--accent-strong);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
}

.collection-card__link::after {
  content: "→";
  font-size: 1rem;
}

@media (max-width: 1080px) {
  .collections-grid,
  .collection-card,
  .collections-head,
  .collections-hero__grid {
    grid-template-columns: 1fr;
  }
}
</style>
