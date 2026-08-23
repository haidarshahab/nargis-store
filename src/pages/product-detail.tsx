import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DiscountBadge } from '@/components/discount-badge'
import { getProductBySlug, type Product } from '@/lib/supabase'
import { useCart } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [showToast, setShowToast] = useState(false)
  const addItem = useCart((state) => state.addItem)

  useEffect(() => {
    if (slug) {
      getProductBySlug(slug)
        .then(setProduct)
        .catch(() => setProduct(null))
        .finally(() => setLoading(false))
    }
  }, [slug])

  useEffect(() => {
    setSelectedImage(0)
  }, [product])

  useEffect(() => {
    if (product && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0])
    }
    if (product && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0])
    }
  }, [product, selectedColor, selectedSize])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-[3/4] bg-muted rounded-lg animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-24 bg-muted rounded" />
            <div className="h-10 bg-muted rounded w-1/3" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-primary">Produk tidak ditemukan</h1>
        <Button asChild className="mt-4">
          <Link to="/products">Kembali ke Produk</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, selectedSize)
    setQuantity(1)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  const hasImages = product.images && product.images.length > 0
  const hasColors = product.colors && product.colors.length > 0
  const hasSizes = product.sizes && product.sizes.length > 0
  const canAddToCart = hasColors ? !!selectedColor : true && hasSizes ? !!selectedSize : true

  return (
    <div className="container mx-auto px-4 py-8">
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Berhasil ditambahkan ke keranjang!
        </div>
      )}

      <Button variant="ghost" asChild className="mb-4">
        <Link to="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Link>
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
            {hasImages ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                Tidak ada gambar
              </div>
            )}
          </div>

          {hasImages && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground/30'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.stock > 0 && (
                <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded">
                  Ada Stok
                </span>
              )}
              <span className="bg-muted text-muted-foreground text-xs font-medium px-2 py-1 rounded uppercase">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-serif font-bold text-primary">{product.name}</h1>
            <div className="flex items-center gap-4 mt-3">
              <p className="text-2xl font-semibold text-secondary">{formatPrice(product.price)}</p>
              {product.compare_price && product.compare_price > product.price && (
                <p className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compare_price)}
                </p>
              )}
              <DiscountBadge
                price={product.price}
                comparePrice={product.compare_price ?? 0}
              />
            </div>
          </div>

          {product.description && (
            <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
              {product.description}
            </div>
          )}

          {hasColors && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Warna</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                      selectedColor === color
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/20 hover:border-primary/50'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasSizes && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/20 hover:border-primary/50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold">Jumlah:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-muted transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 font-medium min-w-[40px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                className="p-2 hover:bg-muted transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0 || !canAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Tambah Ke Keranjang
          </Button>
        </div>
      </div>
    </div>
  )
}
