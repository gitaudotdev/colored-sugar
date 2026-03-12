import { clearStudioSession } from '~/server/utils/studioAuth'

export default defineEventHandler((event) => {
  clearStudioSession(event)

  return {
    ok: true
  }
})
