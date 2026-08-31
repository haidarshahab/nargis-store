import { useEffect, useState } from 'react'
import { Package, ShoppingCart, DollarSign, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'

interface Stats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
}

interface Order {
  id: string
  customer_name: string | null
  total: number
  status: string
  created_at: string
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, totalOrders: 0, totalRevenue: 0, pendingOrders: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [products, orders] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ])

      const allOrders = orders.data || []
      const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0)

      setStats({
        totalProducts: products.count || 0,
        totalOrders: allOrders.length,
        totalRevenue,
        pendingOrders: allOrders.filter((o) => o.status === 'pending').length,
      })
      setRecentOrders(allOrders.slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Produk', value: stats.totalProducts, icon: Package, color: 'text-blue-600 bg-blue-50' },
    { label: 'Total Pesanan', value: stats.totalOrders, icon: ShoppingCart, color: 'text-green-600 bg-green-50' },
    { label: 'Total Pendapatan', value: formatPrice(stats.totalRevenue), icon: DollarSign, color: 'text-purple-600 bg-purple-50' },
    { label: 'Pesanan Pending', value: stats.pendingOrders, icon: Clock, color: 'text-amber-600 bg-amber-50' },
  ]

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div key={card.label} className="bg-background rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{card.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background rounded-lg border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-foreground">Pesanan Terbaru</h3>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Belum ada pesanan</div>
        ) : (
          <div className="divide-y">
            {recentOrders.map((order) => (
              <div key={order.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{order.customer_name || 'Tanpa Nama'}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">{formatPrice(order.total || 0)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] || 'bg-muted'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
