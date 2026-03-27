'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface CarouselImage {
  id: number
  src: string
  alt: string
}

interface ImageCarouselProps {
  images: CarouselImage[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
    slidesToScroll: 1,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const closePreview = useCallback(() => setPreviewIndex(null), [])

  const previewPrev = useCallback(() => {
    setPreviewIndex((prev) => {
      if (prev === null) return prev
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const previewNext = useCallback(() => {
    setPreviewIndex((prev) => {
      if (prev === null) return prev
      return prev === images.length - 1 ? 0 : prev + 1
    })
  }, [images.length])

  useEffect(() => {
    if (previewIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePreview()
      if (event.key === 'ArrowLeft') previewPrev()
      if (event.key === 'ArrowRight') previewNext()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [closePreview, previewIndex, previewNext, previewPrev])

  return (
    <>
      <div className="relative group">
        {/* Carousel viewport */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex gap-3 touch-pan-y">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setPreviewIndex(i)}
                className="relative flex-none w-[75vw] sm:w-85 md:w-80 aspect-3/4 rounded-2xl overflow-hidden text-left cursor-zoom-in"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                aria-label={`Preview ${img.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                  loading="lazy"
                />
                {/* Glass overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(10,15,28,0.7) 0%, transparent 60%)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Prev button */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        {/* Next button */}
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
          style={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? '20px' : '6px',
                height: '6px',
                background:
                  i === selectedIndex
                    ? '#6366f1'
                    : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            style={{ background: 'rgba(5, 9, 18, 0.9)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePreview}
          >
            <button
              type="button"
              onClick={closePreview}
              aria-label="Close preview"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                previewPrev()
              }}
              aria-label="Previous preview image"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                previewNext()
              }}
              aria-label="Next preview image"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>

            <motion.div
              key={images[previewIndex].id}
              className="relative w-full max-w-4xl max-h-[88vh]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[previewIndex].src}
                alt={images[previewIndex].alt}
                className="w-full h-full max-h-[88vh] object-contain rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.18)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
