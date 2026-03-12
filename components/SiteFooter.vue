<template>
  <footer class="site-footer">
    <div class="container site-footer__grid">
      <div>
        <p class="site-footer__brand">Colored Sugar Tailoring</p>
        <p class="muted">
          A Nuxt starter for a consultation-led Shopify storefront tailored to luxury African fashion in Nairobi.
        </p>
      </div>

      <div class="site-footer__links">
        <NuxtLink to="/lookbook">Lookbook</NuxtLink>
        <NuxtLink to="/book-fitting">Book a fitting</NuxtLink>
        <NuxtLink to="/cart">Cart flow</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 2rem 0 3rem;
}

.site-footer__grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(36, 24, 19, 0.08);
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
}

@media (max-width: 720px) {
  .site-footer__grid,
  .site-footer__links {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
