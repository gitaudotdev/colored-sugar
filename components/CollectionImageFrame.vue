<script setup lang="ts">
import type { CollectionPalette } from '~/types/collections'

const props = withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    caption: string
    shape?: 'portrait' | 'landscape' | 'square'
    palette: CollectionPalette
  }>(),
  {
    shape: 'portrait'
  }
)

const frameStyle = computed(() => ({
  '--frame-primary': props.palette.primary,
  '--frame-secondary': props.palette.secondary,
  '--frame-accent': props.palette.accent,
  '--frame-surface': props.palette.surface,
  '--frame-ink': props.palette.ink
}))
</script>

<template>
  <article :class="['collection-frame', `collection-frame--${shape}`]" :style="frameStyle">
    <div class="collection-frame__canvas">
      <div class="collection-frame__glow" />
      <div class="collection-frame__grid" />
      <div class="collection-frame__mark">CS</div>

      <div class="collection-frame__content">
        <span class="collection-frame__eyebrow">{{ eyebrow }}</span>
        <div class="collection-frame__title-block">
          <h3>{{ title }}</h3>
          <p>{{ caption }}</p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.collection-frame {
  min-width: 0;
}

.collection-frame__canvas {
  position: relative;
  overflow: hidden;
  height: 100%;
  min-height: inherit;
  padding: 1.15rem;
  border-radius: 30px;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.22), transparent 28%),
    linear-gradient(145deg, var(--frame-primary), var(--frame-secondary));
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 28px 60px rgba(18, 27, 32, 0.18);
  isolation: isolate;
}

.collection-frame--portrait {
  min-height: 31rem;
}

.collection-frame--landscape {
  min-height: 19rem;
}

.collection-frame--square {
  min-height: 22rem;
}

.collection-frame__glow,
.collection-frame__grid,
.collection-frame__mark {
  position: absolute;
}

.collection-frame__glow {
  inset: auto -10% -18% auto;
  width: 14rem;
  height: 14rem;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--frame-accent) 68%, white 32%), transparent 70%);
  opacity: 0.9;
  filter: blur(12px);
}

.collection-frame__grid {
  inset: 1rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.09) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent 88%);
}

.collection-frame__mark {
  right: 1rem;
  top: 0.6rem;
  color: rgba(255, 255, 255, 0.18);
  font-family: var(--font-display);
  font-size: clamp(5rem, 10vw, 8rem);
  line-height: 1;
}

.collection-frame__content {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
}

.collection-frame__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
  color: color-mix(in srgb, var(--frame-ink) 88%, white 12%);
}

.collection-frame__eyebrow::before {
  content: "";
  width: 2.2rem;
  height: 1px;
  background: currentColor;
}

.collection-frame__title-block {
  margin-top: auto;
  max-width: 18rem;
}

.collection-frame__title-block h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 0.92;
  color: var(--frame-ink);
}

.collection-frame__title-block p {
  margin: 0.9rem 0 0;
  color: color-mix(in srgb, var(--frame-ink) 82%, white 18%);
  line-height: 1.7;
}
</style>
