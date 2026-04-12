import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Sparkles } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-md w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="relative inline-flex">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-float">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">Pendaftaran Berhasil!</h1>
          <p className="text-muted-foreground leading-relaxed">
            Akun IqDav kamu sudah dibuat. Cek email kamu untuk verifikasi akun, 
            lalu kamu bisa langsung mulai chat dengan AI.
          </p>
        </div>

        {/* Email Reminder */}
        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-foreground text-sm">Cek Email Kamu</p>
            <p className="text-muted-foreground text-xs">Klik link verifikasi yang sudah dikirim</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-4">
          <Button 
            asChild 
            className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-lg font-semibold"
          >
            <Link href="/auth/login">Masuk ke Akun</Link>
          </Button>
          <Button 
            variant="outline" 
            asChild
            className="w-full py-6 rounded-xl"
          >
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-muted-foreground text-sm">
          Tidak menerima email? Cek folder spam atau{' '}
          <button className="text-primary hover:underline">kirim ulang</button>
        </p>
      </div>
    </div>
  )
}
