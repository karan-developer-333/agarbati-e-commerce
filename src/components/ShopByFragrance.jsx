import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const fragrances = [
  { name: 'Sandalwood', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80' },
  { name: 'Rose', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80' },
  { name: 'Mogra', image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=400&q=80' },
  { name: 'Lavender', image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Jasmine', image: 'https://images.unsplash.com/photo-1595853035070-59a39fe84de3?auto=format&fit=crop&w=400&q=80' },
  { name: 'Oudh', image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80' },
]

export default function ShopByFragrance() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fragrance-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl md:text-[22px] font-bold text-primary">Shop by Fragrance</h2>
        <a href="#all" className="text-gold text-[13px] font-medium hover:text-primary transition-colors flex items-center gap-1">View all <span className="text-base leading-none">→</span></a>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {fragrances.map((f, i) => (
          <div key={i} className="fragrance-card group cursor-pointer">
            <div className="rounded-xl border border-border-cream bg-card-bg p-3 flex flex-col items-center gap-2.5 hover:shadow-md hover:border-gold/50 transition-all duration-300">
              <div className="w-full aspect-square rounded-full overflow-hidden border border-border-cream">
                <img src={f.image} alt={f.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="text-[13px] font-medium text-text-primary">{f.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
