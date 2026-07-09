import { ArrowUp } from 'lucide-react'

export default function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-slate-200/60 dark:border-white/10 overflow-hidden">
      {/* Background glow to make the glass effect visible */}
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-primary/10 to-transparent dark:from-primary/10" aria-hidden="true" />
      
      {/* Glass overlay covering the entire footer */}
      <div className="relative w-full bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-6 px-4 py-6 sm:px-6 text-center sm:text-left">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Gokul. Built with React &amp; Tailwind.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition-all duration-300 hover:-translate-y-1 hover:text-primary hover:shadow-md"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
