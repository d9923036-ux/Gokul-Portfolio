import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Timeline from './components/Timeline.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Preloader from './components/Preloader.jsx'
import Background from './components/Background.jsx'
import useLenis from './hooks/useLenis.js'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)

  useLenis()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)')
    const fine = window.matchMedia('(pointer: fine)')
    const update = () => {
      setIsDesktop(wide.matches)
      setHasFinePointer(fine.matches)
    }
    update()
    wide.addEventListener('change', update)
    fine.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      fine.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <>
      <Preloader loading={loading} />
      <Background />
      <Navbar dark={dark} onToggleTheme={() => setDark((d) => !d)} />
      <main>
        <Hero isDesktop={isDesktop} />
        <About isDesktop={isDesktop} />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
