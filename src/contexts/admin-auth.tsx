'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AdminAuthContextType {
  isAdminAuthenticated: boolean
  login: (password: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

// Admin password - in production, this should be in environment variables and hashed
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Check for existing admin session on mount
  useEffect(() => {
    const adminSession = localStorage.getItem('admin-session')
    const sessionTime = localStorage.getItem('admin-session-time')

    if (adminSession === 'authenticated' && sessionTime) {
      const timeDiff = Date.now() - parseInt(sessionTime)
      // Session expires after 24 hours
      if (timeDiff < 24 * 60 * 60 * 1000) {
        setIsAdminAuthenticated(true)
      } else {
        logout()
      }
    }
  }, [])

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true)
      localStorage.setItem('admin-session', 'authenticated')
      localStorage.setItem('admin-session-time', Date.now().toString())
      return true
    }
    return false
  }

  const logout = () => {
    setIsAdminAuthenticated(false)
    localStorage.removeItem('admin-session')
    localStorage.removeItem('admin-session-time')
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}