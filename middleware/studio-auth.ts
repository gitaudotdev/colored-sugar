export default defineNuxtRouteMiddleware(async (to) => {
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
  const { auth } = await $fetch<{ auth: { enabled: boolean; authenticated: boolean } }>('/api/admin/session', {
    headers
  })

  if (auth.enabled && !auth.authenticated) {
    return navigateTo(`/studio-login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
