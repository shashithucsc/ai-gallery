'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import ImageCarousel from './components/ImageCarousel'
import VideoFeature from './components/VideoFeature'
import { Sparkles, Archive } from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LATEST_IMAGES = [
  { id: 1, src: '/images/ComfyUI_temp_gvcbp_00001_.png', alt: 'Latest capture 01' },
  { id: 2, src: '/images/ComfyUI_temp_icggi_00001_.png', alt: 'Latest capture 02' },
  { id: 3, src: '/images/ComfyUI_temp_mrrgs_00001_.png', alt: 'Latest capture 03' },
  { id: 4, src: '/images/ComfyUI_temp_oqira_00001_.png', alt: 'Latest capture 04' },
  { id: 5, src: '/images/ComfyUI_temp_osiza_00001_.png', alt: 'Latest capture 05' },
  { id: 6, src: '/images/ComfyUI_temp_ppgly_00001_.png', alt: 'Latest capture 06' },
  { id: 7, src: '/images/ComfyUI_temp_qfppg_00001_.png', alt: 'Latest capture 07' },
  { id: 8, src: '/images/ComfyUI_temp_xgmup_00001_.png', alt: 'Latest capture 08' },
]

const ARCHIVE_IMAGES = [
  { id: 1, src: '/images/all/ComfyUI_temp_eifvt_00001_.png', alt: 'Archive capture 01' },
  { id: 2, src: '/images/all/ComfyUI_temp_fsbou_00001_.png', alt: 'Archive capture 02' },
  { id: 3, src: '/images/all/ComfyUI_temp_fvnki_00001_.png', alt: 'Archive capture 03' },
  { id: 4, src: '/images/all/ComfyUI_temp_fxkuo_00001_.png', alt: 'Archive capture 04' },
  { id: 5, src: '/images/all/ComfyUI_temp_ghfuq_00001_.png', alt: 'Archive capture 05' },
  { id: 6, src: '/images/all/ComfyUI_temp_gzsmz_00001_.png', alt: 'Archive capture 06' },
  { id: 7, src: '/images/all/ComfyUI_temp_hgupa_00001_.png', alt: 'Archive capture 07' },
  { id: 8, src: '/images/all/ComfyUI_temp_hhexd_00001_.png', alt: 'Archive capture 08' },
  {
    id: 9,
    src: '/images/all/ComfyUI_temp_iebih_00001_%20%281%29.png',
    alt: 'Archive capture 09',
  },
  { id: 10, src: '/images/all/ComfyUI_temp_iebih_00001_.png', alt: 'Archive capture 10' },
  { id: 11, src: '/images/all/ComfyUI_temp_ikzxb_00001_.png', alt: 'Archive capture 11' },
  { id: 12, src: '/images/all/ComfyUI_temp_lhngs_00001_.png', alt: 'Archive capture 12' },
  { id: 13, src: '/images/all/ComfyUI_temp_nyprh_00001_.png', alt: 'Archive capture 13' },
  { id: 14, src: '/images/all/ComfyUI_temp_pqgsa_00001_.png', alt: 'Archive capture 14' },
  { id: 15, src: '/images/all/ComfyUI_temp_qielc_00001_.png', alt: 'Archive capture 15' },
  { id: 16, src: '/images/all/ComfyUI_temp_sctlo_00001_.png', alt: 'Archive capture 16' },
  { id: 17, src: '/images/all/ComfyUI_temp_targv_00001_.png', alt: 'Archive capture 17' },
  { id: 18, src: '/images/all/ComfyUI_temp_vzrnf_00001_.png', alt: 'Archive capture 18' },
  { id: 19, src: '/images/all/ComfyUI_temp_xpiau_00001_.png', alt: 'Archive capture 19' },
  { id: 20, src: '/images/all/ComfyUI_temp_xsklt_00001_.png', alt: 'Archive capture 20' },
  { id: 21, src: '/images/all/ComfyUI_temp_zzgcc_00001_.png', alt: 'Archive capture 21' },
]

const FEATURE_VIDEO = '/video_ComfyUI_00001_.mp4'

const TABS = [
  { id: 'latest', label: 'Latest Captures', icon: Sparkles },
  { id: 'archive', label: 'The Archive', icon: Archive },
] as const

type TabId = (typeof TABS)[number]['id']

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabId>('latest')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={loading} />

      <motion.main
        className="min-h-screen text-white"
        style={{ background: '#0a0f1c' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Ambient background blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
          <div
            className="absolute -top-40 -left-40 w-150 h-150 rounded-full blur-[120px]"
            style={{ background: 'rgba(99,102,241,0.07)' }}
          />
          <div
            className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full blur-[100px]"
            style={{ background: 'rgba(168,85,247,0.06)' }}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-5 pb-24">

          {/* ── Hero ──────────────────────────────────────────────── */}
          <motion.header
            className="pt-16 pb-12 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 24 : 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-medium mb-6"
              style={{
                background: 'rgba(99,102,241,0.12)',
                border: '1px solid rgba(99,102,241,0.25)',
                color: '#a5b4fc',
              }}
            >
              <span
                className="w-1 h-1 rounded-full inline-block"
                style={{ background: '#a5b4fc' }}
              />
              AI Influencer Agency
            </div>

            {/* Brand name */}
            <h1
              className="text-5xl sm:text-6xl font-bold tracking-tight mb-3"
              style={{
                color: '#f8fafc',
                lineHeight: 1.1,
              }}
            >
              AI
            </h1>
            <h2
              className="text-5xl sm:text-6xl font-bold tracking-tight mb-6"
              style={{
                color: '#a5b4fc',
                lineHeight: 1.1,
              }}
            >
              Influencers
            </h2>

            <p
              className="text-sm tracking-[0.15em] uppercase font-light"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Where artificial intelligence meets influence
            </p>
          </motion.header>

          {/* ── Tabs ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 16 : 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Tab bar */}
            <div
              className="flex items-center gap-1 p-1 rounded-2xl mb-8 w-fit mx-auto"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {TABS.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.4)' }}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="tab-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'rgba(99,102,241,0.28)',
                          border: '1px solid rgba(99,102,241,0.3)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                    <Icon
                      className="relative w-3.5 h-3.5"
                      style={{ color: isActive ? '#a5b4fc' : 'inherit' }}
                    />
                    <span className="relative hidden sm:inline">{tab.label}</span>
                    <span className="relative sm:hidden">
                      {tab.id === 'latest' ? 'Latest' : 'Archive'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'latest' && (
                <motion.div
                  key="latest"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-8"
                >
                  {/* Video feature */}
                  <section>
                    <SectionLabel>Featured Drop</SectionLabel>
                    <VideoFeature src={FEATURE_VIDEO} />
                  </section>

                  {/* Latest gallery */}
                  <section>
                    <SectionLabel>Latest Gallery</SectionLabel>
                    <ImageCarousel images={LATEST_IMAGES} />
                  </section>
                </motion.div>
              )}

              {activeTab === 'archive' && (
                <motion.div
                  key="archive"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SectionLabel>Full Roster</SectionLabel>
                  <ImageCarousel images={ARCHIVE_IMAGES} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Footer ────────────────────────────────────────────── */}
          <motion.footer
            className="mt-20 pt-6 flex flex-col items-center gap-2 text-center"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: loading ? 0 : 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span
              className="text-[10px] tracking-[0.25em] uppercase"
              style={{ color: 'rgba(255,255,255,0.2)' }}
            >
              AI Influencerss · Powered by AI
            </span>
          </motion.footer>
        </div>
      </motion.main>
    </>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] tracking-[0.3em] uppercase font-medium mb-3"
      style={{ color: 'rgba(255,255,255,0.3)' }}
    >
      {children}
    </p>
  )
}

