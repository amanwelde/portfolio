import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const sampleVideo1Url = '/media/sample-1.MOV'
  const sampleVideo2Url = '/media/sample-2.MOV'
  const sampleVideo3Url = '/media/sample-3.MOV'

  await prisma.project.upsert({
    where: { slug: 'sample-featured-video-1' },
    update: { videoUrl: sampleVideo1Url },
    create: {
      title: 'Midnight Pulse',
      slug: 'sample-featured-video-1',
      description: 'A stunning cinematic sample video highlighting creative direction.',
      category: 'COMMERCIAL',
      tags: ['Video', 'Sample'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=1000',
      videoUrl: sampleVideo1Url,
      featured: true,
      order: 1
    }
  })

  await prisma.project.upsert({
    where: { slug: 'sample-featured-video-2' },
    update: { videoUrl: sampleVideo2Url },
    create: {
      title: 'The Last Artisan',
      slug: 'sample-featured-video-2',
      description: 'Documentary style creative storytelling.',
      category: 'DOCUMENTARY',
      tags: ['Editing', 'Sample'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024453-354056bad546?auto=format&fit=crop&q=80&w=1000',
      videoUrl: sampleVideo2Url,
      featured: true,
      order: 2
    }
  })
  
  await prisma.project.upsert({
    where: { slug: 'sample-featured-video-3' },
    update: { videoUrl: sampleVideo3Url },
    create: {
      title: 'Sonic Waves 2024',
      slug: 'sample-featured-video-3',
      description: 'Music video production and editing.',
      category: 'MUSIC VIDEO',
      tags: ['Editing', 'Sample'],
      thumbnailUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
      videoUrl: sampleVideo3Url,
      featured: true,
      order: 3
    }
  })

  console.log('Sample videos updated successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
