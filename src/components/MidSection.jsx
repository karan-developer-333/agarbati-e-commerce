import ShopByFragrance from './ShopByFragrance'
import BestSellers from './BestSellers'

export default function MidSection() {
  return (
    <section className="py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-10">
          <ShopByFragrance />
          <BestSellers />
        </div>
      </div>
    </section>
  )
}
