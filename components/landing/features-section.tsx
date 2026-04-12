import { 
  MessageSquare, 
  BookOpen, 
  Clock, 
  Shield, 
  Smartphone, 
  Languages 
} from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Chat Natural',
    description: 'Ngobrol santai kayak sama temen. Tanya apa aja pake bahasa sehari-hari, IqDav paham kok!',
  },
  {
    icon: BookOpen,
    title: 'Semua Mapel',
    description: 'Matematika, Fisika, Kimia, Biologi, Bahasa Inggris, Sejarah - semua bisa dibantu.',
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Mau belajar jam 3 pagi? Gas aja! IqDav selalu ready kapan pun kamu butuh.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Data kamu aman. Percakapan terenkripsi dan privasi terjaga dengan baik.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Friendly',
    description: 'Akses dari HP, tablet, atau laptop. Responsive dan smooth di semua device.',
  },
  {
    icon: Languages,
    title: 'Bahasa Indonesia',
    description: 'Full support Bahasa Indonesia. Ga perlu pusing translate-translate lagi.',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Fitur Unggulan</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Kenapa Pilih IqDav?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Dirancang khusus untuk Gen Z Indonesia. Simpel, cepat, dan pastinya helpful banget buat belajar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
