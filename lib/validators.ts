import { z } from 'zod'

export const projectSchema = z
  .object({
    title: z.string().min(2),
    slug: z.string().min(2).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a URL-friendly slug'),
    description: z.string().min(10),
    category: z.string().min(2),
     tags: z.array(z.string()).optional(),
    thumbnail: z.string().url().optional(),
    thumbnailUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional().nullable(),
     duration: z.number().int().nonnegative().optional(),
    cloudinaryId: z.string().optional().nullable(),
    cloudinaryPublicId: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    order: z.number().int().optional(),
  })
  .refine((data) => data.thumbnailUrl || data.thumbnail, {
    message: 'Thumbnail URL is required',
    path: ['thumbnailUrl'],
  })

export const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(5),
  icon: z.string().min(1),
  order: z.number().int().optional(),
})

export const skillSchema = z.object({
  name: z.string().min(2),
  percentage: z.number().int().min(0).max(100),
  order: z.number().int().optional(),
})

export const testimonialSchema = z.object({
  clientName: z.string().min(2),
  clientPosition: z.string().min(2),
  message: z.string().min(10),
  avatar: z.string().url().optional().nullable(),
  featured: z.boolean().optional(),
})

export const messageSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
  status: z.enum(['Unread', 'Read', 'Replied']).optional(),
})

export const settingsSchema = z.object({
  brandName: z.string().min(2),
  tagline: z.string().min(2),
  heroTitle: z.string().min(2),
  heroSubtitle: z.string().min(2),
  heroImage: z.string().url().optional().nullable(),
  aboutImage: z.string().url().optional().nullable(),
  aboutText: z.string().min(10),
  ownerName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  whatsapp: z.string().optional().nullable(),
  github: z.string().url().optional().nullable(),
  linkedin: z.string().url().optional().nullable(),
  instagram: z.string().url().optional().nullable(),
  tiktok: z.string().url().optional().nullable(),
  youtube: z.string().url().optional().nullable(),
  footerText: z.string().min(2),
  primaryColor: z.string().min(4),
  secondaryColor: z.string().min(4),
  heroCtaText: z.string().optional().nullable(),
  heroCtaLink: z.string().optional().nullable(),
  heroSecondaryCtaText: z.string().optional().nullable(),
  heroSecondaryCtaLink: z.string().optional().nullable(),
  projectsCompleted: z.union([z.string(), z.number()]).optional().nullable()
    .transform(val => val === '' ? null : Number(val))
    .refine(val => val === null || !isNaN(val), { message: "Must be a valid number" }),
})

export const mediaSchema = z.object({
  type: z.enum(['image', 'video']),
  url: z.string().url(),
  publicId: z.string(),
  thumbnailUrl: z.string().url().optional().nullable(),
  previewUrl: z.string().url().optional().nullable(),
  format: z.string().optional().nullable(),
  size: z.number().int().nonnegative(),
})

export const idSchema = z.object({
  id: z.string().min(1),
})
