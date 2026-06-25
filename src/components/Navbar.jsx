import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DiyaIcon, SearchIcon, UserIcon, CartIcon } from './SvgDecorations'

export default function Navbar() {
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -64, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
  }, [])

  return (
    <header ref={navRef} className="sticky top-0 z-50 bg-bg-page shadow-sm" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <DiyaIcon className="w-7 h-7 text-gold" />
            <div className="flex flex-col">
              <span className="text-primary font-serif font-bold text-[22px] leading-none">Sugandh</span>
              <span className="text-gold text-[11px] leading-tight tracking-[0.05em] uppercase">Divine Fragrance</span>
            </div>
          </div>

          <div className="hidden lg:flex relative flex-1 max-w-[420px]">
            <input
              type="text"
              placeholder="Search for agarbatti, dhoop, incense..."
              className="w-full h-10 pl-5 pr-12 rounded-full bg-[#F0ECE4] text-sm text-text-primary outline-none placeholder:text-text-secondary/60"
            />
            <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <a href="#home" className="text-primary font-medium text-sm relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary">Home</a>
            <a href="#shop" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Shop</a>
            <a href="#categories" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors flex items-center gap-1">Categories <span className="text-[10px]">▾</span></a>
            <a href="#best-sellers" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Best Sellers</a>
            <a href="#about" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">About Us</a>
            <a href="#contact" className="text-text-secondary hover:text-primary text-sm font-medium transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <UserIcon className="w-[22px] h-[22px] text-primary cursor-pointer hover:text-gold transition-colors" />
            <div className="relative cursor-pointer">
              <CartIcon className="w-[22px] h-[22px] text-primary hover:text-gold transition-colors" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
