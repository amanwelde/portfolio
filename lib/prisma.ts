import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClient = process.env.DATABASE_URL
  ? global.prisma ?? new PrismaClient()
  : undefined

if (process.env.NODE_ENV !== 'production' && process.env.DATABASE_URL) {
  global.prisma = prismaClient
}

export const prisma = prismaClient
