import { createStudioSession, verifyStudioCredentials } from '~/server/utils/studioAuth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string; password?: string }>(event)
  const username = body.username?.trim() || ''
  const password = body.password?.trim() || ''
  const status = verifyStudioCredentials(username, password)

  if (!status.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Studio auth is not configured yet.'
    })
  }

  if (!status.valid) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Incorrect studio login.'
    })
  }

  createStudioSession(event, username)

  return {
    ok: true
  }
})
