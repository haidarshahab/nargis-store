import { useEffect, useState } from 'react'
import { Search, Eye, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import { useToast } from '@/components/toast'

interface Order {
  id: string
  customer_name: string | null
  customer_phone: string | null
  items: Array<{ name: string; price: number; quantity: number; color: string; size: string }> | null
  total: number
  status: string
  created_at: string
}

const statusOptions = ['pending', 'confirmed', 'shipped', 'delivered']
const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Dikonfirmasi',
  shipped: 'Dikirim',
  delivered: 'Selesai',
}
const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
}

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [viewing, setViewing] = useState<Order | null>(null)
  const { toast } = useToast()

  const loadOrders = async () => {
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => { loadOrders() }, [])

  const filtered = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.customer_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_phone?.includes(search)
    const matchFilter = !filter || o.status === filter
    return matchSearch && matchFilter
  })

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id)
    if (error) {
      toast('Gagal memperbarui status', 'error')
    } else {
      toast('Status diperbarui')
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
      if (viewing?.id === id) setViewing((prev) => (prev ? { ...prev, status } : null))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau telepon..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
        >
          <option value="">Semua Status</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Tidak ada pesanan ditemukan</div>
      ) : (
        <div className="bg-background rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Pelanggan</th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden sm:table-cell">Items</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Total</th>
                <th className="text-center p-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden md:table-cell">Tanggal</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <p className="font-medium text-foreground text-sm">{o.customer_name || 'Tanpa Nama'}</p>
                    {o.customer_phone && <p className="text-xs text-muted-foreground mt-0.5">{o.customer_phone}</p>}
                  </td>
                  <td className="p-3 text-right hidden sm:table-cell">
                    <span className="text-muted-foreground">{o.items?.length || 0} item</span>
                  </td>
                  <td className="p-3 text-right font-medium text-foreground">{formatPrice(o.total || 0)}</td>
                  <td className="p-3 text-center">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.status] || 'bg-muted'}`}>
                      {statusLabels[o.status] || o.status}
                    </span>
                  </td>
                  <td className="p-3 text-right text-muted-foreground hidden md:table-cell text-xs">
                    {new Date(o.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setViewing(o)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
          <div className="bg-background rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-foreground">Detail Pesanan</h3>
              <button onClick={() => setViewing(null)} className="p-1 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Pelanggan</p>
                  <p className="font-medium text-foreground">{viewing.customer_name || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telepon</p>
                  <p className="font-medium text-foreground">{viewing.customer_phone || '-'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tanggal</p>
                  <p className="font-medium text-foreground">
                    {new Date(viewing.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total</p>
                  <p className="font-bold text-foreground">{formatPrice(viewing.total || 0)}</p>
                </div>
              </div>

              {viewing.items && viewing.items.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Item</p>
                  <div className="divide-y border rounded-md">
                    {viewing.items.map((item, i) => (
                      <div key={i} className="p-2 text-sm flex justify-between">
                        <div>
                          <p className="text-foreground">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.color && `${item.color} · `}{item.size && `Ukuran ${item.size} · `}x{item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-foreground mb-2">Status</p>
                <div className="flex gap-2">
                  {statusOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(viewing.id, s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                        viewing.status === s
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {statusLabels[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
