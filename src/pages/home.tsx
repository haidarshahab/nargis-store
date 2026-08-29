import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RotateCcw, Headphones, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiscountBadge } from '@/components/discount-badge'
import { getFeaturedProducts, type Product } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'

const categories = [
  { name: 'Dresses', slug: 'dresses', image: 'https://gpzoxblivqawiycvmeas.supabase.co/storage/v1/object/public/products/savana-dress/savana-dress-1.webp' },
  { name: 'Tops & Blouses', slug: 'tops', image: 'https://gpzoxblivqawiycvmeas.supabase.co/storage/v1/object/public/products/camelia-blouse/camelia-blouse-1.webp' },
  { name: 'Gamis', slug: 'gamis', image: 'https://gpzoxblivqawiycvmeas.supabase.co/storage/v1/object/public/products/gamis-floral-lebaran/gamis-floral-lebaran-1.webp' },
]

const features = [
  { icon: Truck, title: 'Gratis Ongkir', description: 'Pengiriman gratis untuk pesanan tertentu' },
  { icon: RotateCcw, title: 'Pengembalian Mudah', description: 'Proses pengembalian simpel dan mudah' },
  { icon: Headphones, title: 'Dukungan 24/7', description: 'Tim kami siap membantu Anda kapan saja' },
  { icon: ShieldCheck, title: 'Pembayaran Aman', description: 'Metode pembayaran aman dan terpercaya' },
]

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedProducts()
      .then(setFeaturedProducts)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-16">
      <section className="relative h-[600px] flex items-end justify-center pb-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://gpzoxblivqawiycvmeas.supabase.co/storage/v1/object/public/products/aveline-dress/aveline-dress-2.webp)',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-4 text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/80 drop-shadow-lg">
            Timeless Pieces for Modern Women
          </p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg">
            Nargis
          </h1>
          <p className="text-lg text-white/90 drop-shadow-md max-w-lg mx-auto">
            Elegant homewear, tops, and dresses crafted with care for the modern woman.
          </p>
          <Button
            size="xl"
            asChild
            className="bg-white text-primary hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300"
          >
            <Link to="/products">
              Belanja Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary">Shop by Category</h2>
          <p className="text-muted-foreground">Temukan koleksi favorit Anda</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-center font-medium text-primary group-hover:text-secondary transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary">New Arrivals</h2>
          <p className="text-muted-foreground">Koleksi terbaru dari Nargis</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-muted rounded-lg mb-4" />
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {featuredProducts.slice(0, 6).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="font-medium text-primary group-hover:underline">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-secondary font-semibold">{formatPrice(product.price)}</p>
                  {product.compare_price && product.compare_price > product.price && (
                    <p className="text-sm text-muted-foreground line-through">
                      {formatPrice(product.compare_price)}
                    </p>
                  )}
                  <DiscountBadge price={product.price} comparePrice={product.compare_price ?? 0} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">
            Produk akan segera tersedia. Stay tuned!
          </p>
        )}

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link to="/products">
              Lihat Semua Produk
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center space-y-4">
                <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-primary">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold text-primary">Langganan Newsletter</h2>
          <p className="text-muted-foreground">
            Dapatkan info produk baru dan penawaran eksklusif
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Masukkan email Anda"
              className="flex-1 px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            />
            <Button type="submit">Langganan</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
