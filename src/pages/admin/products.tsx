import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react'
import { supabase, type Product } from '@/lib/supabase'
import { formatPrice, generateSlug } from '@/lib/utils'
import { useToast } from '@/components/toast'

const emptyProduct = {
  name: '',
  slug: '',
  description: '',
  price: 0,
  compare_price: 0,
  images: [''],
  category: 'dresses',
  collection: '',
  stock: 0,
  featured: false,
  colors: '',
  sizes: '',
}

export function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<typeof emptyProduct | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  const openNew = () => {
    setEditingId(null)
    setEditing({ ...emptyProduct, slug: '' })
  }

  const openEdit = (p: Product) => {
    setEditingId(p.id)
    setEditing({
      name: p.name,
      slug: p.slug,
      description: p.description || '',
      price: p.price,
      compare_price: p.compare_price || 0,
      images: p.images.length > 0 ? p.images : [''],
      category: p.category,
      collection: p.collection || '',
      stock: p.stock,
      featured: p.featured,
      colors: p.colors.join(', '),
      sizes: p.sizes.join(', '),
    })
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    const payload = {
      name: editing.name,
      slug: editing.slug || generateSlug(editing.name),
      description: editing.description,
      price: editing.price,
      compare_price: editing.compare_price || null,
      images: editing.images.filter((i) => i.trim()),
      category: editing.category,
      collection: editing.collection || null,
      stock: editing.stock,
      featured: editing.featured,
      colors: editing.colors.split(',').map((c) => c.trim()).filter(Boolean),
      sizes: editing.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    }

    const { error } = editingId
      ? await supabase.from('products').update(payload).eq('id', editingId)
      : await supabase.from('products').insert(payload)

    if (error) {
      toast('Gagal menyimpan produk', 'error')
    } else {
      toast(editingId ? 'Produk diperbarui' : 'Produk ditambahkan')
      setEditing(null)
      loadProducts()
    }
    setSaving(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      toast('Gagal menghapus produk', 'error')
    } else {
      toast('Produk dihapus')
      loadProducts()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari produk..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Tambah Produk
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">Tidak ada produk ditemukan</div>
      ) : (
        <div className="bg-background rounded-lg border overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground">Produk</th>
                <th className="text-left p-3 font-medium text-muted-foreground hidden sm:table-cell">Kategori</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Harga</th>
                <th className="text-right p-3 font-medium text-muted-foreground hidden sm:table-cell">Stok</th>
                <th className="text-center p-3 font-medium text-muted-foreground hidden md:table-cell">Featured</th>
                <th className="text-right p-3 font-medium text-muted-foreground">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-muted overflow-hidden flex-shrink-0">
                        {p.images[0] && (
                          <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <span className="text-muted-foreground">{p.category}</span>
                  </td>
                  <td className="p-3 text-right font-medium text-foreground">{formatPrice(p.price)}</td>
                  <td className="p-3 text-right hidden sm:table-cell">
                    <span className={p.stock > 0 ? 'text-green-600' : 'text-destructive'}>{p.stock}</span>
                  </td>
                  <td className="p-3 text-center hidden md:table-cell">
                    {p.featured && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">★</span>}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-background rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-foreground">{editingId ? 'Edit Produk' : 'Tambah Produk'}</h3>
              <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">Nama Produk</label>
                <input
                  type="text"
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Harga</label>
                  <input
                    type="number"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Harga Coret</label>
                  <input
                    type="number"
                    value={editing.compare_price}
                    onChange={(e) => setEditing({ ...editing, compare_price: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Kategori</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  >
                    <option value="dresses">Dresses</option>
                    <option value="tops">Tops</option>
                    <option value="gamis">Gamis</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Stok</label>
                  <input
                    type="number"
                    value={editing.stock}
                    onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Deskripsi</label>
                <textarea
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Gambar URL</label>
                <input
                  type="text"
                  value={editing.images[0] || ''}
                  onChange={(e) => setEditing({ ...editing, images: [e.target.value] })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-foreground">Warna (koma)</label>
                  <input
                    type="text"
                    value={editing.colors}
                    onChange={(e) => setEditing({ ...editing, colors: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Black, White"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Ukuran (koma)</label>
                  <input
                    type="text"
                    value={editing.sizes}
                    onChange={(e) => setEditing({ ...editing, sizes: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="L, XL"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="rounded border-border"
                />
                <label htmlFor="featured" className="text-sm font-medium text-foreground">Featured</label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted">
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !editing.name}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
