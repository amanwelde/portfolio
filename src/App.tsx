import { Navbar } from './components/Navbar'
import { Hero, SupportBar } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SupportBar />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
