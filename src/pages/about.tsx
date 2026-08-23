import { ArrowRight } from 'lucide-react'

const values = [
  {
    title: 'Quality',
    description:
      'Setiap potongan dibuat dengan perhatian detail dan material berkualitas tinggi untuk kenyamanan maksimal.',
  },
  {
    title: 'Elegance',
    description:
      'Desain timeless yang elegan untuk wanita modern yang menghargai keanggunan dalam setiap momen.',
  },
  {
    title: 'Comfort',
    description:
      'Kenyamanan adalah prioritas kami. Setiap koleksi dirancang untuk memberikan rasa nyaman sepanjang hari.',
  },
  {
    title: 'Sustainability',
    description:
      'Komitmen kami terhadap lingkungan dengan proses produksi yang bertanggung jawab.',
  },
]

export function AboutPage() {
  return (
    <div className="space-y-16">
      <section className="relative h-[400px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=600&fit=crop)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white space-y-4 px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">About Nargis</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            Timeless pieces for modern women
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-serif font-bold text-primary">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Nargis lahir dari kecintaan terhadap fashion yang elegan dan berkualitas. Kami percaya
            setiap wanita berhak tampil percaya diri dengan pakaian yang nyaman dan indah. Koleksi
            kami dirancang untuk wanita modern yang menghargai keanggunan dalam setiap momen
            kehidupan mereka.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Dari homewear yang nyaman hingga dress yang anggun, setiap potongan Nargis dibuat
            dengan perhatian terhadap detail dan material pilihan. Kami berkomitmen untuk
            menghadirkan fashion berkualitas tinggi dengan harga yang terjangkau.
          </p>
        </div>
      </section>

      <section className="bg-muted">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center space-y-4">
                <h3 className="text-xl font-serif font-semibold text-primary">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Follow Us</h2>
        <p className="text-muted-foreground mb-8">
          Stay updated with our latest collections and promotions
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/nargishouse.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Instagram
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://www.tiktok.com/@nargis.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            TikTok
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  )
}
