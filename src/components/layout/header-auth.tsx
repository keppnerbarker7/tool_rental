'use client'

import { Button } from '@/components/ui/button'
import { User, Settings } from 'lucide-react'
import Link from 'next/link'

// Safe hook to use Clerk only when available
function useClerkSafely() {
  const isClerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!isClerkAvailable) {
    return { isAvailable: false, user: null }
  }

  try {
    const { useUser } = require('@clerk/nextjs')
    const { user } = useUser()
    return { isAvailable: true, user }
  } catch (error) {
    return { isAvailable: false, user: null }
  }
}

export function HeaderAuth() {
  const { isAvailable, user } = useClerkSafely()

  // Don't render anything if Clerk is not available
  if (!isAvailable) {
    return null
  }

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses?.[0]?.emailAddress?.includes('admin')

  // Dynamic imports for Clerk components
  const { SignedIn, SignedOut, UserButton, SignInButton } = require('@clerk/nextjs')

  return (
    <>
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
      <SignedIn>
        <Link
          href="/account"
          className="hidden lg:flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors mr-4"
        >
          <User className="h-4 w-4 mr-1" />
          Account
        </Link>
      </SignedIn>

      {/* User Authentication */}
      <SignedOut>
        <SignInButton>
          <Button className="modern-button modern-button-primary px-6 py-3">
            Sign In
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-10 w-10 rounded-xl shadow-lg"
            }
          }}
        />
      </SignedIn>
    </>
  )
}

export function MobileHeaderAuth() {
  const { isAvailable, user } = useClerkSafely()

  // Don't render anything if Clerk is not available
  if (!isAvailable) {
    return null
  }

  // Check if user is admin
  const isAdmin = user?.publicMetadata?.role === 'admin' || user?.emailAddresses?.[0]?.emailAddress?.includes('admin')

  // Dynamic imports for Clerk components
  const { SignedIn } = require('@clerk/nextjs')

  return (
    <>
      {/* Mobile Account Link - Only show if user is signed in */}
      <SignedIn>
        <Link
          href="/account"
          className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
        >
          <User className="h-6 w-6 mr-4" />
          Account
        </Link>
      </SignedIn>

      {/* Mobile Admin Login - Only show if user is admin */}
      {isAdmin && (
        <div className="border-t border-white/20 pt-4 mt-4">
          <Link
            href="/admin"
            className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Settings className="h-6 w-6 mr-4" />
            Admin Panel
          </Link>
        </div>
      )}
    </>
  )
}