import ShopByFragrance from './ShopByFragrance'
import BestSellers from './BestSellers'

export default function MidSection() {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[6fr_5fr] gap-6 xl:gap-8">
          <ShopByFragrance />
          <BestSellers />
        </div>
      </div>
    </section>
  )
}
