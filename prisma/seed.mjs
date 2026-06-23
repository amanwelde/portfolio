import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const placeholderImage =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop'

const services = [
  ['Social Media Marketing', 'Creative campaigns for awareness, engagement, and measurable growth.', 'campaign'],
  ['Content Strategy', 'Platform-aware planning, hooks, content calendars, and creative direction.', 'strategy'],
  ['TikTok Marketing', 'Short-form content shaped for TikTok trends, retention, and conversion.', 'music_video'],
  ['Instagram Marketing', 'Reels, stories, posts, and brand systems built for Instagram growth.', 'photo_camera'],
  ['Video Editing', 'Clean, cinematic edits for social, commercial, wedding, and event content.', 'video_settings'],
  ['Wedding Videography', 'Cinematic wedding films that preserve emotion, atmosphere, and memory.', 'movie'],
  ['Cinematic Storytelling', 'Narrative-led visuals with rhythm, pacing, sound, and emotion.', 'auto_awesome'],
  ['Reels and Short-Form Content Creation', 'Fast vertical edits for TikTok, Instagram, and campaign launches.', 'smart_display'],
  ['Analytics and Performance Tracking', 'Content reporting that turns audience behavior into better creative decisions.', 'insights'],
  ['Brand Promotion', 'Premium promotional content for brands, venues, products, and local campaigns.', 'local_fire_department'],
]

const skills = [
  ['Adobe Premiere Pro', 95],
  ['After Effects', 88],
  ['CapCut', 94],
  ['DaVinci Resolve', 86],
  ['Social Media Marketing', 92],
  ['Content Strategy', 90],
  ['Analytics and Insights', 84],
  ['Storytelling', 96],
]

const categories = [
  'Wedding Films',
  'Social Media Reels',
  'TikTok Videos',
  'Instagram Content',
  'Commercial Advertisements',
  'Brand Promotions',
  'Event Highlights',
]

const testimonials = [
  ['Company Friends Cafe', 'Client', 'Aman Creative helped our campaign feel polished, fast, and emotionally clear.', true],
  ['Wedding Film Client', 'Private Client', 'The wedding film felt cinematic without losing the feeling of the real day.', true],
  ['Mekelle Venue Partner', 'Entertainment Venue', 'Our event reels looked premium and performed well across Instagram and TikTok.', false],
]

async function main() {
  await prisma.siteSettings.deleteMany()
  await prisma.siteSettings.create({
    data: {
      brandName: 'Aman Creative',
      tagline: 'Creating Stories That Inspire and Content That Performs',
      heroTitle: 'Digital Marketer & Creative Video Storyteller',
      heroSubtitle:
        'I create engaging videos for TikTok, Instagram, and other platforms, helping brands grow through creative storytelling, content strategy, and performance analysis. I also produce cinematic wedding films that transform memories into timeless stories.',
      heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfqoG1fWu6o8U7iReqpeoilgQ9PNZ6uk9nc4ECTGr4rNgTZWeVimZU_4aAyeUnOfPAjdAZInc7rBQQURS16RVGKK0l0Ie2NeRTKDztPn0jsBrdIkVjtmXsEqO_NHjjY3ScicaMo-I-ZMIgOiDjVIRzxtaclPlgb-1o9s_hEBKqiKk4h79X_GGITDpVBODf-5kTjnc38UANVGBxaFJPwGK_tXydw5wECCwmx2aZLQVrBdNOUpbBpRHvhZWTOehuAM0CZoLa90C6IhTV',
      aboutText:
        'I am a passionate digital marketer and video editor dedicated to creating high-quality content that captures attention and drives results. From social media campaigns to cinematic wedding films, I combine creativity with data-driven strategies to deliver memorable experiences.',
      ownerName: 'Aman Weldemariam',
      email: 'amanuealweldemariam@gmail.com',
      phone: '0993103133',
      whatsapp: '0993103133',
      github: 'https://github.com/',
      linkedin: 'https://www.linkedin.com/in/amanueal-weldemariam-b1622a329?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      instagram: 'https://www.instagram.com/aman_welde',
      tiktok: 'https://www.tiktok.com/@amanuwelde',
      youtube: 'https://www.youtube.com/@amfame-369',
      footerText: 'Creating Stories That Inspire and Content That Performs',
      primaryColor: '#ffc38d',
      secondaryColor: '#f89f43',
    },
  })

  await prisma.mediaAsset.deleteMany()
  await prisma.mediaAsset.createMany({
    data: [
      {
        type: 'image',
        url: '/media/profileImage.JPG',
        publicId: 'profileImage.JPG',
        thumbnailUrl: '/media/profileImage.JPG',
        previewUrl: '/media/profileImage.JPG',
        format: 'JPG',
        size: 19613268,
      },
      {
        type: 'video',
        url: '/media/sample-1.MOV',
        publicId: 'sample-1.MOV',
        thumbnailUrl: '/media/sample-1.MOV',
        previewUrl: '/media/sample-1.MOV',
        format: 'MOV',
        size: 59498380,
      },
      {
        type: 'video',
        url: '/media/sample-2.MOV',
        publicId: 'sample-2.MOV',
        thumbnailUrl: '/media/sample-2.MOV',
        previewUrl: '/media/sample-2.MOV',
        format: 'MOV',
        size: 53981707,
      },
      {
        type: 'video',
        url: '/media/sample-3.MOV',
        publicId: 'sample-3.MOV',
        thumbnailUrl: '/media/sample-3.MOV',
        previewUrl: '/media/sample-3.MOV',
        format: 'MOV',
        size: 60389001,
      },
    ],
  })

  await prisma.service.deleteMany()
  await prisma.service.createMany({
    data: services.map(([title, description, icon], order) => ({ title, description, icon, order })),
  })

  await prisma.skill.deleteMany()
  await prisma.skill.createMany({
    data: skills.map(([name, percentage], order) => ({ name, percentage, order })),
  })

  await prisma.testimonial.deleteMany()
  await prisma.testimonial.createMany({
    data: testimonials.map(([clientName, clientPosition, message, featured]) => ({
      clientName,
      clientPosition,
      message,
      featured,
    })),
  })

  await prisma.project.deleteMany()
  
  const projects = [
    {
      title: 'Midnight Pulse',
      slug: 'midnight-pulse',
      description: 'Commercial project by Aman Creative, crafted for social performance and cinematic impact.',
      category: 'COMMERCIAL',
      tags: ['COMMERCIAL', 'Aman Creative'],
      thumbnailUrl: placeholderImage,
      videoUrl: '/media/sample-1.MOV',
      duration: null,
      cloudinaryPublicId: null,
      featured: true,
      order: 0,
    },
    {
      title: 'The Last Artisan',
      slug: 'the-last-artisan',
      description: 'Documentary project by Aman Creative, crafted for social performance and cinematic impact.',
      category: 'DOCUMENTARY',
      tags: ['DOCUMENTARY', 'Aman Creative'],
      thumbnailUrl: placeholderImage,
      videoUrl: '/media/sample-2.MOV',
      duration: null,
      cloudinaryPublicId: null,
      featured: true,
      order: 1,
    },
    {
      title: 'Sonic Waves 2024',
      slug: 'sonic-waves-2024',
      description: 'Music video project by Aman Creative, crafted for social performance and cinematic impact.',
      category: 'MUSIC VIDEO',
      tags: ['MUSIC VIDEO', 'Aman Creative'],
      thumbnailUrl: placeholderImage,
      videoUrl: '/media/sample-3.MOV',
      duration: null,
      cloudinaryPublicId: null,
      featured: true,
      order: 2,
    },
  ]
  
  await prisma.project.createMany({
    data: projects,
  })
}

main()
  .finally(async () => {
    await prisma.$disconnect()
  })
