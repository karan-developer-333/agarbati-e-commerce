import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#you-might-need' },
  { label: 'Collections', href: '#categories' },
  { label: 'Brands', href: '#brands' },
  { label: 'Offers', href: '#promos' },
]

export default function Navbar({ cartCount = 0, onCartOpen }) {
  const navRef = useRef(null)
  const progressRef = useRef(null)
  const linksRef = useRef([])
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')
  const profileRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.3 }
    )
    gsap.fromTo(linksRef.current,
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.7 }
    )

    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 40)
      const max = document.body.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.width = `${max > 0 ? (sy / max) * 100 : 0}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close profile on outside click
  useEffect(() => {
    if (!profileOpen) return
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [profileOpen])

  const handleNavClick = (e, href, label) => {
    e.preventDefault()
    setActiveLink(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el && window.lenis) window.lenis.scrollTo(el, { offset: -56, duration: 1.1 })
    else if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const navBg = scrolled ? 'rgba(255, 247, 237, 0.96)' /* cream */ : 'var(--charcoal)'
  const textColor = scrolled ? 'var(--charcoal)' : 'rgba(255,255,255,0.85)'
  const logoColor = scrolled ? 'var(--deep-saffron)' : 'var(--gold)'
  const borderColor = scrolled ? 'var(--gold)' : 'rgba(255,255,255,0.08)'

  return (
    <nav
      ref={navRef}
      id="navbar"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: navBg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Progress bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, height: 1, width: '100%', background: scrolled ? '#EBEBEB' : 'rgba(255,255,255,0.06)' }}>
        <div ref={progressRef} style={{ height: '100%', background: scrolled ? '#111' : 'rgba(255,255,255,0.4)', width: '0%', transition: 'none' }} />
      </div>

      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: 58,
        maxWidth: 1100,
        margin: '0 auto',
        gap: 20,
      }}>
        {/* Hamburger — mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={logoColor} strokeWidth="1.8" strokeLinecap="round" style={{ transition: 'stroke 0.4s' }}>
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>

        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home', 'Home')}
          style={{ textDecoration: 'none', flexShrink: 0 }}
        >
          <span style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 22,
            fontWeight: 600,
            color: logoColor,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            transition: 'color 0.4s',
          }}>
            Sugandh
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1" style={{ flex: 1, justifyContent: 'center' }}>
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { linksRef.current[i] = el }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.label)}
              className={`nav-link ${activeLink === link.label ? 'active' : ''}`}
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: 12,
                letterSpacing: '0.3px',
                color: activeLink === link.label ? logoColor : textColor,
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: 4,
                transition: 'color 0.3s',
                opacity: 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* Search icon */}
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', borderRadius: 6 }}
            title="Search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={logoColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>

          {/* Cart icon */}
          <button
            onClick={onCartOpen}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 6, display: 'flex', position: 'relative', borderRadius: 6,
            }}
            title="Cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={logoColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s' }}>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: 2, right: 2,
                background: scrolled ? '#111' : 'white',
                color: scrolled ? 'white' : '#111',
                borderRadius: '50%', width: 14, height: 14,
                fontSize: 8, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.4s, color 0.4s',
              }}>
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div ref={profileRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(o => !o)}
              style={{
                width: 32, height: 32,
                borderRadius: '50%',
                background: scrolled ? '#111' : 'rgba(255,255,255,0.15)',
                border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                transition: 'background 0.4s, border-color 0.4s',
                flexShrink: 0,
              }}
              title="Profile"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'white' : 'rgba(255,255,255,0.9)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            {profileOpen && (
              <div className="profile-dropdown">
                {/* Profile header */}
                <div style={{ padding: '16px 18px 14px', borderBottom: '1px solid #F5F5F5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: '#111',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111', fontFamily: 'Poppins' }}>Karan</div>
                      <div style={{ fontSize: 11, color: '#888', fontFamily: 'Poppins' }}>karan@sugandh.in</div>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                {[
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>, label: 'My Orders' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, label: 'Wishlist' },
                  { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>, label: 'Settings' },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '11px 18px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 12, color: '#444', fontFamily: 'Poppins',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#F8F8F8' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none' }}
                  >
                    <span style={{ color: '#777' }}>{icon}</span>
                    {label}
                  </button>
                ))}

                {/* Sign out */}
                <div style={{ padding: '8px 18px 12px', borderTop: '1px solid #F5F5F5' }}>
                  <button
                    style={{
                      width: '100%', padding: '9px 0',
                      background: 'none', border: '1px solid #E5E5E5',
                      borderRadius: 6, cursor: 'pointer',
                      fontSize: 12, color: '#555', fontFamily: 'Poppins',
                      transition: 'all 0.18s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#111' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#E5E5E5' }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: 'white', borderBottom: '1px solid #EBEBEB',
            padding: '8px 16px 16px', zIndex: 100,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.label)}
              style={{
                display: 'block', padding: '11px 12px',
                fontFamily: 'Poppins', fontSize: 13,
                fontWeight: activeLink === link.label ? 600 : 400,
                color: activeLink === link.label ? '#111' : '#555',
                textDecoration: 'none',
                borderRadius: 6,
                background: activeLink === link.label ? '#F5F5F5' : 'transparent',
                marginBottom: 2,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
