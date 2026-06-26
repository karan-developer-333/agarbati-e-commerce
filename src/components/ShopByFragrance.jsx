import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const fragrances = [
  { name: 'Sandalwood', image: '/assets/fragrances/sandalwood.png' },
  { name: 'Rose', image: '/assets/fragrances/rose.png' },
  { name: 'Mogra', image: '/assets/fragrances/mogra.png' },
  { name: 'Lavender', image: '/assets/fragrances/lavender.png' },
  { name: 'Jasmine', image: '/assets/fragrances/jasmine.png' },
  { name: 'Oudh', image: '/assets/fragrances/oudh.png' },
]

export default function ShopByFragrance() {
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.fragrance-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out',
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-xl md:text-[22px] font-bold text-primary">Shop by Fragrance</h2>
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
        className="flex lg:grid lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-2 xl:gap-2.5 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide scroll-smooth"
      >
        {fragrances.map((f, i) => (
          <div 
            key={i} 
            className="fragrance-card group bg-card-bg rounded-xl border border-border-cream p-2 flex flex-col justify-between relative w-[140px] sm:w-[155px] md:w-[165px] lg:w-full h-[220px] sm:h-[235px] lg:h-[220px] xl:h-[245px] lg:shrink-0 shrink-0 hover:shadow-lg hover:border-gold/50 transition-all duration-300 cursor-pointer"
          >
            {/* Image box — clean matching background */}
            <div className="w-full aspect-square lg:flex-1 rounded-lg overflow-hidden shrink-0 relative bg-[#FAF7F2] p-1 border border-border-cream/40 flex items-center justify-center">
              <img 
                src={f.image} 
                alt={f.name} 
                className="w-full h-full object-cover rounded-md" 
              />
            </div>

            {/* Just the name */}
            <h3 className="text-[11px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-semibold text-text-primary text-center leading-tight py-1 w-full">
              {f.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}
