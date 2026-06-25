import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const promos = [
  {
    label: 'SAVE',
    amount: '₹299',
    desc: 'On all agarbatti & pooja items',
    bg: 'var(--dark-maroon)',
    textColor: 'white',
    fromDir: 'left',
    img: 'https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=400&h=300&fit=crop&q=80',
  },
  {
    label: 'DISCOUNT',
    amount: '30%',
    desc: 'On premium dhoop collections',
    bg: 'var(--deep-saffron)',
    textColor: 'white',
    fromDir: 'bottom',
    img: null,
  },
  {
    label: 'UP TO',
    amount: '50%',
    desc: 'Seasonal sale on select items',
    bg: 'var(--gold)',
    textColor: 'var(--charcoal)',
    fromDir: 'bottom',
    img: null,
  },
  {
    label: 'FREE',
    amount: 'SHIP',
    desc: 'On orders above ₹299',
    bg: 'white',
    textColor: '#111',
    fromDir: 'right',
    border: true,
    img: null,
  },
]

export default function PromoBannerCards() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
        }
      )
      promos.forEach((promo, i) => {
        const fromX = promo.fromDir === 'left' ? -50 : promo.fromDir === 'right' ? 50 : 0
        const fromY = promo.fromDir === 'bottom' ? 40 : 10
        gsap.fromTo(cardsRef.current[i],
          { x: fromX, y: fromY, opacity: 0 },
          {
            x: 0, y: 0, opacity: 1,
            duration: 0.7, ease: 'power3.out', delay: i * 0.09,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="promos" style={{ padding: '12px 0 4px' }}>
      <div ref={headerRef} style={{ marginBottom: 16, opacity: 0 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--charcoal)', fontFamily: '"Cormorant Garamond", serif', margin: 0 }}>
          Special Offers
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }} className="md:grid-cols-4">
        {promos.map((promo, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: 0,
              border: promo.border ? '1px solid #EBEBEB' : 'none',
              position: 'relative',
              minHeight: 190,
              background: promo.bg,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            {/* Background image for first card */}
            {promo.img && (
              <>
                <img
                  src={promo.img}
                  alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', opacity: 0.3,
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)' }} />
              </>
            )}

            {/* Minimal stripe decoration */}
            {!promo.img && (
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent 0px,
                  transparent 24px,
                  ${promo.textColor === 'white' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 24px,
                  ${promo.textColor === 'white' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'} 25px
                )`,
                pointerEvents: 'none',
              }} />
            )}

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, padding: '22px 20px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <span style={{
                fontSize: 9, fontWeight: 600, fontFamily: 'Poppins',
                letterSpacing: '2px', textTransform: 'uppercase',
                color: promo.textColor === 'white' ? 'rgba(255,255,255,0.6)' : '#888',
                display: 'block', marginBottom: 6,
              }}>
                {promo.label}
              </span>
              <span style={{
                fontSize: 38, fontWeight: 600,
                fontFamily: '"Cormorant Garamond", serif',
                color: promo.textColor,
                lineHeight: 1, display: 'block', marginBottom: 10,
              }}>
                {promo.amount}
              </span>
              <p style={{
                fontSize: 11, fontFamily: 'Poppins', fontWeight: 300,
                color: promo.textColor === 'white' ? 'rgba(255,255,255,0.65)' : '#777',
                margin: 0, lineHeight: 1.5, maxWidth: 130,
              }}>
                {promo.desc}
              </p>
              <a
                href="#"
                style={{
                  marginTop: 14, fontSize: 10, fontFamily: 'Poppins',
                  fontWeight: 500, letterSpacing: '0.5px',
                  color: promo.textColor === 'white' ? 'rgba(255,255,255,0.8)' : '#555',
                  textDecoration: 'none', textTransform: 'uppercase',
                  borderBottom: '1px solid',
                  borderColor: promo.textColor === 'white' ? 'rgba(255,255,255,0.3)' : '#CCC',
                  paddingBottom: 1, width: 'fit-content',
                }}
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
