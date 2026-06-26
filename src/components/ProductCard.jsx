import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { StarIcon } from './SvgDecorations'
import { useCart } from '../context/CartContext'

const boxStyles = {
  'Divine Sandalwood Agarbatti': { bg: 'from-[#2D1B5E] to-[#1E0F47]', label: 'SD' },
  'Royal Rose Agarbatti': { bg: 'from-[#8B1A1A] to-[#5C1010]', label: 'RR' },
  'Mogra Bliss Agarbatti': { bg: 'from-[#1B5E20] to-[#0D3310]', label: 'MB' },
  'Lavender Calm Agarbatti': { bg: 'from-[#5B4E9E] to-[#3A2D7A]', label: 'LC' },
  'Oudh Supreme Agarbatti': { bg: 'from-[#1A1A1A] to-[#000000]', label: 'OS' },
}

export default function ProductCard({ product, index }) {
  const { addToCart, updateQty, getQty } = useCart()
  const qty = getQty(product.name)
  const [wishlisted, setWishlisted] = useState(false)
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

  const handleAdd = (e) => {
    addToCart(product)
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
      className="product-card bg-card-bg rounded-xl border border-border-cream p-2 flex flex-col justify-between relative w-[140px] sm:w-[155px] md:w-[165px] lg:w-full h-[220px] sm:h-[235px] lg:h-[220px] xl:h-[245px] lg:shrink-0 shrink-0 hover:shadow-lg hover:border-gold/50 transition-all duration-300"
    >
      {/* Product image box */}
      <div className="w-full aspect-square rounded-lg bg-[#FAF7F2] p-1 flex items-center justify-center relative overflow-hidden shrink-0 border border-border-cream/40">
        {/* Wishlist Heart Button overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setWishlisted(!wishlisted)
          }}
          className={`absolute top-1.5 right-1.5 w-5 h-5 lg:w-[18px] lg:h-[18px] xl:w-5 xl:h-5 rounded-full flex items-center justify-center shadow-sm z-10 transition-all active:scale-90 hover:scale-110 wishlist-btn cursor-pointer ${wishlisted ? 'bg-white text-red-500 scale-105' : 'bg-white/70 text-text-secondary hover:bg-white hover:text-red-500'}`}
          aria-label="Add to wishlist"
        >
          <svg className="w-2.5 h-2.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <div className="text-center">
            <div className="font-serif text-xl sm:text-2xl lg:text-lg xl:text-2xl font-bold text-gold text-shadow">🪔</div>
            <div className="text-white/30 text-[8px] lg:text-[7px] xl:text-[8px] mt-1 uppercase tracking-wider">{style.label}</div>
          </div>
        )}
      </div>

      {/* Rating row */}
      <div className="flex items-center gap-1 mt-0.5">
        <StarIcon className="w-2.5 h-2.5 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5 text-gold" />
        <span className="text-[10px] sm:text-[11px] lg:text-[8px] xl:text-[10px] font-bold text-text-primary">{product.rating}</span>
        <span className="text-[9px] sm:text-[10px] lg:text-[7px] xl:text-[9px] text-text-secondary">({product.reviews})</span>
      </div>

      {/* Product name — allow wrapping naturally */}
      <h3 className="text-[11px] sm:text-[12px] lg:text-[9px] xl:text-[11px] font-semibold text-text-primary text-center leading-tight line-clamp-2 min-h-[28px] sm:min-h-[32px] lg:min-h-[24px] xl:min-h-[28px] flex items-center justify-center w-full px-0.5">
        {product.name}
      </h3>

      {/* Bottom price and add-to-cart row */}
      <div className="w-full flex items-center justify-between gap-1 mt-auto pt-1 border-t border-border-cream/50">
        <span className="text-xs sm:text-sm lg:text-[10px] xl:text-sm font-bold text-text-primary">₹{product.price}</span>
        
        {qty === 0 ? (
          <button
            ref={plusRef}
            onClick={handleAdd}
            className="w-6 h-6 sm:w-7 sm:h-7 lg:w-5 lg:h-5 xl:w-7 xl:h-7 rounded-full bg-primary text-white text-sm sm:text-base lg:text-[10px] xl:text-base font-light flex items-center justify-center hover:bg-primary-dark transition-colors active:scale-90 shrink-0 cursor-pointer"
          >
            +
          </button>
        ) : (
          <div className="flex items-center gap-1 lg:gap-0.5 bg-[#F0ECE4] rounded-full p-0.5 shrink-0">
            <button
              onClick={() => updateQty(product.name, qty - 1)}
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 rounded-full bg-primary text-white text-[9px] sm:text-[10px] lg:text-[8px] xl:text-[10px] flex items-center justify-center active:scale-90 cursor-pointer"
            >
              −
            </button>
            <span className="text-[10px] sm:text-xs lg:text-[8px] xl:text-xs font-bold text-text-primary w-3 sm:w-4 lg:w-2.5 xl:w-4 text-center">{qty}</span>
            <button
              onClick={() => updateQty(product.name, qty + 1)}
              className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3.5 lg:h-3.5 xl:w-5 xl:h-5 rounded-full bg-primary text-white text-[9px] sm:text-[10px] lg:text-[8px] xl:text-[10px] flex items-center justify-center active:scale-90 cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
