import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/skills.js'

export default function Skills() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-sm text-primary">02 — Skills</p>
        <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
          Tools I work with
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Technologies and tools I use to build responsive, modern web interfaces.
        </p>
      </motion.div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill, i) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i }}
              className="glass group relative overflow-hidden rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-card-border-hover)] hover:shadow-[var(--color-card-shadow-hover)]"
            >
              <span
                className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100"
                role="tooltip"
              >
                {skill.tip}
              </span>
              
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-icon-bg)] border border-[var(--color-icon-border)] text-icon transition-all shadow-sm group-hover:bg-primary/10 group-hover:text-icon-hover">
                      <Icon size={20} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold leading-tight text-foreground">{skill.name}</h3>
                    <span className="text-xs font-medium text-muted">{skill.category}</span>
                  </div>
                </div>
                <span className="font-mono text-sm font-semibold text-primary">{skill.level}%</span>
              </div>
              
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-muted/20"
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency`}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-bright"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.3 + 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
