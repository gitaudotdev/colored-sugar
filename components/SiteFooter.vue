<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <p class="site-footer__brand">Coloured Sugar</p>
        <p class="muted">
          Statement African fashion by Nicole Muchai, shaped through custom fittings, vibrant textiles, and silhouettes
          built to be remembered.
        </p>
      </div>

      <div class="site-footer__links">
        <NuxtLink to="/collections">Collections</NuxtLink>
        <NuxtLink to="/colored-sugar-babes">Coloured Sugar Babes</NuxtLink>
        <NuxtLink to="/build-a-look">Build a look</NuxtLink>
        <NuxtLink to="/book-fitting">Book a fitting</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2rem 0 3rem;
  background: linear-gradient(180deg, transparent, rgba(28, 169, 179, 0.06));
}

.site-footer__grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(22, 54, 60, 0.08);
}

.site-footer__brand {
  margin: 0 0 0.5rem;
  font-family: var(--font-display);
  font-size: 1.3rem;
}

.site-footer__links {
  display: flex;
  gap: 1rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
}

@media (max-width: 720px) {
  .site-footer__grid,
  .site-footer__links {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
