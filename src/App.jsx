import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import Why from './components/Why'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useReveal } from './hooks/useReveal'
import { usePauseOffscreen } from './hooks/usePauseOffscreen'

export default function App() {
  useReveal()
  usePauseOffscreen()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background />
      <CursorGlow />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Process />
        <Work />
        <Why />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
