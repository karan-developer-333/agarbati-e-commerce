import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const footerLinks = {
  'Company': ['About Us', 'Our Story', 'Sustainability', 'Careers', 'Press'],
  'Shop': ['Agarbati Sticks', 'Dhoop Cones', 'Sambrani', 'Pooja Kits', 'Gift Sets'],
  'Support': ['Track Order', 'Returns', 'Shipping Policy', 'Bulk Orders', 'FAQs'],
  'Contact': ['+91 98765 43210', 'hello@sugandh.in', 'Mon–Sat 9am–6pm', 'Mumbai, India'],
}

const socials = [
  { label: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'Twitter', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.75l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'YouTube', d: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
]

export default function Footer() {
  const footerRef = useRef(null)
  const colsRef = useRef([])
  const bottomRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(colsRef.current,
        { y: 22, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
        }
      )
      gsap.fromTo(bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.5, delay: 0.35, ease: 'power2.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 85%', once: true },
        }
      )
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{ background: 'var(--dark-maroon)', marginTop: 0 }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '52px 24px 0' }}>

        {/* Top — brand + tagline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 26, fontWeight: 600, color: 'white', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 8 }}>
              Sugandh
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontFamily: 'Poppins', margin: 0, maxWidth: 240, lineHeight: 1.7, fontWeight: 300 }}>
              Rooted in tradition. Premium agarbatti & pooja essentials, delivered to your home.
            </p>
          </div>

          {/* Newsletter */}
          <div style={{ minWidth: 240 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins', letterSpacing: '0.5px', marginBottom: 10, textTransform: 'uppercase' }}>
              Newsletter
            </div>
            <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1, padding: '10px 14px',
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none', outline: 'none',
                  color: 'white', fontSize: 12, fontFamily: 'Poppins',
                }}
              />
              <button style={{
                padding: '10px 16px',
                background: 'white', color: '#111',
                border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: 'Poppins',
                letterSpacing: '0.5px', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: 36 }} />

        {/* Link columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '28px 20px' }} className="md:grid-cols-4">
          {Object.entries(footerLinks).map(([title, links], i) => (
            <div key={title} ref={(el) => { colsRef.current[i] = el }} style={{ opacity: 0 }}>
              <h4 style={{ color: 'white', fontWeight: 500, fontSize: 12, marginBottom: 16, fontFamily: 'Poppins', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'Poppins', fontWeight: 300, textDecoration: 'none', transition: 'color 0.18s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          ref={bottomRef}
          style={{
            opacity: 0,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            marginTop: 40,
            paddingTop: 20, paddingBottom: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
          }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: 'Poppins', fontWeight: 300 }}>
            © 2026 Sugandh. All rights reserved.
          </span>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.borderColor = 'white'
                  e.currentTarget.querySelector('svg').setAttribute('fill', '#111')
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.querySelector('svg').setAttribute('fill', 'rgba(255,255,255,0.7)')
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)" style={{ transition: 'fill 0.2s' }}>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, #333 0%, rgba(255,255,255,0.15) 50%, #333 100%)' }} />
    </footer>
  )
}
