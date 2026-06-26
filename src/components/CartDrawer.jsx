import { useState, useEffect, useRef } from 'react'
import { useCart } from '../context/CartContext'
import { useUser } from '../context/UserContext'
import { gsap } from 'gsap'

const boxStyles = {
  'Divine Sandalwood Agarbatti': { bg: 'from-[#2D1B5E] to-[#1E0F47]', label: 'SD' },
  'Royal Rose Agarbatti': { bg: 'from-[#8B1A1A] to-[#5C1010]', label: 'RR' },
  'Mogra Bliss Agarbatti': { bg: 'from-[#1B5E20] to-[#0D3310]', label: 'MB' },
  'Lavender Calm Agarbatti': { bg: 'from-[#5B4E9E] to-[#3A2D7A]', label: 'LC' },
  'Oudh Supreme Agarbatti': { bg: 'from-[#1A1A1A] to-[#000000]', label: 'OS' },
}

export default function CartDrawer() {
  const { 
    items, 
    updateQty, 
    removeFromCart, 
    clearCart,
    itemCount, 
    total, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart()

  const { addOrder } = useUser()

  const [step, setStep] = useState(1) // 1: Cart, 2: Checkout Form, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
    paymentMethod: 'upi'
  })
  const [orderId, setOrderId] = useState('')

  const drawerRef = useRef(null)
  const overlayRef = useRef(null)

  // GSAP animation for slide in / out
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden' // Prevent page scroll
      
      // Animate overlay fade in
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out'
      })
      
      // Animate drawer slide in
      gsap.fromTo(drawerRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )
    } else {
      document.body.style.overflow = '' // Restore scroll
      
      // Animate overlay fade out
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
        ease: 'power2.in'
      })
      
      // Animate drawer slide out
      gsap.to(drawerRef.current, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          // Reset step when drawer fully closes
          setStep(1)
        }
      })
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    
    // Quick validation
    if (!formData.name || !formData.address || !formData.city || !formData.pincode || !formData.phone) {
      alert('Please fill in all delivery details.')
      return
    }

    // Add order to history and get order ID
    const placedId = addOrder(items, total, formData)
    setOrderId(placedId)
    
    // Proceed to success step
    setStep(3)
  }

  const handleFinish = () => {
    clearCart()
    setIsCartOpen(false)
    setFormData({
      name: '',
      address: '',
      city: '',
      pincode: '',
      phone: '',
      paymentMethod: 'upi'
    })
  }

  return (
    <>
      {/* Dark Overlay */}
      <div 
        ref={overlayRef}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/40 z-50 opacity-0 pointer-events-none backdrop-blur-[2px] transition-all"
      />

      {/* Slide-out Drawer */}
      <div 
        ref={drawerRef}
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#FDFBF6] z-50 shadow-2xl flex flex-col transform translate-x-full border-l border-border-cream/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-cream bg-[#FDFBF6]">
          <div className="flex items-center gap-2">
            <span className="text-gold text-lg">🪔</span>
            <h2 className="font-serif text-lg font-bold text-primary">
              {step === 1 && `Your Cart (${itemCount})`}
              {step === 2 && 'Delivery details'}
              {step === 3 && 'Order Placed!'}
            </h2>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:bg-[#F0ECE4] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {itemCount === 0 && step !== 3 ? (
            /* Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8">
              <div className="text-5xl mb-4 animate-bounce">🪔</div>
              <h3 className="font-serif text-lg font-bold text-primary mb-1">Your cart is empty</h3>
              <p className="text-text-secondary text-xs max-w-[260px] leading-relaxed mb-6">
                Add some of our divine hand-crafted fragrances to start your aromatic journey.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            /* Active Steps */
            <>
              {step === 1 && (
                /* Step 1: Cart Items List */
                <div className="flex flex-col gap-4">
                  {items.map((item, idx) => {
                    const style = boxStyles[item.name] || { bg: 'from-primary to-primary-dark', label: 'AG' }
                    return (
                      <div 
                        key={idx} 
                        className="flex items-center gap-3.5 pb-4 border-b border-border-cream/40 last:border-b-0 animate-[fadeIn_0.3s_ease-out]"
                      >
                        {/* Thumbnail image with actual product render */}
                        <div className="w-14 h-14 rounded bg-[#FAF7F2] p-1 flex items-center justify-center relative overflow-hidden shrink-0 border border-border-cream/60 shadow-sm">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="text-xl">🪔</div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[12px] font-semibold text-text-primary leading-snug truncate">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-gold font-bold mt-0.5">
                            ₹{item.price}
                          </p>

                          {/* Quantity selector */}
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5 bg-[#F0ECE4]/60 rounded-full p-0.5">
                              <button
                                onClick={() => updateQty(item.name, item.qty - 1)}
                                className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center hover:bg-primary-dark active:scale-90"
                              >
                                −
                              </button>
                              <span className="text-[10px] font-bold text-text-primary w-3.5 text-center">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.name, item.qty + 1)}
                                className="w-4 h-4 rounded-full bg-primary text-white text-[9px] flex items-center justify-center hover:bg-primary-dark active:scale-90"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button 
                          onClick={() => removeFromCart(item.name)}
                          className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-full transition-all cursor-pointer"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              {step === 2 && (
                /* Step 2: Checkout Address/Payment Form */
                <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                  <div>
                    <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Karan Sharma"
                      className="w-full h-10 px-3.5 rounded-lg border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                      Delivery Address
                    </label>
                    <input 
                      type="text" 
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street name, Apartment/Suite"
                      className="w-full h-10 px-3.5 rounded-lg border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                        City
                      </label>
                      <input 
                        type="text" 
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className="w-full h-10 px-3.5 rounded-lg border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                        Pin Code
                      </label>
                      <input 
                        type="text" 
                        name="pincode"
                        required
                        pattern="[0-9]{6}"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit PIN"
                        className="w-full h-10 px-3.5 rounded-lg border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit number"
                      className="w-full h-10 px-3.5 rounded-lg border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                    />
                  </div>

                  {/* Payment Method Selector */}
                  <div className="pt-2 border-t border-border-cream/30">
                    <label className="block text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                      Payment Method
                    </label>
                    <div className="flex flex-col gap-2">
                      <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'upi' ? 'border-primary bg-primary/5 text-primary' : 'border-border-cream bg-white text-text-secondary hover:border-gold/30'}`}>
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="upi"
                            checked={formData.paymentMethod === 'upi'}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary w-3.5 h-3.5"
                          />
                          <span className="text-xs font-semibold">UPI (GPay, PhonePe, Paytm)</span>
                        </div>
                        <span className="text-sm">⚡</span>
                      </label>

                      <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-border-cream bg-white text-text-secondary hover:border-gold/30'}`}>
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="card"
                            checked={formData.paymentMethod === 'card'}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary w-3.5 h-3.5"
                          />
                          <span className="text-xs font-semibold">Credit / Debit Card</span>
                        </div>
                        <span className="text-sm">💳</span>
                      </label>

                      <label className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5 text-primary' : 'border-border-cream bg-white text-text-secondary hover:border-gold/30'}`}>
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            value="cod"
                            checked={formData.paymentMethod === 'cod'}
                            onChange={handleInputChange}
                            className="text-primary focus:ring-primary w-3.5 h-3.5"
                          />
                          <span className="text-xs font-semibold">Cash on Delivery (COD)</span>
                        </div>
                        <span className="text-sm">💵</span>
                      </label>
                    </div>
                  </div>

                  {/* Actions inside form */}
                  <div className="flex items-center gap-3 mt-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 h-11 rounded-full border border-border-cream bg-white text-text-secondary text-xs font-semibold hover:text-primary hover:bg-[#F0ECE4] transition-colors cursor-pointer"
                    >
                      Back to Cart
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] h-11 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-md active:scale-98 cursor-pointer"
                    >
                      Place Order (₹{total})
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                /* Step 3: Success Confirmation */
                <div className="h-full flex flex-col items-center justify-center text-center px-4 py-6 animate-[scaleIn_0.4s_ease-out]">
                  {/* Decorative Diya and Success Glow */}
                  <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5 animate-pulse">
                    <span className="text-4xl">🪔</span>
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1 text-[10px] font-bold">✓</span>
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-primary mb-2">Order Confirmed!</h3>
                  <p className="text-[10px] font-mono text-gold bg-gold/5 px-2.5 py-1 rounded border border-gold/10 mb-4 select-all">
                    Order ID: {orderId}
                  </p>
                  
                  <p className="text-text-secondary text-xs leading-relaxed max-w-[280px] mb-8">
                    Thank you for shopping with <strong className="text-primary font-serif">Sugandh</strong>. Your address details have been recorded and your home will be filled with divine aromas shortly!
                  </p>
                  
                  <button
                    onClick={handleFinish}
                    className="w-full h-11 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Summary (Only visible in Step 1 when items exist) */}
        {step === 1 && itemCount > 0 && (
          <div className="p-4 border-t border-border-cream bg-[#FDFBF6] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Estimated Taxes</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-text-primary pt-1.5 border-t border-border-cream/50">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full h-11 rounded-full bg-primary text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-all shadow-md hover:shadow-primary/10 active:scale-98 cursor-pointer"
            >
              Proceed to Checkout
              <span className="text-sm font-light">→</span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
