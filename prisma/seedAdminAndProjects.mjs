import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'amanuealweldemariam@gmail.com'
  const password = process.env.ADMIN_PASSWORD ?? 'amanueal@1996'
  
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email }
  })
  
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(password, 10)
    await prisma.adminUser.create({
      data: {
        email,
        passwordHash
      }
    })
    console.log(`Created admin user: ${email}`)
  } else {
    console.log(`Admin user already exists: ${email}`)
  }

  const sampleVideo1Url = 'https://res.cloudinary.com/demo/video/upload/v1689255624/docs/walking_talking.mp4'
  const sampleVideo2Url = 'https://res.cloudinary.com/demo/video/upload/v1689255624/docs/skater.mp4'

  const p1 = await prisma.project.upsert({
    where: { slug: 'sample-featured-video-1' },
    update: {},
    create: {
      title: 'Sample Featured Video 1',
      slug: 'sample-featured-video-1',
      description: 'A stunning cinematic sample video highlighting creative direction.',
      category: 'Cinematography',
      tags: ['Video', 'Sample'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000',
      videoUrl: sampleVideo1Url,
      featured: true,
      order: 1
    }
  })

  const p2 = await prisma.project.upsert({
    where: { slug: 'sample-featured-video-2' },
    update: {},
    create: {
      title: 'Sample Featured Video 2',
      slug: 'sample-featured-video-2',
      description: 'Another high-quality video project showing advanced editing techniques.',
      category: 'Video Editing',
      tags: ['Editing', 'Sample'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024453-354056bad546?auto=format&fit=crop&q=80&w=1000',
      videoUrl: sampleVideo2Url,
      featured: true,
      order: 2
    }
  })

  console.log('Sample projects seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
