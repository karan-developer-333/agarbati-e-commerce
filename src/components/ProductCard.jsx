import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { StarIcon } from './SvgDecorations'

const boxStyles = {
  'Divine Sandalwood Agarbatti': { bg: 'from-[#2D1B5E] to-[#1E0F47]', label: 'SD' },
  'Royal Rose Agarbatti': { bg: 'from-[#8B1A1A] to-[#5C1010]', label: 'RR' },
  'Mogra Bliss Agarbatti': { bg: 'from-[#1B5E20] to-[#0D3310]', label: 'MB' },
  'Lavender Calm Agarbatti': { bg: 'from-[#5B4E9E] to-[#3A2D7A]', label: 'LC' },
  'Oudh Supreme Agarbatti': { bg: 'from-[#1A1A1A] to-[#000000]', label: 'OS' },
}

export default function ProductCard({ product, index }) {
  const [qty, setQty] = useState(0)
  const cardRef = useRef(null)
  const plusRef = useRef(null)
  const style = boxStyles[product.name] || boxStyles['Divine Sandalwood Agarbatti']

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: index * 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
      }
    )
  }, [index])

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.12)', duration: 0.25, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (qty === 0) {
      gsap.to(cardRef.current, { y: 0, boxShadow: 'none', duration: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(cardRef.current, { y: 0, boxShadow: 'none', duration: 0.25, ease: 'power2.out' })
    }
  }

  const handleAdd = (e) => {
    setQty(1)
    const rect = plusRef.current?.getBoundingClientRect()
    if (rect) {
      const fly = document.createElement('div')
      fly.className = 'fixed w-6 h-6 rounded-full bg-primary z-[999] pointer-events-none'
      fly.style.left = `${rect.left}px`
      fly.style.top = `${rect.top}px`
      document.body.appendChild(fly)
      const cart = document.querySelector('.cart-badge')
      const cartRect = cart?.getBoundingClientRect()
      if (cartRect) {
        gsap.to(fly, {
          x: cartRect.left - rect.left + 8,
          y: cartRect.top - rect.top + 8,
          scale: 0.3,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in',
          onComplete: () => {
            fly.remove()
            if (cart) {
              gsap.fromTo(cart, { scale: 1.5 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' })
            }
          }
        })
      } else {
        fly.remove()
      }
    }
  }

  return (
    <div
      ref={cardRef}
      className="group bg-card-bg rounded-xl border border-border-cream p-2.5 sm:p-3 flex flex-col items-center gap-2 relative w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`w-full aspect-[3/4] rounded-lg bg-gradient-to-br ${style.bg} p-2 flex items-center justify-center relative overflow-hidden shrink-0`}>
        <div className="absolute inset-0 opacity-[0.08] rounded-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="30" y="10" width="40" height="80" rx="3" stroke="white" strokeWidth="0.5" fill="none" />
            <rect x="35" y="20" width="30" height="50" rx="2" stroke="white" strokeWidth="0.3" fill="none" />
            <line x1="35" y1="25" x2="65" y2="25" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>
        <div className="text-center">
          <div className="font-serif text-xl sm:text-2xl font-bold text-gold">🪔</div>
          <div className="text-white/30 text-[8px] mt-1 uppercase tracking-wider">{style.label}</div>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-0.5">
        <StarIcon className="w-3 h-3 text-gold" />
        <span className="text-[10px] sm:text-[11px] font-bold text-text-primary">{product.rating}</span>
        <span className="text-[9px] sm:text-[10px] text-text-secondary">({product.reviews})</span>
      </div>

      <h3 className="text-[11px] sm:text-[12px] font-semibold text-text-primary text-center leading-tight line-clamp-2 h-7 sm:h-8 flex items-center justify-center overflow-hidden">
        {product.name}
      </h3>

      {/* Bottom price and add-to-cart row */}
      <div className="w-full flex items-center justify-between gap-1.5 mt-1 pt-1 border-t border-border-cream/50">
        <span className="text-xs sm:text-sm font-bold text-text-primary">₹{product.price}</span>
        
        {qty === 0 ? (
          <button
            ref={plusRef}
            onClick={handleAdd}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary text-white text-base sm:text-lg font-light flex items-center justify-center hover:bg-primary-dark transition-colors active:scale-90 shrink-0"
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-[#F0ECE4] rounded-full p-0.5 shrink-0">
            <button
              onClick={() => setQty((q) => Math.max(0, q - 1))}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white text-[9px] sm:text-[10px] flex items-center justify-center active:scale-90"
            >
              −
            </button>
            <span className="text-[10px] sm:text-xs font-bold text-text-primary w-3 sm:w-4 text-center">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary text-white text-[9px] sm:text-[10px] flex items-center justify-center active:scale-90"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
