import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { DiyaIcon, SearchIcon, UserIcon, CartIcon } from './SvgDecorations'

export default function Navbar() {
  const navRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-[#FDFBF6]/95 backdrop-blur-md border-b border-border-cream/80" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <DiyaIcon className="w-7 h-7 text-gold animate-[glowPulse_2s_infinite]" />
            <div className="flex flex-col">
              <span className="text-primary font-serif font-bold text-[22px] leading-none">Sugandh</span>
              <span className="text-gold text-[11px] leading-tight tracking-[0.05em] uppercase font-semibold">Divine Fragrance</span>
            </div>
          </div>

          {/* Search bar - Desktop only */}
          <div className="hidden lg:flex relative flex-1 max-w-[420px]">
            <input
              type="text"
              placeholder="Search for agarbatti, dhoop, incense..."
              className="w-full h-10 pl-5 pr-12 rounded-full bg-[#F0ECE4] text-sm text-text-primary outline-none focus:ring-1 focus:ring-gold/30 placeholder:text-text-secondary/60"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
          </div>

          {/* Nav Links - Desktop only */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="#home" className="text-primary font-medium text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary">Home</a>
            <a href="#shop" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Shop</a>
            <a href="#categories" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors flex items-center gap-1">Categories <span className="text-[10px]">▾</span></a>
            <a href="#best-sellers" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Best Sellers</a>
            <a href="#about" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">About Us</a>
            <a href="#contact" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Contact</a>
          </div>

          {/* Action Icons + Mobile Hamburger */}
          <div className="flex items-center gap-3 lg:gap-4">
            <UserIcon className="w-[22px] h-[22px] text-primary cursor-pointer hover:text-gold transition-colors hidden sm:block" />
            <div className="relative cursor-pointer">
              <CartIcon className="w-[22px] h-[22px] text-primary hover:text-gold transition-colors" />
              <span className="cart-badge absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </div>

            {/* Hamburger Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1 text-primary hover:text-gold transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#FDFBF6] border-b border-border-cream/80 py-4 px-4 shadow-lg animate-[fadeIn_0.2s_ease-out]">
          <div className="flex flex-col gap-4">
            {/* Mobile Search Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for agarbatti, dhoop..."
                className="w-full h-10 pl-4 pr-10 rounded-full bg-[#F0ECE4] text-sm text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
              />
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-3.5 pt-2">
              <a
                href="#home"
                onClick={() => setIsOpen(false)}
                className="text-primary font-semibold text-sm border-l-2 border-primary pl-2"
              >
                Home
              </a>
              <a
                href="#shop"
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-primary text-sm font-medium pl-2 transition-colors"
              >
                Shop
              </a>
              <a
                href="#categories"
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-primary text-sm font-medium pl-2 transition-colors"
              >
                Categories
              </a>
              <a
                href="#best-sellers"
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-primary text-sm font-medium pl-2 transition-colors"
              >
                Best Sellers
              </a>
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-primary text-sm font-medium pl-2 transition-colors"
              >
                About Us
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="text-text-secondary hover:text-primary text-sm font-medium pl-2 transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
