import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    let x = 0
    let y = 0
    let ringX = 0
    let ringY = 0
    let rafId

    function onMove(e) {
      x = e.clientX
      y = e.clientY
      if (dot) dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`
    }

    function animate() {
      ringX += (x - ringX) * 0.16
      ringY += (y - ringY) * 0.16
      if (ring) ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-primary" />
      <div ref={ringRef} className="absolute h-8 w-8 rounded-full border border-primary/50" />
    </div>
  )
}
