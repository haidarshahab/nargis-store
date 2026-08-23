import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getProducts, type Product } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { DiscountBadge } from '@/components/discount-badge'

const categories = [
  { label: 'All', value: '' },
  { label: 'Dresses', value: 'dresses' },
  { label: 'Tops', value: 'tops' },
  { label: 'Gamis', value: 'gamis' },
  { label: 'Sets', value: 'sets' },
]

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProducts(activeCategory || undefined)
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [activeCategory])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-3xl font-serif font-bold text-primary">Shop</h1>
        <p className="text-muted-foreground">Temukan koleksi Nargis untuk Anda</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => {
              if (cat.value) {
                setSearchParams({ category: cat.value })
              } else {
                setSearchParams({})
              }
            }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/4" />
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3 relative">
                {product.images[0] && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {product.compare_price && product.compare_price > product.price && (
                  <div className="absolute top-3 left-3">
                    <DiscountBadge price={product.price} comparePrice={product.compare_price} />
                  </div>
                )}
              </div>
              <h3 className="font-medium text-primary text-sm group-hover:underline line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-secondary font-semibold text-sm">{formatPrice(product.price)}</p>
                {product.compare_price && product.compare_price > product.price && (
                  <p className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.compare_price)}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">Produk belum tersedia</p>
          <p className="text-sm text-muted-foreground mt-2">
            Produk akan segera ditambahkan. Stay tuned!
          </p>
        </div>
      )}
    </div>
  )
}
