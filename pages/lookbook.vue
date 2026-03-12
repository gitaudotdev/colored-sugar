<script setup lang="ts">
const { data: lookbook, pending } = await useLookbook()
</script>

<template>
  <main class="section">
    <div class="container">
      <span class="eyebrow">Lookbook</span>
      <div class="lookbook-head">
        <div>
          <h1 class="section-title">Ankara, occasion, and bridal references ready for a polished storefront.</h1>
        </div>
        <p class="section-copy">
          This page already reads from a Shopify-friendly endpoint. As soon as the store domain and storefront token
          are added, it can show real products instead of mock inspiration looks.
        </p>
      </div>

      <p v-if="pending" class="empty-state">Loading the lookbook...</p>
      <LookbookGrid v-else :items="lookbook || []" />
    </div>
  </main>
</template>

<style scoped>
.lookbook-head {
  display: grid;
  grid-template-columns: 1fr 0.88fr;
  gap: 1rem;
  align-items: end;
  margin: 0.9rem 0 1.8rem;
}

@media (max-width: 960px) {
  .lookbook-head {
    grid-template-columns: 1fr;
  }
}
</style>
