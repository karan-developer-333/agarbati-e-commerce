import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const brands = [
  {
    name: 'Cycle Pure Agarbathi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/NR_Group_logo.svg/1200px-NR_Group_logo.svg.png',
    img: 'https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=600&h=220&fit=crop&q=80',
    desc: 'Since 1948 — India\'s most trusted incense brand',
    tag: 'Heritage Brand',
  },
  {
    name: 'Satya Sai Baba',
    logo: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=80&h=80&fit=crop&q=80',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821eea058d?w=600&h=220&fit=crop&q=80',
    desc: 'World-famous Nag Champa spiritual fragrance',
    tag: 'Best Seller',
  },
  {
    name: 'Hem Corporation',
    logo: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=80&h=80&fit=crop&q=80',
    img: 'https://images.unsplash.com/photo-1587143382661-6e17e64c9e3a?w=600&h=220&fit=crop&q=80',
    desc: 'Premium export quality aromatic blends',
    tag: 'Premium',
  },
]

export default function FeaturedBrands() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 87%', once: true },
        }
      )
      gsap.fromTo(cardsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="brands" style={{ padding: '20px 0 8px' }}>
      <div ref={headerRef} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, opacity: 0 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#111', fontFamily: '"Cormorant Garamond", serif', margin: 0 }}>
          Featured Brands
        </h2>
        <a
          href="#"
          style={{ fontSize: 11, color: '#888', fontFamily: 'Poppins', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #DDD', paddingBottom: 1 }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#DDD' }}
        >All Brands</a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 1 }} className="md:grid-cols-3">
        {brands.map((brand, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              background: 'white',
              border: '1px solid #EBEBEB',
              borderRadius: 4,
              overflow: 'hidden',
              cursor: 'pointer',
              opacity: 0,
              transition: 'border-color 0.25s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EBEBEB' }}
          >
            {/* Brand hero image */}
            <div style={{ height: 140, overflow: 'hidden', position: 'relative', background: '#F5F5F5' }}>
              <img
                src={brand.img}
                alt={brand.name}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  filter: 'grayscale(30%)',
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.filter = 'grayscale(0%)' }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'grayscale(30%)' }}
              />
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: 'var(--charcoal)', color: 'white',
                fontSize: 9, fontWeight: 600, fontFamily: 'Poppins',
                padding: '3px 8px', borderRadius: 2,
                letterSpacing: '1px', textTransform: 'uppercase',
              }}>
                {brand.tag}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              {/* Logo thumbnail */}
              <div style={{
                width: 44, height: 44, flexShrink: 0,
                border: '1px solid #EBEBEB', borderRadius: 4,
                background: '#F8F8F8', overflow: 'hidden',
              }}>
                <img
                  src={brand.logo}
                  alt={brand.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'Poppins', marginBottom: 4 }}>{brand.name}</div>
                <div style={{ fontSize: 11, color: '#888', fontFamily: 'Poppins', lineHeight: 1.5 }}>{brand.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <span style={{ fontSize: 10, color: '#888', fontFamily: 'Poppins' }}>30 min delivery</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
