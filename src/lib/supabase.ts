import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  compare_price: number | null
  images: string[]
  category: string
  collection: string | null
  stock: number
  featured: boolean
  colors: string[]
  sizes: string[]
  created_at: string
}

export async function getProducts(category?: string, collection?: string): Promise<Product[]> {
  let query = supabase.from('products').select('*').order('created_at', { ascending: false })
  if (category) {
    query = query.eq('category', category)
  }
  if (collection) {
    query = query.eq('collection', collection)
  }
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) throw error
  return data
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)
  if (error) throw error
  return data || []
}

export async function getCollections(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('collection')
    .not('collection', 'is', null)
  if (error) throw error
  const collections = [...new Set(data?.map((p) => p.collection) as string[])]
  return collections
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('products')
    .select('category')
  if (error) throw error
  const categories = [...new Set(data?.map((p) => p.category) as string[])]
  return categories
}

export async function uploadProductImage(file: File, productName: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'webp'
  const safeName = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product'
  const fileName = `${safeName}/${safeName}-${Date.now()}.${ext}`
  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, { upsert: true })
  if (error) throw error
  const { data: urlData } = supabase.storage.from('products').getPublicUrl(data.path)
  return urlData.publicUrl
}
