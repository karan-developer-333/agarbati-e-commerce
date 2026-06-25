import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const categories = [
  {
    name: 'Agarbati',
    sub: 'Classic sticks',
    img: 'https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=200&h=200&fit=crop&q=80',
  },
  {
    name: 'Dhoop Cones',
    sub: 'Premium cones',
    img: 'https://images.unsplash.com/photo-1596040033229-a9821eea058d?w=200&h=200&fit=crop&q=80',
  },
  {
    name: 'Sambrani',
    sub: 'Natural resin',
    img: 'https://images.unsplash.com/photo-1587143382661-6e17e64c9e3a?w=200&h=200&fit=crop&q=80',
  },
  {
    name: 'Pooja Kits',
    sub: 'Ritual sets',
    img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop&q=80',
  },
  {
    name: 'Oils',
    sub: 'Aromatic blends',
    img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=200&h=200&fit=crop&q=80',
  },
  {
    name: 'Gift Packs',
    sub: 'Festive sets',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop&q=80',
  },
]

export default function CategoryQuickLinks() {
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
      gsap.fromTo(cardsRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="categories" ref={sectionRef} style={{ padding: '28px 0 4px' }}>
      <div ref={headerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, opacity: 0 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--charcoal)', fontFamily: '"Cormorant Garamond", serif', margin: 0, letterSpacing: '0.3px' }}>
          Collections
        </h2>
        <a href="#" style={{ fontSize: 11, color: '#888', fontFamily: 'Poppins', textDecoration: 'none', letterSpacing: '0.5px', textTransform: 'uppercase', borderBottom: '1px solid #DDD', paddingBottom: 1 }}>
          View All
        </a>
      </div>

      <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }} className="scrollbar-hide">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            ref={(el) => { cardsRef.current[i] = el }}
            style={{
              minWidth: 120, flexShrink: 0,
              cursor: 'pointer',
              opacity: 0,
            }}
          >
            {/* Square image */}
            <div style={{
              width: 120, height: 120,
              borderRadius: 4,
              overflow: 'hidden',
              background: '#F5F5F5',
              border: '1px solid #EBEBEB',
              marginBottom: 8,
              transition: 'border-color 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EBEBEB' }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.06)' }}
                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)' }}
              />
            </div>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--charcoal)', fontFamily: 'Poppins' }}>{cat.name}</div>
            <div style={{ fontSize: 10, color: '#AAA', fontFamily: 'Poppins', marginTop: 2 }}>{cat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
