import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { FolderOpen, Mail, Download } from 'lucide-react'

const stats = [
  { label: 'Projects Completed', value: 12, suffix: '+' },
  { label: 'Technologies Learned', value: 10, suffix: '+' },
  { label: 'Internships Completed', value: 2, suffix: '' },
]

function Counter({ value, suffix, start }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    const duration = 1400
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, value])

  return (
    <span className="text-3xl font-bold text-primary sm:text-4xl">
      {count}
      {suffix}
    </span>
  )
}

export default function About({ isDesktop }) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-sm text-primary">01 — About</p>
        <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
          A little about me
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full max-w-[760px] mx-auto"
        >
          <div className="space-y-5">
            <p className="text-pretty text-base sm:text-lg leading-8 text-secondary">
              I&apos;m Gokul, a frontend developer and UI/UX enthusiast who loves
              building interfaces that feel effortless to use. My journey started
              with a curiosity for how websites work and grew into a passion for
              crafting responsive, accessible, and performant web applications
              with React and modern CSS.
            </p>
            <p className="text-pretty text-base sm:text-lg leading-8 text-secondary">
              When I&apos;m not coding, you&apos;ll find me exploring design systems in
              Figma, contributing to small open-source projects, or learning the
              next tool in the frontend ecosystem. I&apos;m currently looking for
              opportunities where I can grow, collaborate, and ship products
              people love.
            </p>
          </div>

          <div className="mt-8 w-full flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-button to-primary px-7 text-sm font-semibold text-white shadow-lg shadow-shadow-cyan/20 transition-all hover:scale-105 hover:shadow-[0_0_20px_var(--color-shadow-cyan)]"
            >
              <FolderOpen size={18} className="shrink-0" />
              <span className="leading-none">View Projects</span>
            </button>
            
            <a
              href="/Gokul_ATS_Resume.pdf"
              download="Gokul_ATS_Resume.pdf"
              className="glass inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-semibold text-foreground transition-all hover:scale-105 hover:border-primary/40 hover:text-primary-bright hover:shadow-[0_0_15px_var(--color-shadow-cyan)]"
            >
              <Download size={18} className="shrink-0" />
              <span className="leading-none">Resume</span>
            </a>
            
            <button
              type="button"
              onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="glass inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 text-sm font-semibold text-foreground transition-all hover:scale-105 hover:border-primary/40 hover:text-primary-bright hover:shadow-[0_0_15px_var(--color-shadow-cyan)]"
            >
              <Mail size={18} className="shrink-0" />
              <span className="leading-none">Contact Me</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-4 sm:p-6 h-full min-h-[120px] flex flex-col items-center justify-center text-center">
                <Counter value={stat.value} suffix={stat.suffix} start={inView} />
                <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
