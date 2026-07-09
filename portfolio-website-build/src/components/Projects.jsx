import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { categories, projects } from '../data/projects.js'

export default function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-sm text-primary">03 — Projects</p>
        <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
          Things I&apos;ve built
        </h2>
      </motion.div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'glass text-muted hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              className="group glass flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-card-border-hover)] hover:shadow-[var(--color-card-shadow-hover)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={project.demo}
                    className="translate-y-3 rounded-full bg-gradient-to-r from-button to-primary px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:shadow-[0_0_15px_var(--color-shadow-cyan)]"
                  >
                    View Project
                  </a>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{project.title}</h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-md bg-card-border/60 px-2 py-0.5 font-mono text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-3 border-t border-card-border pt-4">
                  <a
                    href={project.demo}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-primary"
                    aria-label={`Live demo of ${project.title}`}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="flex items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-primary"
                    aria-label={`GitHub repository of ${project.title}`}
                  >
                    <FaGithub size={14} /> GitHub
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
