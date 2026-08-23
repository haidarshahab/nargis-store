import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Halo Nargis!%0ANama: ${formData.name}%0AEmail: ${formData.email}%0APesan: ${formData.message}`
    window.open(`https://wa.me/6281270015001?text=${whatsappMessage}`, '_blank')
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl font-serif font-bold text-primary">Contact Us</h1>
        <p className="text-muted-foreground">
          Hubungi kami untuk pertanyaan, pesanan, atau informasi lebih lanjut
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-primary">Hubungi Kami</h2>

          <div className="space-y-6">
            <a
              href="https://wa.me/6281270015001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">0812-7001-5001</p>
              </div>
            </a>

            <a
              href="https://www.instagram.com/nargishouse.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">Instagram</h3>
                <p className="text-sm text-muted-foreground">@nargishouse.id</p>
              </div>
            </a>

            <a
              href="https://www.tiktok.com/@nargis.id"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.2a8.16 8.16 0 005.58 2.19V12a4.83 4.83 0 01-3.77-1.65V6.69h3.77z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-primary">TikTok</h3>
                <p className="text-sm text-muted-foreground">@nargis.id</p>
              </div>
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-primary">Kirim Pesan</h2>

          {submitted ? (
            <div className="p-6 border rounded-lg text-center bg-green-50 border-green-200">
              <p className="text-green-700 font-medium">
                Pesan Anda telah dikirim via WhatsApp!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Masukkan nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Masukkan email Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pesan *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background min-h-[120px]"
                  placeholder="Tulis pesan Anda..."
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Kirim via WhatsApp
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
