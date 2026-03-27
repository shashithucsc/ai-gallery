'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRef, useState } from 'react'

interface VideoFeatureProps {
  src: string
  poster?: string
}

export default function VideoFeature({ src, poster }: VideoFeatureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function togglePlay() {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow:
          '0 0 0 1px rgba(99,102,241,0.1), 0 20px 60px rgba(99,102,241,0.2), 0 40px 80px rgba(0,0,0,0.5)',
      }}
      onClick={togglePlay}
    >
      {/* Glow underneath */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-12 blur-2xl pointer-events-none"
        style={{ background: 'rgba(99,102,241,0.4)' }}
      />

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        muted
        className="w-full aspect-video object-cover"
      />

      {/* Play overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md transition-transform duration-200 hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Label badge */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase font-medium"
        style={{
          background: 'rgba(99,102,241,0.25)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(99,102,241,0.35)',
          color: '#a5b4fc',
        }}
      >
        AI Generated
      </div>
    </motion.div>
  )
}
