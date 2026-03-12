<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="site-header__brand">
        <span class="site-header__crest">MN</span>
        <span>
          <strong>Colored Sugar</strong>
          <small>Nairobi bespoke tailoring</small>
        </span>
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Primary">
        <NuxtLink to="/lookbook">Lookbook</NuxtLink>
        <NuxtLink to="/book-fitting">Book a fitting</NuxtLink>
        <NuxtLink to="/cart">Cart flow</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(18px);
  background: rgba(248, 241, 229, 0.72);
  border-bottom: 1px solid rgba(36, 24, 19, 0.08);
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 5rem;
}

.site-header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
}

.site-header__brand strong,
.site-header__brand small {
  display: block;
}

.site-header__brand strong {
  font-family: var(--font-display);
  font-size: 1.25rem;
  letter-spacing: 0.04em;
}

.site-header__brand small {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.66rem;
}

.site-header__crest {
  width: 2.9rem;
  height: 2.9rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--ink);
  color: #fff5eb;
  font-family: var(--font-display);
  font-size: 1rem;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: var(--muted);
}

.site-header__nav .router-link-active {
  color: var(--ink);
}

@media (max-width: 820px) {
  .site-header__inner {
    flex-direction: column;
    justify-content: center;
    padding: 0.9rem 0;
  }

  .site-header__nav {
    font-size: 0.92rem;
    gap: 0.9rem;
  }
}
</style>
