import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LeafIcon, HeartIcon, IncenseIcon } from './SvgDecorations'

const slides = [
  {
    badge: 'Pure Fragrance. Positive Vibes.',
    heading: ['Bring', 'Divine', 'Fragrance', 'Into', 'Every', 'Home'],
    desc: 'Premium quality agarbatti for your peaceful prayers and beautiful moments.',
    cta: 'Shop Now',
    image: '/assets/hero_banner_render.png',
    alt: 'Premium Sandalwood Incense',
  },
  {
    badge: 'Handcrafted With Love.',
    heading: ['Sacred', 'Scents', 'For', 'Your', 'Spiritual', 'Journey'],
    desc: 'Traditional recipes passed down through generations, made with pure natural ingredients.',
    cta: 'Explore Collection',
    image: '/assets/hero_banner_rose.png',
    alt: 'Rose Incense Collection',
  },
  {
    badge: 'Festival Special Collection.',
    heading: ['Celebrate', 'With', 'Divine', 'Aromas', 'This', 'Season'],
    desc: 'Special festive editions to make every celebration more fragrant and memorable.',
    cta: 'Shop Festival Picks',
    image: '/assets/hero_banner_festival.png',
    alt: 'Festival Collection',
  },
]

const petals = [
  { x: '10%', delay: '0s', dur: '8s', size: 8 },
  { x: '25%', delay: '-2s', dur: '9s', size: 6 },
  { x: '50%', delay: '-4s', dur: '7s', size: 10 },
  { x: '70%', delay: '-1s', dur: '10s', size: 7 },
  { x: '85%', delay: '-6s', dur: '8.5s', size: 9 },
  { x: '40%', delay: '-3s', dur: '9.5s', size: 6 },
  { x: '60%', delay: '-5s', dur: '8s', size: 8 },
  { x: '15%', delay: '-7s', dur: '10s', size: 5 },
]

export default function HeroBanner() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const slideContentRef = useRef(null)
  const slideImgRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const isAnimating = useRef(false)

  const goTo = useCallback((index) => {
    if (isAnimating.current || index === current) return
    isAnimating.current = true
    const dir = index > current ? 1 : -1

    // Animate out current content
    gsap.to(slideContentRef.current, { x: -40 * dir, opacity: 0, duration: 0.3, ease: 'power2.in' })
    gsap.to(slideImgRef.current, { x: 40 * dir, opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => {
      setCurrent(index)
      // Animate in new content after state update
      gsap.fromTo(slideContentRef.current, { x: 40 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.fromTo(slideImgRef.current, { x: -40 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out', onComplete: () => { isAnimating.current = false } })
    }})
  }, [current])

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo])

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 })
      gsap.fromTo('.hero-word', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out', delay: 0.4 })
      gsap.fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.9 })
      gsap.fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 1.1 })
      gsap.fromTo('.hero-features', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 1.3 })
      gsap.fromTo('.hero-img', { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 })
      gsap.fromTo('.hero-controls', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.5 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (s) => {
          if (imgRef.current) imgRef.current.style.transform = `translateY(${s.progress * 40}px)`
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const slide = slides[current]

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5EFE3 0%, #EDE4D0 100%)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          <div ref={slideContentRef} className="flex-1 space-y-5 lg:max-w-[45%] w-full">
            <div className="hero-badge inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold/60" />
              <span className="text-gold text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold">{slide.badge}</span>
              <span className="w-8 h-px bg-gold/60" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-primary leading-[1.15] lg:leading-[1.1]">
              {slide.heading.map((word, i) => (
                <span key={`${current}-${i}`} className="hero-word inline-block">{word}</span>
              )).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, ' ', curr], [])}
            </h1>

            <p className="hero-desc text-text-secondary text-[14px] sm:text-[15px] max-w-md leading-relaxed">
              {slide.desc}
            </p>

            <div className="hero-cta pt-2">
              <a href="#shop" className="inline-flex items-center gap-2 bg-primary text-white px-7 sm:px-8 py-3 sm:py-[14px] rounded-full font-semibold text-xs sm:text-sm hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30 active:scale-98">
                {slide.cta}
                <span className="text-lg leading-none">→</span>
              </a>
            </div>

            <div className="hero-features flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-3 pt-4 text-[12px] text-text-secondary">
              <div className="flex items-center gap-2 shrink-0">
                <LeafIcon className="w-4 h-4 text-gold" />
                <span>Natural Ingredients</span>
              </div>
              <div className="hidden sm:block w-px h-3.5 bg-border-cream self-center" />
              <div className="flex items-center gap-2 shrink-0">
                <HeartIcon className="w-4 h-4 text-gold" />
                <span>Long Lasting Fragrance</span>
              </div>
              <div className="hidden sm:block w-px h-3.5 bg-border-cream self-center" />
              <div className="flex items-center gap-2 shrink-0">
                <IncenseIcon className="w-4 h-4 text-gold" />
                <span>Made With Devotion</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center relative w-full lg:max-w-[55%] mt-6 lg:mt-0">
            <div className="hero-img relative w-full max-w-md sm:max-w-lg flex justify-center px-6">
              <div ref={slideImgRef}>
                <img
                  ref={imgRef}
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-auto object-contain drop-shadow-xl select-none"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
              
              {/* Left & Right Navigation Arrows */}
              <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border-cream/80 bg-white/90 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-primary transition-all text-sm shadow-sm hover:shadow active:scale-90">&lt;</button>
              <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-border-cream/80 bg-white/90 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-primary transition-all text-sm shadow-sm hover:shadow active:scale-90">&gt;</button>
              
              {/* Dot Indicators */}
              <div className="absolute bottom-2 right-8 flex gap-1.5 z-10 bg-white/40 backdrop-blur-[2px] px-2 py-1 rounded-full">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-primary' : 'bg-border-cream hover:bg-primary/40'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.15]">
        <svg viewBox="0 0 800 600" className="w-full h-full" fill="none">
          <circle cx="400" cy="300" r="250" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
          <circle cx="400" cy="300" r="200" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
          <circle cx="400" cy="300" r="150" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
          <circle cx="400" cy="300" r="100" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
          <circle cx="400" cy="300" r="50" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
          <path d="M400 50 L400 550" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
          <path d="M150 300 L650 300" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
          <path d="M223 223 L577 377" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
          <path d="M577 223 L223 377" stroke="currentColor" strokeWidth="0.3" opacity="0.1" />
        </svg>
      </div>

      {petals.map((p, i) => (
        <div key={i} className="petal absolute top-10" style={{ left: p.x, animationDelay: p.delay, animationDuration: p.dur }}>
          <svg width={p.size} height={p.size} viewBox="0 0 10 10" fill="#D4A373" opacity="0.5">
            <path d="M5 0C7 2 7 5 5 8C3 5 3 2 5 0Z" />
          </svg>
        </div>
      ))}
    </section>
  )
}
