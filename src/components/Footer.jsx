import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldIcon, TruckIcon, HeartIcon, HeadphonesIcon, DiyaIcon, InstagramIcon, FacebookIcon, PinterestIcon } from './SvgDecorations'

const trustItems = [
  { icon: ShieldIcon, label: '100% Original Products' },
  { icon: TruckIcon, label: 'Easy Returns' },
  { icon: HeartIcon, label: 'Quality Assured' },
  { icon: HeadphonesIcon, label: 'Dedicated Support' },
]

export default function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={ref}>
      <div className="bg-bg-page border-y border-border-cream py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm font-medium text-text-primary">{item.label}</span>
                {i < trustItems.length - 1 && <div className="w-px h-6 bg-border-cream ml-2 hidden md:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="footer-content grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <DiyaIcon className="w-6 h-6 text-gold" />
                <span className="text-white font-serif font-bold text-lg">Sugandh</span>
              </div>
              <p className="text-white/50 text-xs leading-relaxed">Bringing divine fragrance into every home with premium quality agarbatti made with devotion and natural ingredients.</p>
            </div>
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-4 tracking-wide">Quick Links</h4>
              <ul className="space-y-2.5">{[['Home','#home'],['Shop','#shop'],['Best Sellers','#best-sellers'],['About Us','#about']].map(([l,h]) => (<li key={l}><a href={h} className="text-white/40 text-xs hover:text-gold transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-4 tracking-wide">Categories</h4>
              <ul className="space-y-2.5">{['Agarbatti','Dhoop','Incense Cones','Gift Packs'].map(l => (<li key={l}><a href="#" className="text-white/40 text-xs hover:text-gold transition-colors">{l}</a></li>))}</ul>
            </div>
            <div>
              <h4 className="text-white/80 font-medium text-sm mb-4 tracking-wide">Contact</h4>
              <ul className="space-y-2.5">{['support@sugandh.com','+91 98765 43210','Mumbai, India'].map(l => (<li key={l} className="text-white/40 text-xs">{l}</li>))}</ul>
              <div className="flex gap-3 mt-4">{[InstagramIcon, FacebookIcon, PinterestIcon].map((Icon, i) => (<a key={i} href="#" className="text-white/40 hover:text-gold transition-colors"><Icon className="w-4 h-4" /></a>))}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center">
          <p className="text-white/30 text-xs">&copy; 2026 Sugandh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
