<script setup lang="ts">
const { data: lookbook, pending } = await useLookbook()
</script>

<template>
  <main class="section">
    <div class="container">
      <span class="eyebrow">Lookbook</span>
      <div class="lookbook-head">
        <div>
          <h1 class="section-title">Print-led, occasion-ready, and custom-focused pieces from the studio.</h1>
        </div>
        <p class="section-copy">
          Explore the pieces that define Coloured Sugar right now: expressive prints, structured event dressing, softer
          drape, and silhouettes built to feel memorable in motion and in photographs.
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
