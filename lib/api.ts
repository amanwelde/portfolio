import { NextResponse } from 'next/server'
import { z, ZodError } from 'zod'
import { isAdminAuthenticated } from './auth'
import { prisma } from './prisma'

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function requirePrisma() {
  if (!prisma) {
    throw new Error('DATABASE_URL is not configured')
  }
  return prisma
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return jsonError('Unauthorized', 401)
  }
  return null
}

export async function parseJson<T extends z.ZodTypeAny>(request: Request, schema: T): Promise<z.infer<T>> {
  const body = await request.json().catch(() => null)
  if (!body) {
    throw new ZodError([])
  }
  return schema.parse(body)
}

export function handleRouteError(error: unknown) {
  if (error instanceof ZodError) {
    const flattened = error.flatten()
    const message =
      flattened.formErrors.join(', ') ||
      Object.values(flattened.fieldErrors).flat().filter(Boolean).join(', ') ||
      'Invalid request payload'
    return jsonError(message, 400)
  }

  if (error instanceof Error) {
    return jsonError(error.message, error.message.includes('not configured') ? 503 : 500)
  }

  return jsonError('Unexpected server error', 500)
}
