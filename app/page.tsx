'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import ImageCarousel from './components/ImageCarousel'
import VideoFeature from './components/VideoFeature'
import { Sparkles, Archive } from 'lucide-react'

// ─── Mock Data ────────────────────────────────────────────────────────────────

const LATEST_IMAGES = [
  { id: 1, src: '/images/1.png', alt: 'Latest capture 01' },
  { id: 2, src: '/images/2.png', alt: 'Latest capture 02' },
  { id: 3, src: '/images/3.png', alt: 'Latest capture 03' },
  { id: 4, src: '/images/4.png', alt: 'Latest capture 04' },
  { id: 5, src: '/images/5.png', alt: 'Latest capture 05' },
  { id: 6, src: '/images/6.png', alt: 'Latest capture 06' },
  { id: 7, src: '/images/7.png', alt: 'Latest capture 07' },
  { id: 8, src: '/images/8.png', alt: 'Latest capture 08' },
  { id: 9, src: '/images/9.png', alt: 'Latest capture 09' },
  { id: 10, src: '/images/10.png', alt: 'Latest capture 10' },
  { id: 11, src: '/images/11.png', alt: 'Latest capture 11' },
  { id: 12, src: '/images/12.png', alt: 'Latest capture 12' },
  { id: 13, src: '/images/13.png', alt: 'Latest capture 13' },
  { id: 14, src: '/images/14.png', alt: 'Latest capture 14' },
  { id: 15, src: '/images/15.png', alt: 'Latest capture 15' },
  { id: 16, src: '/images/16.png', alt: 'Latest capture 16' },
  { id: 17, src: '/images/17.png', alt: 'Latest capture 17' },
  { id: 18, src: '/images/18.png', alt: 'Latest capture 18' },
  { id: 19, src: '/images/19.png', alt: 'Latest capture 19' },
  { id: 20, src: '/images/20.png', alt: 'Latest capture 20' },
  { id: 21, src: '/images/21.png', alt: 'Latest capture 21' },
  { id: 22, src: '/images/22.png', alt: 'Latest capture 22' },
  { id: 23, src: '/images/23.png', alt: 'Latest capture 23' },
  { id: 24, src: '/images/24.png', alt: 'Latest capture 24' },
  { id: 25, src: '/images/25.png', alt: 'Latest capture 25' },
  { id: 26, src: '/images/26.png', alt: 'Latest capture 26' },
  { id: 27, src: '/images/27.png', alt: 'Latest capture 27' },
  { id: 28, src: '/images/28.png', alt: 'Latest capture 28' },
  { id: 29, src: '/images/29.png', alt: 'Latest capture 29' },
  { id: 30, src: '/images/30.png', alt: 'Latest capture 30' },
]

const ARCHIVE_IMAGES = [
  { id: 1, src: '/images/all/3.png', alt: 'Archive capture 001' },
  { id: 2, src: '/images/all/8.png', alt: 'Archive capture 002' },
  { id: 3, src: '/images/all/9.png', alt: 'Archive capture 003' },
  { id: 4, src: '/images/all/11.png', alt: 'Archive capture 004' },
  { id: 5, src: '/images/all/13.png', alt: 'Archive capture 005' },
  { id: 6, src: '/images/all/21.png', alt: 'Archive capture 006' },
  { id: 7, src: '/images/all/22.png', alt: 'Archive capture 007' },
  { id: 8, src: '/images/all/25.png', alt: 'Archive capture 008' },
  { id: 9, src: '/images/all/26.png', alt: 'Archive capture 009' },
  { id: 10, src: '/images/all/29.png', alt: 'Archive capture 010' },
  { id: 11, src: '/images/all/30.png', alt: 'Archive capture 011' },
  { id: 12, src: '/images/all/ComfyUI_temp_aemuc_00001_.png', alt: 'Archive capture 012' },
  { id: 13, src: '/images/all/ComfyUI_temp_apjkn_00001_%20%281%29.png', alt: 'Archive capture 013' },
  { id: 14, src: '/images/all/ComfyUI_temp_apjkn_00001_.png', alt: 'Archive capture 014' },
  { id: 15, src: '/images/all/ComfyUI_temp_ayzfv_00001_.png', alt: 'Archive capture 015' },
  { id: 16, src: '/images/all/ComfyUI_temp_batye_00001_.png', alt: 'Archive capture 016' },
  { id: 17, src: '/images/all/ComfyUI_temp_bxord_00001_.png', alt: 'Archive capture 017' },
  { id: 18, src: '/images/all/ComfyUI_temp_cgsvk_00001_.png', alt: 'Archive capture 018' },
  { id: 19, src: '/images/all/ComfyUI_temp_cjyyj_00001_.png', alt: 'Archive capture 019' },
  { id: 20, src: '/images/all/ComfyUI_temp_djnfo_00001_%20%281%29.png', alt: 'Archive capture 020' },
  { id: 21, src: '/images/all/ComfyUI_temp_djnfo_00001_.png', alt: 'Archive capture 021' },
  { id: 22, src: '/images/all/ComfyUI_temp_dllti_00001_.png', alt: 'Archive capture 022' },
  { id: 23, src: '/images/all/ComfyUI_temp_dmcrj_00001_.png', alt: 'Archive capture 023' },
  { id: 24, src: '/images/all/ComfyUI_temp_eifvt_00001_.png', alt: 'Archive capture 024' },
  { id: 25, src: '/images/all/ComfyUI_temp_exdpx_00001_.png', alt: 'Archive capture 025' },
  { id: 26, src: '/images/all/ComfyUI_temp_fllgp_00001_.png', alt: 'Archive capture 026' },
  { id: 27, src: '/images/all/ComfyUI_temp_fsbou_00001_.png', alt: 'Archive capture 027' },
  { id: 28, src: '/images/all/ComfyUI_temp_fvnki_00001_.png', alt: 'Archive capture 028' },
  { id: 29, src: '/images/all/ComfyUI_temp_fxkuo_00001_.png', alt: 'Archive capture 029' },
  { id: 30, src: '/images/all/ComfyUI_temp_ghfuq_00001_.png', alt: 'Archive capture 030' },
  { id: 31, src: '/images/all/ComfyUI_temp_gjpum_00001_.png', alt: 'Archive capture 031' },
  { id: 32, src: '/images/all/ComfyUI_temp_gkdts_00001_.png', alt: 'Archive capture 032' },
  { id: 33, src: '/images/all/ComfyUI_temp_gthhp_00001_.png', alt: 'Archive capture 033' },
  { id: 34, src: '/images/all/ComfyUI_temp_gusaq_00001_.png', alt: 'Archive capture 034' },
  { id: 35, src: '/images/all/ComfyUI_temp_gusaq_00002_.png', alt: 'Archive capture 035' },
  { id: 36, src: '/images/all/ComfyUI_temp_gvcbp_00001_.png', alt: 'Archive capture 036' },
  { id: 37, src: '/images/all/ComfyUI_temp_gzsmz_00001_.png', alt: 'Archive capture 037' },
  { id: 38, src: '/images/all/ComfyUI_temp_hgupa_00001_.png', alt: 'Archive capture 038' },
  { id: 39, src: '/images/all/ComfyUI_temp_hhexd_00001_.png', alt: 'Archive capture 039' },
  { id: 40, src: '/images/all/ComfyUI_temp_hhexd_00004_.png', alt: 'Archive capture 040' },
  { id: 41, src: '/images/all/ComfyUI_temp_hnuvt_00001_.png', alt: 'Archive capture 041' },
  { id: 42, src: '/images/all/ComfyUI_temp_hqtar_00001_.png', alt: 'Archive capture 042' },
  { id: 43, src: '/images/all/ComfyUI_temp_icggi_00001_.png', alt: 'Archive capture 043' },
  { id: 44, src: '/images/all/ComfyUI_temp_iebih_00001_%20%281%29.png', alt: 'Archive capture 044' },
  { id: 45, src: '/images/all/ComfyUI_temp_iebih_00001_.png', alt: 'Archive capture 045' },
  { id: 46, src: '/images/all/ComfyUI_temp_iggxk_00001_.png', alt: 'Archive capture 046' },
  { id: 47, src: '/images/all/ComfyUI_temp_ikzxb_00001_.png', alt: 'Archive capture 047' },
  { id: 48, src: '/images/all/ComfyUI_temp_iovns_00001_.png', alt: 'Archive capture 048' },
  { id: 49, src: '/images/all/ComfyUI_temp_iupnp_00001_.png', alt: 'Archive capture 049' },
  { id: 50, src: '/images/all/ComfyUI_temp_iyfee_00001_.png', alt: 'Archive capture 050' },
  { id: 51, src: '/images/all/ComfyUI_temp_izbxo_00001_.png', alt: 'Archive capture 051' },
  { id: 52, src: '/images/all/ComfyUI_temp_jygzp_00001_.png', alt: 'Archive capture 052' },
  { id: 53, src: '/images/all/ComfyUI_temp_ktuct_00001_.png', alt: 'Archive capture 053' },
  { id: 54, src: '/images/all/ComfyUI_temp_lfllg_00001_.png', alt: 'Archive capture 054' },
  { id: 55, src: '/images/all/ComfyUI_temp_lhngs_00001_.png', alt: 'Archive capture 055' },
  { id: 56, src: '/images/all/ComfyUI_temp_lizvn_00001_.png', alt: 'Archive capture 056' },
  { id: 57, src: '/images/all/ComfyUI_temp_lupve_00001_%20%281%29.png', alt: 'Archive capture 057' },
  { id: 58, src: '/images/all/ComfyUI_temp_lupve_00001_.png', alt: 'Archive capture 058' },
  { id: 59, src: '/images/all/ComfyUI_temp_mlsut_00001_.png', alt: 'Archive capture 059' },
  { id: 60, src: '/images/all/ComfyUI_temp_mrrgs_00001_.png', alt: 'Archive capture 060' },
  { id: 61, src: '/images/all/ComfyUI_temp_mssay_00002_%20%281%29.png', alt: 'Archive capture 061' },
  { id: 62, src: '/images/all/ComfyUI_temp_mssay_00002_.png', alt: 'Archive capture 062' },
  { id: 63, src: '/images/all/ComfyUI_temp_mugfv_00001_.png', alt: 'Archive capture 063' },
  { id: 64, src: '/images/all/ComfyUI_temp_ngulm_00001_.png', alt: 'Archive capture 064' },
  { id: 65, src: '/images/all/ComfyUI_temp_nhosi_00001_.png', alt: 'Archive capture 065' },
  { id: 66, src: '/images/all/ComfyUI_temp_nkieg_00001_.png', alt: 'Archive capture 066' },
  { id: 67, src: '/images/all/ComfyUI_temp_nknya_00001_%20%281%29.png', alt: 'Archive capture 067' },
  { id: 68, src: '/images/all/ComfyUI_temp_nxcge_00001_.png', alt: 'Archive capture 068' },
  { id: 69, src: '/images/all/ComfyUI_temp_nyprh_00001_.png', alt: 'Archive capture 069' },
  { id: 70, src: '/images/all/ComfyUI_temp_oijih_00001_.png', alt: 'Archive capture 070' },
  { id: 71, src: '/images/all/ComfyUI_temp_oqira_00001_.png', alt: 'Archive capture 071' },
  { id: 72, src: '/images/all/ComfyUI_temp_osiza_00001_.png', alt: 'Archive capture 072' },
  { id: 73, src: '/images/all/ComfyUI_temp_pgirm_00001_.png', alt: 'Archive capture 073' },
  { id: 74, src: '/images/all/ComfyUI_temp_pnckl_00001_.png', alt: 'Archive capture 074' },
  { id: 75, src: '/images/all/ComfyUI_temp_ppgly_00001_.png', alt: 'Archive capture 075' },
  { id: 76, src: '/images/all/ComfyUI_temp_pqgsa_00001_.png', alt: 'Archive capture 076' },
  { id: 77, src: '/images/all/ComfyUI_temp_puhqe_00001_.png', alt: 'Archive capture 077' },
  { id: 78, src: '/images/all/ComfyUI_temp_qcpuu_00001_.png', alt: 'Archive capture 078' },
  { id: 79, src: '/images/all/ComfyUI_temp_qfppg_00001_.png', alt: 'Archive capture 079' },
  { id: 80, src: '/images/all/ComfyUI_temp_qielc_00001_.png', alt: 'Archive capture 080' },
  { id: 81, src: '/images/all/ComfyUI_temp_qmfzi_00001_.png', alt: 'Archive capture 081' },
  { id: 82, src: '/images/all/ComfyUI_temp_qqars_00001_.png', alt: 'Archive capture 082' },
  { id: 83, src: '/images/all/ComfyUI_temp_qxfea_00001_.png', alt: 'Archive capture 083' },
  { id: 84, src: '/images/all/ComfyUI_temp_rqsbi_00001_.png', alt: 'Archive capture 084' },
  { id: 85, src: '/images/all/ComfyUI_temp_rqsbi_00002_.png', alt: 'Archive capture 085' },
  { id: 86, src: '/images/all/ComfyUI_temp_sctlo_00001_.png', alt: 'Archive capture 086' },
  { id: 87, src: '/images/all/ComfyUI_temp_sgxsa_00003_.png', alt: 'Archive capture 087' },
  { id: 88, src: '/images/all/ComfyUI_temp_targv_00001_.png', alt: 'Archive capture 088' },
  { id: 89, src: '/images/all/ComfyUI_temp_thyzb_00001_.png', alt: 'Archive capture 089' },
  { id: 90, src: '/images/all/ComfyUI_temp_tlsgv_00001_.png', alt: 'Archive capture 090' },
  { id: 91, src: '/images/all/ComfyUI_temp_udaxi_00001_.png', alt: 'Archive capture 091' },
  { id: 92, src: '/images/all/ComfyUI_temp_ulsfo_00001_.png', alt: 'Archive capture 092' },
  { id: 93, src: '/images/all/ComfyUI_temp_ulxxd_00001_%20%281%29.png', alt: 'Archive capture 093' },
  { id: 94, src: '/images/all/ComfyUI_temp_ulxxd_00001_.png', alt: 'Archive capture 094' },
  { id: 95, src: '/images/all/ComfyUI_temp_upaet_00001_.png', alt: 'Archive capture 095' },
  { id: 96, src: '/images/all/ComfyUI_temp_upkyk_00001_%20%281%29.png', alt: 'Archive capture 096' },
  { id: 97, src: '/images/all/ComfyUI_temp_upkyk_00001_.png', alt: 'Archive capture 097' },
  { id: 98, src: '/images/all/ComfyUI_temp_uvrhp_00001_.png', alt: 'Archive capture 098' },
  { id: 99, src: '/images/all/ComfyUI_temp_vzrnf_00001_.png', alt: 'Archive capture 099' },
  { id: 100, src: '/images/all/ComfyUI_temp_xgmup_00001_.png', alt: 'Archive capture 100' },
  { id: 101, src: '/images/all/ComfyUI_temp_xpiau_00001_.png', alt: 'Archive capture 101' },
  { id: 102, src: '/images/all/ComfyUI_temp_xsklt_00001_.png', alt: 'Archive capture 102' },
  { id: 103, src: '/images/all/ComfyUI_temp_xsphu_00001_.png', alt: 'Archive capture 103' },
  { id: 104, src: '/images/all/ComfyUI_temp_yczvm_00001_.png', alt: 'Archive capture 104' },
  { id: 105, src: '/images/all/ComfyUI_temp_yjchd_00001_.png', alt: 'Archive capture 105' },
  { id: 106, src: '/images/all/ComfyUI_temp_yjtfy_00001_.png', alt: 'Archive capture 106' },
  { id: 107, src: '/images/all/ComfyUI_temp_ykdcm_00001_.png', alt: 'Archive capture 107' },
  { id: 108, src: '/images/all/ComfyUI_temp_yycbg_00001_.png', alt: 'Archive capture 108' },
  { id: 109, src: '/images/all/ComfyUI_temp_zayzf_00001_.png', alt: 'Archive capture 109' },
  { id: 110, src: '/images/all/ComfyUI_temp_zjili_00001_.png', alt: 'Archive capture 110' },
  { id: 111, src: '/images/all/ComfyUI_temp_zzgcc_00001_.png', alt: 'Archive capture 111' },
  { id: 112, src: '/images/all/image%20%283%29%20%281%29.png', alt: 'Archive capture 112' },
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

