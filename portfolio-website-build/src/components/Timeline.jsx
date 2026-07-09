import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline.js'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!lineRef.current || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-sm text-primary">04 — Journey</p>
        <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
          Experience &amp; education
        </h2>
      </motion.div>

      <div className="relative mt-14">
        {/* Track */}
        <div
          className="absolute left-1/2 top-0 h-full w-px bg-card-border -translate-x-1/2"
          aria-hidden="true"
        />
        {/* Animated line */}
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-primary to-primary-bright -translate-x-1/2"
          style={{ transform: 'scaleY(0)' }}
          aria-hidden="true"
        />

        <ol className="space-y-10">
          {timeline.map((item, i) => {
            const isLeft = i % 2 === 0
            const Icon = item.type === 'education' ? GraduationCap : Briefcase
            return (
              <li key={item.id} className="relative">
                {/* Dot */}
                <span
                  className="pulse-dot absolute left-1/2 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                  className={`w-[calc(50%-1.25rem)] md:w-[calc(50%-2.5rem)] ${
                    isLeft ? 'mr-auto' : 'ml-auto'
                  }`}
                >
                  <div className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-card-border-hover)] hover:shadow-[var(--color-card-shadow-hover)]">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-icon-bg)] border border-[var(--color-icon-border)] text-icon shadow-sm transition-colors">
                        <Icon size={16} />
                      </span>
                      <div>
                        <h3 className="font-semibold leading-tight">{item.title}</h3>
                        <p className="text-sm text-primary">{item.org}</p>
                      </div>
                    </div>
                    <p className="mt-3 font-mono text-xs text-muted">{item.period}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
