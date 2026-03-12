<script setup lang="ts">
import { collections, getCollectionBySlug } from '~/data/collections'

const route = useRoute()

const collection = computed(() => getCollectionBySlug(String(route.params.slug || '')))

if (!collection.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection not found'
  })
}

const otherCollections = computed(() => collections.filter((entry) => entry.slug !== collection.value?.slug))

const collectionTheme = computed(() => ({
  '--collection-primary': collection.value?.palette.primary,
  '--collection-secondary': collection.value?.palette.secondary,
  '--collection-accent': collection.value?.palette.accent,
  '--collection-surface': collection.value?.palette.surface,
  '--collection-ink': collection.value?.palette.ink
}))

useSeoMeta({
  title: `${collection.value.name} | Coloured Sugar`,
  description: collection.value.description
})
</script>

<template>
  <main class="page collection-page" :style="collectionTheme">
    <section class="section scene collection-hero">
      <div class="container collection-hero__grid">
        <div class="collection-hero__copy">
          <NuxtLink to="/collections" class="collection-back">Back to collections</NuxtLink>
          <span class="eyebrow">{{ collection.kicker }}</span>
          <h1 class="display">{{ collection.name }}</h1>
          <p class="lede">{{ collection.tagline }}</p>
          <p class="section-copy">
            {{ collection.intro }}
          </p>
          <div class="button-row">
            <NuxtLink to="/book-fitting" class="button button--primary">Book this direction</NuxtLink>
            <NuxtLink to="/lookbook" class="button button--secondary">View the lookbook</NuxtLink>
          </div>
          <div class="collection-meta">
            <span v-for="highlight in collection.highlights" :key="highlight.label">
              <strong>{{ highlight.label }}</strong>
              <small>{{ highlight.value }}</small>
            </span>
          </div>
        </div>

        <div class="collection-hero__visuals">
          <CollectionImageFrame
            :eyebrow="collection.frames[0].eyebrow"
            :title="collection.frames[0].title"
            :caption="collection.frames[0].caption"
            :shape="collection.frames[0].shape"
            :palette="collection.palette"
          />

          <article class="panel collection-hero__note">
            <span class="tag">Studio note</span>
            <h2>{{ collection.description }}</h2>
            <div class="collection-moments">
              <span v-for="moment in collection.moments" :key="moment">{{ moment }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section scene">
      <div class="container collection-story">
        <div class="collection-story__copy">
          <span class="eyebrow">Editorial frames</span>
          <h2 class="section-title">The collection translated into studio compositions.</h2>
          <p class="section-copy">
            These frames show how the collection is meant to feel: the silhouette, the energy, and the type of styling
            it supports once the fitting starts.
          </p>
        </div>

        <div class="collection-story__grid">
          <CollectionImageFrame
            v-for="frame in collection.frames.slice(1)"
            :key="frame.title"
            :eyebrow="frame.eyebrow"
            :title="frame.title"
            :caption="frame.caption"
            :shape="frame.shape"
            :palette="collection.palette"
          />
        </div>
      </div>
    </section>

    <section class="section scene">
      <div class="container collection-looks">
        <article class="panel collection-looks__panel">
          <span class="eyebrow">Signature silhouettes</span>
          <h2 class="section-title">How this collection usually takes shape in the studio.</h2>

          <div class="collection-look-list">
            <article v-for="look in collection.looks" :key="look.name" class="collection-look-card">
              <h3>{{ look.name }}</h3>
              <p><strong>Silhouette:</strong> {{ look.silhouette }}</p>
              <p><strong>Detail:</strong> {{ look.detail }}</p>
              <p><strong>Why it works:</strong> {{ look.note }}</p>
            </article>
          </div>
        </article>

        <article class="collection-cta">
          <span class="eyebrow">Next step</span>
          <h2 class="section-title">Bring this mood into a fitting and tailor it to the client’s brief.</h2>
          <p class="section-copy">
            Once the client chooses a collection direction, the next step is refining fabric, proportions, occasion,
            and delivery timing with the studio.
          </p>
          <div class="button-row">
            <NuxtLink to="/book-fitting" class="button button--primary">Request a fitting</NuxtLink>
            <NuxtLink to="/collections" class="button button--ghost">Browse all collections</NuxtLink>
          </div>

          <div class="collection-cta__more">
            <span class="tag">Also explore</span>
            <div class="collection-cta__links">
              <NuxtLink
                v-for="entry in otherCollections"
                :key="entry.slug"
                :to="`/collections/${entry.slug}`"
              >
                {{ entry.name }}
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.collection-page {
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--collection-primary) 14%, white 86%), transparent 24%),
    radial-gradient(circle at bottom right, color-mix(in srgb, var(--collection-accent) 14%, white 86%), transparent 24%);
}

.collection-hero {
  padding-top: 4rem;
}

.collection-hero__grid,
.collection-story,
.collection-looks {
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  gap: 1.2rem;
  align-items: stretch;
}

.collection-back {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1rem;
  color: var(--collection-secondary);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.72rem;
}

.collection-back::before {
  content: "←";
}

.collection-hero__copy .lede {
  margin: 1rem 0 1.2rem;
  color: color-mix(in srgb, var(--collection-secondary) 70%, var(--ink) 30%);
}

.collection-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.collection-meta span,
.collection-hero__note,
.collection-look-card,
.collection-cta {
  border-radius: 26px;
}

.collection-meta span {
  padding: 1rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(249, 246, 239, 0.92)),
    white;
  border: 1px solid rgba(22, 54, 60, 0.1);
}

.collection-meta strong,
.collection-hero__note h2,
.collection-look-card h3 {
  display: block;
  font-family: var(--font-display);
}

.collection-meta small {
  display: block;
  margin-top: 0.35rem;
  color: var(--muted);
  font-size: 0.9rem;
}

.collection-hero__visuals {
  display: grid;
  gap: 1rem;
}

.collection-hero__note {
  padding: 1.4rem;
  background:
    linear-gradient(160deg, color-mix(in srgb, var(--collection-surface) 85%, white 15%), white),
    white;
  border: 1px solid rgba(22, 54, 60, 0.1);
  box-shadow: var(--shadow);
}

.collection-hero__note h2 {
  margin: 1rem 0 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.02;
  color: var(--ink-strong);
}

.collection-moments {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.2rem;
}

.collection-moments span {
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--collection-primary) 12%, white 88%);
  color: color-mix(in srgb, var(--collection-secondary) 68%, var(--ink) 32%);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
}

.collection-story__copy {
  max-width: 32rem;
}

.collection-story__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.collection-looks__panel {
  padding: 1.5rem;
}

.collection-look-list {
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
}

.collection-look-card {
  padding: 1.15rem;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(22, 54, 60, 0.08);
}

.collection-look-card h3 {
  margin: 0 0 0.65rem;
  font-size: 1.7rem;
  line-height: 0.96;
}

.collection-look-card p {
  margin: 0.35rem 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.collection-look-card strong {
  color: var(--ink);
}

.collection-cta {
  padding: 1.6rem;
  background:
    radial-gradient(circle at top left, color-mix(in srgb, var(--collection-accent) 20%, white 80%), transparent 28%),
    linear-gradient(145deg, color-mix(in srgb, var(--collection-secondary) 92%, black 8%), var(--collection-primary));
  color: var(--collection-ink);
  box-shadow: 0 28px 60px rgba(17, 74, 82, 0.18);
}

.collection-cta .section-title,
.collection-cta .section-copy {
  color: var(--collection-ink);
}

.collection-cta .section-copy {
  opacity: 0.84;
}

.collection-cta :deep(.button--ghost) {
  border-color: rgba(255, 250, 243, 0.28);
  color: var(--collection-ink);
}

.collection-cta__more {
  margin-top: 1.4rem;
}

.collection-cta__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.8rem;
}

.collection-cta__links a {
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

@media (max-width: 1080px) {
  .collection-hero__grid,
  .collection-story,
  .collection-looks,
  .collection-story__grid,
  .collection-meta {
    grid-template-columns: 1fr;
  }
}
</style>
