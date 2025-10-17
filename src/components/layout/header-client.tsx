'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X, User } from 'lucide-react'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { cn } from '@/lib/utils'
import { HeaderAuth, MobileHeaderAuth } from './header-auth'

interface HeaderClientProps {
  navigation: Array<{
    name: string
    href: string
  }>
}

export function HeaderClient({ navigation }: HeaderClientProps) {
  const { isOnline } = useNetworkStatus()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isCurrentPage = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {!isOnline && (
        <Badge className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
          Offline
        </Badge>
      )}

      {/* Auth components */}
      <HeaderAuth />

      {/* Modern Mobile Menu Button */}
      <Button
        className="lg:hidden p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5 text-gray-700" />
        ) : (
          <Menu className="h-5 w-5 text-gray-700" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Modern Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-t border-white/20 shadow-xl absolute top-full left-0 right-0 z-50">
          <div className="container px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-200",
                  isCurrentPage(item.href)
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
                {isCurrentPage(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            {/* Mobile auth components */}
            <MobileHeaderAuth />
          </div>
        </div>
      )}
    </>
  )
}