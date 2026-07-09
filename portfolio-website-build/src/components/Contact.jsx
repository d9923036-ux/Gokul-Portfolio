import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'ggokul93811@gmail.com', href: 'mailto:ggokul93811@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 73587 50928', href: 'tel:+917358750928' },
  { icon: MapPin, label: 'Location', value: 'Chennai, India', href: null },
]

const socials = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com' },
  { icon: FaLinkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' },
]

function FloatingField({ id, label, type = 'text', textarea = false }) {
  const [value, setValue] = useState('')
  const Comp = textarea ? 'textarea' : 'input'

  return (
    <div className="relative">
      <Comp
        id={id}
        name={id}
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className="peer glass w-full resize-none rounded-xl px-4 pb-3 pt-6 text-sm text-foreground outline-none transition-colors placeholder:text-transparent focus:border-primary"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2 text-xs text-primary transition-all peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary"
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [status, setStatus] = useState('idle') // idle | loading | success

  function handleSubmit(e) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('loading')
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const subject = formData.get('subject')
    const message = formData.get('message')
    
    const mailtoLink = `mailto:ggokul93811@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`)}`
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus('success')
      e.target.reset()
      setTimeout(() => setStatus('idle'), 2500)
    }, 800)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="hero-gradient absolute inset-0 rotate-180" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm text-primary">05 — Contact</p>
          <h2 className="mt-2 text-balance text-3xl font-bold sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted">
            Have a project in mind or just want to say hi? My inbox is always
            open — I&apos;ll get back to you as soon as I can.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col lg:col-span-2"
          >
            <div className="glass flex h-full flex-col justify-between rounded-3xl p-6 sm:p-8">
              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="group flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-icon-bg)] border border-[var(--color-icon-border)] text-icon transition-all shadow-sm group-hover:bg-primary/10 group-hover:text-icon-hover">
                      <item.icon size={20} />
                    </span>
                    <div>
                      <p className="text-xs text-muted">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-foreground transition-colors hover:text-primary">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 border-t border-card-border pt-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted">
                  Connect with me
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="glass flex h-11 w-11 items-center justify-center rounded-full text-muted transition-all hover:scale-110 hover:text-icon-hover hover:border-[var(--color-card-border-hover)] hover:shadow-[var(--color-card-shadow-hover)]"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSubmit}
            className="glass space-y-5 rounded-3xl p-6 lg:col-span-3 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FloatingField id="name" label="Your Name" />
              <FloatingField id="email" label="Your Email" type="email" />
            </div>
            <FloatingField id="subject" label="Subject" />
            <FloatingField id="message" label="Your Message" textarea />

            <button
              type="submit"
              disabled={status !== 'idle'}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all ${
                status === 'success'
                  ? 'bg-emerald-500 shadow-emerald-500/25'
                  : 'bg-gradient-to-r from-button to-primary shadow-shadow-cyan/20 hover:shadow-[0_0_20px_var(--color-shadow-cyan)] hover:scale-[1.01] disabled:opacity-80'
              }`}
            >
              {status === 'loading' && (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    <Check size={16} />
                  </motion.span>
                  Message Sent!
                </>
              )}
              {status === 'idle' && (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
