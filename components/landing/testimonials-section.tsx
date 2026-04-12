import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Rizky Pratama',
    role: 'Siswa SMA - Kelas 11 IPA',
    content: 'IqDav beneran ngebantu banget buat paham Fisika. Penjelasannya simple dan gampang dimengerti. Worth it sih!',
    rating: 5,
    avatar: 'RP',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Siswi SMK - Jurusan RPL',
    content: 'Akhirnya ada AI yang ngerti bahasa kita. Belajar coding jadi lebih gampang. Recommended banget!',
    rating: 5,
    avatar: 'SN',
  },
  {
    name: 'Ahmad Fauzi',
    role: 'Siswa SMP - Kelas 9',
    content: 'Sekarang PR Matematika udah ga serem lagi. IqDav jelasinnya step by step, jadi paham deh.',
    rating: 5,
    avatar: 'AF',
  },
  {
    name: 'Dewi Lestari',
    role: 'Siswi SMA - Kelas 12 IPS',
    content: 'Buat persiapan UTBK super helpful! Bisa tanya soal-soal yang susah kapan aja.',
    rating: 5,
    avatar: 'DL',
  },
  {
    name: 'Budi Santoso',
    role: 'Siswa SMK - Jurusan TKJ',
    content: 'Interface-nya keren, ga ribet. Chat-nya juga fast response. Pokoknya mantap!',
    rating: 5,
    avatar: 'BS',
  },
  {
    name: 'Maya Putri',
    role: 'Siswi SMP - Kelas 8',
    content: 'Suka banget sama IqDav! Belajar Bahasa Inggris jadi asik. Grammar yang tadinya bingung jadi ngerti.',
    rating: 5,
    avatar: 'MP',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimoni</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Kata Mereka tentang IqDav
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Ribuan pelajar Indonesia sudah merasakan manfaatnya. Giliran kamu!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                {'"'}{testimonial.content}{'"'}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
