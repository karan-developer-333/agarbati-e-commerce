import { useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function ProductCard({ product, onAddToCart }) {
  const [count, setCount] = useState(0)
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  const wholePrice = Math.floor(product.price)
  const decimalPart = (product.price % 1).toFixed(2).slice(1)

  const handleAdd = () => {
    setCount(1)
    onAddToCart && onAddToCart({ ...product, quantity: 1 })

    // Image scale pulse
    gsap.timeline()
      .to(imgRef.current, { scale: 1.08, duration: 0.2, ease: 'power2.out' })
      .to(imgRef.current, { scale: 1, duration: 0.3, ease: 'power2.inOut' })

    // Fly to cart
    const card = cardRef.current
    if (!card) return
    const particle = document.createElement('div')
    particle.style.cssText = `
      position:fixed; width:10px; height:10px; border-radius:50%;
      background:#111; pointer-events:none; z-index:9999;
      left:${card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2 - 5}px;
      top:${card.getBoundingClientRect().top + 30}px;
    `
    document.body.appendChild(particle)
    const navbar = document.getElementById('navbar')
    const navRect = navbar?.getBoundingClientRect() || { left: window.innerWidth - 60, top: 20 }
    gsap.to(particle, {
      x: navRect.right - 60 - parseFloat(particle.style.left),
      y: navRect.top + 20 - parseFloat(particle.style.top),
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      onComplete: () => particle.remove(),
    })
  }

  const handleIncrement = () => {
    const newCount = count + 1
    setCount(newCount)
    onAddToCart && onAddToCart({ ...product, quantity: newCount })
  }
  const handleDecrement = () => {
    const newCount = Math.max(0, count - 1)
    setCount(newCount)
  }

  const handleImgHover = (entering) => {
    gsap.to(imgRef.current, {
      scale: entering ? 1.06 : 1,
      duration: 0.45,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      style={{
        background: 'white',
        border: '1px solid #EBEBEB',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.25s',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#EBEBEB' }}
    >
      {/* Product image */}
      <div style={{
        width: '100%', aspectRatio: '1/1',
        overflow: 'hidden', background: '#F8F8F8',
        position: 'relative',
      }}
        onMouseEnter={() => handleImgHover(true)}
        onMouseLeave={() => handleImgHover(false)}
      >
        <img
          ref={imgRef}
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = '#F5F5F5'
          }}
        />
        {/* Discount tag if present */}
        {product.discount && (
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: 'var(--dark-maroon)', color: 'white',
            fontSize: 9, fontWeight: 600, fontFamily: 'Poppins',
            padding: '3px 7px', borderRadius: 2,
            letterSpacing: '0.5px',
          }}>
            -{product.discount}%
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px 12px 14px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <div style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins', letterSpacing: '0.3px' }}>{product.brand || 'Sugandh'}</div>

        <div style={{
          fontSize: 13, fontWeight: 500, color: 'var(--charcoal)',
          lineHeight: 1.4, fontFamily: 'Poppins',
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {product.name}
        </div>

        <div style={{ fontSize: 11, color: '#AAA', fontFamily: 'Poppins' }}>{product.weight}</div>

        {/* Price + Add */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--charcoal)', fontFamily: 'Poppins' }}>₹{wholePrice}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: '#555', verticalAlign: 'super' }}>{decimalPart}</span>
          </div>

          {count === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); handleAdd() }}
              style={{
                width: 30, height: 30,
                background: 'var(--deep-saffron)', color: 'white',
                border: 'none', borderRadius: 2,
                fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 300, flexShrink: 0,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              title="Add to cart"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
          ) : (
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1px solid #E5E5E5', borderRadius: 2, overflow: 'hidden',
            }}>
              <button
                onClick={(e) => { e.stopPropagation(); handleDecrement() }}
                style={{ width: 26, height: 26, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >−</button>
              <span style={{ width: 22, textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--charcoal)' }}>{count}</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleIncrement() }}
                style={{ width: 26, height: 26, background: 'var(--deep-saffron)', border: 'none', cursor: 'pointer', fontSize: 14, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
