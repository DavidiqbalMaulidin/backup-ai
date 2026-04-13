'use client'

import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sparkles,
  LogOut,
  User as UserIcon,
  Settings,
  Menu,
} from 'lucide-react'
import Link from 'next/link'

interface ChatHeaderProps {
  user: User
}

export function ChatHeader({ user }: ChatHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  const userName =
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'User'

  const initials = userName.slice(0, 2).toUpperCase()

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm px-4 flex items-center justify-between shrink-0">

      {/* LOGO (DISABLE CLICK TOTAL) */}
      <div className="flex items-center gap-3 select-none cursor-default">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>

        <div className="hidden sm:block">
          <h1 className="font-bold text-foreground">
            IqDav Assistant
          </h1>
          <p className="text-xs text-muted-foreground">
            Made by @Daveeed_Iqbaaal
          </p>
        </div>
      </div>

      {/* USER MENU */}
      <DropdownMenu>

        {/* ONLY AVATAR CLICKABLE */}
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 px-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>

            <span className="hidden sm:block text-foreground font-medium">
              {userName}
            </span>

            <Menu className="w-4 h-4 text-muted-foreground sm:hidden" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">

          <div className="px-2 py-1.5">
            <p className="text-sm font-medium text-foreground">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <UserIcon className="w-4 h-4 mr-2" />
            Profil
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push('/settings')}>
            <Settings className="w-4 h-4 mr-2" />
            Pengaturan
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-500 focus:text-red-500"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}