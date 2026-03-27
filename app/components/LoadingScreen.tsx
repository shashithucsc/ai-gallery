'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LoadingScreenProps {
  isLoading: boolean
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: '#0a0f1c' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.12) 0%, transparent 70%)',
            }}
          />

          {/* Logo reveal */}
          <div className="relative flex flex-col items-center gap-4">
            {/* Glyph mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.2) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(99,102,241,0.15)',
                }}
              >
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #a5b4fc 0%, #e879f9 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  AL
                </span>
              </div>
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: '1px solid rgba(99,102,241,0.5)' }}
                animate={{ scale: [1, 1.4, 1.4], opacity: [0.8, 0, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-1"
            >
              <span
                className="text-xl font-semibold tracking-[0.18em] uppercase text-white/90"
                style={{ letterSpacing: '0.2em' }}
              >
                AI
              </span>
              <span className="text-xs tracking-[0.35em] uppercase text-white/35 font-light">
                Influencers
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-6 h-px w-40 overflow-hidden rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #6366f1, #a855f7, #6366f1)',
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ delay: 0.6, duration: 1.1, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
