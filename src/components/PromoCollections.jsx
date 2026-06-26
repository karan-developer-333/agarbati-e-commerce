import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const promos = [
  { 
    title: 'Premium Gift Packs', 
    subtitle: 'Perfect for every occasion', 
    gradient: 'from-[#EBE2F5] to-[#D4C3E8]', 
    image: '/assets/promo_gift_packs.png',
    button: 'Explore Now'
  },
  { 
    title: 'Festival Collection', 
    subtitle: 'Make every festival special', 
    gradient: 'from-[#FFF3D8] to-[#FFE5AA]', 
    image: '/assets/promo_festival.png',
    button: 'Shop Now'
  },
  { 
    title: 'Dhoop & Incense Cones', 
    subtitle: 'Pure. Natural. Divine.', 
    gradient: 'from-[#EAE2EF] to-[#D8CCE8]', 
    image: '/assets/promo_dhoop_cones.png',
    button: 'Shop Now'
  },
]

export default function PromoCollections() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.promo-header',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%' }
        }
      )
      gsap.fromTo('.promo-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="promo-header mb-8">
          <h2 className="font-serif text-2xl font-bold text-primary">Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((p, i) => (
            <div key={i} className={`promo-card rounded-2xl bg-gradient-to-br ${p.gradient} p-6 flex flex-col justify-between relative overflow-hidden min-h-[220px] lg:min-h-[240px] border border-border-cream`}>
              <div className="relative z-10 max-w-[55%] flex flex-col items-start gap-2.5">
                <h3 className="font-serif text-lg lg:text-[21px] font-bold text-primary leading-tight">{p.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{p.subtitle}</p>
                <button className="inline-flex items-center gap-1 bg-primary text-white text-[11px] font-semibold px-5 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-sm active:scale-95 cursor-pointer mt-1">
                  {p.button}
                </button>
              </div>
              <div className="absolute right-0 bottom-0 w-[45%] h-[85%] flex items-end justify-end pointer-events-none">
                <img src={p.image} alt={p.title} className="w-auto h-full object-contain mix-blend-multiply select-none" />
              </div>
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" fill="none" />
                  <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
