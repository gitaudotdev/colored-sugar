import { createHmac, timingSafeEqual } from 'node:crypto'
import { createError, deleteCookie, getCookie, setCookie } from 'h3'
import type { H3Event } from 'h3'

const STUDIO_SESSION_COOKIE = 'colored_sugar_studio_session'
const STUDIO_SESSION_MAX_AGE = 60 * 60 * 12

interface StudioSessionPayload {
  username: string
  expiresAt: number
}

function toBase64Url(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function fromBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8')
}

function signValue(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

function getStudioAuthConfig() {
  const config = useRuntimeConfig()
  const username = config.studioAdminUsername.trim()
  const password = config.studioAdminPassword.trim()
  const secret = config.studioSessionSecret.trim()

  return {
    username,
    password,
    secret,
    enabled: Boolean(username && password && secret)
  }
}

function createSessionToken(username: string, secret: string) {
  const payload: StudioSessionPayload = {
    username,
    expiresAt: Date.now() + STUDIO_SESSION_MAX_AGE * 1000
  }
  const encodedPayload = toBase64Url(JSON.stringify(payload))
  const signature = signValue(encodedPayload, secret)

  return `${encodedPayload}.${signature}`
}

function parseSessionToken(token: string, secret: string) {
  const [encodedPayload, signature] = token.split('.')

  if (!encodedPayload || !signature) {
    return null
  }

  const expectedSignature = signValue(encodedPayload, secret)

  if (!safeCompare(signature, expectedSignature)) {
    return null
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as StudioSessionPayload

    if (!payload.username || payload.expiresAt <= Date.now()) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

export function getStudioSession(event: H3Event) {
  const config = getStudioAuthConfig()

  if (!config.enabled) {
    return {
      enabled: false,
      authenticated: false,
      username: ''
    }
  }

  const token = getCookie(event, STUDIO_SESSION_COOKIE)

  if (!token) {
    return {
      enabled: true,
      authenticated: false,
      username: ''
    }
  }

  const payload = parseSessionToken(token, config.secret)

  if (!payload) {
    deleteCookie(event, STUDIO_SESSION_COOKIE, {
      path: '/'
    })

    return {
      enabled: true,
      authenticated: false,
      username: ''
    }
  }

  return {
    enabled: true,
    authenticated: true,
    username: payload.username
  }
}

export function requireStudioSession(event: H3Event) {
  const session = getStudioSession(event)

  if (!session.enabled) {
    return session
  }

  if (!session.authenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Studio login required.'
    })
  }

  return session
}

export function verifyStudioCredentials(username: string, password: string) {
  const config = getStudioAuthConfig()

  if (!config.enabled) {
    return {
      enabled: false,
      valid: false
    }
  }

  return {
    enabled: true,
    valid: safeCompare(username.trim(), config.username) && safeCompare(password.trim(), config.password)
  }
}

export function createStudioSession(event: H3Event, username: string) {
  const config = getStudioAuthConfig()

  if (!config.enabled) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Studio auth is not configured yet.'
    })
  }

  setCookie(event, STUDIO_SESSION_COOKIE, createSessionToken(username.trim(), config.secret), {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.dev ? false : true,
    maxAge: STUDIO_SESSION_MAX_AGE,
    path: '/'
  })
}

export function clearStudioSession(event: H3Event) {
  deleteCookie(event, STUDIO_SESSION_COOKIE, {
    path: '/'
  })
}

export function getStudioAuthStatus() {
  const config = getStudioAuthConfig()

  return {
    enabled: config.enabled,
    username: config.username
  }
}
