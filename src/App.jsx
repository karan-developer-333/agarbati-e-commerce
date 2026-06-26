import { CartProvider } from './context/CartContext'
import { UserProvider } from './context/UserContext'
import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import MidSection from './components/MidSection'
import ValueProposition from './components/ValueProposition'
import PromoCollections from './components/PromoCollections'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import ProfileDrawer from './components/ProfileDrawer'

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="min-h-screen bg-bg-page font-sans text-text-primary">
          <Navbar />
          <main>
            <HeroBanner />
            <MidSection />
            <ValueProposition />
            <PromoCollections />
          </main>
          <Footer />
          <CartDrawer />
          <ProfileDrawer />
        </div>
      </CartProvider>
    </UserProvider>
  )
}
