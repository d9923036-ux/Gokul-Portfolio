import { AnimatePresence, motion } from 'framer-motion'

export default function Preloader({ loading }) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        >
          <motion.span
            className="font-mono text-2xl font-bold text-primary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {'<S />'}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
