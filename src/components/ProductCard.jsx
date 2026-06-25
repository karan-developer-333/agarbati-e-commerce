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

  const style = boxStyles[product.name] || boxStyles['Divine Sandalwood Agarbatti']

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, delay: index * 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' }
      }
    )
  }, [index])

  const handleAdd = () => setQty(1)

  return (
    <div ref={cardRef} className="group bg-card-bg rounded-xl border border-border-cream p-3 flex flex-col items-center gap-2 hover:shadow-lg transition-shadow duration-300 relative">
      <div className={`w-full aspect-[3/4] rounded-lg bg-gradient-to-br ${style.bg} p-2 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.08] rounded-lg">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="30" y="10" width="40" height="80" rx="3" stroke="white" strokeWidth="0.5" fill="none" />
            <rect x="35" y="20" width="30" height="50" rx="2" stroke="white" strokeWidth="0.3" fill="none" />
            <line x1="35" y1="25" x2="65" y2="25" stroke="white" strokeWidth="0.3" />
          </svg>
        </div>
        <div className="text-center">
          <div className="font-serif text-2xl font-bold text-gold">🪔</div>
          <div className="text-white/30 text-[8px] mt-1 uppercase tracking-wider">{style.label}</div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <StarIcon className="w-3 h-3 text-gold" />
        <span className="text-[11px] font-bold text-text-primary">{product.rating}</span>
        <span className="text-[10px] text-text-secondary">({product.reviews})</span>
      </div>

      <h3 className="text-[12px] font-medium text-text-primary text-center leading-tight line-clamp-2">{product.name}</h3>

      <span className="text-[15px] font-bold text-text-primary">₹{product.price}</span>

      {qty === 0 ? (
        <button onClick={handleAdd} className="w-9 h-9 rounded-full bg-primary text-white text-xl font-light flex items-center justify-center hover:bg-primary-dark transition-colors active:scale-95 absolute bottom-3 right-3">+</button>
      ) : (
        <div className="flex items-center gap-2 bg-[#F0ECE4] rounded-full px-2.5 py-1">
          <button onClick={() => setQty(q => Math.max(0, q - 1))} className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">−</button>
          <span className="text-xs font-semibold text-text-primary w-4 text-center">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">+</button>
        </div>
      )}
    </div>
  )
}
