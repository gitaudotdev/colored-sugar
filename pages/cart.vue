<template>
  <main class="section">
    <div class="container cards">
      <section class="panel cart-panel">
        <span class="eyebrow">Shopify integration plan</span>
        <h1 class="section-title">Use Nuxt for the branded cart experience, then hand off to Shopify checkout.</h1>
        <p class="section-copy">
          The production flow here is: create a cart through the Storefront API, store the line items in Nuxt state,
          then redirect shoppers to Shopify using the cart checkout URL.
        </p>
      </section>

      <section class="panel cart-panel">
        <span class="tag">Implementation notes</span>
        <ol class="cart-steps">
          <li>Create or update a cart with the Storefront API.</li>
          <li>Keep the cart ID in a cookie or local storage.</li>
          <li>Redirect to the returned Shopify checkout URL when the client is ready to pay.</li>
        </ol>
      </section>

      <section class="panel cart-panel">
        <span class="tag">Recommended usage</span>
        <p class="section-copy">
          Use this flow for consultation deposits, limited ready-made drops, or final invoice-like purchases. For
          highly customized garments, keep the CTA focused on booking and quoting first.
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped>
.cart-panel {
  padding: 1.5rem;
}

.cart-steps {
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  color: var(--muted);
  line-height: 1.8;
}
</style>
