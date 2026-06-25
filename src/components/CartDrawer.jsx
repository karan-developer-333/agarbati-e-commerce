import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div style={{
      display: 'flex',
      gap: 14,
      padding: '16px 0',
      borderBottom: '1px solid #F0F0F0',
    }}>
      {/* Product image */}
      <div style={{
        width: 72, height: 72, flexShrink: 0,
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid #EBEBEB',
        background: '#F8F8F8',
      }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#111', fontFamily: 'Poppins', lineHeight: 1.4 }}>
            {item.name}
          </span>
          {/* Remove */}
          <button
            onClick={() => onRemove(item.id)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}
            title="Remove item"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div style={{ fontSize: 11, color: '#888', marginBottom: 10, fontFamily: 'Poppins' }}>{item.weight}</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Qty controls */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 0,
            border: '1px solid #E5E5E5',
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            <button
              onClick={() => onDecrement(item.id)}
              style={{
                width: 28, height: 28,
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: '#555',
              }}
            >−</button>
            <span style={{ width: 28, textAlign: 'center', fontSize: 13, fontWeight: 600, color: '#111' }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrement(item.id)}
              style={{
                width: 28, height: 28,
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: '#555',
              }}
            >+</button>
          </div>

          {/* Price */}
          <span style={{ fontSize: 14, fontWeight: 600, color: '#111', fontFamily: 'Poppins' }}>
            ₹{(item.price * item.quantity).toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function CartDrawer({ isOpen, onClose, cartItems, onIncrement, onDecrement, onRemove }) {
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    // Stagger items in
    const items = drawerRef.current?.querySelectorAll('.cart-item-row')
    if (items && items.length > 0) {
      gsap.fromTo(items,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'power2.out', delay: 0.25 }
      )
    }
  }, [isOpen, cartItems.length])

  if (!isOpen) return null

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="cart-drawer" ref={drawerRef}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #F0F0F0',
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '0.5px' }}>
              Your Cart
            </div>
            <div style={{ fontSize: 12, color: '#888', fontFamily: 'Poppins', marginTop: 2 }}>
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36,
              borderRadius: '50%',
              background: '#F5F5F5',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {cartItems.length === 0 ? (
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              height: '100%', gap: 16, padding: '60px 0',
            }}>
              {/* Empty cart SVG */}
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#888', marginBottom: 6 }}>Your cart is empty</div>
                <div style={{ fontSize: 12, color: '#AAA', fontFamily: 'Poppins' }}>Add some incense to get started</div>
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: '10px 24px',
                  background: 'var(--charcoal)', color: 'white',
                  border: 'none', borderRadius: 6,
                  fontSize: 12, fontWeight: 500,
                  fontFamily: 'Poppins', cursor: 'pointer',
                  marginTop: 8,
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <CartItem
                  item={item}
                  onIncrement={onIncrement}
                  onDecrement={onDecrement}
                  onRemove={onRemove}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer — only show if cart has items */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '20px 24px 28px',
            borderTop: '1px solid #F0F0F0',
            flexShrink: 0,
          }}>
            {/* Order summary */}
            <div style={{ marginBottom: 16 }}>
              {[
                { label: 'Subtotal', value: `₹${subtotal.toFixed(0)}` },
                { label: 'Delivery', value: subtotal >= 299 ? 'Free' : '₹49' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 13, color: '#555',
                  fontFamily: 'Poppins', padding: '4px 0',
                }}>
                  <span>{label}</span>
                  <span style={{ color: value === 'Free' ? 'var(--charcoal)' : '#555', fontWeight: value === 'Free' ? 600 : 400 }}>{value}</span>
                </div>
              ))}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 15, fontWeight: 600, color: 'var(--charcoal)',
                fontFamily: 'Poppins', padding: '12px 0 0',
                borderTop: '1px solid #F0F0F0', marginTop: 8,
              }}>
                <span>Total</span>
                <span>₹{(subtotal + (subtotal >= 299 ? 0 : 49)).toFixed(0)}</span>
              </div>
            </div>

            {subtotal < 299 && (
              <div style={{
                background: '#F5F5F5', borderRadius: 6, padding: '8px 12px',
                fontSize: 11, color: '#666', fontFamily: 'Poppins', marginBottom: 14,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                Add ₹{(299 - subtotal).toFixed(0)} more for free delivery
              </div>
            )}

            <button
              style={{
                width: '100%', height: 48,
                background: 'var(--deep-saffron)', color: 'white',
                border: 'none', borderRadius: 8,
                fontSize: 14, fontWeight: 600,
                fontFamily: 'Poppins', cursor: 'pointer',
                letterSpacing: '0.3px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              Proceed to Checkout
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '100%', height: 40,
                background: 'transparent', color: '#888',
                border: 'none', cursor: 'pointer',
                fontSize: 12, fontFamily: 'Poppins',
                marginTop: 8,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#111' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#888' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
