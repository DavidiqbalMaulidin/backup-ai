import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent animate-float">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground text-balance">
            Siap Jadi Lebih Pintar?
          </h2>

          {/* Description */}
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed text-pretty">
            Gabung sekarang dan rasakan pengalaman belajar yang lebih seru dengan AI. 
            Gratis dan tanpa kartu kredit!
          </p>

          {/* CTA Button */}
          <div className="pt-4">
            <Button 
              size="lg" 
              asChild 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-10 py-7 text-lg rounded-2xl animate-glow"
            >
              <Link href="/auth/sign-up">
                Daftar Gratis Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-muted-foreground text-sm">
            Dipercaya oleh 10.000+ pelajar di seluruh Indonesia
          </p>
        </div>
      </div>
    </section>
  )
}
