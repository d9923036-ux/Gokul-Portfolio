import { motion } from 'framer-motion'
import { ArrowDown, FolderOpen, Mail, Download, MapPin, Code } from 'lucide-react'

export default function Hero() {
  function goTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative flex items-center overflow-hidden pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div className="hero-gradient absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-4xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-balance text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl lg:text-[5rem] lg:leading-[1.05]">
              Turning Ideas into <br className="hidden sm:block" />
              <span className="text-gradient">Modern Web</span> <br className="hidden sm:block" />
              Experiences.
            </h1>
          </motion.div>
        </div>
      </div>

      <motion.button
        type="button"
        onClick={() => goTo('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-primary"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll down to About section"
      >
        <ArrowDown size={22} />
      </motion.button>
    </section>
  )
}
