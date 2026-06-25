import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import CategoryQuickLinks from './components/CategoryQuickLinks'
import ProductSection from './components/ProductSection'
import PromoBannerCards from './components/PromoBannerCards'
import FeaturedBrands from './components/FeaturedBrands'
import AppDownloadBanner from './components/AppDownloadBanner'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

gsap.registerPlugin(ScrollTrigger)

// Real product images from Unsplash
const youMightNeedProducts = [
  {
    id: 1, name: 'Cycle Pure Agarbathi', weight: '50 sticks', price: 85,
    brand: 'Cycle', discount: 10,
    image: 'https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 2, name: 'Satya Nag Champa Premium', weight: '40 sticks', price: 149,
    brand: 'Satya',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821eea058d?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 3, name: 'Hem Gold Sandalwood', weight: '20 sticks', price: 69,
    brand: 'Hem',
    image: 'https://images.unsplash.com/photo-1587143382661-6e17e64c9e3a?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 4, name: 'Mogra Floral Agarbati', weight: '50 sticks', price: 95,
    brand: 'Sugandh',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 5, name: 'Rose Dhoop Cones', weight: '20 cones', price: 120,
    brand: 'Cycle', discount: 15,
    image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=400&fit=crop&q=80',
  },
]

const weeklyBestProducts = [
  {
    id: 6, name: 'Chandan Premium Sticks', weight: '50 sticks', price: 179,
    brand: 'Hem', discount: 20,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 7, name: 'Deshi Dhoop Batti', weight: '40 sticks', price: 59,
    brand: 'Local',
    image: 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 8, name: 'Jasmine Agarbati Pack', weight: '100 sticks', price: 199,
    brand: 'Satya',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 9, name: 'Kesar Saffron Dhoop', weight: '20 cones', price: 145,
    brand: 'Cycle',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821eea058d?w=400&h=400&fit=crop&q=80',
  },
  {
    id: 10, name: 'Lavender Calm Sticks', weight: '50 sticks', price: 89,
    brand: 'Hem', discount: 5,
    image: 'https://images.unsplash.com/photo-1602874801006-e26d3bbf17a4?w=400&h=400&fit=crop&q=80',
  },
]

const filterTabs = ['Agarbati', 'Dhoop', 'Sambrani', 'Oils', 'Pooja Kits', 'Gift Sets']

export default function App() {
  const loaderRef = useRef(null)
  const appRef = useRef(null)

  // ── Cart State ─────────────────────────────────
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: product.quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }]
    })
    // Briefly open cart hint
    gsap.fromTo('#cart-count-badge',
      { scale: 1.5 },
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    )
  }

  const handleIncrement = (id) => {
    setCartItems((prev) => prev.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item)
          .filter((item) => item.quantity > 0)
    )
  }

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // ── Page load animation ────────────────────────
  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(loaderRef.current, {
      opacity: 0, duration: 0.5, delay: 1, ease: 'power2.inOut',
      onComplete: () => { if (loaderRef.current) loaderRef.current.style.display = 'none' },
    })
    .fromTo(appRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.15'
    )
    return () => tl.kill()
  }, [])

  return (
    <>
      {/* Page Loader */}
      <div id="page-loader" ref={loaderRef}>
        <div style={{ marginBottom: 8 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round">
            <path d="M12 2v8M12 2 C12 2, 16 4, 16 8 C16 12, 12 12, 12 12 C12 12, 8 12, 8 8 C8 4, 12 2, 12 2"/>
            <line x1="12" y1="12" x2="12" y2="22"/>
            <ellipse cx="12" cy="22" rx="4" ry="1.5" fill="var(--deep-saffron)" stroke="none"/>
          </svg>
        </div>
        <div className="loader-wordmark">SUGANDH</div>
        <div className="loader-bar" style={{ marginTop: 4 }}>
          <div className="loader-bar-fill" />
        </div>
      </div>

      {/* Main App */}
      <div ref={appRef} style={{ minHeight: '100vh', background: 'var(--cream)', opacity: 0 }}>
        <Navbar
          cartCount={cartCount}
          onCartOpen={() => setIsCartOpen(true)}
        />
        <main style={{ padding: '0 20px', maxWidth: 780, margin: '0 auto' }}>
          <HeroBanner />
          <CategoryQuickLinks />
          <ProductSection
            title="You Might Need"
            products={youMightNeedProducts}
            onAddToCart={handleAddToCart}
          />
          <PromoBannerCards />
          <ProductSection
            title="Weekly Best Sellers"
            products={weeklyBestProducts}
            showFilterTabs
            filterTabs={filterTabs}
            onAddToCart={handleAddToCart}
          />
          <FeaturedBrands />
          <AppDownloadBanner />
        </main>
        <Footer />
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemove}
      />
    </>
  )
}
