import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LeafIcon, ClockIcon, HeartIcon, TruckIcon, ShieldIcon } from './SvgDecorations'

const items = [
  { icon: LeafIcon, label: 'Natural Ingredients', sub: 'Made with pure & natural ingredients' },
  { icon: ClockIcon, label: 'Long Lasting Fragrance', sub: 'Fragrance that stays longer' },
  { icon: HeartIcon, label: 'Made with Devotion', sub: 'Crafted with care and devotion' },
  { icon: TruckIcon, label: 'Fast & Safe Delivery', sub: 'Delivered to your doorstep' },
  { icon: ShieldIcon, label: 'Secure Payment', sub: '100% secure & trusted payments' },
]

export default function ValueProposition() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.vp-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="border-y border-gold/20 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-6 lg:gap-x-8 lg:gap-y-6">
            {items.map((item, i) => (
              <div key={i} className="vp-item flex items-start gap-3 min-w-[200px] lg:min-w-[160px] max-w-sm sm:max-w-none">
                <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-[18px] h-[18px] text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">{item.label}</p>
                  <p className="text-[11px] text-text-secondary mt-0.5">{item.sub}</p>
                </div>
                {i < items.length - 1 && <div className="hidden lg:block w-px h-10 bg-border-cream self-center ml-2 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
