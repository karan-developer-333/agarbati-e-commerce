import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'

const products = [
  { name: 'Divine Sandalwood Agarbatti', price: 149, rating: '4.8', reviews: '1.2K' },
  { name: 'Royal Rose Agarbatti', price: 159, rating: '4.7', reviews: '980' },
  { name: 'Mogra Bliss Agarbatti', price: 169, rating: '4.8', reviews: '1.1K' },
  { name: 'Lavender Calm Agarbatti', price: 179, rating: '4.7', reviews: '870' },
  { name: 'Oudh Supreme Agarbatti', price: 249, rating: '4.9', reviews: '1.3K' },
]

export default function BestSellers() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bs-header',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref}>
      <div className="bs-header flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl md:text-[22px] font-bold text-primary">Best Sellers</h2>
        <a href="#all" className="text-gold text-[13px] font-medium hover:text-primary transition-colors flex items-center gap-1">View all <span className="text-base leading-none">→</span></a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-3.5">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}
