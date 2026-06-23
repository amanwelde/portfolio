import type { Metadata } from 'next'
import { Navbar } from '../src/components/Navbar'
import { Hero, SupportBar } from '../src/components/Hero'
import { About } from '../src/components/About'
import { Services } from '../src/components/Services'
import { Projects } from '../src/components/Projects'
import { Skills } from '../src/components/Skills'
import { Testimonials } from '../src/components/Testimonials'
import { Contact } from '../src/components/Contact'
import { Footer } from '../src/components/Footer'
import { getProjects, getServices, getSkills, getSiteSettings, getTestimonials } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Aman Creative',
  description: 'Digital marketer and creative video storyteller',
}

export default async function HomePage() {
  const siteSettings = await getSiteSettings()
  const services = await getServices()
  const projects = await getProjects()
  const skills = await getSkills()
  const testimonials = await getTestimonials()

  const projectCards = projects.map((project) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    image: project.thumbnailUrl,
  }))

  return (
    <>
      <Navbar />
      <main>
        <Hero
          heroTitle={siteSettings?.heroTitle ?? 'Digital Marketer & Creative Video Storyteller'}
          heroSubtitle={
            siteSettings?.heroSubtitle ??
            'I create engaging videos for TikTok, Instagram, and other platforms, helping brands grow through creative storytelling, content strategy, and performance analysis. I also produce cinematic wedding films that transform memories into timeless stories.'
          }
          heroImage={siteSettings?.heroImage ?? undefined}
        />
        <SupportBar />
        <About aboutText={siteSettings?.aboutText ?? 'I am a passionate digital marketer and video editor dedicated to creating high-quality content that captures attention and drives results. From social media campaigns to cinematic wedding films, I combine creativity with data-driven strategies to deliver memorable experiences.'} />
        <Services services={services} />
        <Projects projects={projectCards} />
        <Skills skills={skills} />
        <Testimonials testimonials={testimonials} />
        <Contact email={siteSettings?.email ?? 'hello@mographstudio.com'} />
      </main>
      <Footer footerText={siteSettings?.footerText ?? 'Creating Stories That Inspire and Content That Performs'} email={siteSettings?.email ?? 'hello@amancreative.com'} phone={siteSettings?.phone ?? ''} />
    </>
  )
}
