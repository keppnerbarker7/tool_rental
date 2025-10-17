import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Home } from 'lucide-react'
import { HeaderClient } from './header-client'

export function Header() {
  // Simplified navigation - 3 core pages (Account moved to utility nav)
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tools', href: '/tools' },
    { name: 'Support & Info', href: '/support' }
  ]

  return (
    <header className="sticky top-0 z-50 w-full glass-effect border-b border-white/20 shadow-lg">
      <div className="container relative flex h-20 items-center justify-between px-4">
        {/* Modern Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-xl">
            <span className="text-white font-black text-lg">TL</span>
          </div>
          <div className="hidden sm:block">
            <div className="font-black text-xl text-gray-900 leading-tight">
              Tool Locker
            </div>
            <div className="text-sm text-gray-600 font-medium -mt-1">
              Utah Valley
            </div>
          </div>
          <span className="font-black text-xl sm:hidden text-gray-900">Tool Locker</span>
        </Link>

        {/* Modern Desktop Navigation - Flex Centered */}
        <nav className="hidden lg:flex items-center justify-center flex-1 space-x-2">
          {navigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-3 rounded-xl font-semibold transition-all duration-200 relative overflow-hidden text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
            >
              <span className="relative">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Modern Actions - Right Side */}
        <div className="flex items-center space-x-4">
          {/* Quick Action - My Tools */}
          <Button asChild className="relative p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-200">
            <Link href="/tools">
              <Zap className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Browse Tools</span>
            </Link>
          </Button>

          {/* Client-side auth components and mobile menu */}
          <HeaderClient navigation={navigation} />
        </div>
      </div>
    </header>
  )
}