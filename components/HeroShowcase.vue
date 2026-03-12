<script setup lang="ts">
const heroImage = '/images/hero-gold-dress.png'
const showHeroFallback = ref(false)
</script>

<template>
  <section class="hero section scene">
    <div class="container hero__grid">
      <div class="hero__copy">
        <span class="eyebrow">Coloured Sugar by Nicole Muchai</span>
        <p class="hero__kicker">Ankara. Occasionwear. Menswear. Bridal.</p>
        <h1 class="display">Made-to-measure fashion with bold print, sculpted tailoring, and a studio eye for presence.</h1>
        <p class="lede">
          Coloured Sugar creates statement pieces for women and men who want to arrive with confidence. Every garment
          starts with a conversation, a fitting, and a clear sense of the moment it is meant for.
        </p>
        <div class="button-row">
          <NuxtLink to="/book-fitting" class="button button--primary">Schedule a fitting</NuxtLink>
          <NuxtLink to="/lookbook" class="button button--secondary">View the lookbook</NuxtLink>
        </div>
        <div class="hero__meta">
          <span>Custom fittings</span>
          <span>Print-led statement pieces</span>
          <span>Womenswear and menswear</span>
        </div>
      </div>

      <div class="hero__visual panel">
        <figure class="hero__portrait">
          <img
            v-if="!showHeroFallback"
            :src="heroImage"
            alt="Coloured Sugar gold editorial dress"
            loading="eager"
            @error="showHeroFallback = true"
          />
          <div v-else class="hero__portrait-fallback">
            <span>Editorial hero</span>
            <strong>Gold evening statement</strong>
          </div>
          <figcaption>Eveningwear with texture, drama, and clean studio focus.</figcaption>
        </figure>

        <div class="hero__card">
          <span class="tag">At the studio</span>
          <h2>Designed for birthdays, weddings, editorials, dinners, and the moments people remember.</h2>
          <p>
            From metallic evening looks to bold print dresses and clean menswear lines, the work is expressive,
            flattering, and made to stand out without losing polish.
          </p>
        </div>
        <div class="hero__stats">
          <div>
            <strong>By appointment</strong>
            <span>consultation and fittings</span>
          </div>
          <div>
            <strong>Custom</strong>
            <span>pieces built around your brief</span>
          </div>
          <div>
            <strong>Studio range</strong>
            <span>occasionwear, prints, kimonos, menswear</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --hero-header-offset: 5rem;
  min-height: calc(100svh - var(--hero-header-offset));
  min-height: calc(100dvh - var(--hero-header-offset));
  padding-top: 1.25rem;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.15rem;
  align-items: start;
}

.hero__copy {
  padding: 0.5rem 0 0;
}

.hero__copy .display {
  font-size: clamp(2.5rem, 5vw, 4.8rem);
  line-height: 0.92;
}

.hero__copy .lede {
  max-width: 35rem;
  margin: 1rem 0 1.5rem;
}

.hero__kicker {
  margin: 0.7rem 0 0;
  color: var(--accent-strong);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 0.78rem;
}

.hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.1rem;
}

.hero__meta span {
  padding: 0.5rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(22, 54, 60, 0.12);
  background: rgba(255, 255, 255, 0.64);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

.hero__visual {
  position: relative;
  overflow: hidden;
  min-height: min(35rem, calc(100svh - 8rem));
  min-height: min(35rem, calc(100dvh - 8rem));
  padding: 1rem;
  background:
    linear-gradient(180deg, rgba(255, 251, 245, 0.98), rgba(236, 248, 247, 0.94)),
    #fffdf7;
  color: var(--ink);
}

.hero__portrait {
  position: relative;
  overflow: hidden;
  min-height: 22rem;
  margin: 0;
  border-radius: 30px;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.12), transparent 26%),
    linear-gradient(160deg, rgba(28, 26, 33, 0.98), rgba(6, 6, 8, 0.98));
  box-shadow: 0 28px 48px rgba(10, 10, 14, 0.22);
}

.hero__portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__portrait-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1.4rem;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.14), transparent 24%),
    linear-gradient(180deg, rgba(235, 188, 76, 0.96), rgba(92, 61, 8, 0.98));
  color: #fffaf2;
}

.hero__portrait-fallback span {
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.72rem;
}

.hero__portrait-fallback strong {
  max-width: 12rem;
  margin-top: 0.45rem;
  font-family: var(--font-display);
  font-size: 2.2rem;
  line-height: 0.94;
}

.hero__portrait figcaption {
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 999px;
  background: rgba(18, 16, 20, 0.54);
  backdrop-filter: blur(12px);
  color: rgba(255, 250, 242, 0.92);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.7rem;
}

.hero__card {
  position: relative;
  margin: -1.25rem 0 0 1.1rem;
  padding: 1.3rem;
  max-width: 25rem;
  border-radius: var(--radius-md);
  background: rgba(255, 252, 246, 0.92);
  border: 1px solid rgba(22, 54, 60, 0.12);
  box-shadow: 0 28px 50px rgba(17, 74, 82, 0.12);
}

.hero__card h2 {
  margin: 1rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 2.2vw, 2.1rem);
  line-height: 1.02;
  color: var(--ink-strong);
}

.hero__card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.hero__stats {
  margin-top: auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  padding-top: 0.8rem;
}

.hero__stats div {
  padding: 1rem;
  border-radius: var(--radius-sm);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(248, 247, 240, 0.94)),
    white;
  border: 1px solid rgba(22, 54, 60, 0.1);
}

.hero__stats strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.55rem;
  color: var(--accent-strong);
  line-height: 1;
}

.hero__stats span {
  display: block;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

@media (max-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    min-height: 32rem;
  }

  .hero__card {
    margin: 0;
  }

  .hero__stats {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 820px) {
  .hero {
    --hero-header-offset: 7.5rem;
    padding-top: 0.75rem;
  }
}
</style>
