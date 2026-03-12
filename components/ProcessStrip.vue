<template>
  <section class="section scene">
    <div class="container">
      <span class="eyebrow">The atelier flow</span>
      <div class="process-head">
        <h2 class="section-title">A custom process built around fit, fabric, and the final mood of the piece.</h2>
        <p class="section-copy">
          Every commission starts with a brief. The goal is not just to sew a garment, but to shape the right look for
          the event, the body, and the feeling the client wants to carry into the room.
        </p>
      </div>

      <div class="pillars">
        <article class="card process-card">
          <span class="tag">01</span>
          <h3>Share the brief</h3>
          <p>Start with the occasion, references, timing, and the overall direction you want the piece to take.</p>
        </article>
        <article class="card process-card">
          <span class="tag">02</span>
          <h3>Fit and refine</h3>
          <p>Measurements, fabric choices, and silhouette adjustments are handled through consultation and fittings.</p>
        </article>
        <article class="card process-card">
          <span class="tag">03</span>
          <h3>Deliver the look</h3>
          <p>The finished piece is shaped to feel confident, polished, and unmistakably personal when it is worn.</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-head {
  display: grid;
  grid-template-columns: 1fr 0.85fr;
  gap: 1rem;
  align-items: end;
  margin: 0.9rem 0 1.5rem;
}

.process-card {
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  min-height: 19rem;
}

.process-card::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), var(--gold));
}

.process-card h3 {
  margin: 1rem 0 0.75rem;
  font-family: var(--font-display);
  font-size: 1.7rem;
}

.process-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}

@media (max-width: 960px) {
  .process-head {
    grid-template-columns: 1fr;
  }
}
</style>
