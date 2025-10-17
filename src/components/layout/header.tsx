'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, Zap, X, Home, Settings, HelpCircle, User } from 'lucide-react'
import { useNetworkStatus } from '@/hooks/useNetworkStatus'
import { cn } from '@/lib/utils'

// Conditional import for Clerk components
const isClerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

// Lazy load Clerk components only if available
let SignedIn: any, SignedOut: any, UserButton: any, SignInButton: any, useUser: any

if (isClerkAvailable) {
  const clerk = require('@clerk/nextjs')
  SignedIn = clerk.SignedIn
  SignedOut = clerk.SignedOut
  UserButton = clerk.UserButton
  SignInButton = clerk.SignInButton
  useUser = clerk.useUser
}

export function Header() {
  const { isOnline } = useNetworkStatus()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Only use Clerk hooks if available
  const user = isClerkAvailable && useUser ? useUser().user : null

  // Simplified navigation - 3 core pages (Account moved to utility nav)
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Browse Tools', href: '/tools' },
    { name: 'Support & Info', href: '/support' }
  ]

  // Check if user is admin (you can customize this logic)
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses?.[0]?.emailAddress?.includes('admin')

  const isCurrentPage = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

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
              className={cn(
                "px-5 py-3 rounded-xl font-semibold transition-all duration-200 relative overflow-hidden",
                isCurrentPage(item.href)
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg transform scale-105"
                  : "text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
              )}
            >
              {isCurrentPage(item.href) && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 animate-pulse"></div>
              )}
              <span className="relative">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Modern Actions - Right Side */}
        <div className="flex items-center space-x-4">
          {!isOnline && (
            <Badge className="hidden sm:inline-flex bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
              Offline
            </Badge>
          )}

          {/* Quick Action - My Tools */}
          <Button asChild className="relative p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-200">
            <Link href="/tools">
              <Zap className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Browse Tools</span>
            </Link>
          </Button>

          {/* Admin Login - Only show if user is admin */}
          {isAdmin && (
            <div className="hidden lg:block">
              <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                <Link href="/admin">
                  <Settings className="h-5 w-5 mr-2" />
                  Admin
                </Link>
              </Button>
            </div>
          )}

          {/* Utility Navigation - Account Link for signed-in users */}
          {isClerkAvailable && SignedIn && (
            <SignedIn>
              <Link
                href="/account"
                className="hidden lg:flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mr-4"
              >
                <User className="h-4 w-4 mr-1" />
                Account
              </Link>
            </SignedIn>
          )}

          {/* User Authentication */}
          {isClerkAvailable && SignedOut && SignInButton && (
            <SignedOut>
              <SignInButton>
                <Button className="modern-button modern-button-primary px-6 py-3">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
          )}
          {isClerkAvailable && SignedIn && UserButton && (
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10 rounded-xl shadow-lg"
                  }
                }}
              />
            </SignedIn>
          )}

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
        </div>
      </div>

      {/* Modern Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-effect border-t border-white/20 shadow-xl">
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
                {item.icon && <item.icon className="h-6 w-6 mr-4" />}
                {item.name}
                {isCurrentPage(item.href) && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}

            {/* Mobile Account Link - Only show if user is signed in */}
            {isClerkAvailable && SignedIn && (
              <SignedIn>
                <Link
                  href="/account"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-200",
                    isCurrentPage('/account')
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-6 w-6 mr-4" />
                  Account
                  {isCurrentPage('/account') && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              </SignedIn>
            )}

            {/* Mobile Admin Login - Only show if user is admin */}
            {isAdmin && (
              <div className="border-t border-white/20 pt-4 mt-4">
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-6 w-6 mr-4" />
                  Admin Panel
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}