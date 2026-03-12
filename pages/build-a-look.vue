<script setup lang="ts">
import { wardrobeMoments, wardrobeOptions } from '~/data/wardrobeBuilder'

type WardrobeMomentId = (typeof wardrobeMoments)[number]['id']

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()

const defaultWardrobeName = 'My wedding weekend wardrobe'
const wardrobeName = ref(typeof route.query.weekend === 'string' ? route.query.weekend : defaultWardrobeName)

const selectedLooks = reactive(
  Object.fromEntries(
    wardrobeMoments.map((moment) => {
      const querySelection = typeof route.query[moment.id] === 'string' ? route.query[moment.id] : ''
      const defaultSelection = wardrobeOptions[moment.id][0]?.id || ''
      const optionExists = wardrobeOptions[moment.id].some((option) => option.id === querySelection)

      return [moment.id, optionExists ? querySelection : defaultSelection]
    })
  ) as Record<WardrobeMomentId, string>
)

const shareFeedback = ref('')

const wardrobeSelections = computed(() =>
  wardrobeMoments.map((moment) => ({
    ...moment,
    option: wardrobeOptions[moment.id].find((option) => option.id === selectedLooks[moment.id]) || wardrobeOptions[moment.id][0]
  }))
)

const wardrobeBrief = computed(() => {
  const lines = wardrobeSelections.value.map(
    (selection) =>
      `${selection.title}: ${selection.option.name} (${selection.option.silhouette}, ${selection.option.palette})`
  )

  return `${wardrobeName.value}\n${lines.join('\n')}\nMood: A coordinated Coloured Sugar wardrobe planned for one full weekend.`
})

const shareCaption = computed(() => {
  const lines = wardrobeSelections.value.map(
    (selection, index) => `${index + 1}. ${selection.title}: ${selection.option.name}`
  )

  return `${wardrobeName.value}\n${lines.join('\n')}\nBuilt with Coloured Sugar.`
})

const shareUrl = computed(() => {
  const url = new URL('/build-a-look', runtimeConfig.public.siteUrl)

  if (wardrobeName.value && wardrobeName.value !== defaultWardrobeName) {
    url.searchParams.set('weekend', wardrobeName.value)
  }

  for (const selection of wardrobeSelections.value) {
    url.searchParams.set(selection.id, selection.option.id)
  }

  return url.toString()
})

const fittingLink = computed(() => ({
  path: '/book-fitting',
  query: {
    garmentType: 'Occasion wear',
    brief: wardrobeBrief.value
  }
}))

if (import.meta.client) {
  watch(
    () => ({
      weekend: wardrobeName.value,
      selections: wardrobeSelections.value.map((selection) => selection.option.id).join(':')
    }),
    async () => {
      await router.replace({
        query: {
          weekend: wardrobeName.value !== defaultWardrobeName ? wardrobeName.value : undefined,
          'welcome-dinner': selectedLooks['welcome-dinner'],
          ceremony: selectedLooks.ceremony,
          'after-party': selectedLooks['after-party'],
          'farewell-brunch': selectedLooks['farewell-brunch']
        }
      })
    }
  )
}

async function copyText(value: string, message: string) {
  if (!import.meta.client || !navigator.clipboard) {
    shareFeedback.value = 'Copy is only available in a secure browser context.'
    return
  }

  await navigator.clipboard.writeText(value)
  shareFeedback.value = message
}

async function copyCaption() {
  await copyText(shareCaption.value, 'Instagram-style caption copied.')
}

async function shareWardrobe() {
  if (import.meta.client && navigator.share) {
    await navigator.share({
      title: wardrobeName.value,
      text: shareCaption.value,
      url: shareUrl.value
    })
    shareFeedback.value = 'Wardrobe plan shared.'
    return
  }

  await copyText(shareUrl.value, 'Wardrobe link copied.')
}

useSeoMeta({
  title: 'Build a Look | Coloured Sugar',
  description:
    'Plan a wedding weekend wardrobe with Coloured Sugar, choose signature pieces for each event, and turn the whole brief into a fitting request.'
})
</script>

<template>
  <main class="section">
    <div class="container builder-shell">
      <section class="panel builder-hero">
        <span class="eyebrow">Wardrobe builder</span>
        <div class="builder-hero__grid">
          <div>
            <h1 class="section-title">Build a wedding weekend wardrobe that feels styled before the first fitting even happens.</h1>
            <p class="section-copy">
              This is the conversion-friendly version of the future 3D system. Clients can build a multi-look wardrobe
              brief, share it, then take it straight into a Coloured Sugar consultation.
            </p>
          </div>
          <div class="builder-hero__panel">
            <span class="tag">Shareable concept</span>
            <p>
              Pick the key pieces for each moment, name the wardrobe, and use the result as a styled brief for the
              studio or for Instagram sharing.
            </p>
          </div>
        </div>
      </section>

      <section class="builder-grid">
        <div class="builder-moments">
          <article v-for="moment in wardrobeMoments" :key="moment.id" class="panel builder-moment">
            <div class="builder-moment__head">
              <div>
                <span class="tag">{{ moment.title }}</span>
                <h2>{{ moment.title }}</h2>
              </div>
              <p>{{ moment.description }}</p>
            </div>

            <div class="builder-options">
              <button
                v-for="option in wardrobeOptions[moment.id]"
                :key="option.id"
                type="button"
                class="builder-option"
                :class="{ 'builder-option--active': selectedLooks[moment.id] === option.id }"
                :style="{
                  '--builder-primary': option.colors[0],
                  '--builder-secondary': option.colors[1],
                  '--builder-accent': option.colors[2]
                }"
                @click="selectedLooks[moment.id] = option.id"
              >
                <div class="builder-option__visual">
                  <span>{{ option.garmentType }}</span>
                  <strong>{{ option.name }}</strong>
                </div>
                <div class="builder-option__copy">
                  <p>{{ option.silhouette }}</p>
                  <small>{{ option.note }}</small>
                </div>
              </button>
            </div>
          </article>
        </div>

        <aside class="panel builder-summary">
          <span class="eyebrow">Preview</span>
          <label class="builder-summary__label">
            Wardrobe title
            <input v-model="wardrobeName" type="text" placeholder="My wedding weekend wardrobe" />
          </label>

          <div class="builder-story">
            <span class="builder-story__eyebrow">Story-ready summary</span>
            <strong>{{ wardrobeName }}</strong>
            <ul>
              <li v-for="selection in wardrobeSelections" :key="selection.id">
                <span>{{ selection.title }}</span>
                <strong>{{ selection.option.name }}</strong>
              </li>
            </ul>
          </div>

          <div class="builder-brief">
            <h2>Studio brief</h2>
            <p>{{ wardrobeBrief }}</p>
          </div>

          <p v-if="shareFeedback" class="builder-feedback">{{ shareFeedback }}</p>

          <div class="button-row builder-summary__actions">
            <button type="button" class="button button--primary" @click="shareWardrobe">Share wardrobe</button>
            <button type="button" class="button button--secondary" @click="copyCaption">
              Copy caption
            </button>
            <NuxtLink :to="fittingLink" class="button button--ghost">Turn this into a fitting brief</NuxtLink>
          </div>
        </aside>
      </section>

      <section class="panel builder-roadmap">
        <span class="eyebrow">Next phase</span>
        <div class="builder-roadmap__grid">
          <div>
            <h2 class="section-title">How this grows into a 3D wardrobe system</h2>
            <p class="section-copy">
              The current planner sells the idea now. The 3D version swaps each selected piece for a real product
              model, lets clients rotate the look, and keeps the same shareable wardrobe brief.
            </p>
          </div>
          <div class="builder-roadmap__steps">
            <article>
              <strong>Phase 1</strong>
              <p>Keep this planner live as the lowest-friction conversion tool from Instagram traffic.</p>
            </article>
            <article>
              <strong>Phase 2</strong>
              <p>Upload garment-specific 3D files to Shopify and attach them to hero pieces or custom capsule options.</p>
            </article>
            <article>
              <strong>Phase 3</strong>
              <p>Let the client mix tops, skirts, overlays, or menswear pieces on one shared avatar or mannequin scene.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.builder-shell {
  display: grid;
  gap: 1rem;
}

.builder-hero,
.builder-summary,
.builder-roadmap,
.builder-moment {
  padding: 1.5rem;
}

.builder-hero {
  background:
    radial-gradient(circle at top right, rgba(228, 177, 63, 0.16), transparent 28%),
    radial-gradient(circle at bottom left, rgba(28, 169, 179, 0.12), transparent 24%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.98), rgba(239, 248, 246, 0.92));
}

.builder-hero__grid,
.builder-roadmap__grid,
.builder-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1rem;
}

.builder-hero__panel {
  align-self: end;
  padding: 1.2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(22, 54, 60, 0.08);
}

.builder-hero__panel p {
  margin: 0.85rem 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.builder-moments {
  display: grid;
  gap: 1rem;
}

.builder-moment__head {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1rem;
  align-items: start;
  margin-bottom: 1rem;
}

.builder-moment__head h2,
.builder-brief h2 {
  margin: 0.8rem 0 0;
  font-family: var(--font-display);
  font-size: 2rem;
}

.builder-moment__head p,
.builder-brief p,
.builder-roadmap__steps p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}

.builder-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.85rem;
}

.builder-option {
  padding: 0;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(22, 54, 60, 0.12);
  background: rgba(255, 255, 255, 0.84);
  text-align: left;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.builder-option:hover,
.builder-option--active {
  transform: translateY(-2px);
  border-color: rgba(28, 169, 179, 0.35);
  box-shadow: 0 22px 42px rgba(17, 74, 82, 0.12);
}

.builder-option__visual {
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 1rem;
  background:
    radial-gradient(circle at top left, rgba(255, 255, 255, 0.22), transparent 26%),
    linear-gradient(145deg, var(--builder-primary), var(--builder-secondary));
  color: #fffaf2;
}

.builder-option__visual span {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.68rem;
}

.builder-option__visual strong {
  margin-top: auto;
  font-family: var(--font-display);
  font-size: 2rem;
  line-height: 0.94;
}

.builder-option__copy {
  padding: 1rem;
}

.builder-option__copy p,
.builder-option__copy small {
  display: block;
}

.builder-option__copy p {
  margin: 0 0 0.45rem;
  color: var(--ink);
}

.builder-option__copy small {
  color: var(--muted);
  line-height: 1.6;
}

.builder-summary {
  position: sticky;
  top: 6rem;
  align-self: start;
  background:
    radial-gradient(circle at top left, rgba(228, 177, 63, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(19, 19, 23, 0.98), rgba(19, 55, 61, 0.98));
  color: #fffaf2;
}

.builder-summary__label {
  display: grid;
  gap: 0.45rem;
  margin-top: 1rem;
  color: rgba(255, 250, 242, 0.82);
}

.builder-summary__label input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.08);
  color: #fffaf2;
}

.builder-story {
  margin-top: 1rem;
  padding: 1.1rem;
  border-radius: 28px;
  background:
    radial-gradient(circle at top right, rgba(255, 255, 255, 0.1), transparent 22%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.builder-story__eyebrow {
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.7rem;
  color: rgba(255, 250, 242, 0.72);
}

.builder-story strong {
  display: block;
  margin-top: 0.8rem;
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4vw, 3rem);
  line-height: 0.92;
}

.builder-story ul {
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.8rem;
}

.builder-story li {
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.builder-story li span,
.builder-feedback {
  color: rgba(255, 250, 242, 0.76);
}

.builder-story li strong {
  margin-top: 0.25rem;
  font-size: 1.1rem;
  line-height: 1.2;
}

.builder-brief {
  margin-top: 1rem;
}

.builder-brief h2 {
  color: #fffaf2;
}

.builder-feedback {
  margin: 1rem 0 0;
}

.builder-summary__actions {
  margin-top: 1rem;
}

.builder-roadmap__steps {
  display: grid;
  gap: 0.9rem;
}

.builder-roadmap__steps article {
  padding: 1rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(22, 54, 60, 0.08);
}

.builder-roadmap__steps strong {
  display: block;
  margin-bottom: 0.4rem;
  font-family: var(--font-display);
  font-size: 1.45rem;
}

@media (max-width: 1100px) {
  .builder-grid,
  .builder-hero__grid,
  .builder-roadmap__grid,
  .builder-moment__head,
  .builder-options {
    grid-template-columns: 1fr;
  }

  .builder-summary {
    position: static;
  }
}
</style>
