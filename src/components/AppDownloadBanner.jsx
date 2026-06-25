import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function AppDownloadBanner() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(rightRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="download"
      style={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'stretch',
        margin: '20px 0 36px',
        minHeight: 240,
        border: '1px solid #EBEBEB',
      }}
    >
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&h=400&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.25) grayscale(80%)',
      }} />

      {/* Left content */}
      <div
        ref={leftRef}
        style={{
          position: 'relative', zIndex: 2,
          flex: 1, padding: '40px 40px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18,
          opacity: 0,
        }}
      >
        <div>
          <div style={{
            fontSize: 9, fontWeight: 600, fontFamily: 'Poppins',
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)', marginBottom: 10,
          }}>
            Mobile App
          </div>
          <h3 style={{
            fontSize: 'clamp(20px, 4vw, 30px)',
            fontWeight: 600, color: 'white',
            fontFamily: '"Cormorant Garamond", serif',
            lineHeight: 1.2, margin: 0,
          }}>
            Get Your Pooja<br />Essentials Delivered<br />in 30 Minutes
          </h3>
        </div>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, fontFamily: 'Poppins', fontWeight: 300, lineHeight: 1.7 }}>
          Download on App Store or Google Play<br />and get ₹50 off your first order.
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            {
              label: 'Google Play',
              sub: 'GET IT ON',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="m3.609 1.814 10.932 6.302L12 10.187zm0 20.372L12 13.813l2.541 2.071zM2 2.648v18.704L11.479 12zm18.217 7.567-2.246-1.295L15.607 12l2.364 2.08 2.246-1.295A1.347 1.347 0 0 0 22 12a1.347 1.347 0 0 0-.783-1.215z"/></svg>,
            },
            {
              label: 'App Store',
              sub: 'DOWNLOAD ON THE',
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>,
            },
          ].map((btn) => (
            <button
              key={btn.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 4,
                padding: '10px 18px',
                cursor: 'pointer',
                color: 'white',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
            >
              {btn.icon}
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}>{btn.sub}</div>
                <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'Poppins' }}>{btn.label}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right — QR / phone mockup area */}
      <div
        ref={rightRef}
        style={{
          position: 'relative', zIndex: 2,
          width: 220,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
          padding: '40px 32px',
          flexShrink: 0,
        }}
        className="hidden md:flex"
      >
        {/* QR code placeholder (stylised) */}
        <div style={{
          width: 140, height: 140,
          background: 'white',
          borderRadius: 8,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: 16, gap: 8,
        }}>
          {/* Minimal QR-like grid */}
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            {/* Corner squares */}
            <rect x="4" y="4" width="22" height="22" fill="var(--charcoal)" rx="2"/>
            <rect x="8" y="8" width="14" height="14" fill="white" rx="1"/>
            <rect x="11" y="11" width="8" height="8" fill="var(--charcoal)" rx="1"/>

            <rect x="64" y="4" width="22" height="22" fill="var(--charcoal)" rx="2"/>
            <rect x="68" y="8" width="14" height="14" fill="white" rx="1"/>
            <rect x="71" y="11" width="8" height="8" fill="var(--charcoal)" rx="1"/>

            <rect x="4" y="64" width="22" height="22" fill="var(--charcoal)" rx="2"/>
            <rect x="8" y="68" width="14" height="14" fill="white" rx="1"/>
            <rect x="11" y="71" width="8" height="8" fill="var(--charcoal)" rx="1"/>

            {/* Random dots */}
            {[
              [34,4],[44,4],[54,4],[34,10],[44,16],[54,10],[34,22],[54,22],
              [4,34],[10,44],[22,44],[4,54],[16,54],[22,34],[22,54],
              [34,34],[40,34],[46,34],[52,34],[34,40],[52,40],[34,46],[40,46],[52,46],[34,52],[40,52],[52,52],
              [64,34],[70,40],[64,46],[76,46],[64,52],[70,52],[76,34],
              [34,64],[40,64],[46,70],[52,64],[40,76],[46,64],[52,76],
            ].map(([x, y], idx) => (
              <rect key={idx} x={x} y={y} width="6" height="6" fill="var(--charcoal)" rx="0.5"/>
            ))}
          </svg>
          <span style={{ fontSize: 8, color: '#888', fontFamily: 'Poppins', letterSpacing: '0.5px' }}>SCAN TO DOWNLOAD</span>
        </div>
      </div>
    </section>
  )
}
