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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-0">
            {items.map((item, i) => (
              <div key={i} className="vp-item flex items-start gap-3 lg:px-4 xl:px-5 relative">
                <div className="w-9 h-9 rounded-full bg-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-[17px] h-[17px] text-gold" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-text-primary leading-snug">{item.label}</p>
                  <p className="text-[10px] text-text-secondary mt-0.5 leading-snug">{item.sub}</p>
                </div>
                {/* Vertical divider — only between items, hidden on last */}
                {i < items.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-border-cream" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
