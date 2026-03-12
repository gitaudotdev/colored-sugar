import { getStudioSession } from '~/server/utils/studioAuth'

export default defineEventHandler((event) => {
  const session = getStudioSession(event)

  return {
    auth: session
  }
})
