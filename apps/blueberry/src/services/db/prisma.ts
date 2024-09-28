import PrismaClient from '@buildberry/prismberry'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (Bun.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
