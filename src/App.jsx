import Navbar from './components/Navbar'
import HeroBanner from './components/HeroBanner'
import MidSection from './components/MidSection'
import ValueProposition from './components/ValueProposition'
import PromoCollections from './components/PromoCollections'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg-page font-sans text-text-primary">
      <Navbar />
      <main>
        <HeroBanner />
        <MidSection />
        <ValueProposition />
        <PromoCollections />
      </main>
      <Footer />
    </div>
  )
}
