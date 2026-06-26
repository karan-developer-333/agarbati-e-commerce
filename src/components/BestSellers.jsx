import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import ProductCard from './ProductCard'

const products = [
  { name: 'Divine Sandalwood Agarbatti', price: 149, rating: '4.8', reviews: '1.2K', image: '/assets/products/sandalwood.png' },
  { name: 'Royal Rose Agarbatti', price: 159, rating: '4.7', reviews: '980', image: '/assets/products/rose.png' },
  { name: 'Mogra Bliss Agarbatti', price: 169, rating: '4.8', reviews: '1.1K', image: '/assets/products/mogra.png' },
  { name: 'Lavender Calm Agarbatti', price: 179, rating: '4.7', reviews: '870', image: '/assets/products/lavender.png' },
  { name: 'Oudh Supreme Agarbatti', price: 249, rating: '4.9', reviews: '1.3K', image: '/assets/products/oudh.png' },
]

export default function BestSellers() {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.bs-header',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: 'smooth' })
    }
  }

  return (
    <div ref={containerRef} className="w-full">
      <div className="bs-header flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl md:text-[22px] font-bold text-primary">Best Sellers</h2>
        <div className="flex items-center gap-2 lg:hidden">
          <a href="#all" className="text-gold text-[13px] font-medium hover:text-primary transition-colors flex items-center gap-1 mr-2">
            View all <span className="text-base leading-none">→</span>
          </a>
          <button 
            onClick={scrollLeft} 
            className="w-7 h-7 rounded-full border border-border-cream bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90 shadow-sm cursor-pointer"
            aria-label="Slide left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={scrollRight} 
            className="w-7 h-7 rounded-full border border-border-cream bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-90 shadow-sm cursor-pointer"
            aria-label="Slide right"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <a href="#all" className="hidden lg:flex text-gold text-[13px] font-medium hover:text-primary transition-colors items-center gap-1">
          View all <span className="text-base leading-none">→</span>
        </a>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex lg:grid lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-2 xl:gap-2.5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide scroll-smooth"
      >
        {products.map((p, i) => (
          <ProductCard key={i} product={p} index={i} />
        ))}
      </div>
    </div>
  )
}

