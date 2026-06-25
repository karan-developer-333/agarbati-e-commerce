import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
gsap.registerPlugin(ScrollTrigger)

export default function ProductSection({ title, products, showFilterTabs, filterTabs, onAddToCart }) {
  const [activeTab, setActiveTab] = useState(filterTabs?.[0] || '')
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
  const tabsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 87%', once: true },
        }
      )
      if (tabsRef.current) {
        gsap.fromTo(tabsRef.current.children,
          { y: 12, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', once: true },
          }
        )
      }
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { y: 28, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 88%', once: true },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { y: 10, opacity: 0.6 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.04, ease: 'power2.out' }
      )
    }
  }

  const sectionId = title.toLowerCase().replace(/\s+/g, '-')

  return (
    <section ref={sectionRef} id={sectionId} style={{ padding: '36px 0 8px' }}>
      <div
        ref={headerRef}
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 20, opacity: 0 }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 600, color: '#111', fontFamily: '"Cormorant Garamond", serif', margin: 0, letterSpacing: '0.3px' }}>
          {title}
        </h2>
        <a
          href="#"
          style={{
            fontSize: 11, color: '#888', fontFamily: 'Poppins',
            textDecoration: 'none', letterSpacing: '0.5px',
            textTransform: 'uppercase',
            borderBottom: '1px solid #DDD', paddingBottom: 1,
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = '#DDD' }}
        >
          See more
        </a>
      </div>

      {showFilterTabs && filterTabs && (
        <div ref={tabsRef} style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                padding: '5px 14px',
                borderRadius: 2,
                fontSize: 11, fontFamily: 'Poppins',
                fontWeight: activeTab === tab ? 600 : 400,
                letterSpacing: '0.3px',
                cursor: 'pointer',
                transition: 'all 0.18s',
                background: activeTab === tab ? 'var(--deep-saffron)' : 'transparent',
                color: activeTab === tab ? 'white' : '#777',
                border: activeTab === tab ? '1px solid var(--deep-saffron)' : '1px solid #E5E5E5',
              }}
              onMouseEnter={(e) => { if (activeTab !== tab) { e.currentTarget.style.borderColor = '#999'; e.currentTarget.style.color = 'var(--charcoal)' } }}
              onMouseLeave={(e) => { if (activeTab !== tab) { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.color = '#777' } }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}
        className="sm:grid-cols-3 md:grid-cols-5"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
