import { prisma } from './prisma'

export async function getSiteSettings() {
  if (!prisma) return null
  return prisma.siteSettings.findFirst()
}

export async function getServices() {
  if (!prisma) return []
  return prisma.service.findMany({ orderBy: [{ order: 'asc' }, { title: 'asc' }] })
}

export async function getProjects() {
  if (!prisma) return []
  return prisma.project.findMany({ orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }] })
}

export async function getSkills() {
  if (!prisma) return []
  return prisma.skill.findMany({ orderBy: [{ order: 'asc' }, { percentage: 'desc' }] })
}

export async function getTestimonials() {
  if (!prisma) return []
  return prisma.testimonial.findMany({ orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }] })
}
