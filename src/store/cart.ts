import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/supabase'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void
  removeItem: (productId: string, selectedColor: string, selectedSize: string) => void
  updateQuantity: (productId: string, selectedColor: string, selectedSize: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, selectedColor = '', selectedSize = '') => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor === selectedColor &&
              item.selectedSize === selectedSize
          )
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return {
            items: [...state.items, { product, quantity, selectedColor, selectedSize }],
          }
        })
      },
      removeItem: (productId, selectedColor, selectedSize) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedColor === selectedColor &&
                item.selectedSize === selectedSize
              )
          ),
        }))
      },
      updateQuantity: (productId, selectedColor, selectedSize, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
              ? { ...item, quantity }
              : item
          ),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
      },
      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'nargis-cart-storage',
    }
  )
)

const WHATSAPP_NUMBER = '6281270015001'

export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  let message = 'Halo Nargis! Saya ingin memesan:\n\n'
  items.forEach((item) => {
    const variant = [item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')
    const itemTotal = item.product.price * item.quantity
    message += `\u2022 ${item.product.name}${variant ? ` (${variant})` : ''} x${item.quantity} = Rp${itemTotal.toLocaleString('id-ID')}\n`
  })
  message += `\nTotal: Rp${total.toLocaleString('id-ID')}\n\nMohon info selanjutnya. Terima kasih!`
  return message
}

export function openWhatsAppCheckout(items: CartItem[], total: number) {
  const message = generateWhatsAppMessage(items, total)
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
