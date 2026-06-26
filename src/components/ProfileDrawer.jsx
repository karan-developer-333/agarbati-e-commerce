import { useState, useEffect, useRef } from 'react'
import { useUser } from '../context/UserContext'
import { gsap } from 'gsap'

export default function ProfileDrawer() {
  const { 
    user, 
    orders, 
    isProfileOpen, 
    setIsProfileOpen, 
    updateProfile 
  } = useUser()

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' })
  const [expandedOrder, setExpandedOrder] = useState(null)

  const drawerRef = useRef(null)
  const overlayRef = useRef(null)
  const progressBarRef = useRef(null)

  // Initialize edit form
  useEffect(() => {
    if (user) {
      setEditForm({ name: user.name, email: user.email, phone: user.phone })
    }
  }, [user])

  // GSAP animation for slide in / out
  useEffect(() => {
    if (isProfileOpen) {
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
        { x: '-100%' }, // Slides in from left for visual balance against cart drawer on right
        { x: '0%', duration: 0.4, ease: 'power3.out' }
      )

      // Animate loyalty progress bar filling
      const targetPercent = Math.min((user.points / 500) * 100, 100)
      gsap.fromTo(progressBarRef.current,
        { width: '0%' },
        { width: `${targetPercent}%`, duration: 1.2, delay: 0.3, ease: 'power2.out' }
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
        x: '-100%',
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          setIsEditing(false)
          setExpandedOrder(null)
        }
      })
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isProfileOpen, user.points])

  const handleEditSubmit = (e) => {
    e.preventDefault()
    updateProfile(editForm)
    setIsEditing(false)
  }

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(prev => prev === orderId ? null : orderId)
  }

  const rewardProgress = Math.min((user.points / 500) * 100, 100)

  return (
    <>
      {/* Dark Overlay */}
      <div 
        ref={overlayRef}
        onClick={() => setIsProfileOpen(false)}
        className="fixed inset-0 bg-black/40 z-50 opacity-0 pointer-events-none backdrop-blur-[2px] transition-all"
      />

      {/* Slide-out Drawer (Left-aligned) */}
      <div 
        ref={drawerRef}
        className="fixed left-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#FDFBF6] z-50 shadow-2xl flex flex-col transform -translate-x-full border-r border-border-cream/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-cream bg-[#FDFBF6]">
          <div className="flex items-center gap-2">
            <span className="text-gold text-lg">✨</span>
            <h2 className="font-serif text-lg font-bold text-primary">Divine Profile</h2>
          </div>
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:bg-[#F0ECE4] transition-colors cursor-pointer"
            aria-label="Close profile"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
          
          {/* Section 1: User details & edit form */}
          <div className="bg-[#FBF8F2] rounded-xl border border-border-cream/60 p-4 relative shadow-sm">
            {!isEditing ? (
              <div className="flex items-start gap-4">
                {/* Avatar with gold glow */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-gold flex items-center justify-center text-white text-xl font-bold font-serif shadow-md border-2 border-gold/20 shrink-0 select-none animate-[glowPulse_3s_infinite]">
                  {user.name.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className="inline-block bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5">
                    {user.tier}
                  </span>
                  <h3 className="font-serif text-base font-bold text-primary leading-tight truncate">
                    {user.name}
                  </h3>
                  <p className="text-text-secondary text-[11px] mt-0.5 truncate">{user.email}</p>
                  <p className="text-text-secondary text-[11px] mt-0.5">{user.phone}</p>
                  
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="mt-3 text-[11px] font-bold text-gold hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Edit details ✏️
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEditSubmit} className="space-y-3.5 animate-[fadeIn_0.3s_ease-out]">
                <h4 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Edit Profile</h4>
                
                <div>
                  <label className="block text-[10px] text-text-secondary mb-0.5">Name</label>
                  <input 
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full h-8 px-2.5 rounded border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-text-secondary mb-0.5">Email</label>
                  <input 
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full h-8 px-2.5 rounded border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-text-secondary mb-0.5">Phone</label>
                  <input 
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full h-8 px-2.5 rounded border border-border-cream bg-white text-xs text-text-primary outline-none focus:ring-1 focus:ring-gold/30"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 h-8 rounded bg-white border border-border-cream text-text-secondary text-[11px] font-semibold hover:bg-[#F0ECE4] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-8 rounded bg-primary text-white text-[11px] font-semibold hover:bg-primary-dark cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Section 2: Loyalty points program */}
          <div className="bg-[#2D1B5E] text-[#FDFBF6] rounded-xl border border-primary/20 p-4.5 shadow-md relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -right-6 -bottom-6 text-7xl opacity-[0.07] select-none pointer-events-none">
              🪔
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest font-mono">Sugandh Rewards</span>
              <span className="text-xs text-white/70">Diya Level</span>
            </div>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-serif font-bold text-gold">{user.points}</span>
              <span className="text-xs text-white/80">Diya Points</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-gold to-yellow-400 rounded-full"
                  style={{ width: `${rewardProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/60 mt-1.5 font-medium">
                <span>Next reward at 500 pts</span>
                {user.points < 500 ? (
                  <span className="text-gold font-semibold">{500 - user.points} pts left</span>
                ) : (
                  <span className="text-green-400 font-semibold">Reward unlocked! 🎉</span>
                )}
              </div>
            </div>
            <p className="text-[9px] text-white/50 leading-relaxed mt-3 border-t border-white/10 pt-2.5">
              💡 Spend ₹100 to earn 10 Diya Points. Points can be redeemed for free premium Oudh boxes and sample kits!
            </p>
          </div>

          {/* Section 3: Collapsible Order History */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-primary">Order History</h3>
            
            {orders.length === 0 ? (
              <p className="text-text-secondary text-xs italic py-2">No orders placed yet.</p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {orders.map((order, idx) => {
                  const isExpanded = expandedOrder === order.id
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-lg border border-border-cream/80 overflow-hidden shadow-sm transition-all"
                    >
                      {/* Summary Row */}
                      <div 
                        onClick={() => toggleOrderExpand(order.id)}
                        className="p-3 flex items-center justify-between cursor-pointer hover:bg-[#FDFBF6] transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-bold text-primary select-all">
                              {order.id}
                            </span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-gold'}`}>
                              {order.status}
                            </span>
                          </div>
                          <span className="text-[10px] text-text-secondary mt-1 block">
                            Ordered on {order.date}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-text-primary">
                            ₹{order.total}
                          </span>
                          <span className={`text-xs text-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            ▾
                          </span>
                        </div>
                      </div>

                      {/* Expandable Order Details */}
                      {isExpanded && (
                        <div className="px-3 pb-3 pt-1 border-t border-border-cream/40 bg-[#FBF8F2]/40 animate-[fadeIn_0.2s_ease-out]">
                          <h5 className="text-[9px] font-bold text-text-secondary uppercase tracking-wider mb-1.5">Items in Order</h5>
                          <div className="space-y-1.5">
                            {order.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex justify-between text-xs text-text-primary">
                                <span>{item.name} <span className="text-text-secondary">x{item.qty}</span></span>
                                <span className="font-semibold text-text-secondary">₹{item.price * item.qty}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Section 4: Preferences quiz tags */}
          <div className="space-y-2 pt-2">
            <h3 className="font-serif text-sm font-bold text-primary">Your Scent Profile</h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="bg-[#F0ECE4] text-primary text-[10px] px-2.5 py-1 rounded-full font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform hover:scale-105 select-none cursor-pointer">
                🪵 Woodsy / Sandalwood
              </span>
              <span className="bg-[#F0ECE4] text-primary text-[10px] px-2.5 py-1 rounded-full font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform hover:scale-105 select-none cursor-pointer">
                🌹 Floral / Rose
              </span>
              <span className="bg-[#F0ECE4] text-primary text-[10px] px-2.5 py-1 rounded-full font-medium shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-transform hover:scale-105 select-none cursor-pointer">
                🌿 Herbal / Mogra
              </span>
            </div>
          </div>
          
        </div>
        
        {/* Footer logout button */}
        <div className="p-4 border-t border-border-cream bg-[#FDFBF6] flex items-center justify-between">
          <span className="text-[10px] text-text-secondary">Sugandh Inc. © 2026</span>
          <button 
            onClick={() => setIsProfileOpen(false)}
            className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
