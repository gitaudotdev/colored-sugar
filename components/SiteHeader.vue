<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink to="/" class="site-header__brand">
        <span class="site-header__crest">CS</span>
        <span>
          <strong>Coloured Sugar</strong>
          <small>By Nicole Muchai</small>
        </span>
      </NuxtLink>

      <nav class="site-header__nav" aria-label="Primary">
        <NuxtLink to="/collections">Collections</NuxtLink>
        <NuxtLink to="/colored-sugar-babes">Babes</NuxtLink>
        <NuxtLink to="/build-a-look">Build a look</NuxtLink>
        <NuxtLink to="/book-fitting">Book a fitting</NuxtLink>
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
  background: rgba(250, 247, 241, 0.78);
  border-bottom: 1px solid rgba(22, 54, 60, 0.08);
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
  font-size: 1.38rem;
  letter-spacing: 0.05em;
}

.site-header__brand small {
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.66rem;
}

.site-header__crest {
  width: 3.15rem;
  height: 3.15rem;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: linear-gradient(135deg, var(--accent) 0 52%, var(--gold) 52% 100%);
  color: #fffdf8;
  font-family: var(--font-display);
  font-size: 1.1rem;
  box-shadow: 0 18px 32px rgba(17, 74, 82, 0.16);
}

.site-header__nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1.4rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.74rem;
}

.site-header__nav a {
  position: relative;
  padding-bottom: 0.25rem;
}

.site-header__nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), var(--gold));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease;
}

.site-header__nav .router-link-active {
  color: var(--ink);
}

.site-header__nav a:hover::after,
.site-header__nav .router-link-active::after {
  transform: scaleX(1);
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
    justify-content: center;
  }
}
</style>
