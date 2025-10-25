'use client'

import Link from 'next/link'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { Settings, User } from 'lucide-react'
import type { UserRole } from '@/lib/auth'

interface HeaderAuthProps {
  userRole?: UserRole
}

export function HeaderAuth({ userRole }: HeaderAuthProps) {
  const { isLoaded, isSignedIn, user } = useUser()

  const isAdmin = isSignedIn && userRole === 'ADMIN'

  // Show loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    )
  }

  // NOT signed in - show sign in button
  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
          Sign In
        </Link>
      </div>
    )
  }

  // Get user initials for fallback
  const getInitials = () => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user?.emailAddresses?.[0]?.emailAddress) {
      return user.emailAddresses[0].emailAddress[0].toUpperCase()
    }
    return 'U'
  }

  // Signed in - show profile
  return (
    <div className="flex items-center gap-3">
      {isAdmin && (
        <Link href="/admin" className="hidden lg:block">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <span>Admin</span>
          </button>
        </Link>
      )}

      <Link
        href="/account"
        className="hidden lg:flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all"
      >
        <User className="h-5 w-5" />
        <span>My Account</span>
      </Link>

      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-11 h-11 rounded-xl border-2 border-gray-200 hover:border-blue-500 shadow-md transition-all",
            userButtonAvatarBox: "w-11 h-11 rounded-xl",
            userButtonPopoverCard: "shadow-2xl rounded-2xl",
            userButtonPopoverActionButton: "hover:bg-blue-50 rounded-lg"
          }
        }}
      />
    </div>
  )
}

export function MobileHeaderAuth({ userRole }: HeaderAuthProps) {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return null
  }

  const isAdmin = isSignedIn && userRole === 'ADMIN'

  if (!isSignedIn) {
    return (
      <div className="border-t border-white/20 pt-4 mt-4">
        <Link href="/sign-in">
          <button className="w-full flex items-center px-4 py-4 rounded-2xl text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer">
            <User className="h-6 w-6 mr-4" />
            <span>Sign In</span>
          </button>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
        {user && (
          <div className="px-4 py-3 rounded-2xl bg-white/30 border border-white/40">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg text-white font-bold text-lg">
                {user.firstName?.charAt(0) || user.emailAddresses?.[0]?.emailAddress?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.emailAddresses?.[0]?.emailAddress || 'User'}
                </p>
                <p className="text-sm text-gray-600 truncate">Signed in</p>
              </div>
            </div>
          </div>
        )}

        <Link
          href="/account"
          className="flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 text-gray-700 hover:text-gray-900 hover:bg-white/50 hover:shadow-md"
        >
          <User className="h-6 w-6 mr-4" />
          My Account
        </Link>

        <SignOutButton redirectUrl="/">
          <button className="w-full flex items-center px-4 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 hover:shadow-md">
            <svg className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </SignOutButton>
      </div>

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
