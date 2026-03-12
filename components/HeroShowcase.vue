<template>
  <section class="hero section">
    <div class="container hero__grid">
      <div class="hero__copy">
        <span class="eyebrow">Bespoke tailoring in Nairobi</span>
        <h1 class="display">Custom pieces built through conversation, fittings, and African craft.</h1>
        <p class="lede">
          This starter is designed for a consultation-led atelier: rich storytelling up front, selected looks in the
          middle, and Shopify-powered checkout only where it actually helps.
        </p>
        <div class="button-row">
          <NuxtLink to="/book-fitting" class="button button--primary">Schedule a fitting</NuxtLink>
          <NuxtLink to="/lookbook" class="button button--secondary">Browse the lookbook</NuxtLink>
        </div>
      </div>

      <div class="hero__visual panel">
        <div class="hero__fabric hero__fabric--one" />
        <div class="hero__fabric hero__fabric--two" />
        <div class="hero__card">
          <span class="tag">Consultation first</span>
          <h2>Designed after a conversation, not a size dropdown.</h2>
          <p>
            Use the site to qualify clients, present signature Ankara work, capture deposits, and move ready-to-buy
            products into Shopify checkout.
          </p>
        </div>
        <div class="hero__stats">
          <div>
            <strong>1:1</strong>
            <span>style consult</span>
          </div>
          <div>
            <strong>2-3</strong>
            <span>fittings per couture order</span>
          </div>
          <div>
            <strong>Made</strong>
            <span>for Nairobi occasions</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 4rem;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.5rem;
  align-items: stretch;
}

.hero__copy {
  padding: 2rem 0;
}

.hero__copy .lede {
  max-width: 38rem;
  margin: 1.4rem 0 2rem;
}

.hero__visual {
  position: relative;
  overflow: hidden;
  min-height: 38rem;
  padding: 2rem;
  background:
    linear-gradient(155deg, rgba(36, 24, 19, 0.98), rgba(95, 57, 31, 0.94)),
    #241813;
  color: #fff5eb;
}

.hero__fabric {
  position: absolute;
  border-radius: 50%;
  filter: blur(1px);
}

.hero__fabric--one {
  inset: 2rem auto auto 2rem;
  width: 18rem;
  height: 18rem;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 231, 195, 0.45), transparent 38%),
    repeating-linear-gradient(
      130deg,
      rgba(191, 109, 44, 0.9),
      rgba(191, 109, 44, 0.9) 12px,
      rgba(241, 190, 126, 0.94) 12px,
      rgba(241, 190, 126, 0.94) 24px
    );
}

.hero__fabric--two {
  right: -3rem;
  bottom: -2rem;
  width: 20rem;
  height: 20rem;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 245, 235, 0.3), transparent 30%),
    repeating-linear-gradient(
      45deg,
      rgba(122, 68, 35, 0.92),
      rgba(122, 68, 35, 0.92) 14px,
      rgba(223, 169, 104, 0.92) 14px,
      rgba(223, 169, 104, 0.92) 28px
    );
}

.hero__card {
  position: relative;
  margin-top: 13rem;
  padding: 1.6rem;
  max-width: 23rem;
  border-radius: var(--radius-md);
  background: rgba(255, 245, 235, 0.09);
  border: 1px solid rgba(255, 245, 235, 0.16);
}

.hero__card h2 {
  margin: 1rem 0 0.8rem;
  font-family: var(--font-display);
  font-size: 2.1rem;
  line-height: 0.96;
}

.hero__card p {
  margin: 0;
  color: rgba(255, 245, 235, 0.82);
  line-height: 1.7;
}

.hero__stats {
  position: absolute;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.hero__stats div {
  padding: 1rem;
  border-radius: var(--radius-sm);
  background: rgba(255, 245, 235, 0.1);
  border: 1px solid rgba(255, 245, 235, 0.14);
}

.hero__stats strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.8rem;
}

.hero__stats span {
  color: rgba(255, 245, 235, 0.72);
  font-size: 0.9rem;
}

@media (max-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    min-height: 34rem;
  }

  .hero__card {
    margin-top: 11rem;
  }

  .hero__stats {
    grid-template-columns: 1fr;
  }
}
</style>
