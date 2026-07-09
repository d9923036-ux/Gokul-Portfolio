import { FaHtml5, FaCss3Alt, FaReact, FaFigma } from 'react-icons/fa6'
import { IoLogoJavascript } from 'react-icons/io5'
import { SiTailwindcss } from 'react-icons/si'

export const skills = [
  { name: 'HTML', level: 90, tip: 'Semantic, accessible markup', category: 'Frontend', icon: FaHtml5 },
  { name: 'CSS', level: 85, tip: 'Flexbox, Grid & animations', category: 'Styling', icon: FaCss3Alt },
  { name: 'JavaScript', level: 75, tip: 'ES6+, DOM & async patterns', category: 'Frontend', icon: IoLogoJavascript },
  { name: 'React', level: 75, tip: 'Hooks, context & performance', category: 'Frontend', icon: FaReact },
  { name: 'Tailwind CSS', level: 85, tip: 'Utility-first styling', category: 'Styling', icon: SiTailwindcss },
  { name: 'Figma', level: 70, tip: 'Wireframes to hi-fi mockups', category: 'Design', icon: FaFigma },
]
