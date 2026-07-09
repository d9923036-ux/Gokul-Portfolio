import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import useScrollSpy from '../hooks/useScrollSpy.js'

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ dark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const ids = useMemo(() => links.map((l) => l.id), [])
  const activeId = useScrollSpy(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const close = () => {
      if (mq.matches) setOpen(false)
    }
    close()
    mq.addEventListener('change', close)
    return () => mq.removeEventListener('change', close)
  }, [])

  function goTo(id) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed left-1/2 top-2 z-50 w-[calc(100%-24px)] max-w-[1120px] -translate-x-1/2 rounded-[24px] transition-all duration-300 sm:top-3 sm:w-[calc(100%-32px)] ${
        scrolled || open
          ? 'border border-card-border bg-background/70 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-[18px] dark:border-primary/20 dark:bg-section/80 dark:shadow-[0_4px_15px_rgba(56,189,248,0.08)]'
          : 'border border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main navigation">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            goTo('home')
          }}
          className="group font-mono text-lg font-bold text-foreground"
          aria-label="Gokul — back to top"
        >
          <span className="text-primary transition-transform duration-300 inline-block group-hover:rotate-12">{'<'}</span>
          Gokul
          <span className="text-primary transition-transform duration-300 inline-block group-hover:-rotate-12">{'/>'}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault()
                goTo(link.id)
              }}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                activeId === link.id
                  ? 'text-primary'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {activeId === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/10"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle dark={dark} onToggle={onToggleTheme} />
          <button
            type="button"
            className="glass flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="menu-panel fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-card-border p-4 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      goTo(link.id)
                    }}
                    className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                      activeId === link.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted hover:bg-primary/5 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
