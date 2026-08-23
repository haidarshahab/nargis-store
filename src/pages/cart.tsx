import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart, openWhatsAppCheckout } from '@/store/cart'
import { formatPrice } from '@/lib/utils'

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-serif font-bold text-primary mb-2">
          Keranjang Anda kosong
        </h1>
        <p className="text-muted-foreground mb-6">
          Tambahkan beberapa produk untuk memulai
        </p>
        <Button asChild>
          <Link to="/products">Lanjutkan Belanja</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
              className="flex gap-4 p-4 border rounded-lg"
            >
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                {item.product.images[0] && (
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${item.product.slug}`}
                  className="font-medium text-primary hover:underline line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.selectedColor && (
                    <span className="text-sm text-muted-foreground">
                      Warna: {item.selectedColor}
                    </span>
                  )}
                  {item.selectedSize && (
                    <span className="text-sm text-muted-foreground">
                      Ukuran: {item.selectedSize}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {formatPrice(item.product.price)}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.selectedColor,
                          item.selectedSize,
                          item.quantity + 1
                        )
                      }
                      className="p-2 hover:bg-muted transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeItem(item.product.id, item.selectedColor, item.selectedSize)
                    }
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-primary">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                {item.product.compare_price &&
                  item.product.compare_price > item.product.price && (
                    <p className="text-xs text-muted-foreground line-through">
                      {formatPrice(item.product.compare_price * item.quantity)}
                    </p>
                  )}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button variant="outline" onClick={clearCart}>
              Kosongkan Keranjang
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/products">Lanjutkan Belanja</Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-primary mb-4">Ringkasan Pesanan</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pengiriman</span>
                <span className="font-medium text-sm">Dihitung via WhatsApp</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold text-primary">{formatPrice(getTotal())}</span>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => openWhatsAppCheckout(items, getTotal())}
            >
              Checkout via WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
