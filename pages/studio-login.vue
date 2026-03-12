<script setup lang="ts">
const route = useRoute()
const redirectTarget = computed(() => {
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/studio-tracker'
  return redirect.startsWith('/') ? redirect : '/studio-tracker'
})

const form = reactive({
  username: '',
  password: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')

const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
const { data: session } = await useAsyncData('studio-session', () =>
  $fetch<{ auth: { enabled: boolean; authenticated: boolean } }>('/api/admin/session', {
    headers
  })
)

if (session.value?.auth.enabled && session.value.auth.authenticated) {
  await navigateTo(redirectTarget.value)
}

async function login() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: form
    })

    await navigateTo(redirectTarget.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Studio login failed.'
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Studio Login | Coloured Sugar',
  description: 'Secure login for the Coloured Sugar production tracker.'
})
</script>

<template>
  <main class="section">
    <div class="container studio-login-shell">
      <section class="panel studio-login-copy">
        <span class="eyebrow">Studio access</span>
        <h1 class="section-title">Log in to manage fittings, production stages, and handoff updates.</h1>
        <p class="section-copy">
          This login protects the internal tracker while keeping the public fitting request open for new clients.
        </p>
        <div class="studio-login-notes">
          <div>
            <strong>What is protected</strong>
            <p>Inquiry timelines, production notes, and tracker stage changes stay behind studio access.</p>
          </div>
          <div>
            <strong>How it turns on</strong>
            <p>Set `STUDIO_ADMIN_USERNAME`, `STUDIO_ADMIN_PASSWORD`, and `STUDIO_SESSION_SECRET` in the environment.</p>
          </div>
        </div>
      </section>

      <section class="panel studio-login-card">
        <span class="tag">Internal only</span>
        <h2>Studio tracker login</h2>

        <p v-if="session?.auth.enabled === false" class="studio-login-hint">
          Auth is not configured yet, so the tracker is still open. Once those environment variables are set, this
          page becomes the studio gate.
        </p>

        <form class="studio-login-form" @submit.prevent="login">
          <label>
            Username
            <input v-model="form.username" type="text" autocomplete="username" />
          </label>

          <label>
            Password
            <input v-model="form.password" type="password" autocomplete="current-password" />
          </label>

          <p v-if="errorMessage" class="studio-login-error">{{ errorMessage }}</p>

          <button type="submit" class="button button--primary" :disabled="isSubmitting || session?.auth.enabled === false">
            {{ isSubmitting ? 'Signing in...' : 'Enter studio tracker' }}
          </button>

          <NuxtLink v-if="session?.auth.enabled === false" to="/studio-tracker" class="button button--ghost">
            Open demo tracker
          </NuxtLink>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.studio-login-shell {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 1rem;
}

.studio-login-copy,
.studio-login-card {
  padding: 1.5rem;
}

.studio-login-copy {
  background:
    radial-gradient(circle at top left, rgba(28, 169, 179, 0.1), transparent 24%),
    linear-gradient(180deg, rgba(255, 252, 246, 0.98), rgba(236, 248, 247, 0.92));
}

.studio-login-notes {
  display: grid;
  gap: 1rem;
  margin-top: 1.3rem;
}

.studio-login-notes strong {
  display: block;
  margin-bottom: 0.35rem;
  font-family: var(--font-display);
  font-size: 1.35rem;
}

.studio-login-notes p,
.studio-login-hint {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
}

.studio-login-card h2 {
  margin: 1rem 0 0.9rem;
  font-family: var(--font-display);
  font-size: 2rem;
}

.studio-login-form {
  display: grid;
  gap: 1rem;
}

.studio-login-form label {
  display: grid;
  gap: 0.45rem;
  color: var(--muted);
}

.studio-login-form input {
  width: 100%;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.82);
  color: var(--ink);
}

.studio-login-form input:focus {
  outline: none;
  border-color: rgba(28, 169, 179, 0.46);
  box-shadow: 0 0 0 4px rgba(28, 169, 179, 0.12);
}

.studio-login-error {
  margin: 0;
  color: #ab3d3d;
}

@media (max-width: 960px) {
  .studio-login-shell {
    grid-template-columns: 1fr;
  }
}
</style>
