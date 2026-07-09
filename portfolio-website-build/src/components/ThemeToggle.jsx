import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="glass flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-transform hover:scale-110 hover:text-primary"
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
