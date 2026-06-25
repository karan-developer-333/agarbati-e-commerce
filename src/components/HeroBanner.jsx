import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function HeroBanner() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const badgeRef = useRef(null)
  const statsRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.85 })
      tl.fromTo(badgeRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(statsRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.25'
      )
      .fromTo(imgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' },
        0.3
      )

      // Subtle parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 20px 20px',
        minHeight: 480,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {/* Full-bleed hero image */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=1400&q=85&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0,
        }}
      />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 36px 52px',
        maxWidth: 660,
      }}>

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 2, padding: '5px 14px',
            marginBottom: 22, width: 'fit-content', opacity: 0,
          }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.8)', fontFamily: 'Poppins', fontWeight: 400, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
            Premium Agarbatti
          </span>
        </div>

        <h1
          ref={headlineRef}
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 600,
            color: 'white',
            lineHeight: 1.1,
            margin: '0 0 18px',
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '-0.5px',
            opacity: 0,
          }}
        >
          We bring<br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>divine</em> fragrance<br />
          to your door
        </h1>

        <p
          ref={subtitleRef}
          style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.8,
            margin: '0 0 28px',
            maxWidth: 360,
            fontFamily: 'Poppins',
            fontWeight: 300,
            opacity: 0,
          }}
        >
          Handpicked incense, dhoop &amp; pooja essentials — rooted in tradition, delivered to your home.
        </p>

        <div ref={ctaRef} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', opacity: 0 }}>
          <a
            href="#you-might-need"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--deep-saffron)', color: 'white',
              padding: '12px 28px',
              fontSize: 12, fontWeight: 600, fontFamily: 'Poppins',
              letterSpacing: '0.5px', textDecoration: 'none',
              borderRadius: 2, textTransform: 'uppercase',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Shop Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#brands"
            style={{
              display: 'inline-flex', alignItems: 'center',
              color: 'rgba(255,255,255,0.8)',
              padding: '12px 0',
              fontSize: 12, fontWeight: 400, fontFamily: 'Poppins',
              letterSpacing: '0.3px', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'white' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
          >
            Explore Brands
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          style={{
            display: 'flex', gap: 32, marginTop: 40,
            paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)',
            opacity: 0,
          }}
        >
          {[['500+', 'Products'], ['30 min', 'Delivery'], ['10K+', 'Orders']].map(([val, label]) => (
            <div key={label}>
              <div style={{ fontSize: 20, fontWeight: 600, color: 'white', fontFamily: '"Cormorant Garamond", serif', lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'Poppins', letterSpacing: '0.5px', marginTop: 4, textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
