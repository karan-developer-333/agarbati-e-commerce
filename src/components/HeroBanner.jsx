import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LeafIcon, HeartIcon, IncenseIcon } from './SvgDecorations'

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

  return (
    <section ref={sectionRef} id="home" className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5EFE3 0%, #EDE4D0 100%)' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-10" style={{ padding: '0 20px' }}>
          <div className="flex-1 space-y-5 lg:max-w-[45%]">
            <div className="hero-badge inline-flex items-center gap-2">
              <span className="w-8 h-px bg-gold/60" />
              <span className="text-gold text-[11px] uppercase tracking-[0.12em] font-medium">Pure Fragrance. Positive Vibes.</span>
              <span className="w-8 h-px bg-gold/60" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-[52px] font-bold text-primary leading-[1.1]">
              <span className="hero-word inline-block">Bring</span>{' '}
              <span className="hero-word inline-block">Divine</span>{' '}
              <span className="hero-word inline-block">Fragrance</span>{' '}
              <span className="hero-word inline-block">Into</span>{' '}
              <span className="hero-word inline-block">Every</span>{' '}
              <span className="hero-word inline-block">Home</span>
            </h1>

            <p className="hero-desc text-text-secondary text-[15px] max-w-md leading-relaxed">
              Premium quality agarbatti for your peaceful prayers and beautiful moments.
            </p>

            <div className="hero-cta">
              <a href="#shop" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-[14px] rounded-full font-semibold text-sm hover:bg-primary-dark transition-all shadow-lg hover:shadow-primary/30">
                Shop Now
                <span className="text-lg leading-none">→</span>
              </a>
            </div>

            <div className="hero-features flex flex-wrap gap-x-6 gap-y-2 pt-2">
              <div className="flex items-center gap-2">
                <LeafIcon className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-text-secondary">Natural Ingredients</span>
              </div>
              <div className="w-px h-4 bg-border-cream self-center" />
              <div className="flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-text-secondary">Long Lasting Fragrance</span>
              </div>
              <div className="w-px h-4 bg-border-cream self-center" />
              <div className="flex items-center gap-2">
                <IncenseIcon className="w-4 h-4 text-gold" />
                <span className="text-[12px] text-text-secondary">Made With Devotion</span>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center relative lg:max-w-[55%]">
            <div className="hero-img relative">
              <img
                ref={imgRef}
                src="/assets/hero_banner_render.png"
                alt="Premium Sandalwood Incense"
                className="w-full max-w-lg h-auto object-contain drop-shadow-xl"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="hero-controls absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                <button className="w-9 h-9 rounded-full border border-border-cream bg-white flex items-center justify-center text-text-secondary hover:text-primary transition-colors text-sm">&lt;</button>
                <button className="w-9 h-9 rounded-full border border-border-cream bg-white flex items-center justify-center text-text-secondary hover:text-primary transition-colors text-sm">&gt;</button>
                <div className="flex gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="w-2 h-2 rounded-full bg-border-cream" />
                  <span className="w-2 h-2 rounded-full bg-border-cream" />
                </div>
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
